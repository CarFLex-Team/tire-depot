import { create } from "zustand";

interface CartUiStore {
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  setCartOpen: (isOpen: boolean) => void;
  toggleCart: () => void;
}

export const useCartUiStore = create<CartUiStore>((set) => ({
  isOpen: false,

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  setCartOpen: (isOpen) => set({ isOpen }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
}));
