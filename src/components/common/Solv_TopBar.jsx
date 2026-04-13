// src/components/common/TopNavigation.tsx

import { Field } from "@/components/ui/Field";

export function Solv_TopBar() {
  return (
    <div className="sticky top-0 z-20 w-full border-b bg-white/80 backdrop-blur">
      <div className="flex items-center justify-center px-6 py-2">
        
        {/* Centered Search */}
        <div className="w-full max-w-xl">
          <Field
            name="search"
            placeholder="Search..."
          />
        </div>

      </div>
    </div>
  );
}