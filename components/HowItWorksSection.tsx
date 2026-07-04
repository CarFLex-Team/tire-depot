// export default function HowItWorksSection() {
//   return (
//     <section className="bg-brand-charcoal py-20 border-t border-brand-gray">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6">
//         <div className="mb-16 text-center">
//           <p className="font-mono text-xs text-brand-red tracking-widest uppercase mb-2">
//             How It Works
//           </p>
//           <h2 className="font-display font-black text-4xl sm:text-5xl text-white uppercase tracking-tight">
//             Order Online, Pick Up Today
//           </h2>
//           <p className="font-body text-brand-muted mt-3">
//             Getting your tires has never been easier
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-0">
//           {steps.map((step, i) => (
//             <div
//               key={step.num}
//               className="relative flex flex-col items-center text-center px-4"
//             >
//               {/* Connector line (desktop) */}
//               {i < steps.length - 1 && (
//                 <div className="hidden md:block absolute top-7 left-[calc(50%+32px)] right-0 h-px bg-brand-gray" />
//               )}

//               {/* Number circle */}
//               <div className="relative z-10 w-14 h-14 border-2 border-brand-red flex items-center justify-center mb-6 bg-brand-charcoal">
//                 <span className="font-display font-black text-xl text-brand-red">
//                   {step.num}
//                 </span>
//               </div>

//               <h3 className="font-display font-bold text-xl text-white uppercase tracking-wide mb-3">
//                 {step.title}
//               </h3>
//               <p className="font-body text-sm text-brand-muted leading-relaxed">
//                 {step.desc}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(window.innerWidth); // safe here
  }, []);

  const steps = [
    {
      title: "Find the right tire",
      desc: "Search by tire size, brand, or type. Filter our real inventory to find the perfect tires. add to cart with one click.",
      img: "/img1.png",
    },
    {
      title: "Fill out your order",
      desc: "At checkout, provide your shipping information and select your preferred delivery options.",
      img: "/img2.png",
    },
    {
      title: "Receive Delivery",
      desc: "Get your tires delivered to your location — fast, easy, and at unbeatable prices.",
      img: "/img3.png",
    },
  ];
  return (
    <section
      className="bg-brand-charcoal py-20 border-t border-brand-gray"
      id="how-it-works"
    >
      <div className="mb-16 text-center">
        <p className="font-display text-lg text-brand-red tracking-widest uppercase mb-2 ">
          How It Works
        </p>
        <h2 className="font-mono text-4xl sm:text-5xl text-white uppercase tracking-tight">
          Order Online, We <span className="text-brand-red">Deliver</span> To
          You
        </h2>
        <p className="font-body text-brand-muted mt-3">
          Getting your tires has never been easier
        </p>
      </div>
      <div className="flex flex-col sm:flex-row justify-center items-center relative">
        {steps.map((step, i) => (
          <div
            key={i}
            onClick={() => setActiveIndex(i)}
            style={{
              width:
                width >= 640 ? (i === activeIndex ? "450px" : "200px") : "80%", // sm breakpoint
              height:
                width < 640 ? (i === activeIndex ? "400px" : "200px") : "384px",
              transition: "width 0.5s ease-in-out, height 0.5s ease-in-out",
            }}
            className="relative cursor-pointer z-10"
          >
            <Image
              src={step.img}
              alt={step.title}
              fill
              sizes="(max-width: 639px) 80vw, (max-width: 1024px) 450px, 450px"
              className={`object-cover w-full h-full rounded-lg ${i !== activeIndex ? "brightness-50" : ""}`}
            />

            {i === activeIndex && (
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-bold text-lg">{step.title}</h3>
                <p className="text-sm">{step.desc}</p>
              </div>
            )}

            {i !== activeIndex && (
              <span className="absolute sm:left-1 left-5 top-1/2 -translate-y-1/2 text-white text-lg sm:rotate-90">
                {step.title}
              </span>
            )}

            <div
              className={`absolute top-2 left-2 w-6 h-6 rounded-full flex items-center justify-center bg-brand-red   text-black font-bold text-sm`}
            >
              {i + 1}
            </div>
          </div>
        ))}
      </div>

      {/* Dot Pagination
      <div className="flex justify-center mt-4 gap-2">
        {steps.map((_, i) => (
          <span
            key={i}
            className={`w-3 h-3 rounded-full ${i === activeIndex ? "bg-brand-red" : "bg-gray-400"}`}
          />
        ))}
      </div> */}
    </section>
  );
}
