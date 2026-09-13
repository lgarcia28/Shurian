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
    <section id="catalogo" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-mono font-semibold uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              <span>Stock Actualizado · Rosario</span>
            </div>
            <h2 className="font-headline font-black text-3xl sm:text-4xl text-zinc-950 tracking-tight">
              Catálogo de Tecnología & Accesorios
            </h2>
            <p className="font-body text-sm sm:text-base text-zinc-600 mt-1">
              Equipos, fundas, cargadores y repuestos con retiro inmediato en Bv. Segui 1501 o envío.
            </p>
          </div>

          {/* Quick Active Filters Feedback */}
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
            <span>
              Mostrando <strong className="text-zinc-950 font-bold">{filteredProducts.length}</strong> de{" "}
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
        <div className="p-3.5 sm:p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 mb-8 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          
          {/* Active Search Notification */}
          <div className="flex items-center gap-2">
            {searchQuery ? (
              <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-800 px-3 py-1.5 rounded-full font-medium">
                <span>Búsqueda: &ldquo;{searchQuery}&rdquo;</span>
                <button
                  onClick={() => setSearchQuery("")}
                  className="hover:text-zinc-950 font-bold ml-1"
                >
                  ✕
                </button>
              </div>
            ) : (
              <span className="text-zinc-500 hidden sm:inline">
                Filtra por categoría o utiliza el buscador para hallar tu modelo.
              </span>
            )}
          </div>

          {/* Controls: In Stock & Sort */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Stock Toggle */}
            <label className="flex items-center gap-2 cursor-pointer text-zinc-700 hover:text-zinc-950 select-none font-medium">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="w-4 h-4 rounded border-zinc-300 text-orange-500 focus:ring-orange-500"
              />
              <span className="text-xs">Solo en stock</span>
            </label>

            <div className="h-4 w-[1px] bg-zinc-200 hidden sm:block"></div>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-zinc-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-white border border-zinc-200 rounded-full px-3 py-1.5 text-xs text-zinc-800 focus:outline-none focus:border-orange-500 cursor-pointer shadow-sm"
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
          <div className="py-20 text-center bg-zinc-50 rounded-3xl border border-zinc-200 flex flex-col items-center justify-center p-8">
            <div className="w-16 h-16 rounded-2xl bg-zinc-200 text-zinc-600 flex items-center justify-center mb-4">
              <PackageOpen className="w-8 h-8 opacity-75" />
            </div>
            <h3 className="font-headline font-bold text-xl text-zinc-900 mb-2">
              No encontramos productos con ese criterio
            </h3>
            <p className="font-body text-sm text-zinc-500 max-w-md mb-6">
              Intenta buscar por otro término o restablece los filtros para ver todo nuestro catálogo disponible.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-2.5 rounded-full bg-zinc-950 hover:bg-orange-500 text-white font-headline font-bold text-xs shadow-sm transition-all"
            >
              Restablecer Filtros
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
