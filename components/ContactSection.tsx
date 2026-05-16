import { ArrowRight } from "lucide-react";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="bg-brand-charcoal py-20 border-t border-brand-gray"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <p className="font-display text-lg text-brand-red tracking-widest uppercase mb-2 ">
            Pickup Location
          </p>
          <h2 className="font-mono text-4xl sm:text-5xl text-white uppercase tracking-tight">
            Visit Tire Depot
          </h2>
          <p className="font-body text-brand-muted mt-2">
            Order online and pick up your tires here
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info cards */}
          <div className="flex flex-col gap-4">
            <div className="border border-brand-gray p-6">
              <p className="font-display text-sm text-brand-red tracking-widest uppercase mb-2 ">
                Pickup Location
              </p>
              <p className="font-body text-white leading-relaxed">
                5386 Pleasant View Rd
                <br />
                Memphis, TN 38134
              </p>
              <a
                href="https://maps.app.goo.gl/d8Kbg1n3MqMF2i7o6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:gap-3 mt-4 font-mono text-xs text-brand-red hover:text-white transition-all uppercase tracking-widest "
              >
                Get Directions <ArrowRight size={12} />
              </a>
            </div>

            <div className="border border-brand-gray p-6">
              <p className="font-display text-sm text-brand-red tracking-widest uppercase mb-2 ">
                Phone
              </p>
              <a
                href="tel:9017794183"
                className="font-display font-bold text-2xl text-white hover:text-brand-red transition-colors"
              >
                (901) 779-4183
              </a>
            </div>

            <div className="border border-brand-gray p-6">
              <p className="font-display text-sm text-brand-red tracking-widest uppercase mb-2 ">
                Hours
              </p>
              <div className="flex flex-col gap-2">
                {[
                  { day: "Mon - Fri", hours: "8:00 AM - 6:00 PM" },
                  { day: "Saturday", hours: "9:00 AM - 6:00 PM" },
                  { day: "Sunday", hours: "10:00 AM - 5:00 PM" },
                ].map((h) => (
                  <div key={h.day} className="flex justify-between">
                    <span className="font-body text-sm text-brand-muted">
                      {h.day}
                    </span>
                    <span className="font-display font-bold text-sm text-white">
                      {h.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 border border-brand-gray overflow-hidden min-h-64">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3260.4!2d-89.8753!3d35.1736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDEwJzI1LjAiTiA4OcKwNTInMzEuMSJX!5e0!3m2!1sen!2sus!4v1600000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{
                border: 0,
                minHeight: "320px",
                filter: " invert(10%) opacity(80%)",
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Tire Depot Location"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
