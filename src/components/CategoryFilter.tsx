"use client";

import React from "react";
import { useCartStore } from "@/store/useCartStore";
import { CATEGORIES, INITIAL_PRODUCTS } from "@/data/products";
import { ProductCategory } from "@/types";
import {
  LayoutGrid,
  Smartphone,
  Laptop,
  Keyboard,
  Zap,
  Shield,
  Headphones,
  Wrench,
} from "lucide-react";

interface CategoryFilterProps {
  activeCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
}

const ICONS_MAP: Record<string, React.ReactNode> = {
  todos: <LayoutGrid className="w-4 h-4" />,
  celulares: <Smartphone className="w-4 h-4" />,
  "notebooks-pc": <Laptop className="w-4 h-4" />,
  perifericos: <Keyboard className="w-4 h-4" />,
  "cables-cargadores": <Zap className="w-4 h-4" />,
  "fundas-vidrios": <Shield className="w-4 h-4" />,
  audio: <Headphones className="w-4 h-4" />,
  "servicio-tecnico": <Wrench className="w-4 h-4" />,
};

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const getCategoryCount = (categoryId: string) => {
    if (categoryId === "todos") return INITIAL_PRODUCTS.length;
    return INITIAL_PRODUCTS.filter((p) => p.category === categoryId).length;
  };

  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-none">
      <div className="flex items-center gap-2 sm:gap-2.5 min-w-max">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count = getCategoryCount(cat.id);

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id as ProductCategory)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 active:scale-95 ${
                isActive
                  ? "bg-zinc-950 text-white font-bold shadow-sm"
                  : "bg-zinc-100 hover:bg-zinc-200/80 text-zinc-700 border border-zinc-200/70"
              }`}
            >
              <span className={isActive ? "text-orange-400" : "text-zinc-500"}>
                {ICONS_MAP[cat.id] || <LayoutGrid className="w-4 h-4" />}
              </span>
              <span>{cat.label}</span>
              <span
                className={`text-[11px] font-mono px-1.5 py-0.2 rounded-full font-bold ${
                  isActive
                    ? "bg-orange-500 text-white"
                    : "bg-zinc-200/80 text-zinc-600"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
