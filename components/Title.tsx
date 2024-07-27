import { motion } from "framer-motion";

export const Title = ({ text }: { text: string }) => {
  return (
    <motion.h2
      initial={{ opacity: 0.0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut",
      }}
      className="text-2xl md:text-5xl font-semibold text-white mb-8 tracking-tight"
    >
      <span className="text-[#ef0000]">/ </span>
      {text}
    </motion.h2>
  );
};
