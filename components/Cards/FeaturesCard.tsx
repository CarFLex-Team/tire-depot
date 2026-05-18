export default function FeaturesCard({
  feature,
}: {
  feature: { icon: React.ReactNode; title: string; desc: string };
}) {
  return (
    <div className=" p-4 hover:border-brand-red/30 transition-colors flex items-center gap-3">
      <div className=" bg-brand-red/20 p-2 rounded-xl flex items-center justify-center text-brand-red">
        {feature.icon}
      </div>
      <div>
        <h4 className="font-body font-bold text-sm uppercase tracking-wide text-white mb-1">
          {feature.title}
        </h4>
        <p className="font-body text-xs text-brand-muted leading-relaxed">
          {feature.desc}
        </p>
      </div>
    </div>
  );
}
