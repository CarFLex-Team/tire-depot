import useSWR from "swr";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .catch((err) => console.error(err));

export default function VehicleDetailsForm() {
  const [models, setModels] = useState<{ model_id: string; name: string }[]>(
    [],
  );
  const [makes, setMakes] = useState<{ make_id: string; name: string }[]>([]);
  const [trims, setTrims] = useState<
    { id: string; trim_id: string; name: string }[]
  >([]);
  const [carId, setCarId] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [trim, setTrim] = useState("");
  const selectClass =
    "bg-brand-charcoal border border-brand-mid text-brand-light w-full text-sm font-body px-4 py-2 pr-8 disabled:opacity-50 disabled:cursor-not-allowed  focus:outline-none focus:border-brand-red transition-colors cursor-pointer rounded-full";
  const router = useRouter();
  const years = Array.from({ length: 16 }, (_, i) => 2025 - i);
  useEffect(() => {
    if (year && make && model && trim) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [year, make, model, trim]);
  const { data: makesData } = useSWR(
    year ? `/api/vehicles/makes?year=${year}` : null,
    fetcher,
  );
  useEffect(() => {
    if (makesData) setMakes(makesData);
  }, [makesData]);

  const { data: modelsData } = useSWR(
    year && make ? `/api/vehicles/models?year=${year}&make=${make}` : null,
    fetcher,
  );
  useEffect(() => {
    if (modelsData) setModels(modelsData);
  }, [modelsData]);

  const { data: trimsData } = useSWR(
    year && make && model
      ? `/api/vehicles/trims?year=${year}&make=${make}&model=${model}`
      : null,
    fetcher,
  );
  useEffect(() => {
    if (trimsData) setTrims(trimsData);
  }, [trimsData]);

  return (
    <form
      className="flex flex-col md:flex-row items-center gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (disabled) return;
        if (carId) {
          router.push("/sell-car?carId=" + carId);
        }
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
          <option key={make.make_id} value={make.make_id}>
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
            <option key={model.model_id} value={model.model_id}>
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
          setCarId(trims.find((t) => t.trim_id === e.target.value)?.id || "");
        }}
        disabled={!year || !make || !model || trims.length === 0}
        required
      >
        <option value="" disabled>
          Select Trim
        </option>
        {trims.length === 0 ? (
          <option disabled> No trims available </option>
        ) : (
          trims?.map((trim) => (
            <option key={trim.trim_id} value={trim.trim_id}>
              {trim.name}
            </option>
          ))
        )}
      </select>

      <button
        type="submit"
        className="bg-brand-red border border-brand-mid text-brand-light w-full font-body px-4 py-2  disabled:bg-brand-charcoal disabled:opacity-50 disabled:cursor-not-allowed  hover:bg-brand-red/90 transition-colors cursor-pointer rounded-full"
        disabled={disabled}
      >
        Search
      </button>
    </form>
  );
}
