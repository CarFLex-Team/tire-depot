import { Phone, ShoppingCart } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="bg-brand-red h-[80vh] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-between gap-6">
        <div>
          <h2 className="font-mono text-center text-4xl sm:text-5xl text-white uppercase tracking-tight">
            Ready to Roll?
          </h2>
          <p className="font-body text-white/80 mt-6 text-lg">
            Shop our full inventory online and pick up at our Memphis location
            today.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href="#shop"
            className="inline-flex items-center gap-2 bg-white text-brand-red px-8 py-4 
            font-display font-bold uppercase tracking-widest
            hover:bg-brand-light transition-colors rounded-full"
          >
            <ShoppingCart /> Shop Tires Online
          </a>
          <a
            href="tel:9017794183"
            className="inline-flex items-center gap-2 bg-transparent border-2 border-white/50
             text-white px-8 py-4 font-display font-bold uppercase tracking-widest hover:bg-white/10
              hover:border-white transition-colors rounded-full"
          >
            <Phone /> (901) 779-4183
          </a>
        </div>
      </div>
    </section>
  );
}
