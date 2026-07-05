"use client";

import { useEffect, useState } from "react";
import {
  User,
  MapPin,
  Package,
  LogOut,
  Plus,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import LoadingSkeleton from "./UI/LoadingSkeleton";
import { updateUser } from "@/lib/auth/auth-client";
import Modal from "./UI/Modal";

import AddAddressForm from "./Forms/AddAddressForm";
import { useQuery } from "@tanstack/react-query";
import { getAddresses } from "@/lib/api/addresses";

interface AccountUser {
  id: string;
  name?: string;
  last_name?: string;
  email?: string;
}

interface Address {
  id: string;
  label?: string;
  full_name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

interface OrderSummary {
  id: string;
  order_number: string;
  status: string;
  total: number;
  created_at: string;
  item_count: number;
}

type Tab = "profile" | "addresses" | "orders";

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-950/60 border-amber-700 text-amber-400",
  paid: "bg-blue-950/60 border-blue-700 text-blue-400",
  fulfilled: "bg-emerald-950/60 border-emerald-700 text-emerald-400",
  cancelled: "bg-red-950/60 border-red-800 text-brand-red",
  refunded: "bg-brand-charcoal border-brand-mid text-brand-muted",
};

export default function AccountSection({
  user,
  loading,
  onLogout,
}: {
  user: AccountUser | null;
  loading: boolean;
  onLogout: () => void;
}) {
  const [tab, setTab] = useState<Tab>("profile");

  const [addrOpen, setAddrOpen] = useState(false);

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [firstName, setFirstName] = useState(user?.name || "");
  const [lastName, setLastName] = useState(user?.last_name || "");

  const { data: addresses = [], isLoading: addrLoading } = useQuery({
    queryKey: ["addresses", user?.id],
    queryFn: () => getAddresses(user?.id || ""),
    enabled: !!user?.id, // don't fetch until user is loaded
  });

  const { data: orders = [], isLoading: ordersLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      fetch("/api/orders")
        .then((r) => r.json())
        .then((d) => d.orders ?? []),
    enabled: !!user?.id,
  });
  useEffect(() => {
    setFirstName(user?.name || "");
    setLastName(user?.last_name || "");
  }, [user]);
  const onSubmit = async () => {
    setError(null);
    setUpdateLoading(true);
    const { error } = await updateUser({
      name: firstName,
      last_name: lastName,
    });

    if (error) {
      setError(error.message ?? "Invalid password.");
    } else {
      setIsEditingProfile(false);
    }
    setUpdateLoading(false);
  };
  const initials = user?.name
    ? `${user.name[0] ?? ""}${user.last_name?.[0] ?? ""}`.toUpperCase()
    : "?";

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "profile", label: "Profile", icon: <User size={16} /> },
    { key: "orders", label: "Orders", icon: <Package size={16} /> },
    { key: "addresses", label: "Addresses", icon: <MapPin size={16} /> },
  ];

  return (
    <>
      <Modal isOpen={addrOpen} onClose={() => setAddrOpen(false)}>
        <AddAddressForm onClose={() => setAddrOpen(false)} userId={user?.id} />
      </Modal>
      <section className="max-w-5xl mx-auto px-6 sm:px-10 py-16">
        {/* ── Header ── */}
        <div className="flex items-center gap-5 mb-12">
          <div className="w-16 h-16 rounded-full bg-brand-charcoal border border-brand-mid/30 flex items-center justify-center font-display font-bold text-xl text-brand-red flex-shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            {loading ? (
              <>
                <LoadingSkeleton className="h-7 w-48 mb-2" />
                <LoadingSkeleton className="h-4 w-32" />
              </>
            ) : (
              <>
                <h1 className="font-mono text-2xl sm:text-3xl text-white uppercase tracking-tight truncate">
                  {user?.name} {user?.last_name}
                </h1>
                <p className="font-body text-brand-muted text-sm truncate">
                  {user?.email}
                </p>
              </>
            )}
          </div>
          <button
            onClick={onLogout}
            className="ml-auto flex items-center gap-2 text-sm font-display uppercase tracking-widest text-brand-muted hover:text-brand-red transition-colors flex-shrink-0"
          >
            <LogOut size={15} /> Logout
          </button>
        </div>

        {/* ── Tabs ── */}
        <div className="flex gap-2 border-b border-brand-charcoal mb-10 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-4 py-3 font-display text-sm uppercase tracking-widest whitespace-nowrap border-b-2 transition-colors ${
                tab === t.key
                  ? "border-brand-red text-white"
                  : "border-transparent text-brand-muted hover:text-brand-light"
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        {/* ── Profile tab ── */}
        {tab === "profile" && (
          <div className="bg-brand-charcoal/40 border border-brand-mid/20 rounded-2xl p-8 max-w-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xs md:text-sm uppercase tracking-widest text-brand-muted ">
                Personal Information
              </h2>

              <a
                href="/change-password"
                className="flex items-center gap-0.5 text-xs md:text-sm font-display uppercase tracking-widest text-brand-red hover:underline"
              >
                Change Password <ArrowRight size={14} />
              </a>
            </div>
            <div className="flex flex-col gap-5">
              <div>
                <label className="font-display text-xs uppercase tracking-widest text-brand-muted block mb-1">
                  First Name
                </label>
                <input
                  className={`font-mono text-white text-lg bg-transparent p-1 md:p-2 rounded-lg ${!isEditingProfile ? "border-none focus:outline-none" : "border border-brand-muted"} `}
                  value={firstName || "—"}
                  onChange={(e) => setFirstName(e.target.value)}
                  readOnly={!isEditingProfile}
                />
              </div>
              <div>
                <label className="font-display text-xs uppercase tracking-widest text-brand-muted block mb-1">
                  Last Name
                </label>
                <input
                  className={`font-mono text-white text-lg bg-transparent p-1 md:p-2 rounded-lg ${!isEditingProfile ? "border-none focus:outline-none" : "border border-brand-muted"} `}
                  value={lastName || "—"}
                  onChange={(e) => setLastName(e.target.value)}
                  readOnly={!isEditingProfile}
                />
              </div>
              <div>
                <label className="font-display text-xs uppercase tracking-widest text-brand-muted block mb-1">
                  Email
                </label>
                <p className="font-mono text-white text-lg bg-transparent border-none focus:outline-none p-1 md:p-2 rounded-lg">
                  {user?.email || "—"}
                </p>
              </div>
            </div>
            <button
              className={`mt-8 px-6 py-3 font-display font-bold uppercase tracking-widest text-sm rounded-xl border text-brand-light  ${isEditingProfile ? "bg-brand-red border-brand-red hover:bg-brand-red/80" : "border-brand-mid hover:border-brand-red hover:text-brand-red"}  transition-colors`}
              onClick={() => {
                if (isEditingProfile) {
                  onSubmit();
                } else {
                  setIsEditingProfile(true);
                }
              }}
            >
              {updateLoading
                ? "Saving..."
                : isEditingProfile
                  ? "Save Changes"
                  : "Edit Profile"}
            </button>
          </div>
        )}

        {/* ── Addresses tab ── */}
        {tab === "addresses" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xs uppercase tracking-widest text-brand-muted">
                Saved Addresses
              </h2>
              <button
                className="flex items-center gap-1.5 text-sm font-display uppercase tracking-widest text-brand-red hover:underline"
                onClick={() => setAddrOpen(true)}
              >
                <Plus size={14} /> Add Address
              </button>
            </div>

            {addrLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <LoadingSkeleton className="h-32" />
                <LoadingSkeleton className="h-32" />
              </div>
            ) : addresses.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-brand-mid/30 rounded-2xl">
                <p className="font-body text-brand-muted">
                  No saved addresses yet
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addresses.map((a: any) => (
                  <div
                    key={a.id}
                    className="bg-brand-charcoal/40 border border-brand-mid/20 rounded-2xl p-5"
                  >
                    {a.label && (
                      <span className="inline-block mb-2 font-display text-xs uppercase tracking-widest text-brand-red border border-brand-red/40 rounded-full px-2.5 py-0.5">
                        {a.label}
                      </span>
                    )}
                    {/* <p className="font-mono text-white">{a.full_name}</p> */}
                    <p className="font-body text-brand-muted text-sm mt-1">
                      {a.line1}
                      {a.line2 ? `, ${a.line2}` : ""}
                      <br />
                      {a.city}, {a.state} {a.postal_code}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Orders tab ── */}
        {tab === "orders" && (
          <div>
            <h2 className="font-display text-xs uppercase tracking-widest text-brand-muted mb-6">
              Order History
            </h2>

            {ordersLoading ? (
              <div className="flex flex-col gap-3">
                <LoadingSkeleton className="h-20" />
                <LoadingSkeleton className="h-20" />
                <LoadingSkeleton className="h-20" />
              </div>
            ) : orders.length === 0 ? (
              <div className=" py-16 border border-dashed border-brand-mid/30 rounded-2xl flex flex-col gap-2 items-center">
                <p className="font-body text-brand-muted">No orders yet</p>
                <a
                  href="/#search-section"
                  className="inline-flex items-center gap-3 bg-brand-red  hover:bg-brand-red/90  text-white px-8 py-4 font-display font-bold text-lg uppercase tracking-widest transition-transform duration-500 ease-out  rounded-full"
                >
                  Shop Tires Now
                  <ArrowRight />
                </a>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {orders.map((o: any) => (
                  <a
                    key={o.id}
                    href={`/account/orders/${o.id}`}
                    className="flex items-center justify-between gap-4 bg-brand-charcoal/40 border border-brand-mid/20 rounded-2xl px-6 py-5 hover:border-brand-red/40 transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="font-display md:text-xl text-white font-bold">
                        {o.order_number}
                      </p>
                      <p className="font-body text-brand-muted text-sm mt-0.5">
                        {new Date(o.created_at).toLocaleDateString()} ·{" "}
                        {o.item_count} item
                        {o.item_count !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <div className="flex items-center flex-col sm:flex-row  gap-2 md:gap-4 flex-shrink-0">
                      <span
                        className={`font-display text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border ${
                          STATUS_STYLES[o.status] ?? STATUS_STYLES.pending
                        }`}
                      >
                        {o.status}
                      </span>
                      <span className="font-display flex flex-row items-center gap-1 md:text-xl  text-white font-bold text-right">
                        ${o.total.toFixed(2)}
                        <ChevronRight size={18} className="text-brand-muted" />
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </>
  );
}
