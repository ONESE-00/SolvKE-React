export function SectionTitle({ eyebrow, title, description }) {
  return (
    <div>
      <p className="font-display text-xs uppercase tracking-[0.32em] text-secondary">
        {eyebrow}
      </p>
      <h2 className="mt-2 font-display text-3xl font-bold text-primary">{title}</h2>
      <p className="mt-3 max-w-xl text-sm text-slate-600">{description}</p>
    </div>
  );
}
