"use client";
import { useCart } from "@/lib/cart";
import { Tire } from "@/lib/api/tires";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCartUiStore } from "@/lib/store/cart-ui";
import LoadingSpinner from "../UI/LoadingSpinner";
export default function TireCard({
  tire,
  userId,
}: {
  tire: Tire;
  userId: string;
}) {
  const router = useRouter();
  const { addItemAsync, isUpdating, isLoading } = useCart(userId);
  const { openCart } = useCartUiStore();
  const [added, setAdded] = useState(false);

  const handleAdd = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    try {
      await addItemAsync(tire, 1);
      openCart();

      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    } catch (error) {
      console.error("Unable to add tire to cart", error);
    }
  };
  return (
    <div
      className="tire-card bg-brand-charcoal border border-brand-gray hover:border-brand-mid p-5 flex flex-col sm:flex-row gap-4 rounded-2xl cursor-pointer transition-all "
      onClick={() => {
        router.push(`/tires/${tire.id}`);
      }}
    >
      {/* Tire icon visual */}
      <div className="flex items-center justify-center h-1/3 w-full sm:h-64 sm:w-1/3  bg-white border border-brand-gray">
        {tire.imageUrl?.endsWith(".png") || tire.imageUrl?.endsWith(".jpg") ? (
          <Image
            src={tire.imageUrl}
            alt="Tire Icon"
            width={256}
            height={256}
            className={`object-contain h-full ${tire.imageUrl?.endsWith(".png") ? "hover:scale-110 transition-transform" : ""}`}
          />
        ) : (
          <Image
            src={"/logo.png"}
            alt="Tire Icon"
            width={120}
            height={120}
            className="object-contain h-full"
          />
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2 flex-1 justify-between">
        <div className="flex items-start justify-between gap-2 ">
          <div>
            <p className="font-display text-3xl text-brand-red uppercase ">
              {tire.brand}
            </p>
            <h3 className="font-display font-semibold text-lg text-brand-muted leading-tight">
              {tire.model}
            </h3>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="font-display font-semibold text-xl text-brand-light tracking-wider">
            {tire.size} {tire.LoadIndex ? `${tire.LoadIndex}` : ""}
            {tire.speedRating ? `${tire.speedRating}` : ""}
          </p>
          <div
            className={`flex items-center gap-1 text-xs font-display font-semibold ${tire.inStock ? "text-green-400" : "text-red-400"} whitespace-nowrap shrink-0`}
          >
            <div
              className={`w-1.5 h-1.5 rounded-full ${tire.inStock ? "bg-green-400" : "bg-red-400"}`}
            />
            {tire.inStock ? "In Stock" : "Out of Stock"}
          </div>
        </div>
        <div className="border-brand-gray border-t pt-4  flex items-center gap-1">
          <span className="font-display font-semibold text-4xl text-white">
            ${Number(tire.displayPrice).toFixed(2).toLocaleString()}
          </span>
          <span className="font-display text-sm text-brand-muted ml-1">
            /tire
          </span>
        </div>
        <div className="border-brand-gray border-t pt-4 flex flex-col  gap-1">
          {tire.terrain && (
            <div className="flex justify-between">
              <p className="font-display  text-lg text-white ">Category:</p>
              <p className="font-display  text-base text-brand-muted ">
                {tire.terrain}
              </p>
            </div>
          )}
          <div className="flex justify-between">
            <p className="font-display  text-lg text-white ">Vehicle:</p>
            <p className="font-display  text-base text-brand-muted ">
              {tire.class}
            </p>
          </div>
        </div>

        <div className="flex  justify-between  pt-4 border-t border-brand-gray">
          <button>{/* Specs button */}</button>
          <button
            onClick={tire.inStock ? handleAdd : undefined}
            disabled={isUpdating || !tire.inStock}
            className={`w-32 py-2 font-display font-bold text-sm uppercase tracking-widest transition-all rounded-full ${
              added
                ? "bg-green-500 text-white"
                : tire.inStock
                  ? "bg-brand-red hover:bg-brand-red/90 text-white"
                  : "bg-brand-gray text-brand-muted cursor-not-allowed"
            }`}
          >
            {isUpdating ? (
              <div className="flex items-center justify-center gap-2">
                <LoadingSpinner />
              </div>
            ) : added ? (
              "✓ Added!"
            ) : tire.inStock ? (
              "Add to Cart"
            ) : (
              "Out of Stock"
            )}
          </button>
        </div>
      </div>

      {/* <button
        onClick={handleAdd}
        className={`w-full py-2.5 font-display font-bold text-sm uppercase tracking-widest transition-all rounded-full ${
          added
            ? "bg-green-500 text-white"
            : "bg-brand-red hover:bg-brand-red/90 text-white"
        }`}
      >
        {added ? "✓ Added!" : "Add to Cart"}
      </button> */}
    </div>
  );
}
