import useSWR from "swr";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Modal from "../UI/Modal";
import { CarIcon } from "lucide-react";
import allMakes from "@/public/allMakes.json";
import Image from "next/image";
const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .catch((err) => console.error(err));

export default function VehicleDetailsForm() {
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
  >([
    // {
    //   is_stock: true,
    //   showing_fp_only: true,
    //   is_extra_load_tires: false,
    //   is_high_load_tires: false,
    //   is_recommended_for_winter: false,
    //   is_runflat_tires: false,
    //   is_pressed_steel_rims: false,
    //   front: {
    //     rim: "7.5Jx17 ET44",
    //     rim_diameter: 17.0,
    //     rim_width: 7.5,
    //     rim_offset: 44.0,
    //     tire_full: "245/70R17 110T",
    //     tire: "245/70R17",
    //     load_index: 110,
    //     speed_index: "T",
    //     tire_pressure: null,
    //     tire_sizing_system: "metric",
    //     tire_construction: "R",
    //     tire_width: 245.0,
    //     tire_aspect_ratio: 70.0,
    //     tire_diameter: null,
    //     tire_section_width: null,
    //     tire_is_82series: false,
    //     tire_alpha_numeric: null,
    //     tire_width_mm: 245,
    //     tire_diameter_mm: 775,
    //     tire_weight_kg: 13.85,
    //   },
    //   rear: {
    //     rim: "",
    //     rim_diameter: null,
    //     rim_width: null,
    //     rim_offset: null,
    //     tire_full: "",
    //     tire: "",
    //     load_index: null,
    //     speed_index: null,
    //     tire_pressure: null,
    //     tire_sizing_system: "metric",
    //     tire_construction: "R",
    //     tire_width: null,
    //     tire_aspect_ratio: null,
    //     tire_diameter: null,
    //     tire_section_width: null,
    //     tire_is_82series: false,
    //     tire_alpha_numeric: null,
    //     tire_width_mm: null,
    //     tire_diameter_mm: null,
    //     tire_weight_kg: null,
    //   },
    // },
    // {
    //   is_stock: true,
    //   showing_fp_only: true,
    //   is_extra_load_tires: false,
    //   is_high_load_tires: false,
    //   is_recommended_for_winter: false,
    //   is_runflat_tires: false,
    //   is_pressed_steel_rims: false,
    //   front: {
    //     rim: "7.5Jx18 ET34",
    //     rim_diameter: 18.0,
    //     rim_width: 7.5,
    //     rim_offset: 34.0,
    //     tire_full: "265/60R18 110T",
    //     tire: "265/60R18",
    //     load_index: 110,
    //     speed_index: "T",
    //     tire_pressure: null,
    //     tire_sizing_system: "metric",
    //     tire_construction: "R",
    //     tire_width: 265.0,
    //     tire_aspect_ratio: 60.0,
    //     tire_diameter: null,
    //     tire_section_width: null,
    //     tire_is_82series: false,
    //     tire_alpha_numeric: null,
    //     tire_width_mm: 265,
    //     tire_diameter_mm: 775,
    //     tire_weight_kg: 14.61,
    //   },
    //   rear: {
    //     rim: "",
    //     rim_diameter: null,
    //     rim_width: null,
    //     rim_offset: null,
    //     tire_full: "",
    //     tire: "",
    //     load_index: null,
    //     speed_index: null,
    //     tire_pressure: null,
    //     tire_sizing_system: "metric",
    //     tire_construction: "R",
    //     tire_width: null,
    //     tire_aspect_ratio: null,
    //     tire_diameter: null,
    //     tire_section_width: null,
    //     tire_is_82series: false,
    //     tire_alpha_numeric: null,
    //     tire_width_mm: null,
    //     tire_diameter_mm: null,
    //     tire_weight_kg: null,
    //   },
    // },
    // {
    //   is_stock: true,
    //   showing_fp_only: true,
    //   is_extra_load_tires: false,
    //   is_high_load_tires: false,
    //   is_recommended_for_winter: false,
    //   is_runflat_tires: false,
    //   is_pressed_steel_rims: false,
    //   front: {
    //     rim: "7.5Jx18 ET44",
    //     rim_diameter: 18.0,
    //     rim_width: 7.5,
    //     rim_offset: 44.0,
    //     tire_full: "275/65R18 116T",
    //     tire: "275/65R18",
    //     load_index: 116,
    //     speed_index: "T",
    //     tire_pressure: null,
    //     tire_sizing_system: "metric",
    //     tire_construction: "R",
    //     tire_width: 275.0,
    //     tire_aspect_ratio: 65.0,
    //     tire_diameter: null,
    //     tire_section_width: null,
    //     tire_is_82series: false,
    //     tire_alpha_numeric: null,
    //     tire_width_mm: 275,
    //     tire_diameter_mm: 815,
    //     tire_weight_kg: 16.15,
    //   },
    //   rear: {
    //     rim: "",
    //     rim_diameter: null,
    //     rim_width: null,
    //     rim_offset: null,
    //     tire_full: "",
    //     tire: "",
    //     load_index: null,
    //     speed_index: null,
    //     tire_pressure: null,
    //     tire_sizing_system: "metric",
    //     tire_construction: "R",
    //     tire_width: null,
    //     tire_aspect_ratio: null,
    //     tire_diameter: null,
    //     tire_section_width: null,
    //     tire_is_82series: false,
    //     tire_alpha_numeric: null,
    //     tire_width_mm: null,
    //     tire_diameter_mm: null,
    //     tire_weight_kg: null,
    //   },
    // },
    // {
    //   is_stock: true,
    //   showing_fp_only: true,
    //   is_extra_load_tires: false,
    //   is_high_load_tires: false,
    //   is_recommended_for_winter: false,
    //   is_runflat_tires: false,
    //   is_pressed_steel_rims: false,
    //   front: {
    //     rim: "7.5Jx17 ET44",
    //     rim_diameter: 17.0,
    //     rim_width: 7.5,
    //     rim_offset: 44.0,
    //     tire_full: "265/70R17 115T",
    //     tire: "265/70R17",
    //     load_index: 115,
    //     speed_index: "T",
    //     tire_pressure: null,
    //     tire_sizing_system: "metric",
    //     tire_construction: "R",
    //     tire_width: 265.0,
    //     tire_aspect_ratio: 70.0,
    //     tire_diameter: null,
    //     tire_section_width: null,
    //     tire_is_82series: false,
    //     tire_alpha_numeric: null,
    //     tire_width_mm: 265,
    //     tire_diameter_mm: 803,
    //     tire_weight_kg: 15.5,
    //   },
    //   rear: {
    //     rim: "",
    //     rim_diameter: null,
    //     rim_width: null,
    //     rim_offset: null,
    //     tire_full: "",
    //     tire: "",
    //     load_index: null,
    //     speed_index: null,
    //     tire_pressure: null,
    //     tire_sizing_system: "metric",
    //     tire_construction: "R",
    //     tire_width: null,
    //     tire_aspect_ratio: null,
    //     tire_diameter: null,
    //     tire_section_width: null,
    //     tire_is_82series: false,
    //     tire_alpha_numeric: null,
    //     tire_width_mm: null,
    //     tire_diameter_mm: null,
    //     tire_weight_kg: null,
    //   },
    // },
    // {
    //   is_stock: false,
    //   showing_fp_only: true,
    //   is_extra_load_tires: false,
    //   is_high_load_tires: false,
    //   is_recommended_for_winter: false,
    //   is_runflat_tires: false,
    //   is_pressed_steel_rims: false,
    //   front: {
    //     rim: "7.5Jx17 ET44",
    //     rim_diameter: 17.0,
    //     rim_width: 7.5,
    //     rim_offset: 44.0,
    //     tire_full: "LT265/70R17/C",
    //     tire: "LT265/70R17",
    //     load_index: null,
    //     speed_index: "S",
    //     tire_pressure: null,
    //     tire_sizing_system: "lt-metric",
    //     tire_construction: "R",
    //     tire_width: 265.0,
    //     tire_aspect_ratio: 70.0,
    //     tire_diameter: null,
    //     tire_section_width: null,
    //     tire_is_82series: false,
    //     tire_alpha_numeric: null,
    //     tire_width_mm: 265,
    //     tire_diameter_mm: 803,
    //     tire_weight_kg: 16.05,
    //   },
    //   rear: {
    //     rim: "",
    //     rim_diameter: null,
    //     rim_width: null,
    //     rim_offset: null,
    //     tire_full: "",
    //     tire: "",
    //     load_index: null,
    //     speed_index: null,
    //     tire_pressure: null,
    //     tire_sizing_system: "metric",
    //     tire_construction: "R",
    //     tire_width: null,
    //     tire_aspect_ratio: null,
    //     tire_diameter: null,
    //     tire_section_width: null,
    //     tire_is_82series: false,
    //     tire_alpha_numeric: null,
    //     tire_width_mm: null,
    //     tire_diameter_mm: null,
    //     tire_weight_kg: null,
    //   },
    // },
    // {
    //   is_stock: false,
    //   showing_fp_only: true,
    //   is_extra_load_tires: false,
    //   is_high_load_tires: false,
    //   is_recommended_for_winter: false,
    //   is_runflat_tires: false,
    //   is_pressed_steel_rims: false,
    //   front: {
    //     rim: "8.5Jx20 ET44",
    //     rim_diameter: 20.0,
    //     rim_width: 8.5,
    //     rim_offset: 44.0,
    //     tire_full: "275/60R20 115T",
    //     tire: "275/60R20",
    //     load_index: 115,
    //     speed_index: "T",
    //     tire_pressure: null,
    //     tire_sizing_system: "metric",
    //     tire_construction: "R",
    //     tire_width: 275.0,
    //     tire_aspect_ratio: 60.0,
    //     tire_diameter: null,
    //     tire_section_width: null,
    //     tire_is_82series: false,
    //     tire_alpha_numeric: null,
    //     tire_width_mm: 275,
    //     tire_diameter_mm: 838,
    //     tire_weight_kg: 16.44,
    //   },
    //   rear: {
    //     rim: "",
    //     rim_diameter: null,
    //     rim_width: null,
    //     rim_offset: null,
    //     tire_full: "",
    //     tire: "",
    //     load_index: null,
    //     speed_index: null,
    //     tire_pressure: null,
    //     tire_sizing_system: "metric",
    //     tire_construction: "R",
    //     tire_width: null,
    //     tire_aspect_ratio: null,
    //     tire_diameter: null,
    //     tire_section_width: null,
    //     tire_is_82series: false,
    //     tire_alpha_numeric: null,
    //     tire_width_mm: null,
    //     tire_diameter_mm: null,
    //     tire_weight_kg: null,
    //   },
    // },
    // {
    //   is_stock: false,
    //   showing_fp_only: true,
    //   is_extra_load_tires: false,
    //   is_high_load_tires: false,
    //   is_recommended_for_winter: false,
    //   is_runflat_tires: false,
    //   is_pressed_steel_rims: false,
    //   front: {
    //     rim: "9Jx22 ET44",
    //     rim_diameter: 22.0,
    //     rim_width: 9.0,
    //     rim_offset: 44.0,
    //     tire_full: "275/50R22 115T",
    //     tire: "275/50R22",
    //     load_index: 115,
    //     speed_index: "T",
    //     tire_pressure: null,
    //     tire_sizing_system: "metric",
    //     tire_construction: "R",
    //     tire_width: 275.0,
    //     tire_aspect_ratio: 50.0,
    //     tire_diameter: null,
    //     tire_section_width: null,
    //     tire_is_82series: false,
    //     tire_alpha_numeric: null,
    //     tire_width_mm: 275,
    //     tire_diameter_mm: 834,
    //     tire_weight_kg: 15.95,
    //   },
    //   rear: {
    //     rim: "",
    //     rim_diameter: null,
    //     rim_width: null,
    //     rim_offset: null,
    //     tire_full: "",
    //     tire: "",
    //     load_index: null,
    //     speed_index: null,
    //     tire_pressure: null,
    //     tire_sizing_system: "metric",
    //     tire_construction: "R",
    //     tire_width: null,
    //     tire_aspect_ratio: null,
    //     tire_diameter: null,
    //     tire_section_width: null,
    //     tire_is_82series: false,
    //     tire_alpha_numeric: null,
    //     tire_width_mm: null,
    //     tire_diameter_mm: null,
    //     tire_weight_kg: null,
    //   },
    // },
    // {
    //   is_stock: false,
    //   showing_fp_only: true,
    //   is_extra_load_tires: false,
    //   is_high_load_tires: false,
    //   is_recommended_for_winter: false,
    //   is_runflat_tires: false,
    //   is_pressed_steel_rims: false,
    //   front: {
    //     rim: "8.5Jx18 ET44",
    //     rim_diameter: 18.0,
    //     rim_width: 8.5,
    //     rim_offset: 44.0,
    //     tire_full: "LT265/70R18/C",
    //     tire: "LT265/70R18",
    //     load_index: null,
    //     speed_index: "S",
    //     tire_pressure: null,
    //     tire_sizing_system: "lt-metric",
    //     tire_construction: "R",
    //     tire_width: 265.0,
    //     tire_aspect_ratio: 70.0,
    //     tire_diameter: null,
    //     tire_section_width: null,
    //     tire_is_82series: false,
    //     tire_alpha_numeric: null,
    //     tire_width_mm: 265,
    //     tire_diameter_mm: 828,
    //     tire_weight_kg: 16.59,
    //   },
    //   rear: {
    //     rim: "",
    //     rim_diameter: null,
    //     rim_width: null,
    //     rim_offset: null,
    //     tire_full: "",
    //     tire: "",
    //     load_index: null,
    //     speed_index: null,
    //     tire_pressure: null,
    //     tire_sizing_system: "metric",
    //     tire_construction: "R",
    //     tire_width: null,
    //     tire_aspect_ratio: null,
    //     tire_diameter: null,
    //     tire_section_width: null,
    //     tire_is_82series: false,
    //     tire_alpha_numeric: null,
    //     tire_width_mm: null,
    //     tire_diameter_mm: null,
    //     tire_weight_kg: null,
    //   },
    // },
  ]);
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

  const { data: trimsData } = useSWR(
    year && make && model
      ? `https://api.wheel-size.com/v2/modifications/?region=usdm&year=${year}&make=${make}&model=${model}&user_key=ebd58e75b66bd581a349aa5d45e21f10`
      : null,
    fetcher,
  );
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

      // avoid pushing duplicate exact sizes within the same diameter row
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
                              router.push(
                                `/tires?width=${size.front.tire_width}&ratio=${size.front.tire_aspect_ratio}&diameter=${size.front.rim_diameter}`,
                              );
                              setIsModalOpen(false);
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
        <select
          className={selectClass}
          value={year}
          onChange={(e) => {
            setYear(e.target.value);
            setMake("");
            setModel("");
            setTrim("");
          }}
          required
        >
          <option value="" disabled>
            Select Year
          </option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <select
          className={selectClass}
          value={make}
          onChange={(e) => {
            setMake(e.target.value);
            setModel("");
            setTrim("");
          }}
          disabled={!year || makes.length === 0}
          required
        >
          <option value="" disabled>
            Select Make
          </option>
          {makes.map((make) => (
            <option key={make.slug} value={make.slug}>
              {make.name}
            </option>
          ))}
        </select>
        <select
          className={selectClass}
          value={model}
          onChange={(e) => {
            setModel(e.target.value);
            setTrim("");
          }}
          disabled={!year || !make || models.length === 0}
        >
          <option value="" disabled>
            Select Model
          </option>
          {models.length === 0 ? (
            <option disabled> No models available </option>
          ) : (
            models?.map((model) => (
              <option key={model.slug} value={model.slug}>
                {model.name}
              </option>
            ))
          )}
        </select>
        <select
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
        </select>

        <button
          type="submit"
          className="bg-brand-red border border-brand-mid text-brand-light w-full font-body px-4 py-2  disabled:bg-brand-charcoal disabled:opacity-50 disabled:cursor-not-allowed  hover:bg-brand-red/90 transition-colors cursor-pointer rounded-full"
          disabled={disabled || isLoading}
        >
          {isLoading ? "Loading..." : "Search"}
        </button>
      </form>
    </>
  );
}
