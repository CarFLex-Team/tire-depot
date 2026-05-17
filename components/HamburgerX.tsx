import { motion } from "framer-motion";

export default function HamburgerX({
  open,
  onMenuClick,
}: {
  open: boolean;
  onMenuClick: () => void;
}) {
  return (
    <button
      onClick={() => onMenuClick()}
      className="w-8 h-8 flex items-center justify-center text-secondary-800 dark:text-blue-100 md:hidden"
    >
      <motion.svg width="24" height="24" viewBox="0 0 24 24">
        {/* Top line */}
        <motion.line
          x1={3}
          y1={6}
          x2={21}
          y2={6}
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round" // ✅ fixed typing
          variants={{
            closed: { rotate: 0, translateY: 0 },
            open: { rotate: 45, translateY: 6 },
          }}
          initial="closed"
          animate={open ? "open" : "closed"}
          transition={{ duration: 0.3 }}
        />
        {/* Middle line */}
        <motion.line
          x1={3}
          y1={12}
          x2={21}
          y2={12}
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          initial="closed"
          animate={open ? "open" : "closed"}
          transition={{ duration: 0.3 }}
        />
        {/* Bottom line */}
        <motion.line
          x1={3}
          y1={18}
          x2={21}
          y2={18}
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
          variants={{
            closed: { rotate: 0, translateY: 0 },
            open: { rotate: -45, translateY: -6 },
          }}
          initial="closed"
          animate={open ? "open" : "closed"}
          transition={{ duration: 0.3 }}
        />
      </motion.svg>
    </button>
  );
}
