import { motion } from "framer-motion";
import LeftPanel from "../components/login/LeftPanel";
import LoginCard from "../components/login/LoginCard";

const LoginPage = () => {
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
      <LeftPanel />
      <LoginCard />
    </motion.div>
  );
};

export default LoginPage;