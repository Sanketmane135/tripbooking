"use client";

import { Suspense } from "react";
import PageBooking from "./pageBoking";

export default function PageWrapper() {
  return (
    <Suspense fallback={<div>Loading booking...</div>}>
      <PageBooking/>
    </Suspense>
  );
}
