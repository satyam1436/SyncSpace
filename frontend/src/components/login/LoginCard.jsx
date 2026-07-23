import { useState } from "react";
import {
  FaGithub,
  FaGoogle,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const LoginCard = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="right-panel">
      <form className="login-card">
        <h2>Sign In to SyncSpace</h2>

        <p className="subtitle">
          Enter your credentials to access rooms
        </p>

        {/* Social Login */}
        <div className="social-buttons">
          <button
            type="button"
            className="social-btn"
            aria-label="Continue with GitHub"
          >
            <FaGithub />
            <span>GitHub</span>
          </button>

          <button
            type="button"
            className="social-btn"
            aria-label="Continue with Google"
          >
            <FaGoogle />
            <span>Google</span>
          </button>
        </div>

        <div className="divider">
          <span>OR</span>
        </div>

        {/* Email */}
        <label htmlFor="email">Email Address</label>

        <div className="input-box">
          <input
            id="email"
            type="email"
            placeholder="alex.dev@syncspace.io"
            autoComplete="email"
          />
          <FaEnvelope />
        </div>

        {/* Password */}
        <div className="password-header">
          <label htmlFor="password">Password</label>

          <a href="#">Forgot?</a>
        </div>

        <div className="input-box">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••••••••"
            autoComplete="current-password"
          />

          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Remember */}
        <div className="remember-row">
          <label>
            <input type="checkbox" />
            Remember for 30 days
          </label>
        </div>

        <button
          type="submit"
          className="signin-btn"
        >
          Sign In to Workspace →
        </button>

        <p className="signup-text">
          Don't have an account?{" "}
          <a href="#">Create One</a>
        </p>
      </form>
    </div>
  );
};

export default LoginCard;