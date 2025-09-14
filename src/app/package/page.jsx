"use client";

import { Suspense } from "react";

import PackageWrapped from "./packagewrap";

export default function PageWrapper() {
  return (
    <Suspense fallback={<div>Loading booking...</div>}>
      <PackageWrapped/>
    </Suspense>
  );
}
