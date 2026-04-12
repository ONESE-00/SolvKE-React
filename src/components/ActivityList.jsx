import { Card, CardContent } from "./ui/Card";

export function ActivityList({ items }) {
  return (
    <Card className="glass-panel">
      <CardContent className="space-y-4 p-6 sm:p-7">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-start justify-between gap-4 rounded-2xl border border-slate-100 bg-white/80 px-4 py-4"
          >
            <div>
              <p className="font-semibold text-slate-900">{item.title}</p>
              <p className="mt-1 text-sm text-slate-500">{item.time}</p>
            </div>
            <div className="text-right">
              <p
                className={`font-semibold ${
                  item.direction === "debit" ? "text-rose-600" : "text-emerald-600"
                }`}
              >
                {item.direction === "debit" ? "-" : "+"}KES{" "}
                {item.amount.toLocaleString()}
              </p>
              <p className="mt-1 text-sm text-slate-500">{item.category}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
