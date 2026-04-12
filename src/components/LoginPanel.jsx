import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/Button";
import { Card, CardContent } from "./ui/Card";
import { Field } from "./ui/Field";

const demoHighlights = [
  "Real-time account overview",
  "Quick transfers and bill pay",
  "Card controls and spending insights",
];

export function LoginPanel({ onLogin }) {
  const [form, setForm] = useState({
    accountNumber: "1030048291",
    password: "Secure@123",
  });
  const [submitting, setSubmitting] = useState(false);

  const updateField = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      await onLogin(form);
    } catch (submitError) {
      toast.error(submitError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <Card className="overflow-hidden border-0 bg-slate-950 text-white">
        <div className="absolute inset-0 bg-grid bg-[size:32px_32px] opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,102,29,0.2),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_24%)]" />
        <div className="relative p-6 sm:p-7">
          <p className="font-display text-xs uppercase tracking-[0.4em] text-secondary">
            Digital branch
          </p>
          <h2 className="mt-4 max-w-lg font-display text-4xl font-bold leading-tight sm:text-5xl">
            Move money, protect cards, and manage your account from one screen.
          </h2>
          <p className="mt-4 max-w-xl text-slate-300">
            A modern internet banking workspace with a strong urban-tech visual
            system and focused everyday account actions.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {demoHighlights.map((item, index) => (
              <div
                key={item}
                className="rise-in rounded-3xl border border-white/10 bg-white/5 p-4"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <p className="text-sm font-semibold text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card className="glass-panel">
        <CardContent className="p-6 sm:p-7">
          <div className="mb-8">
            <p className="font-display text-xs uppercase tracking-[0.35em] text-secondary">
              Sign in
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-primary">
              Access your online banking
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Demo credentials are prefilled. Update them if you want to test the
              validation flow.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <Field
              name="accountNumber"
              label="Account number"
              value={form.accountNumber}
              onChange={(event) => updateField("accountNumber", event.target.value)}
              placeholder="Enter account number"
            />
            <Field
              name="password"
              label="Password"
              type="password"
              value={form.password}
              onChange={(event) => updateField("password", event.target.value)}
              placeholder="Enter password"
            />

            <Button type="submit" className="w-full" loading={submitting}>
              {submitting ? "Authenticating" : "Log in to dashboard"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
