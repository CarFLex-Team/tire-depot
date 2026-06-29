"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Tire } from "@/lib/tires";
import TireDetailSection from "@/components/TireDetailsSection";

export default function TireDetailPage() {
  const { tireId } = useParams<{ tireId: string }>();

  const router = useRouter();
  const [tire, setTire] = useState<Tire | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchTire() {
      try {
        const res = await fetch(`/api/tires/${tireId}`, { cache: "no-store" });
        // console.log("fetchTire response:", res);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        console.log("fetchTire data:", data);
        const t = data.tire;
        setTire({
          ...t,
          speedRating: t.speed_rating === null ? "other" : t.speed_rating,
          supplierItemNo: t.supplier_item_no,
          LoadIndex: t.load_index === null ? "other" : t.load_index,
          imageUrl: t.image_url,
          inStock: t.in_stock,
          class: t.tire_class,
          diameter: parseInt(t.rim_diameter),
          price: parseFloat(t.public_price),
          aspectRatio: parseInt(t.aspect_ratio),
        } as Tire);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    if (tireId) fetchTire();
  }, [tireId]);

  return (
    <TireDetailSection
      tire={tire}
      loading={loading}
      error={error}
      onBack={() => router.back()}
    />
  );
}
