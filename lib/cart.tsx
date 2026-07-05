"use client";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import type { Tire } from "@/lib/api/tires";

export interface CartItem {
  tire: Tire;
  qty: number;
}

export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
}

interface CartState {
  items: CartItem[];
  open: boolean;
  userInfo: UserInfo | null;
}

type Action =
  | { type: "ADD"; tire: Tire; qty: number }
  | { type: "REMOVE"; id: string }
  | { type: "UPDATE_QTY"; id: string; qty: number }
  | { type: "CLEAR" }
  | { type: "SET_OPEN"; open: boolean }
  | { type: "SET_USER_INFO"; userInfo: UserInfo }
  | { type: "CLEAR_USER_INFO" };

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "ADD": {
      const existing = state.items.find((i) => i.tire.id === action.tire.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.tire.id === action.tire.id
              ? { ...i, qty: i.qty + action.qty }
              : i,
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { tire: action.tire, qty: action.qty || 1 }],
      };
    }
    case "REMOVE":
      return {
        ...state,
        items: state.items.filter((i) => i.tire.id !== action.id),
      };
    case "UPDATE_QTY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.tire.id === action.id ? { ...i, qty: action.qty } : i,
        ),
      };
    case "CLEAR":
      return { ...state, items: [] };
    case "SET_OPEN":
      return { ...state, open: action.open };
    case "SET_USER_INFO":
      return { ...state, userInfo: action.userInfo };
    case "CLEAR_USER_INFO":
      return { ...state, userInfo: null };
    default:
      return state;
  }
}

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<Action>;
  totalItems: number;
  totalPrice: number;
} | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(
    reducer,
    (() => {
      if (typeof window === "undefined")
        return { items: [], open: false, userInfo: null };
      const saved = localStorage.getItem("cart");
      return saved
        ? JSON.parse(saved)
        : { items: [], open: false, userInfo: null };
    })(),
  );
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);
  const totalItems = state.items.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = state.items.reduce(
    (sum, i) => sum + i.tire.price * i.qty,
    0,
  );

  return (
    <CartContext.Provider value={{ state, dispatch, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
