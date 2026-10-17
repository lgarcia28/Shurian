"use client";

import React, { useState, useMemo, useEffect } from "react";
import { INITIAL_PRODUCTS } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { CatalogSidebar } from "./CatalogSidebar";
import { useCartStore } from "@/store/useCartStore";
import { Product, ProductCategory } from "@/types";
import { ElitCategoryItem } from "@/services/elit";
import {
  PackageOpen,
  ArrowUpDown,
  Sparkles,
  Search,
  X,
  SlidersHorizontal,
  Loader2,
  Tag,
} from "lucide-react";

type SortOption = "destacados" | "precio-menor" | "precio-mayor" | "nombre";

interface CatalogProps {
  initialProducts?: Product[];
  initialTotal?: number;
  availableBrands?: string[];
  availableCategories?: ElitCategoryItem[];
}

export const Catalog: React.FC<CatalogProps> = ({
  initialProducts,
  initialTotal,
  availableBrands = [],
  availableCategories = [],
}) => {
  const { searchQuery, setSearchQuery } = useCartStore();

  const [products, setProducts] = useState<Product[]>(() => {
    if (initialProducts && initialProducts.length > 0) {
      return initialProducts;
    }
    return INITIAL_PRODUCTS;
  });

  const [totalCount, setTotalCount] = useState<number>(() => {
    return initialTotal || initialProducts?.length || INITIAL_PRODUCTS.length;
  });

  // State for active category, subcategory and brand
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortOption>("destacados");
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isSearchingServer, setIsSearchingServer] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // If initialProducts changes (e.g. from server component revalidation)
  useEffect(() => {
    if (initialProducts && initialProducts.length > 0) {
      setProducts(initialProducts);
      if (initialTotal) setTotalCount(initialTotal);
    }
  }, [initialProducts, initialTotal]);

  // Handle Category & Subcategory selection with direct API query
  const handleCategorySelect = async (category: string, subCategory?: string) => {
    setSelectedCategory(category);
    setSelectedSubCategory(subCategory || "");

    // Local store special service
    if (category === "servicio-tecnico") return;

    try {
      setIsSearchingServer(true);
      const queryParams = new URLSearchParams();
      if (category && category !== "todos") queryParams.set("category", category);
      if (subCategory) queryParams.set("sub_categoria", subCategory);
      if (selectedBrand) queryParams.set("marca", selectedBrand);
      if (searchQuery.trim()) queryParams.set("search", searchQuery.trim());
      queryParams.set("limit", "60");

      const res = await fetch(`/api/products?${queryParams.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (data.products && Array.isArray(data.products) && data.products.length > 0) {
          setProducts((prev) => {
            const existingIds = new Set(data.products.map((p: Product) => p.id));
            const filteredPrev = prev.filter((p) => !existingIds.has(p.id));
            return [...data.products, ...filteredPrev];
          });
        }
      }
    } catch (err) {
      console.error("Error fetching products by category:", err);
    } finally {
      setIsSearchingServer(false);
    }
  };

  // Handle Brand selection with direct supplier API fetch
  const handleBrandChange = async (brand: string) => {
    setSelectedBrand(brand);
    if (!brand) return;

    try {
      setIsSearchingServer(true);
      const queryParams = new URLSearchParams();
      queryParams.set("marca", brand);
      if (selectedCategory && selectedCategory !== "todos") queryParams.set("category", selectedCategory);
      if (selectedSubCategory) queryParams.set("sub_categoria", selectedSubCategory);
      if (searchQuery.trim()) queryParams.set("search", searchQuery.trim());
      queryParams.set("limit", "60");

      const res = await fetch(`/api/products?${queryParams.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (data.products && Array.isArray(data.products) && data.products.length > 0) {
          setProducts((prev) => {
            const existingIds = new Set(data.products.map((p: Product) => p.id));
            const filteredPrev = prev.filter((p) => !existingIds.has(p.id));
            return [...data.products, ...filteredPrev];
          });
        }
      }
    } catch (err) {
      console.error("Error fetching products by brand:", err);
    } finally {
      setIsSearchingServer(false);
    }
  };

  // Debounced server search when user searches for items across all catalog
  useEffect(() => {
    const query = searchQuery.trim();
    if (!query) return;

    const timer = setTimeout(async () => {
      try {
        setIsSearchingServer(true);
        const queryParams = new URLSearchParams();
        queryParams.set("search", query);
        if (selectedBrand) queryParams.set("marca", selectedBrand);
        if (selectedCategory && selectedCategory !== "todos") queryParams.set("category", selectedCategory);
        if (selectedSubCategory) queryParams.set("sub_categoria", selectedSubCategory);
        queryParams.set("limit", "60");

        const res = await fetch(`/api/products?${queryParams.toString()}`);
        if (res.ok) {
          const data = await res.json();
          if (data.products && Array.isArray(data.products) && data.products.length > 0) {
            setProducts((prev) => {
              const existingIds = new Set(data.products.map((p: Product) => p.id));
              const filteredPrev = prev.filter((p) => !existingIds.has(p.id));
              return [...data.products, ...filteredPrev];
            });
          }
        }
      } catch (err) {
        console.error("Error searching products from API:", err);
      } finally {
        setIsSearchingServer(false);
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedBrand, selectedCategory, selectedSubCategory]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== "todos") {
      const catLower = selectedCategory.toLowerCase();
      result = result.filter((p) => {
        if (selectedCategory === "servicio-tecnico") {
          return p.category === "servicio-tecnico";
        }
        return (
          p.category.toLowerCase().includes(catLower) ||
          p.categoryLabel.toLowerCase().includes(catLower)
        );
      });
    }

    // Subcategory filter
    if (selectedSubCategory) {
      const subLower = selectedSubCategory.toLowerCase();
      result = result.filter((p) => {
        const specSub = p.specs?.["Subcategoría"]?.toLowerCase() || "";
        return p.categoryLabel.toLowerCase().includes(subLower) || specSub.includes(subLower);
      });
    }

    // Brand filter
    if (selectedBrand) {
      const bUpper = selectedBrand.toUpperCase();
      result = result.filter((p) => {
        const specBrand = p.specs?.["Marca"]?.toUpperCase();
        return specBrand === bUpper || p.name.toUpperCase().includes(bUpper);
      });
    }

    // Search query filter (client-side matching)
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
        // Prioritize in-stock and items with badges
        result.sort((a, b) => {
          if (a.inStock === b.inStock) return 0;
          return a.inStock ? -1 : 1;
        });
        break;
    }

    return result;
  }, [products, selectedCategory, selectedSubCategory, selectedBrand, searchQuery, onlyInStock, sortBy]);

  // Handler to load more products
  const handleLoadMore = async () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);

    try {
      const nextOffset = products.length;
      const queryParams = new URLSearchParams();
      queryParams.set("offset", nextOffset.toString());
      queryParams.set("limit", "40");
      if (selectedBrand) queryParams.set("marca", selectedBrand);
      if (selectedCategory && selectedCategory !== "todos") queryParams.set("category", selectedCategory);
      if (selectedSubCategory) queryParams.set("sub_categoria", selectedSubCategory);

      const res = await fetch(`/api/products?${queryParams.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (data.products && Array.isArray(data.products) && data.products.length > 0) {
          setProducts((prev) => {
            const existingIds = new Set(prev.map((p) => p.id));
            const newProducts = data.products.filter((p: Product) => !existingIds.has(p.id));
            return [...prev, ...newProducts];
          });
          if (data.total) setTotalCount(data.total);
        }
      }
    } catch (err) {
      console.error("Error loading more products:", err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("todos");
    setSelectedSubCategory("");
    setSelectedBrand("");
    setOnlyInStock(false);
    setSortBy("destacados");
  };

  const hasMoreToLoad = products.length < totalCount;

  return (
    <section id="catalogo" className="py-6 sm:py-10 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-mono font-semibold uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              <span>Tecnología Oficial · Rosario</span>
            </div>
            <h2 className="font-headline font-black text-3xl sm:text-4xl text-zinc-950 tracking-tight">
              Catálogo de Tecnología & Accesorios
            </h2>
            <p className="font-body text-sm sm:text-base text-zinc-600 mt-1">
              Equipos, componentes y accesorios originales con garantía oficial.
            </p>
          </div>

          {/* Quick Active Filters Feedback */}
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
            <span>
              Mostrando <strong className="text-zinc-950 font-bold">{filteredProducts.length}</strong> de{" "}
              {totalCount > products.length ? totalCount : products.length} productos
            </span>
          </div>
        </div>

        {/* Dedicated In-Catalog Search Bar & Mobile Filter Trigger */}
        <div className="mb-6 flex items-center gap-3">
          <div className="relative flex-1 max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre, marca o modelo (ej: ASUS, Logitech, HP, Kingston, placa de video)..."
              className="w-full pl-12 pr-12 py-3.5 bg-zinc-50 border border-zinc-200 hover:border-zinc-300 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 rounded-2xl text-sm sm:text-base text-zinc-900 placeholder:text-zinc-400 shadow-sm transition-all outline-none"
            />
            {isSearchingServer ? (
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-orange-500">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            ) : searchQuery ? (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-zinc-200 hover:bg-zinc-300 text-zinc-600 hover:text-zinc-900 transition-colors"
                title="Borrar búsqueda"
              >
                <X className="w-4 h-4" />
              </button>
            ) : null}
          </div>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 px-4 py-3.5 rounded-2xl bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-xs font-semibold text-zinc-800 transition-colors shrink-0"
          >
            <SlidersHorizontal className="w-4 h-4 text-orange-500" />
            <span>Categorías</span>
            {(selectedCategory !== "todos" || selectedSubCategory) && (
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
            )}
          </button>
        </div>

        {/* Main Layout: Left Sidebar + Right Products Grid */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Sidebar for Categories & Subcategories */}
          <CatalogSidebar
            categories={availableCategories}
            selectedCategory={selectedCategory}
            selectedSubCategory={selectedSubCategory}
            onSelectCategory={handleCategorySelect}
            onReset={handleResetFilters}
            isOpenMobile={isMobileFilterOpen}
            onCloseMobile={() => setIsMobileFilterOpen(false)}
          />

          {/* Right Area: Toolbar + Grid */}
          <div className="flex-1 min-w-0 w-full">
            
            {/* Toolbar: Active Filters, Brand Selector, Stock Toggle & Sort */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 mb-6 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
              
              {/* Active Search & Filter Tags */}
              <div className="flex items-center gap-2 flex-wrap">
                {selectedCategory !== "todos" && (
                  <div className="flex items-center gap-1.5 bg-zinc-900 text-white px-3 py-1.5 rounded-full font-medium">
                    <span>Categoría: {selectedCategory}</span>
                    <button
                      onClick={() => handleCategorySelect("todos")}
                      className="hover:text-orange-400 font-bold ml-1 text-xs"
                      title="Quitar filtro de categoría"
                    >
                      ✕
                    </button>
                  </div>
                )}
                {selectedSubCategory && (
                  <div className="flex items-center gap-1.5 bg-orange-500 text-white px-3 py-1.5 rounded-full font-medium">
                    <span>{selectedSubCategory}</span>
                    <button
                      onClick={() => handleCategorySelect(selectedCategory)}
                      className="hover:text-zinc-950 font-bold ml-1 text-xs"
                      title="Quitar filtro de subcategoría"
                    >
                      ✕
                    </button>
                  </div>
                )}
                {selectedBrand && (
                  <div className="flex items-center gap-1.5 bg-zinc-800 text-white px-3 py-1.5 rounded-full font-medium">
                    <span>Marca: {selectedBrand}</span>
                    <button
                      onClick={() => handleBrandChange("")}
                      className="hover:text-orange-400 font-bold ml-1 text-xs"
                      title="Quitar filtro de marca"
                    >
                      ✕
                    </button>
                  </div>
                )}
                {searchQuery && (
                  <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-200 text-orange-800 px-3 py-1.5 rounded-full font-medium">
                    <span>&ldquo;{searchQuery}&rdquo;</span>
                    <button
                      onClick={() => setSearchQuery("")}
                      className="hover:text-zinc-950 font-bold ml-1 text-xs"
                      title="Quitar búsqueda"
                    >
                      ✕
                    </button>
                  </div>
                )}
                {!searchQuery && !selectedBrand && selectedCategory === "todos" && !selectedSubCategory && (
                  <span className="text-zinc-500 hidden sm:inline flex items-center gap-1.5">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Selecciona una categoría del menú izquierdo o busca por marca.</span>
                  </span>
                )}
              </div>

              {/* Controls: Brand Dropdown, In Stock & Sort */}
              <div className="flex items-center gap-3 ml-auto flex-wrap sm:flex-nowrap">
                
                {/* Brand Dropdown */}
                {availableBrands.length > 0 && (
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-zinc-500" />
                    <select
                      value={selectedBrand}
                      onChange={(e) => handleBrandChange(e.target.value)}
                      className="bg-white border border-zinc-200 rounded-full px-3 py-1.5 text-xs text-zinc-800 focus:outline-none focus:border-orange-500 cursor-pointer shadow-sm max-w-[140px] truncate"
                    >
                      <option value="">Todas las marcas</option>
                      {availableBrands.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Stock Toggle */}
                <label className="flex items-center gap-2 cursor-pointer text-zinc-700 hover:text-zinc-950 select-none font-medium">
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                    className="w-4 h-4 rounded border-zinc-300 text-orange-500 focus:ring-orange-500 cursor-pointer"
                  />
                  <span className="text-xs">Solo con stock ({products.filter((p) => p.inStock).length})</span>
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
                    <option value="destacados">Destacados & En Stock</option>
                    <option value="precio-menor">Precio: Menor a Mayor</option>
                    <option value="precio-mayor">Precio: Mayor a Menor</option>
                    <option value="nombre">Nombre (A - Z)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Load More Button */}
                {hasMoreToLoad && (
                  <div className="mt-12 text-center">
                    <button
                      onClick={handleLoadMore}
                      disabled={isLoadingMore}
                      className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-zinc-950 hover:bg-orange-500 text-white font-headline font-bold text-sm shadow-md hover:shadow-orange-500/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoadingMore ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Cargando más productos...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-orange-400" />
                          <span>Cargar más productos ({products.length} de {totalCount})</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* Empty State */
              <div className="py-20 text-center bg-zinc-50 rounded-3xl border border-zinc-200 flex flex-col items-center justify-center p-8">
                <div className="w-16 h-16 rounded-2xl bg-zinc-200 text-zinc-600 flex items-center justify-center mb-4">
                  <PackageOpen className="w-8 h-8 opacity-75" />
                </div>
                <h3 className="font-headline font-bold text-xl text-zinc-900 mb-2">
                  No encontramos productos para tu selección
                </h3>
                <p className="font-body text-sm text-zinc-500 max-w-md mb-6">
                  {searchQuery || selectedBrand || selectedCategory !== "todos" || selectedSubCategory
                    ? `No hay resultados coincidentes con los filtros seleccionados. Intenta con otra categoría, subcategoría o marca.`
                    : "No encontramos productos con los filtros seleccionados."}
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 rounded-full bg-zinc-950 hover:bg-orange-500 text-white font-headline font-bold text-xs shadow-sm transition-all"
                >
                  Restablecer Filtros y Categorías
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
