import * as React from "react";

import { cn } from "../lib/utils";

function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[30px] border border-slate-100 bg-card text-card-foreground shadow-panel",
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }) {
  return <div className={cn("flex flex-col space-y-1.5 p-6 sm:p-7", className)} {...props} />;
}

function CardTitle({ className, ...props }) {
  return <h3 className={cn("font-display text-2xl font-bold text-primary", className)} {...props} />;
}

function CardDescription({ className, ...props }) {
  return <p className={cn("text-sm text-slate-600", className)} {...props} />;
}

function CardContent({ className, ...props }) {
  return <div className={cn("p-6 pt-0 sm:p-7 sm:pt-0", className)} {...props} />;
}

function CardFooter({ className, ...props }) {
  return <div className={cn("flex items-center p-6 pt-0 sm:p-7 sm:pt-0", className)} {...props} />;
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
