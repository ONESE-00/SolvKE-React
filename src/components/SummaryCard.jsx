import { Card, CardContent } from "./ui/Card";

const accentClasses = {
  primary: "bg-primary text-white",
  secondary: "bg-secondary text-white",
  slate: "bg-slate-900 text-white",
  emerald: "bg-emerald-500 text-white",
};

export function SummaryCard({ label, value, meta, accent = "primary" }) {
  return (
    <Card className={`${accentClasses[accent]} min-h-[190px] border-0`}>
      <CardContent className="flex min-h-[190px] flex-col justify-between p-6 sm:p-7">
        <p className="text-xs uppercase tracking-[0.32em] text-white/70">{label}</p>
        <div>
          <h3 className="mt-8 font-display text-3xl font-bold">{value}</h3>
          <p className="mt-3 text-sm text-white/80">{meta}</p>
        </div>
      </CardContent>
    </Card>
  );
}
