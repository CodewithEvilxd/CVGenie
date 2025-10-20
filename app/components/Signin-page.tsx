"use client";

import { ButtonHTMLAttributes, FC, ReactNode ,useState} from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";
type Variant = "default" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

const Button: FC<ButtonProps> = ({
  children,
  variant = "default",
  className = "",
  type = "button",
  onClick,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4",
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );



};

const Input = ({ className = "", type = "text", ...props }: any) => (
  <input
    type={type}
    className={`flex h-10 w-full rounded-[4px] border px-3 py-2 text-sm bg-transparent placeholder:text-muted-foreground focus:outline-none focus:ring-1 ${className}`}
    {...props}
  />
);

const Label = ({ children, htmlFor, className = "" }: any) => (
  <label htmlFor={htmlFor} className={`text-sm font-medium ${className}`}>
    {children}
  </label>
);

const Card = ({ children, className = "" }: any) => (
  <div className={`rounded-xl shadow-xl p-6 ${className}`}>{children}</div>
);

const Separator = ({ className = "" }: any) => (
  <div className={`h-[0.5px] bg-gray-400/60 w-full ${className}`} />
);

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      const result = await signIn("google", {
        callbackUrl: "/create-resume", // Redirect URL after successful login
        redirect: false,
      });
      
      if (result?.error) {
        console.error("Google sign-in error:", result.error);
        alert("Google sign-in failed. Please try again.");
      } else if (result?.url) {
        router.push(result.url);
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);
      const result = await signIn("credentials", {
        username: email,
        password: password,
        redirect: false,
      });

      if (result?.error) {
        console.error("Sign-in error:", result.error);
        alert("Invalid email or password");
      } else {
        router.push("/create-resume"); // Redirect to 
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
  className="min-h-screen bg-cover bg-no-repeat bg-center flex items-start justify-center pt-32 sm:pt-40 relative"
  style={{
    backgroundImage: "url('/contact-bg.png')",
  }}
    >
      {/* <div className="absolute inset-0 z-10"></div> */}

       <Card className="relative z-10 w-full max-w-md bg-white/20 border border-white/30 backdrop-blur-xl text-black mx-4">
        <div className="text-center space-y-2 mb-6">
          <h2 className="text-3xl font-bold">Sign In</h2>
          <p className="text-black-600 text-sm">Enter your email and password</p>
        </div>

        {/* Social Sign In Buttons */}
        <div className="space-y-3 mb-6 flex gap-5">
          <Button
            type="button"
            disabled={isLoading}
            className="w-full bg-gray-800 hover:bg-gray-900 text-white"
            onClick={handleGoogleSignIn}
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {isLoading ? "Signing in..." : "Sign in with Google"}
          </Button>
        </div>

        <Separator className="my-4" />

        <form onSubmit={handleCredentialsSignIn} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
                className="pl-10 border-gray-600 focus:border-black-500 focus:ring-black-500"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Password</Label>
            
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
                className="pl-10 pr-10 border-gray-600 focus:border-black-500 focus:ring-black-500"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5"
              >
                {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
              </button>
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-green-600/80 hover:bg-green-600 font-extrabold text-lg text-black"
          >
            <img src="/log-in.png " alt="" className="w-4 h-4 " />
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <p className="text-center text-sm text-black-600 mt-4">
       {"Don't have an account?"}
          <Link href="/signup" className="text-green-800/80 underline hover:text-green-900">
            Sign Up
          </Link>
        </p>
      </Card>
    </div>
  );
}