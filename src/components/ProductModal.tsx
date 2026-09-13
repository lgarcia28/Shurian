"use client";

import React, { useState, useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import { formatARS } from "@/utils/currency";
import { generateProductInquiryWhatsAppUrl } from "@/utils/whatsapp";
import {
  X,
  ShoppingCart,
  Check,
  ShieldCheck,
  MessageCircle,
  Plus,
  Minus,
} from "lucide-react";

export const ProductModal: React.FC = () => {
  const {
    selectedProductForQuickView,
    setSelectedProductForQuickView,
    addItem,
  } = useCartStore();

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setQuantity(1);
    setAdded(false);
  }, [selectedProductForQuickView]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProductForQuickView(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setSelectedProductForQuickView]);

  if (!selectedProductForQuickView) return null;

  const product = selectedProductForQuickView;

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setSelectedProductForQuickView(null);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setSelectedProductForQuickView(null)}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
      ></div>

      {/* Modal Dialog Content */}
      <div className="relative w-full max-w-3xl rounded-3xl bg-white border border-zinc-200 p-6 sm:p-8 shadow-2xl z-10 my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-zinc-900">
        
        {/* Close button */}
        <button
          onClick={() => setSelectedProductForQuickView(null)}
          className="absolute top-4 right-4 p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 transition-all z-20"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
          
          {/* Left: Product Image */}
          <div className="relative rounded-2xl overflow-hidden bg-zinc-50 border border-zinc-200 aspect-square sm:aspect-auto sm:h-full max-h-[380px]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            {product.badge && (
              <span className="absolute top-3 left-3 text-xs font-mono font-bold px-3 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-200 shadow-sm">
                {product.badge}
              </span>
            )}
          </div>

          {/* Right: Product Details */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Category */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono text-orange-600 font-bold uppercase tracking-wider">
                  {product.categoryLabel}
                </span>
                <span className="text-xs text-zinc-500 font-mono">
                  • {product.inStock ? "Stock en Bv. Segui 1501" : "Consultar stock"}
                </span>
              </div>

              {/* Title */}
              <h2 className="font-headline font-black text-xl sm:text-2xl text-zinc-950 mb-3 leading-snug">
                {product.name}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4 pb-4 border-b border-zinc-100">
                <span className="font-mono font-black text-2xl sm:text-3xl text-zinc-950">
                  {formatARS(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-zinc-400 line-through font-mono">
                    {formatARS(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="font-body text-sm text-zinc-600 mb-5 leading-relaxed">
                {product.description}
              </p>

              {/* Features List */}
              {product.features && product.features.length > 0 && (
                <div className="mb-5 space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
                    Destacados:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-zinc-700">
                    {product.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-orange-500 mt-0.5">•</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Specs Grid */}
              {product.specs && (
                <div className="mb-6 p-3 rounded-2xl bg-zinc-50 border border-zinc-200/70 space-y-1.5 text-xs">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="flex justify-between items-center py-0.5">
                      <span className="text-zinc-500">{key}:</span>
                      <span className="text-zinc-900 font-mono font-semibold text-right">{val}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Warranty */}
              {product.warranty && (
                <div className="flex items-center gap-2 text-xs text-zinc-600 mb-6">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{product.warranty}</span>
                </div>
              )}
            </div>

            {/* Actions: Quantity + Add to cart + WhatsApp */}
            <div className="space-y-3 pt-4 border-t border-zinc-100">
              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-full bg-zinc-100 border border-zinc-200 p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 rounded-full text-zinc-500 hover:text-zinc-950 hover:bg-zinc-200 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-mono font-bold text-sm text-zinc-950">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1.5 rounded-full text-zinc-500 hover:text-zinc-950 hover:bg-zinc-200 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3 px-6 rounded-full font-headline font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                    added
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "bg-zinc-950 hover:bg-orange-500 text-white shadow-sm active:scale-95"
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>¡Agregado al Carrito!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4 text-orange-400" />
                      <span>Agregar {quantity > 1 ? `(${quantity})` : ""}</span>
                    </>
                  )}
                </button>
              </div>

              {/* WhatsApp direct consult button */}
              <a
                href={generateProductInquiryWhatsAppUrl(product.name, product.price)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 font-semibold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Consultar disponibilidad por WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
