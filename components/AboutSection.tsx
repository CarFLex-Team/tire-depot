"use client";

import { Clock, Shield, TicketPercent, Users } from "lucide-react";
import StatsCard from "./Cards/StatsCard";
import FeaturesCard from "./Cards/FeaturesCard";

const brands = [
  "ZETA",
  "ROADONE",
  "COSMO",
  "GOODRIDE",
  "MASTERTRACK",
  "FREEDOM",
  "CENTARA",
  "ZEETEX",
  "BLACKHAWK",
  "LIONHART",
  "LIONSPORT",
  "PETLAS",
  "HAIDA",
  "FORTUNE",
];

const features = [
  {
    title: "Quality Guaranteed",
    desc: "Every tire we sell meets our strict quality standards.",
    icon: <Shield size={24} />,
  },
  {
    title: "Best Prices in Memphis",
    desc: "We match or beat any competitor's price, guaranteed.",
    icon: <TicketPercent size={24} />,
  },
  {
    title: "Fast Service",
    desc: "Most orders delivered within 2 days.",
    icon: <Clock size={24} />,
  },
  {
    title: "Expert Team",
    desc: "Our knowledgeable staff is here to help you find the perfect tires.",
    icon: <Users size={24} />,
  },
];

const stats = [
  { value: 7, label: "Days a Week", sign: "" },
  { value: 15, label: "Tire Brands", sign: "+" },
  { value: 100, label: "Satisfaction", sign: "%" },
  { value: 10, label: "Years Experience", sign: "+" },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="bg-brand-dark py-20 border-t border-brand-gray"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2  gap-16 items-center">
          {/* Left */}
          <div className="">
            <p className="font-display text-lg text-brand-red tracking-widest uppercase mb-2">
              Why Tire Depot?
            </p>
            <h2 className="font-mono  text-4xl sm:text-5xl text-white uppercase tracking-tight mb-6">
              AMERICA Trusts
              <span className="text-brand-red"> Tire Depot</span>
            </h2>
            <p className="font-body text-brand-muted leading-relaxed mb-10">
              We&apos;re not just another tire shop. We&apos;re your neighbors
              who happen to be tire experts. With unbeatable prices, fast
              service, and a commitment to quality that keeps our customers
              coming back.
            </p>

            <div className="">
              {features.map((f) => (
                <div key={f.title}>
                  <FeaturesCard feature={f} />
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-wrap gap-4 justify-between h-full ">
            {stats.map((s) => (
              <div
                key={s.label}
                className={` w-full ${s.label === "Satisfaction" ? "md:w-full" : "md:w-[48%]"}`}
              >
                <StatsCard stat={s} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
