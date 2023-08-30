"use client";

import ErrorData from "@/components/Error/ErrorData";

export default function ErrorWrapper({ error }: { error: Error }) {
  return (
    <div className="flex justify-center items-center min-h-[75vh]">
      <ErrorData />
    </div>
  );
}
