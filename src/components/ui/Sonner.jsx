import { Toaster } from "sonner";

export function Sonner() {
  return (
    <Toaster
      position="top-center"
      richColors
      toastOptions={{
        classNames: {
          toast: "font-body",
          title: "font-semibold",
          description: "text-sm",
        },
      }}
    />
  );
}
