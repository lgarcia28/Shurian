"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItem, Product, ProductCategory } from "@/types";

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  isRepairModalOpen: boolean;
  selectedProductForQuickView: Product | null;
  searchQuery: string;
  selectedCategory: ProductCategory;

  // Cart actions
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;

  // UI state actions
  openRepairModal: () => void;
  closeRepairModal: () => void;
  setSelectedProductForQuickView: (product: Product | null) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: ProductCategory) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      isRepairModalOpen: false,
      selectedProductForQuickView: null,
      searchQuery: "",
      selectedCategory: "todos",

      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

      addItem: (product: Product, quantity = 1) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.product.id === product.id
          );

          if (existingIndex > -1) {
            const updatedItems = [...state.items];
            updatedItems[existingIndex] = {
              ...updatedItems[existingIndex],
              quantity: updatedItems[existingIndex].quantity + quantity,
            };
            return { items: updatedItems, isCartOpen: true };
          }

          return {
            items: [...state.items, { product, quantity }],
            isCartOpen: true,
          };
        });
      },

      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },

      openRepairModal: () => set({ isRepairModalOpen: true }),
      closeRepairModal: () => set({ isRepairModalOpen: false }),

      setSelectedProductForQuickView: (product: Product | null) =>
        set({ selectedProductForQuickView: product }),

      setSearchQuery: (query: string) => set({ searchQuery: query }),
      setSelectedCategory: (category: ProductCategory) =>
        set({ selectedCategory: category }),
    }),
    {
      name: "shurian-cart-storage",
      storage: createJSONStorage(() => localStorage),
      // Only persist items so modals/search reset cleanly
      partialize: (state) => ({ items: state.items }),
    }
  )
);
