"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import TireDetailSection from "@/components/TireDetailsSection";
import { getTireById } from "@/lib/api/tires";
import { useQuery } from "@tanstack/react-query";

export default function TireDetailPage() {
  const { tireId } = useParams<{ tireId: string }>();

  const router = useRouter();

  const {
    data: tire,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tire", tireId],
    queryFn: () => getTireById(tireId),
  });
  return (
    <TireDetailSection
      tire={tire ?? null}
      loading={isLoading}
      error={!!error}
      onBack={() => router.back()}
    />
  );
}
