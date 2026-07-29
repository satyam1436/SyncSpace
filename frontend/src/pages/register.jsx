import { motion } from "framer-motion";
import SignupPage from "../components/signup/Signup";

const register = () => {
  return (
    <motion.div
      className="login-container"
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <SignupPage />
    </motion.div>
  );
};

export default register;