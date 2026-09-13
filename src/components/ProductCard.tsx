"use client";

import React, { useState } from "react";
import { Product } from "@/types";
import { useCartStore } from "@/store/useCartStore";
import { formatARS } from "@/utils/currency";
import { generateProductInquiryWhatsAppUrl } from "@/utils/whatsapp";
import {
  ShoppingCart,
  Check,
  Eye,
  MessageCircle,
} from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem, setSelectedProductForQuickView } = useCartStore();
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedProductForQuickView(product);
  };

  const badgeColorMap: Record<string, string> = {
    "MÁS VENDIDO": "bg-orange-50 text-orange-700 border-orange-200 font-bold",
    OFERTA: "bg-zinc-100 text-zinc-800 border-zinc-200 font-semibold",
    NUEVO: "bg-zinc-950 text-white border-zinc-950 font-bold",
    EXPRESS: "bg-orange-500 text-white border-orange-500 font-bold",
  };
  const currentBadgeClass = product.badge
    ? badgeColorMap[product.badge] || badgeColorMap["MÁS VENDIDO"]
    : "";

  const isLowStock =
    product.stockCount !== undefined &&
    product.stockCount <= 5 &&
    product.stockCount > 0;

  return (
    <div
      onClick={handleQuickView}
      className="group relative rounded-2xl minimal-card flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      {/* Top Media Area */}
      <div className="relative w-full h-52 sm:h-60 bg-zinc-50 overflow-hidden">
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span
              className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border shadow-sm ${currentBadgeClass}`}
            >
              {product.badge}
            </span>
          )}
          {isLowStock && (
            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 shadow-sm">
              ¡Últimas {product.stockCount} unid!
            </span>
          )}
        </div>

        {/* Quick View Button Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/25 backdrop-blur-[2px]">
          <button
            onClick={handleQuickView}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-zinc-900 border border-zinc-200 text-xs font-semibold hover:bg-zinc-950 hover:text-white transition-all shadow-md"
          >
            <Eye className="w-3.5 h-3.5 text-orange-500" />
            <span>Vista Rápida</span>
          </button>
        </div>

        {/* WhatsApp Direct Product Inquiry Icon */}
        <a
          href={generateProductInquiryWhatsAppUrl(product.name, product.price)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          title="Consultar por WhatsApp sobre este producto"
          className="absolute top-3 right-3 p-2 rounded-full bg-white/95 hover:bg-emerald-500 text-emerald-600 hover:text-white border border-zinc-200 shadow-sm transition-all z-10"
        >
          <MessageCircle className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Category Tag */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[11px] font-mono text-orange-600 uppercase tracking-wider font-bold">
              {product.categoryLabel}
            </span>
            <span className="text-[11px] text-zinc-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              {product.inStock ? "Disponible" : "Sin Stock"}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-headline font-bold text-base sm:text-lg text-zinc-900 group-hover:text-orange-600 transition-colors line-clamp-2 mb-1.5">
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="font-body text-xs text-zinc-500 line-clamp-2 mb-4 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price and Add to Cart Section */}
        <div className="pt-3 border-t border-zinc-100 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-xs text-zinc-400 line-through font-mono">
                {formatARS(product.originalPrice)}
              </span>
            )}
            <span className="font-mono font-black text-lg sm:text-xl text-zinc-950 tracking-tight">
              {formatARS(product.price)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
              justAdded
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-zinc-950 hover:bg-orange-500 text-white shadow-sm hover:shadow active:scale-95"
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>¡Listo!</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 text-orange-400" />
                <span className="hidden xs:inline sm:inline">Agregar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
