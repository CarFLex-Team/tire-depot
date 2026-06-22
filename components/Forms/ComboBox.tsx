// components/Combobox.tsx
"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown, X } from "lucide-react";

interface ComboboxOption {
  value: string;
  label: string;
}

interface ComboboxProps {
  options: ComboboxOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export function Combobox({
  options,
  value,
  onChange,
  placeholder,
  disabled,
  required,
  className = "",
}: ComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlighted, setHighlighted] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedLabel = options.find((o) => o.value === value)?.label ?? "";
  const selectClass =
    "bg-brand-charcoal border border-brand-mid text-brand-light w-full text-sm font-body px-4 py-2   focus:outline-none focus:border-brand-red transition-colors cursor-pointer rounded-full";
  const filtered = useMemo(() => {
    if (!query) return options;
    return options.filter((o) =>
      o.label.toLowerCase().includes(query.toLowerCase()),
    );
  }, [options, query]);

  // close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function selectOption(option: ComboboxOption) {
    onChange(option.value);
    setQuery("");
    setIsOpen(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!isOpen && (e.key === "ArrowDown" || e.key === "Enter")) {
      setIsOpen(true);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[highlighted]) selectOption(filtered[highlighted]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setQuery("");
    }
  }

  return (
    <div
      ref={wrapperRef}
      className={`relative w-full ${selectClass} ${className}`}
    >
      <div
        className={`flex items-center justify-between `}
        onClick={() => {
          if (disabled) return;
          setIsOpen((o) => !o);
          setHighlighted(0);
          if (!isOpen) setTimeout(() => inputRef.current?.focus(), 0);
        }}
      >
        {isOpen ? (
          <input
            ref={inputRef}
            className="bg-transparent outline-none w-full text-brand-light placeholder:text-brand-light/50"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setHighlighted(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder={selectedLabel || placeholder}
            disabled={disabled}
          />
        ) : (
          <span
            className={`text-brand-light ${disabled ? "opacity-50 cursor-not-allowed" : ""}  overflow-hidden text-ellipsis whitespace-nowrap`}
          >
            {selectedLabel || placeholder}
          </span>
        )}

        <div className=" shrink-0">
          {/* {value && !disabled && (
            <X
              size={14}
              className="opacity-60 hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                onChange("");
                setQuery("");
              }}
            />
          )} */}
          <ChevronDown
            size={16}
            className={`transition-transform ${isOpen ? "rotate-180" : ""} ${disabled ? "opacity-50" : ""}`}
          />
        </div>
      </div>

      <input
        type="text"
        value={value}
        required={required}
        onChange={() => {}}
        tabIndex={-1}
        className="sr-only"
      />

      {isOpen && !disabled && (
        <ul className="absolute z-50 mt-3 max-h-60 w-full  left-0 overflow-auto rounded-2xl border border-brand-mid bg-brand-charcoal py-1 shadow-lg">
          {filtered.length === 0 ? (
            <li className="px-4 py-2 text-sm text-brand-light/50">
              No results
            </li>
          ) : (
            filtered.map((option, i) => (
              <li
                key={option.value}
                className={`px-4 py-2 text-sm cursor-pointer text-brand-light ${
                  i === highlighted ? "bg-brand-red/80" : ""
                } ${option.value === value ? "font-semibold" : ""}`}
                onMouseEnter={() => setHighlighted(i)}
                onClick={() => selectOption(option)}
              >
                {option.label}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
