import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaGoogle,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const LoginCard = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shake, setShake] = useState(false);

  const validate = () => {
    let newErrors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form Submission Handler
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload!

    if (!validate()) {
      setShake(true);
      setTimeout(() => setShake(false), 500); // Trigger shake animation on error
      return;
    }

    setIsSubmitting(true);

    // Simulated Auth Request (Aage chal kar backend API call yahan aayegi)
    setTimeout(() => {
      setIsSubmitting(false);
      alert(`Logging in with Email: ${formData.email}`);
    }, 1200);
  };

  return (
    <div className="right-panel">
      <motion.form
        className="login-card"
        onSubmit={handleSubmit}
        animate={shake ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : {}}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <h2>Sign In to SyncSpace</h2>
        <p className="subtitle">Enter your credentials to access rooms</p>

        {/* Social Login Buttons */}
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

        {/* Email Field */}
        <label htmlFor="email">Email Address</label>
        <div className={`input-box ${errors.email ? "error-border" : ""}`}>
          <input
            id="email"
            type="email"
            placeholder="alex.dev@syncspace.io"
            autoComplete="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <FaEnvelope />
        </div>
        {errors.email && (
          <span style={{ color: "#EF4444", fontSize: "12px", marginTop: "4px", display: "block" }}>
            {errors.email}
          </span>
        )}

        {/* Password Field */}
        <div className="password-header" style={{ marginTop: "12px" }}>
          <label htmlFor="password">Password</label>
          <a href="#">Forgot?</a>
        </div>

        <div className={`input-box ${errors.password ? "error-border" : ""}`}>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••••••••"
            autoComplete="current-password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
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
        {errors.password && (
          <span style={{ color: "#EF4444", fontSize: "12px", marginTop: "4px", display: "block" }}>
            {errors.password}
          </span>
        )}

        {/* Remember Me Checkbox */}
        <div className="remember-row" style={{ marginTop: "12px" }}>
          <label>
            <input
              type="checkbox"
              checked={formData.rememberMe}
              onChange={(e) =>
                setFormData({ ...formData, rememberMe: e.target.checked })
              }
            />
            Remember for 30 days
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="signin-btn"
          disabled={isSubmitting}
          style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? "not-allowed" : "pointer" }}
        >
          {isSubmitting ? "Signing In..." : "Sign In to Workspace →"}
        </button>

        <p className="signup-text">
          Don't have an account? <a href="#">Create One</a>
        </p>
      </motion.form>
    </div>
  );
};

export default LoginCard;
