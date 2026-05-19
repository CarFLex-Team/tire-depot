"use client";
import { useEffect, useRef, useState } from "react";
import { inView, motion } from "framer-motion";
import { Star } from "lucide-react";

import GoogleIcon from "./Icons/GoogleIcon";

export default function AnimatedRating() {
  const rating = 4.9;
  const totalStars = 5;
  const [displayRating, setDisplayRating] = useState(0);
  const [activeStars, setActiveStars] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  // Animate number
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = rating / 30;
          const timer = setInterval(() => {
            start += step;
            if (start >= rating) {
              setDisplayRating(rating);
              clearInterval(timer);
            } else {
              setDisplayRating(parseFloat(start.toFixed(1)));
            }
          }, 80);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [rating]);
  //   useEffect(() => {

  //     let start = 0;
  //     const increment = rating / 50;
  //     const interval = setInterval(() => {
  //       start += increment;
  //       if (start >= rating) {
  //         start = rating;
  //         clearInterval(interval);
  //       }
  //       setDisplayRating(parseFloat(start.toFixed(1)));
  //     }, 80);
  //     return () => clearInterval(interval);
  //   }, [inView, rating]);

  // Animate stars
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let current = 0;
          const interval = setInterval(() => {
            current += 1;
            if (current > rating) {
              clearInterval(interval);
              current = Math.floor(rating);
            }
            setActiveStars(current);
          }, 150);
          return () => clearInterval(interval);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [rating]);

  return (
    <div ref={ref} className="flex md:items-center md:flex-row flex-col  gap-2">
      <span
        className="  font-display text-3xl md:text-7xl font-semibold"
        //   ref={ref}
      >
        {displayRating.toFixed(1)}
      </span>
      <div className="flex md:items-center flex-col ">
        <div className="flex items-center ">
          <GoogleIcon width={28} height={28} />
          {Array(totalStars)
            .fill(undefined)
            .map((_, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: i < activeStars ? 1 : 0.8 }}
                transition={{
                  delay: i * 0.15,
                  type: "spring",
                  stiffness: 300,
                }}
              >
                <Star
                  fill={i < activeStars ? "orange" : "orange"}
                  stroke="none"
                  size={28}
                />
              </motion.span>
            ))}
        </div>
        <p className="max-md:hidden text-lg text-muted-foreground">
          Google Reviews
        </p>
      </div>
    </div>
  );
}
