"use client";

import { Suspense } from "react";
import { TopProgressBar } from "@/components/TopProgressBar";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <TopProgressBar />
      </Suspense>
      {children}
    </>
  );
}
