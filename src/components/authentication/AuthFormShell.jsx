import { Link } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

export default function AuthFormShell({
  eyebrow = "Secure Access",
  title,
  description,
  footer,
  children,
}) {
  return (
    <Card className="glass-panel rise-in w-full max-w-md border-white/70 shadow-panel">
      <CardHeader className="space-y-4">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
          <span className="h-2 w-2 rounded-full bg-secondary" />
          {eyebrow}
        </div>

        <div className="space-y-2">
          <CardTitle className="text-3xl">{title}</CardTitle>
          <CardDescription className="text-sm leading-6 text-slate-600">
            {description}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {children}

        {footer ? (
          <div className="border-t border-slate-200/80 pt-4 text-center text-sm text-slate-600">
            {footer}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

export function AuthInlineLink({ to, children }) {
  return (
    <Link className="font-semibold text-primary transition-colors hover:text-secondary" to={to}>
      {children}
    </Link>
  );
}
