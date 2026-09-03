"use client";

import React, { useState, useMemo } from "react";
import { INITIAL_PRODUCTS } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { CategoryFilter } from "./CategoryFilter";
import { useCartStore } from "@/store/useCartStore";
import { ProductCategory } from "@/types";
import {
  PackageOpen,
  ArrowUpDown,
  Sparkles,
} from "lucide-react";

type SortOption = "destacados" | "precio-menor" | "precio-mayor" | "nombre";

export const Catalog: React.FC = () => {
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } =
    useCartStore();

  const [sortBy, setSortBy] = useState<SortOption>("destacados");
  const [onlyInStock, setOnlyInStock] = useState(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...INITIAL_PRODUCTS];

    // Category filter
    if (selectedCategory !== "todos") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q)
      );
    }

    // Stock filter
    if (onlyInStock) {
      result = result.filter((p) => p.inStock);
    }

    // Sort
    switch (sortBy) {
      case "precio-menor":
        result.sort((a, b) => a.price - b.price);
        break;
      case "precio-mayor":
        result.sort((a, b) => b.price - a.price);
        break;
      case "nombre":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "destacados":
      default:
        break;
    }

    return result;
  }, [selectedCategory, searchQuery, onlyInStock, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("todos");
    setOnlyInStock(false);
    setSortBy("destacados");
  };

  return (
    <section id="catalogo" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono font-semibold uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Stock Actualizado · Rosario</span>
            </div>
            <h2 className="font-headline font-black text-2xl sm:text-4xl text-white tracking-tight">
              Catálogo de Tecnología & Accesorios
            </h2>
            <p className="font-body text-sm sm:text-base text-slate-400 mt-1">
              Equipos, fundas, cargadores y repuestos con retiro inmediato en Bv. Segui 1501 o envío.
            </p>
          </div>

          {/* Quick Active Filters Feedback */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>
              Mostrando <strong className="text-orange-400">{filteredProducts.length}</strong> de{" "}
              {INITIAL_PRODUCTS.length} productos
            </span>
          </div>
        </div>

        {/* Category Pills Filter */}
        <div className="mb-6">
          <CategoryFilter
            activeCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* Toolbar: Search Feedback, Stock Toggle & Sort */}
        <div className="p-3 sm:p-4 rounded-2xl glass-panel mb-8 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          
          {/* Active Search Notification */}
          <div className="flex items-center gap-2">
            {searchQuery ? (
              <div className="flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 text-orange-300 px-3 py-1.5 rounded-xl">
                <span>Búsqueda: &ldquo;{searchQuery}&rdquo;</span>
                <button
                  onClick={() => setSearchQuery("")}
                  className="hover:text-white font-bold ml-1"
                >
                  ✕
                </button>
              </div>
            ) : (
              <span className="text-slate-400 hidden sm:inline">
                Filtra por categoría o utiliza el buscador para hallar tu modelo.
              </span>
            )}
          </div>

          {/* Controls: In Stock & Sort */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Stock Toggle */}
            <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white select-none">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="w-4 h-4 rounded border-slate-700 bg-navy-900 text-orange-500 focus:ring-orange-500 focus:ring-offset-navy-950"
              />
              <span className="text-xs">Solo en stock</span>
            </label>

            <div className="h-4 w-[1px] bg-white/10 hidden sm:block"></div>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-orange-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-navy-900 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-orange-500 cursor-pointer"
              >
                <option value="destacados">Destacados</option>
                <option value="precio-menor">Precio: Menor a Mayor</option>
                <option value="precio-mayor">Precio: Mayor a Menor</option>
                <option value="nombre">Nombre (A - Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="py-20 text-center glass-panel rounded-3xl border border-white/10 flex flex-col items-center justify-center p-8">
            <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/30 text-orange-400 flex items-center justify-center mb-4">
              <PackageOpen className="w-8 h-8" />
            </div>
            <h3 className="font-headline font-bold text-xl text-white mb-2">
              No encontramos productos con ese criterio
            </h3>
            <p className="font-body text-sm text-slate-400 max-w-md mb-6">
              Intenta buscar por otro término o restablece los filtros para ver todo nuestro catálogo disponible.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-headline font-bold text-xs shadow-glow transition-all"
            >
              Restablecer Filtros
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
