"use client";

import React, { useState } from "react";
import { ElitCategoryItem } from "@/services/elit";
import {
  ChevronDown,
  ChevronRight,
  SlidersHorizontal,
  X,
  Laptop,
  Cpu,
  HardDrive,
  Headphones,
  Mouse,
  Wifi,
  Monitor,
  Printer,
  ShieldCheck,
  Zap,
  Gamepad2,
  Package,
  Layers,
  Briefcase,
  Droplets,
  BatteryCharging,
  Terminal,
  Cable,
  Wrench,
  Smartphone,
  Shield,
  LayoutGrid,
} from "lucide-react";

interface CatalogSidebarProps {
  categories: ElitCategoryItem[];
  selectedCategory: string;
  selectedSubCategory: string;
  onSelectCategory: (category: string, subCategory?: string) => void;
  onReset: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

// Map category names to Lucide icons
const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Accesorios: <Package className="w-4 h-4" />,
  Almacenamiento: <HardDrive className="w-4 h-4" />,
  Audio: <Headphones className="w-4 h-4" />,
  Cables: <Cable className="w-4 h-4" />,
  Computadoras: <Laptop className="w-4 h-4" />,
  Conectividad: <Wifi className="w-4 h-4" />,
  Estuches: <Briefcase className="w-4 h-4" />,
  Hardware: <Cpu className="w-4 h-4" />,
  Imagen: <Monitor className="w-4 h-4" />,
  Impresoras: <Printer className="w-4 h-4" />,
  Insumos: <Droplets className="w-4 h-4" />,
  Memorias: <Layers className="w-4 h-4" />,
  Periféricos: <Mouse className="w-4 h-4" />,
  Seguridad: <ShieldCheck className="w-4 h-4" />,
  Simuladores: <Gamepad2 className="w-4 h-4" />,
  Software: <Terminal className="w-4 h-4" />,
  "Unidad de Energia": <BatteryCharging className="w-4 h-4" />,
  "Video Juegos": <Gamepad2 className="w-4 h-4" />,
  // Local store special categories
  "Servicio Técnico": <Wrench className="w-4 h-4" />,
  "Celulares & Fundas": <Smartphone className="w-4 h-4" />,
};

export const CatalogSidebar: React.FC<CatalogSidebarProps> = ({
  categories,
  selectedCategory,
  selectedSubCategory,
  onSelectCategory,
  onReset,
  isOpenMobile,
  onCloseMobile,
}) => {
  // Track open state of category accordions
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(() => {
    // If a category is selected on mount, open its accordion
    if (selectedCategory && selectedCategory !== "todos") {
      return { [selectedCategory]: true };
    }
    return {};
  });

  const toggleAccordion = (catName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenCategories((prev) => ({
      ...prev,
      [catName]: !prev[catName],
    }));
  };

  const handleCategoryClick = (catName: string) => {
    // Open accordion when selecting category
    setOpenCategories((prev) => ({
      ...prev,
      [catName]: true,
    }));
    onSelectCategory(catName);
    onCloseMobile();
  };

  const handleSubCategoryClick = (catName: string, subCatName: string) => {
    onSelectCategory(catName, subCatName);
    onCloseMobile();
  };

  const content = (
    <div className="flex flex-col w-full">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between pb-3.5 mb-2 border-b border-zinc-200/80">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-orange-500" />
          <h3 className="font-headline font-bold text-sm text-zinc-950 uppercase tracking-wider">
            Categorías
          </h3>
        </div>
        {(selectedCategory !== "todos" || selectedSubCategory) && (
          <button
            onClick={() => {
              onReset();
              onCloseMobile();
            }}
            className="text-xs text-orange-600 hover:text-orange-700 font-medium transition-colors"
          >
            Limpiar filtro
          </button>
        )}
      </div>

      {/* Categories List */}
      <div className="space-y-1">
        {/* All products button */}
        <button
          onClick={() => {
            onReset();
            onCloseMobile();
          }}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
            selectedCategory === "todos" && !selectedSubCategory
              ? "bg-zinc-950 text-white font-bold shadow-sm"
              : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <LayoutGrid className={`w-4 h-4 ${selectedCategory === "todos" ? "text-orange-400" : "text-zinc-400"}`} />
            <span>Todos los productos</span>
          </div>
        </button>

        {/* Local Store Special: Servicio Técnico */}
        <button
          onClick={() => handleCategoryClick("servicio-tecnico")}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
            selectedCategory === "servicio-tecnico"
              ? "bg-zinc-950 text-white font-bold shadow-sm"
              : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Wrench className={`w-4 h-4 ${selectedCategory === "servicio-tecnico" ? "text-orange-400" : "text-zinc-400"}`} />
            <span>Servicio Técnico</span>
          </div>
        </button>

        {/* Dynamic Categories from Supplier */}
        {categories.map((cat) => {
          const isCatSelected = selectedCategory.toLowerCase() === cat.nombre.toLowerCase();
          const hasSub = cat.sub_categorias && cat.sub_categorias.length > 0;
          const isOpen = openCategories[cat.nombre] || isCatSelected;

          return (
            <div key={cat.uri || cat.nombre} className="rounded-xl overflow-hidden">
              <div
                onClick={() => handleCategoryClick(cat.nombre)}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium cursor-pointer transition-all rounded-xl select-none ${
                  isCatSelected && !selectedSubCategory
                    ? "bg-zinc-950 text-white font-bold shadow-sm"
                    : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950"
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className={isCatSelected ? "text-orange-400" : "text-zinc-400"}>
                    {CATEGORY_ICONS[cat.nombre] || <Package className="w-4 h-4" />}
                  </span>
                  <span className="truncate">{cat.nombre}</span>
                </div>

                {hasSub && (
                  <button
                    onClick={(e) => toggleAccordion(cat.nombre, e)}
                    className="p-1 text-zinc-400 hover:text-zinc-600 rounded-lg hover:bg-zinc-200/50 transition-colors ml-1"
                    title="Ver subcategorías"
                  >
                    {isOpen ? (
                      <ChevronDown className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5" />
                    )}
                  </button>
                )}
              </div>

              {/* Subcategories Collapsible List */}
              {hasSub && isOpen && (
                <div className="pl-7 pr-2 py-1 my-0.5 space-y-0.5 border-l-2 border-orange-200/60 ml-4">
                  {cat.sub_categorias.map((sub) => {
                    const isSubSelected =
                      selectedSubCategory.toLowerCase() === sub.nombre.toLowerCase();

                    return (
                      <button
                        key={sub.uri || sub.nombre}
                        onClick={() => handleSubCategoryClick(cat.nombre, sub.nombre)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] transition-all truncate block ${
                          isSubSelected
                            ? "bg-orange-50 text-orange-700 font-bold border border-orange-200"
                            : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
                        }`}
                        title={sub.nombre}
                      >
                        {sub.nombre}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Left Sidebar - flows naturally with page scroll */}
      <aside className="hidden lg:block w-64 xl:w-72 shrink-0 bg-white border border-zinc-200/80 rounded-3xl p-4 shadow-xs self-start">
        {content}
      </aside>

      {/* Mobile Drawer (Slide-Over) */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-zinc-950/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />

          {/* Drawer content */}
          <div className="relative ml-0 mr-auto w-4/5 max-w-xs h-full bg-white shadow-2xl p-5 flex flex-col z-10 animate-in slide-in-from-left duration-200 overflow-y-auto">
            <button
              onClick={onCloseMobile}
              className="absolute right-4 top-4 p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="pt-2">{content}</div>
          </div>
        </div>
      )}
    </>
  );
};
