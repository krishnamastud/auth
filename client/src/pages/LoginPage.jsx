import { useState } from "react"; // Added for password visibility toggle
import { Eye, EyeOff, Mail, Lock } from "lucide-react"; // Added EyeOff
import { Link } from "react-router";
import { useAuthHook } from "../hooks/authHook";


const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  const { register, handleSubmit, errors, handleLoginForm,handleGoogleLogin  } = useAuthHook();

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
            <span className="text-xl font-bold text-white">A</span>
          </div>
          <h1 className="text-3xl font-bold text-white">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-400">Login to your account to continue</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl sm:p-8">

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M21.35 12.27C21.35 11.56 21.29 10.85 21.16 10.16H12V14.1H17.06C16.84 15.37 16.1 16.45 15.02 17.14V19.72H18.32C20.25 17.94 21.35 15.32 21.35 12.27Z" fill="#4285F4" />
              <path d="M12 21.5C14.76 21.5 17.08 20.59 18.32 19.02L15.02 16.44C14.1 17.06 13.08 17.42 12 17.42C9.34 17.42 7.08 15.62 6.25 13.2H2.84V15.86C4.08 19.12 7.73 21.5 12 21.5Z" fill="#34A853" />
              <path d="M6.25 13.2C6.04 12.58 5.93 11.96 5.93 11.3C5.93 10.64 6.04 10.02 6.25 9.4V6.74H2.84C2.29 7.83 2 9.04 2 10.3C2 11.56 2.29 12.77 2.84 13.86L6.25 13.2Z" fill="#FBBC05" />
              <path d="M12 5.18C13.5 5.18 14.84 5.7 15.9 6.72L18.39 4.23C16.84 2.77 14.76 1.9 12 1.9C7.73 1.9 4.08 4.28 2.84 7.54L6.25 10.2C7.08 7.78 9.34 5.18 12 5.18Z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-800" />
            <span className="text-xs text-slate-500">OR</span>
            <div className="h-px flex-1 bg-slate-800" />
          </div>

          {/* Login Form UI */}
          <form onSubmit={handleSubmit(handleLoginForm)} className="space-y-5">

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  {...register("email", { 
                    required: "Email is required",
                    
                  })}
                  type="email"
                  placeholder="you@example.com"
                  className={`w-full rounded-lg border bg-slate-950 py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none transition focus:ring-2 ${
                    errors.email 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-slate-700 focus:border-blue-500 focus:ring-blue-500/20"
                  }`}
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="block text-sm font-medium text-slate-200">Password</label>
                <Link to="/forgot-password" className="text-xs font-medium text-blue-400 hover:text-blue-300">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  {...register("password", { required: "Password is required" })}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`w-full rounded-lg border bg-slate-950 py-3 pl-10 pr-11 text-sm text-white placeholder-slate-500 outline-none transition focus:ring-2 ${
                    errors.password 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-slate-700 focus:border-blue-500 focus:ring-blue-500/20"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
            </div>

            {/* Login Button - Changed type to submit */}
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
            >
              Login
            </button>

          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-400">
              Don't have an account?{" "}
              <Link to="/" className="font-medium text-blue-400 hover:text-blue-300">
                Create account
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-600">© 2026 Your App. All rights reserved.</p>
      </div>
    </div>
  );
};

export default LoginPage;
