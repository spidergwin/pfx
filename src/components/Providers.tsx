"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProgressBar
        height="3px"
        color="#ED3C52"
        options={{ showSpinner: false }}
        shallowRouting
      />
      {children}
    </>
  );
}
