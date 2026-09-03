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
    "MÁS VENDIDO": "bg-orange-500/20 text-orange-300 border-orange-500/40",
    OFERTA: "bg-amber-500/20 text-amber-300 border-amber-400/40",
    NUEVO: "bg-blue-500/20 text-blue-300 border-blue-400/40",
    EXPRESS: "bg-orange-600/20 text-orange-400 border-orange-600/40",
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
      className="group relative rounded-2xl glass-panel hover:glass-panel-orange transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer border border-white/10 hover:border-orange-500/50"
    >
      {/* Top Media Area */}
      <div className="relative w-full h-52 sm:h-60 bg-navy-950 overflow-hidden">
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060b17] via-transparent to-black/20 opacity-85 group-hover:opacity-60 transition-opacity"></div>

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span
              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border shadow-sm ${currentBadgeClass}`}
            >
              {product.badge}
            </span>
          )}
          {isLowStock && (
            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
              ¡Últimas {product.stockCount} unid!
            </span>
          )}
        </div>

        {/* Quick View Button Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
          <button
            onClick={handleQuickView}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-navy-900 text-orange-300 border border-orange-500/40 text-xs font-semibold hover:bg-orange-500 hover:text-black transition-all shadow-glow-sm"
          >
            <Eye className="w-3.5 h-3.5" />
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
          className="absolute top-3 right-3 p-2 rounded-full bg-[#060b17]/85 hover:bg-emerald-500 text-emerald-400 hover:text-black border border-emerald-500/30 transition-all z-10"
        >
          <MessageCircle className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-[#0b1329]/40">
        <div>
          {/* Category Tag */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[11px] font-mono text-orange-400 uppercase tracking-wider font-semibold">
              {product.categoryLabel}
            </span>
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              {product.inStock ? "Disponible" : "Sin Stock"}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-headline font-bold text-base sm:text-lg text-white group-hover:text-orange-300 transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="font-body text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price and Add to Cart Section */}
        <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-xs text-slate-500 line-through font-mono">
                {formatARS(product.originalPrice)}
              </span>
            )}
            <span className="font-mono font-extrabold text-lg sm:text-xl text-orange-400 tracking-tight">
              {formatARS(product.price)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
              justAdded
                ? "bg-emerald-500 text-black border border-emerald-400 shadow-sm"
                : "bg-orange-500 hover:bg-orange-400 text-black shadow-glow-sm hover:shadow-glow active:scale-95"
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>¡Listo!</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden xs:inline sm:inline">Agregar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
