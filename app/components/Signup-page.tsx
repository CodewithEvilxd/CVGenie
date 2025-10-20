"use client";
import axios from "axios";
import { UserCircle, Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { AxiosError } from "axios";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { LabelHTMLAttributes } from "react";
import type { InputHTMLAttributes } from "react";

type Variant = "default" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}
interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
  htmlFor: string;
  className?: string;
}
interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
}
interface CardProps {
  children: ReactNode;
  className?: string;
}

const Button = ({
  children,
  variant = "default",
  className = "",
  type = "button",
  ...props
}: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variants: Record<Variant, string> = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4",
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Input = ({ className = "", type = "text", ...props }) => (
  <input
    type={type}
    className={`flex h-10 w-full rounded-[4px] border px-3 py-2 text-sm bg-transparent placeholder:text-muted-foreground focus:outline-none focus:ring-1 ${className}`}
    {...props}
  />
);

const Label = ({ children, htmlFor, className = "", ...props }: LabelProps) => (
  <label
    htmlFor={htmlFor}
    className={`text-sm font-medium ${className}`}
    {...props}
  >
    {children}
  </label>
);

const Checkbox = ({ id, ...props }: CheckboxProps) => (
  <input
    type="checkbox"
    id={id}
    className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 bg-green-600"
    {...props}
  />
);

const Card = ({ children, className = "" }: CardProps) => (
  <div className={`rounded-xl shadow-xl p-6 ${className}`}>{children}</div>
);

const Separator = ({ className = "" }) => (
  <div className={`h-[0.5px] bg-gray-400/60 w-full ${className}`} />
);

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const router = useRouter();

  const handleGoogleSignUp = async () => {
    try {
      setIsLoading(true);
      const result = await signIn("google", {
        callbackUrl: "/",
        redirect: false,
      });
      
      if (result?.error) {
        console.error("Google sign-up error:", result.error);
        alert("Google sign-up failed. Please try again.");
      } else if (result?.url) {
        router.push(result.url);
      }
    } catch (error) {
      console.error("Google sign-up error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCredentialsSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    if (!agreedToTerms) {
      alert("Please agree to the Terms of Use and Privacy Policy");
      return;
    }

    if (password.length < 6) {
      alert("Password should be at least 6 characters long");
      return;
    }

    try {
      setIsLoading(true);
      
      console.log("🚀 Attempting signup...");
      
      // First, test if API endpoint exists
      try {
        const testResponse = await fetch('/api/user/signup');
        console.log("API test response:", testResponse.status);
        if (!testResponse.ok && testResponse.status !== 405) {
          throw new Error(`API endpoint not available: ${testResponse.status}`);
        }
      } catch (testError) {
        console.error("API endpoint not reachable:", testError);
        alert("Server error: API endpoint not available. Please make sure the /api/user/signup route is created.");
        return;
      }

      // Use relative URL instead of full URL
      const response = await axios.post('/api/user/signup', {
        name,
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 15000, // 15 second timeout
      });

      console.log("✅ Signup success:", response.data);

      // Auto sign-in after successful signup
      const signInResult = await signIn("credentials", {
        username: email,
        password: password,
        redirect: false,
      });

      if (signInResult?.error) {
        console.error("Auto sign-in error:", signInResult.error);
        alert("Account created successfully! Please sign in manually.");
        router.push("/signin");
      } else {
        alert("Account created successfully!");
        router.push("/");
      }

    } catch (err: unknown) {
      const error = err as AxiosError;
      
      console.error("❌ Signup failed:", error);
      console.error("Error details:", {
        message: error.message,
        code: error.code,
        status: error.response?.status,
        data: error.response?.data
      });
      
      if (error.code === 'ERR_NETWORK') {
        alert("Network error: Cannot connect to server. Please ensure the API route '/api/user/signup' exists and try again.");
      } else if (error.code === 'ECONNABORTED') {
        alert("Request timeout. Please check your connection and try again.");
      } else if (error.response?.status === 409) {
        alert("User already exists with this email");
      } else if (error.response?.status === 400) {
        const errorData = error.response.data as { error: string };
        alert(errorData.error || "Invalid input data");
      } else if (error.response?.status === 404) {
        alert("API endpoint not found. Please ensure '/api/user/signup' route is created.");
      } else if (error.response?.status === 500) {
        alert("Server error. Please check server logs and database connection.");
      } else {
        alert(`Signup failed: ${error.message || 'Unknown error'}. Please check console for details.`);
      }

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center opacity-90"
      style={{ backgroundImage: "url('/contact-bg.png')" }}
    >
      <div className="absolute inset-0 z-10"></div>
      <Card className="relative z-10 w-full max-w-lg bg-white/20 border border-white/30 backdrop-blur-xl text-black mt-23">
        <div className="text-center space-y-2 mb-6">
          <div className="flex justify-center">
            {/* <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <UserCircle className="w-8 h-8 text-white" />
            </div> */}
          </div>
          <h2 className="text-3xl font-bold">Create your account</h2>
          {/* <p className="text-black-600 text-sm">Enter your details to sign up</p> */}
        </div>

        {/* Social Sign Up Buttons */}
        <div className=" mb-6 flex gap-5">
          <Button
            type="button"
            disabled={isLoading}
            className="w-full bg-gray-800 hover:bg-gray-900 text-white"
            onClick={handleGoogleSignUp}
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {isLoading ? "Signing up..." : "Sign up with Google"}
          </Button>
        </div>

        <Separator className="my-4" />

        <form onSubmit={handleCredentialsSignUp} className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input 
              id="fullName" 
              type="text" 
              placeholder="Enter your name" 
              className="border-gray-600" 
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input 
                id="email" 
                type="email" 
                placeholder="you@example.com" 
                className="pl-10 border-gray-600"
                value={email}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pl-10 pr-10 border-gray-600"
                value={password}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5"
              >
                {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters long</p>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="terms" 
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              required
              className="accent-green-600  focus:ring-green-400"
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the <Link href="/terms" className="text-green-800/80 hover:text-green-900 hover:underline">Terms of Use</Link> and <Link href="/privacy" className="text-green-800/80 hover:text-green-900 hover:underline ">Privacy Policy</Link>
            </label>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600/80 hover:bg-green-600 font-extrabold text-lg text-black"
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </Button>
        </form>

        <p className="text-center text-sm text-black-600 mt-4">
          Already have an account?{' '}
          <Link href="/signin" className="text-green-800 underline hover:text-green-900">
            Sign In
          </Link>
        </p>
      </Card>
    </div>
  );
}