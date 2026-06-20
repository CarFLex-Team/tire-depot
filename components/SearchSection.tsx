import { Phone, ShoppingCart } from "lucide-react";
import SearchFormContainer from "./SearchFormContainer";

export default function SearchSection() {
  return (
    <section
      className=" min-h-[80vh] flex items-center my-8"
      id="search-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-between gap-6">
        <div>
          <h2 className="font-mono text-center text-4xl sm:text-5xl text-white uppercase tracking-tight">
            Find Your Perfect Tires
          </h2>

          <SearchFormContainer />
        </div>
      </div>
    </section>
  );
}
