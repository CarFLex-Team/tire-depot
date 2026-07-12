import useSWR from "swr";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Modal from "../Modals/Modal";
import AddAddressForm from "./AddAddressForm";
import { useQuery } from "@tanstack/react-query";
import { getAddresses } from "@/lib/api/addresses";

export default function TireSizeForm({
  user,
}: {
  user: { id: string } | null;
}) {
  const [width, setWidth] = useState<string>("");
  const [ratio, setRatio] = useState<string>("");
  const [diameter, setDiameter] = useState<string>("");
  const [showHelp, setShowHelp] = useState(false);
  const [addrOpen, setAddrOpen] = useState(false);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [disabled, setDisabled] = useState(true);
  const { data: addresses = [], isLoading: addrLoading } = useQuery({
    queryKey: ["addresses", user?.id],
    queryFn: () => getAddresses(user?.id || ""),
    enabled: !!user?.id,
  });
  useEffect(() => {
    if (width && ratio && diameter) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [width, ratio, diameter]);
  const selectClass =
    "bg-brand-charcoal border border-brand-mid text-brand-light text-center w-full text-sm md:text-lg font-body  py-1  disabled:opacity-50 disabled:cursor-not-allowed  focus:outline-none focus:border-brand-red transition-colors placeholder:text-brand-muted  rounded-full";
  const router = useRouter();

  const openHelp = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setShowHelp(true);
  };
  const closeHelp = () => {
    hoverTimeout.current = setTimeout(() => setShowHelp(false), 150);
  };

  return (
    <>
      <Modal isOpen={addrOpen} onClose={() => {}}>
        <AddAddressForm
          onClose={() => setAddrOpen(false)}
          userId={user?.id}
          noClose={true}
          onSubmit={() => {
            if (width && ratio && diameter) {
              router.push(
                "/tires?width=" +
                  width +
                  "&ratio=" +
                  ratio +
                  "&diameter=" +
                  diameter,
              );
            }
          }}
        />
      </Modal>
      <form
        className="flex flex-col md:flex-row items-end justify-between gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (disabled) return;
          if (user && addresses.length === 0) {
            setAddrOpen(true);
            return;
          }
          if (width && ratio && diameter) {
            router.push(
              "/tires?width=" +
                width +
                "&ratio=" +
                ratio +
                "&diameter=" +
                diameter,
            );
          }
        }}
      >
        <div className="flex items-end gap-2 relative">
          <div className="flex flex-col gap-1 max-md:w-full">
            <p className="text-brand-muted text-xs ">Width </p>
            <input
              className={selectClass}
              value={width}
              placeholder="205"
              onChange={(e) => {
                setWidth(e.target.value);
              }}
              required
            />
          </div>
          <p className="text-brand-light text-lg ">/</p>
          <div className="flex flex-col gap-1 max-md:w-full">
            <p className="text-brand-muted text-xs ">
              <span className="hidden sm:inline">Aspect</span> Ratio{" "}
            </p>
            <input
              className={selectClass}
              value={ratio}
              placeholder="75"
              onChange={(e) => {
                setRatio(e.target.value);
              }}
              required
            />
          </div>
          <p className="text-brand-light  md:text-lg ">/</p>
          <div className="flex flex-col gap-1 max-md:w-full">
            <p className="text-brand-muted text-xs ">Diameter </p>
            <input
              className={selectClass}
              value={diameter}
              placeholder="15"
              onChange={(e) => {
                setDiameter(e.target.value);
              }}
              required
            />
          </div>

          <div
            className="relative"
            onMouseEnter={openHelp}
            onMouseLeave={closeHelp}
          >
            <button
              type="button"
              aria-label="Where do I find my tire size?"
              onClick={() => setShowHelp((s) => !s)}
              className="w-6 h-6 md:mb-2 flex items-center justify-center rounded-full border border-brand-mid text-brand-light text-xs hover:border-brand-red hover:text-brand-red transition-colors cursor-pointer"
            >
              i
            </button>

            {showHelp && (
              <div
                onMouseEnter={openHelp}
                onMouseLeave={closeHelp}
                className="absolute z-50 left-1/2 -translate-x-1/2 top-full mt-2 w-72 bg-brand-charcoal border border-brand-mid rounded-2xl p-4 shadow-xl"
              >
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-brand-charcoal border-t border-l border-brand-mid rotate-45" />
                <p className="text-brand-light text-sm font-body mb-2">
                  Find this code on your tire&apos;s sidewall
                </p>
                <Image
                  src="/tire-side.png"
                  alt="Diagram of a tire sidewall showing where the width, aspect ratio, and wheel diameter numbers are printed"
                  className="w-full h-auto mb-2"
                  width={300}
                  height={200}
                />
                <p className="text-brand-light/70 text-xs font-body">
                  Look on the outer edge, near the rim — it reads like
                  225/40R18.
                </p>
              </div>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="bg-brand-red border border-brand-mid text-brand-light  font-body px-4 py-2 max-md:w-full disabled:bg-brand-charcoal disabled:opacity-50 disabled:cursor-not-allowed  hover:bg-brand-red/90 transition-colors cursor-pointer rounded-full"
          disabled={disabled}
        >
          Search
        </button>
      </form>
    </>
  );
}
