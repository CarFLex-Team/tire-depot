import useSWR from "swr";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Modal from "../Modals/Modal";
import { CarIcon } from "lucide-react";
import allMakes from "@/public/allMakes.json";
import Image from "next/image";
import { Combobox } from "./ComboBox";
import AddAddressForm from "./AddAddressForm";
import { getAddresses } from "@/lib/api/addresses";
import { useQuery } from "@tanstack/react-query";
const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .catch((err) => console.error(err));

export default function VehicleDetailsForm({
  user,
}: {
  user: { id: string } | null;
}) {
  const [models, setModels] = useState<{ slug: string; name: string }[]>([]);
  const makes = allMakes.data;
  const [trims, setTrims] = useState<
    { trim: string; trim_levels: string[]; slug: string }[]
  >([]);
  const [tireSizes, setTireSizes] = useState<
    {
      front: {
        tire_width: number;
        tire_aspect_ratio: number;
        rim_diameter: number;
        load_index: number;
        speed_index: string;
      };
    }[]
  >([]);
  const [width, setWidth] = useState<string>("");
  const [ratio, setRatio] = useState<string>("");
  const [diameter, setDiameter] = useState<string>("");
  const [addrOpen, setAddrOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [trim, setTrim] = useState("");
  const selectClass =
    "bg-brand-charcoal border border-brand-mid text-brand-light w-full text-sm font-body px-4 py-2 pr-8 disabled:opacity-50 disabled:cursor-not-allowed  focus:outline-none focus:border-brand-red transition-colors cursor-pointer rounded-full";
  const router = useRouter();
  const years = Array.from({ length: 26 }, (_, i) => 2025 - i);
  useEffect(() => {
    if (year && make && model && (trim || trims.length === 0)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [year, make, model, trim, trims]);

  // console.log("makesData", makesData);
  const { data: modelsData } = useSWR(
    year && make
      ? `https://api.wheel-size.com/v2/models/?region=usdm&year=${year}&make=${make}&user_key=ebd58e75b66bd581a349aa5d45e21f10`
      : null,
    fetcher,
  );
  useEffect(() => {
    if (modelsData) setModels(modelsData.data);
  }, [modelsData]);

  const { data: trimsData, isLoading: isTrimsLoading } = useSWR(
    year && make && model
      ? `https://api.wheel-size.com/v2/modifications/?region=usdm&year=${year}&make=${make}&model=${model}&user_key=ebd58e75b66bd581a349aa5d45e21f10`
      : null,
    fetcher,
  );
  const { data: addresses = [], isLoading: addrLoading } = useQuery({
    queryKey: ["addresses", user?.id],
    queryFn: () => getAddresses(user?.id || ""),
    enabled: !!user?.id,
  });
  useEffect(() => {
    console.log("trimsData", trimsData);
    if (trimsData) setTrims(trimsData.data);
  }, [trimsData]);
  const handleSubmit = async () => {
    if (!year || !make || !model || (!trim && trims.length === 0)) return;
    setIsLoading(true);

    const res = await fetch(
      `https://api.wheel-size.com/v2/search/by_model/?region=usdm&year=${year}&make=${make}&model=${model}&modification=${trim}&user_key=ebd58e75b66bd581a349aa5d45e21f10`,
    );
    const data = await res.json();

    if (data.data && data.data.length > 0) {
      setTireSizes(data.data[0].wheels);
      setIsModalOpen(true);
    } else {
      setTireSizes([]);
      setIsModalOpen(true);
    }
    setIsLoading(false);
  };
  function groupByDiameter(
    sizes: {
      front: {
        rim_diameter: number;
        tire_width: number;
        tire_aspect_ratio: number;
        load_index: number;
        speed_index: string;
      };
    }[],
  ) {
    const map = new Map<
      number,
      {
        front: {
          rim_diameter: number;
          tire_width: number;
          tire_aspect_ratio: number;
          load_index: number;
          speed_index: string;
        };
      }[]
    >();

    for (const size of sizes) {
      const { tire_width, tire_aspect_ratio, rim_diameter } = size.front;
      if (!tire_width || !tire_aspect_ratio || !rim_diameter) continue;

      const sizeKey = `${tire_width}-${tire_aspect_ratio}-${rim_diameter}`;
      const existing = map.get(rim_diameter) || [];

      const alreadyHas = existing.some(
        (s) =>
          `${s.front.tire_width}-${s.front.tire_aspect_ratio}-${s.front.rim_diameter}` ===
          sizeKey,
      );

      if (!alreadyHas) {
        map.set(rim_diameter, [...existing, size]);
      }
    }

    return Array.from(map.entries())
      .sort((a, b) => Number(a[0]) - Number(b[0]))
      .map(([diameter, sizes]) => ({ diameter, sizes }));
  }
  return (
    <>
      <Modal isOpen={addrOpen} onClose={() => {}}>
        <AddAddressForm
          title="Add Address to Search"
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
                  diameter +
                  "&zip=" +
                  addresses[0].postal_code,
              );
            }
          }}
        />
      </Modal>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="rounded-3xl rounded-r-none bg-brand-red p-8 text-white">
            <CarIcon className="mb-4 md:mb-6 h-20 w-auto text-white/90" />

            <h2 className="mb-5 md:mb-8 md:text-3xl font-bold leading-tight">
              We found multiple tire sizes for your {year} {make.toUpperCase()}{" "}
              {model.toUpperCase()}{" "}
              {trims.find((t) => t.slug === trim)?.trim || ""}
            </h2>

            {!isLoading && tireSizes?.length > 0 ? (
              <>
                <div className="flex flex-col gap-4">
                  {groupByDiameter(tireSizes).map(({ diameter, sizes }) => (
                    <div key={diameter} className="flex items-start gap-4">
                      <span className="w-6 md:w-10 shrink-0 pt-3 text-xl md:text-2xl font-extrabold">
                        {diameter}&quot;
                      </span>
                      <span className="mt-3 h-8 w-px shrink-0 bg-white/30" />
                      <div className="flex flex-1 flex-wrap gap-2">
                        {sizes.map((size, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              setIsModalOpen(false);
                              setWidth(size.front.tire_width.toString());
                              setRatio(size.front.tire_aspect_ratio.toString());
                              setDiameter(size.front.rim_diameter.toString());
                              if (!user) {
                                router.push("/login");
                                return;
                              }
                              if (user && addresses.length === 0) {
                                setAddrOpen(true);
                                return;
                              }
                              router.push(
                                `/tires?width=${size.front.tire_width}&ratio=${size.front.tire_aspect_ratio}&diameter=${size.front.rim_diameter}`,
                              );
                            }}
                            className="rounded-full border-2 border-white/40 px-3 py-2  md:text-lg font-semibold transition-colors hover:bg-white/10"
                          >
                            {size.front.tire_width}/
                            {size.front.tire_aspect_ratio}R
                            {size.front.rim_diameter}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="rounded-xl border border-dashed border-white/40 p-6 text-center">
                <p className="text-white/80">No Tire Sizes Found</p>
              </div>
            )}
            <a
              onClick={() => {
                setShowHelp(true);
              }}
              className="mt-8 inline-block text-sm underline cursor-pointer"
            >
              How do I find my tire size?
            </a>
          </div>
        </Modal>
      )}
      {showHelp && (
        <Modal
          width="max-w-xs"
          isOpen={showHelp}
          onClose={() => setShowHelp(false)}
        >
          <div className="flex flex-col items-center gap-4 p-6">
            <p className="text-brand-light  font-body mb-2">
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
              Look on the outer edge, near the rim — it reads like 225/40R18.
            </p>
          </div>
        </Modal>
      )}
      <form
        className="flex flex-col md:flex-row items-center gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (disabled) return;
          handleSubmit();
        }}
      >
        <Combobox
          placeholder="Select Year"
          options={years.map((year) => ({
            label: year.toString(),
            value: year.toString(),
          }))}
          value={year}
          onChange={(value) => {
            setYear(value);
            setMake("");
            setModel("");
            setTrim("");
          }}
          required
        />
        <Combobox
          placeholder="Select Make"
          options={makes.map((make) => ({
            label: make.name,
            value: make.slug,
          }))}
          value={make}
          onChange={(value) => {
            setMake(value);
            setModel("");
            setTrim("");
          }}
          disabled={!year}
          required
        />
        <Combobox
          placeholder="Select Model"
          options={models.map((model) => ({
            label: model.name,
            value: model.slug,
          }))}
          value={model}
          onChange={(value) => {
            setModel(value);
            setTrim("");
          }}
          disabled={!year || !make || models.length === 0}
          required
        />
        {/* <select
          className={selectClass}
          value={trim}
          onChange={(e) => {
            setTrim(e.target.value);
            // setCarId(trims.find((t) => t.trim_id === e.target.value)?.id || "");
          }}
          disabled={!year || !make || !model || trims.length === 0}
          required={trims.length > 0}
        >
          <option value="" disabled>
            Select Trim
          </option>
          {trims.length === 0 ? (
            <option disabled> No trims available </option>
          ) : (
            trims
              ?.sort((a, b) => a.trim.localeCompare(b.trim))
              .map((trim) =>
                trim.trim_levels.length === 0 ? (
                  <option key={trim.trim} value={trim.slug}>
                    {trim.trim}
                  </option>
                ) : (
                  trim.trim_levels.map((level) => (
                    <option key={trim.trim + "-" + level} value={trim.slug}>
                      {trim.trim} - {level}
                    </option>
                  ))
                ),
              )
          )}
        </select> */}
        <Combobox
          placeholder="Select Trim"
          options={trims.flatMap((trim) => {
            if (trim.trim_levels.length === 0) {
              return [{ label: trim.trim, value: trim.slug }];
            }
            return trim.trim_levels.map((level) => ({
              label: `${trim.trim} - ${level}`,
              value: trim.slug,
            }));
          })}
          value={trim}
          onChange={(value) => {
            setTrim(value);
          }}
          disabled={!year || !make || !model || trims.length === 0}
          required={trims.length > 0}
        />
        <button
          type="submit"
          className="bg-brand-red border border-brand-mid text-brand-light w-full font-body px-4 py-2  disabled:bg-brand-charcoal disabled:opacity-50 disabled:cursor-not-allowed  hover:bg-brand-red/90 transition-colors cursor-pointer rounded-full"
          disabled={disabled || isLoading || isTrimsLoading}
        >
          {isLoading ? "Loading..." : "Search"}
        </button>
      </form>
    </>
  );
}
