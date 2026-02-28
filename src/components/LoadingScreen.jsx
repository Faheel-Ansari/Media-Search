import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <div className=" h-[50%] mt-32 bg-transparent flex items-center justify-center gap-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-6 h-6 bg-white rounded-full"
          animate={{ y: [0, -12, 0] }}
          transition={{
            duration: 0.4,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default LoadingScreen;
