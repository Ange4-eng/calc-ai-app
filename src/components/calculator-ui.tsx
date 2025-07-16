"use client";

import { Calculator } from "@/components/calculator";
import { RightPanel } from "@/components/right-panel";
import { Separator } from "@/components/ui/separator";

export function CalculatorUI() {
  return (
      <div className="flex w-full flex-col lg:flex-row lg:gap-6 h-full">
        <div className="flex flex-1 items-center justify-center lg:w-3/5">
          <Calculator />
        </div>
        <Separator orientation="vertical" className="mx-4 hidden lg:block" />
        <div className="w-full shrink-0 overflow-y-auto pt-6 lg:w-2/5 lg:pt-0">
          <RightPanel />
        </div>
      </div>
  );
}
