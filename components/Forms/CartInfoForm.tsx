type CartInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
};

type CartInfoFormProps = {
  info: CartInfo;
  setInfo: (info: CartInfo) => void;
  handleInfoNext: () => void;
  handleInfoBack: () => void;
  emailDisabled: boolean;
};
const STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];
export default function CartInfoForm({
  info,
  setInfo,
  handleInfoNext,
  handleInfoBack,
  emailDisabled,
}: CartInfoFormProps) {
  return (
    <>
      <div className="p-6 flex flex-col gap-5 pb-32">
        <p className="font-body text-sm text-brand-muted">
          Shipping Information
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="font-display font-semibold text-sm text-brand-muted uppercase tracking-widest block mb-1">
              First Name *
            </label>
            <input
              required
              className="w-full bg-brand-dark border border-brand-mid text-white text-sm px-3 py-2 focus:outline-none focus:border-brand-red"
              value={info.firstName}
              onChange={(e) => setInfo({ ...info, firstName: e.target.value })}
            />
          </div>
          <div>
            <label className="font-display font-semibold text-sm text-brand-muted uppercase tracking-widest block mb-1">
              Last Name *
            </label>
            <input
              required
              className="w-full bg-brand-dark border border-brand-mid text-white text-sm px-3 py-2 focus:outline-none focus:border-brand-red"
              value={info.lastName}
              onChange={(e) => setInfo({ ...info, lastName: e.target.value })}
            />
          </div>
        </div>
        <div>
          <label className="font-display font-semibold text-sm text-brand-muted uppercase tracking-widest block mb-1">
            Email *
          </label>
          <input
            required
            type="email"
            className="w-full bg-brand-dark border border-brand-mid text-white text-sm px-3 py-2 focus:outline-none focus:border-brand-red disabled:bg-brand-gray disabled:text-brand-muted"
            value={info.email}
            onChange={(e) => setInfo({ ...info, email: e.target.value })}
            disabled={emailDisabled}
          />
        </div>
        <div>
          <label className="font-display font-semibold text-sm text-brand-muted uppercase tracking-widest block mb-1">
            Phone *
          </label>
          <input
            required
            type="tel"
            className="w-full bg-brand-dark border border-brand-mid text-white text-sm px-3 py-2 focus:outline-none focus:border-brand-red"
            value={info.phone}
            onChange={(e) => setInfo({ ...info, phone: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="font-display font-semibold text-sm text-brand-muted uppercase tracking-widest block mb-1">
              Address Line 1 *
            </label>
            <input
              required
              className="w-full bg-brand-dark border border-brand-mid text-white text-sm px-3 py-2 focus:outline-none focus:border-brand-red"
              value={info.address1}
              onChange={(e) => setInfo({ ...info, address1: e.target.value })}
            />
          </div>
          <div>
            <label className="font-display font-semibold text-sm text-brand-muted uppercase tracking-widest block mb-1">
              Address Line 2
            </label>
            <input
              className="w-full bg-brand-dark border border-brand-mid text-white text-sm px-3 py-2 focus:outline-none focus:border-brand-red"
              value={info.address2}
              onChange={(e) => setInfo({ ...info, address2: e.target.value })}
            />
          </div>
        </div>
        <div>
          <label className="font-display font-semibold text-sm text-brand-muted uppercase tracking-widest block mb-1">
            City *
          </label>
          <input
            required
            type="text"
            className="w-full bg-brand-dark border border-brand-mid text-white text-sm px-3 py-2 focus:outline-none focus:border-brand-red"
            value={info.city}
            onChange={(e) => setInfo({ ...info, city: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="font-display font-semibold text-sm text-brand-muted uppercase tracking-widest block mb-1">
              State *
            </label>
            <select
              required
              className="w-full bg-brand-dark border border-brand-mid text-white text-sm px-3 py-2 focus:outline-none focus:border-brand-red"
              value={info.state}
              onChange={(e) => setInfo({ ...info, state: e.target.value })}
            >
              <option value="" disabled>
                Select a state
              </option>
              {STATES.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-display font-semibold text-sm text-brand-muted uppercase tracking-widest block mb-1">
              ZIP Code *
            </label>
            <input
              required
              className="w-full bg-brand-dark border border-brand-mid text-white text-sm px-3 py-2 focus:outline-none focus:border-brand-red"
              value={info.zip}
              onChange={(e) => setInfo({ ...info, zip: e.target.value })}
            />
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-brand-charcoal border-t border-brand-gray p-5 z-10">
        <div className="flex gap-3">
          <button
            onClick={handleInfoBack}
            className="flex-2 border border-brand-mid text-brand-muted hover:text-white py-3 px-3 md:px-6 font-display font-bold text-sm uppercase tracking-widest transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleInfoNext}
            disabled={
              !info.firstName ||
              !info.lastName ||
              !info.address1 ||
              !info.email ||
              !info.phone ||
              !info.city ||
              !info.state ||
              !info.zip
            }
            className="flex-1 bg-brand-red hover:bg-brand-red/90 text-white py-3 px-3 md:px-6 font-display font-bold text-sm uppercase tracking-widest transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-brand-red"
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </>
  );
}
