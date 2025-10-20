// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@/lib/generated/prisma";
import bcrypt from "bcryptjs";
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send login notification email
async function sendLoginEmail(email: string, name: string, loginType: string) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'codewithevilxd@gmail.com', // Your email
      subject: `CVGenie Login Alert: ${name} logged in`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Login Activity</h2>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>User:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Login Type:</strong> ${loginType}</p>
            <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Login notification email sent for ${email}`);
  } catch (error) {
    console.error('Failed to send login email:', error);
  }
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any) {
        const { username, password } = credentials;

        const user = await prisma.user.findUnique({
          where: { email: username },
        });

        if (!user) throw new Error("User not found");

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new Error("Invalid password");

        // Update last login
        await prisma.user.update({
          where: { id: user.id },
          data: { lastLogin: new Date() },
        });

        // Log the login
        await prisma.loginLog.create({
          data: {
            userId: user.id,
            email: user.email,
            name: user.name,
            loginType: 'credentials',
            ipAddress: '', // You can get this from request headers if needed
            userAgent: '', // You can get this from request headers if needed
          },
        });

        console.log(`User logged in with credentials: ${user.email} (${user.name})`);
        await sendLoginEmail(user.email, user.name, 'Credentials');

        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
        };
      }
    })
  ],
  pages: {
    signIn: '/signin', // Custom sign-in page
   // Custom sign-up page
    error: '/auth/error', // Error page (optional)
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          // Check if user already exists
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! },
          });

          if (!existingUser) {
            // Create new user if doesn't exist
            const newUser = await prisma.user.create({
              data: {
                name: user.name!,
                email: user.email!,
                password: "", // Google users don't have password
                googleId: user.id, // Store Google ID (optional)
              },
            });

            // Log the login
            await prisma.loginLog.create({
              data: {
                userId: newUser.id,
                email: user.email!,
                name: user.name!,
                loginType: 'google',
                ipAddress: '', // You can get this from request headers if needed
                userAgent: '', // You can get this from request headers if needed
              },
            });

            console.log(`New user registered: ${user.email} (${user.name})`);
            await sendLoginEmail(user.email!, user.name!, 'Google (New User)');
          } else {
            // Update last login
            await prisma.user.update({
              where: { id: existingUser.id },
              data: { lastLogin: new Date() },
            });

            // Log the login
            await prisma.loginLog.create({
              data: {
                userId: existingUser.id,
                email: user.email!,
                name: user.name!,
                loginType: 'google',
                ipAddress: '', // You can get this from request headers if needed
                userAgent: '', // You can get this from request headers if needed
              },
            });

            console.log(`Existing user logged in: ${user.email} (${user.name})`);
            await sendLoginEmail(user.email!, user.name!, 'Google');
          }
          return true;
        } catch (error) {
          console.error("Error saving user to database:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        // Fetch user from database to get the database ID
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });
        if (dbUser) {
          token.id = dbUser.id;
        }
      }
      return token;
    },
   async session({ session, token }) {
  if (token && session.user) {
    (session.user as { id: string }).id = token.id as string;
  }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };