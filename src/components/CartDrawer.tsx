"use client";

import React, { useState, useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import { formatARS } from "@/utils/currency";
import { generateCartWhatsAppUrl, SHURIAN_ADDRESS } from "@/utils/whatsapp";
import { CheckoutData, PaymentMethod } from "@/types";
import {
  X,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  ShoppingBag,
  Store,
  Truck,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
    getTotalPrice,
    getTotalItems,
  } = useCartStore();

  const [checkoutStep, setCheckoutStep] = useState<"cart" | "checkout">("cart");
  const [formData, setFormData] = useState<CheckoutData>({
    customerName: "",
    customerPhone: "",
    deliveryMethod: "retiro",
    deliveryAddress: "",
    paymentMethod: "transferencia",
    notes: "",
  });
  const [validationError, setValidationError] = useState("");

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setCheckoutStep("cart");
      setValidationError("");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const handleProceedToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName.trim()) {
      setValidationError("Por favor, ingresa tu nombre para el pedido.");
      return;
    }
    if (formData.deliveryMethod === "envio" && !formData.deliveryAddress?.trim()) {
      setValidationError("Por favor, ingresa la dirección o barrio para el envío en Rosario.");
      return;
    }

    setValidationError("");
    const url = generateCartWhatsAppUrl(items, totalPrice, formData);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
      ></div>

      {/* Slide-out Drawer */}
      <aside className="relative w-full max-w-md bg-[#0b1329] border-l border-orange-500/25 shadow-2xl flex flex-col h-full z-10 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#060b17]/90 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-orange-500/15 text-orange-400 border border-orange-500/30">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-headline font-bold text-lg text-white">
                {checkoutStep === "cart" ? "Tu Carrito" : "Finalizar Pedido"}
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                {totalItems} {totalItems === 1 ? "ítem" : "ítems"} seleccionados
              </p>
            </div>
          </div>

          <button
            onClick={closeCart}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Cerrar carrito"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            /* Empty Cart View */
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-orange-500/10 text-orange-400 border border-orange-500/20 flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 opacity-60" />
              </div>
              <h3 className="font-headline font-bold text-lg text-white">
                Tu carrito está vacío
              </h3>
              <p className="text-xs text-slate-400 max-w-xs">
                Explora nuestros accesorios para celulares, periféricos y repuestos para comenzar tu pedido.
              </p>
              <button
                onClick={closeCart}
                className="mt-2 px-5 py-2.5 rounded-xl bg-orange-500 text-black font-headline font-bold text-xs shadow-glow transition-all"
              >
                Ver Catálogo
              </button>
            </div>
          ) : checkoutStep === "cart" ? (
            /* Items List View */
            <div className="space-y-3">
              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="p-3.5 rounded-2xl glass-panel border border-white/5 flex gap-3 items-center group hover:border-orange-500/30 transition-colors"
                >
                  {/* Thumbnail */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-xl object-cover bg-navy-950 shrink-0 border border-white/10"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-semibold text-white truncate group-hover:text-orange-300 transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-xs font-mono text-orange-400 mt-0.5">
                      {formatARS(product.price)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center rounded-lg bg-navy-950 border border-white/10 p-0.5">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="p-1 text-slate-400 hover:text-white rounded transition-colors"
                          aria-label="Disminuir cantidad"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center font-mono font-bold text-xs text-white">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="p-1 text-slate-400 hover:text-white rounded transition-colors"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(product.id)}
                        className="text-slate-500 hover:text-rose-400 text-xs p-1 transition-colors"
                        title="Eliminar producto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Subtotal Item */}
                  <div className="text-right font-mono text-xs font-bold text-slate-200">
                    {formatARS(product.price * quantity)}
                  </div>
                </div>
              ))}

              <div className="pt-2 flex justify-end">
                <button
                  onClick={clearCart}
                  className="text-xs text-slate-500 hover:text-rose-400 flex items-center gap-1 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Vaciar carrito</span>
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form View */
            <form id="checkout-form" onSubmit={handleProceedToWhatsApp} className="space-y-4 text-xs sm:text-sm">
              {validationError && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 flex items-center gap-2 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}

              {/* Customer Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Tu Nombre y Apellido <span className="text-orange-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={(e) =>
                    setFormData({ ...formData, customerName: e.target.value })
                  }
                  placeholder="Ej: Juan Pérez"
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
                />
              </div>

              {/* Customer Phone */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Teléfono / WhatsApp de contacto (Opcional)
                </label>
                <input
                  type="tel"
                  value={formData.customerPhone}
                  onChange={(e) =>
                    setFormData({ ...formData, customerPhone: e.target.value })
                  }
                  placeholder="Ej: 341 612-3456"
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
                />
              </div>

              {/* Delivery Method */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Método de Entrega <span className="text-orange-400">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, deliveryMethod: "retiro" })
                    }
                    className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      formData.deliveryMethod === "retiro"
                        ? "bg-orange-500/15 border-orange-500 text-white shadow-glow-sm"
                        : "glass-panel border-white/5 text-slate-400 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 text-orange-400 font-semibold text-xs">
                      <Store className="w-4 h-4" />
                      <span>Retiro en Local</span>
                    </div>
                    <span className="text-[11px] text-slate-300">
                      Bv. Segui 1501 (Sin costo)
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, deliveryMethod: "envio" })
                    }
                    className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      formData.deliveryMethod === "envio"
                        ? "bg-orange-500/15 border-orange-500 text-white shadow-glow-sm"
                        : "glass-panel border-white/5 text-slate-400 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 text-orange-400 font-semibold text-xs">
                      <Truck className="w-4 h-4" />
                      <span>Envío en Rosario</span>
                    </div>
                    <span className="text-[11px] text-slate-300">
                      Cadetería a convenir
                    </span>
                  </button>
                </div>
              </div>

              {/* Delivery Address */}
              {formData.deliveryMethod === "envio" && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Dirección de entrega y barrio en Rosario <span className="text-orange-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.deliveryAddress}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        deliveryAddress: e.target.value,
                      })
                    }
                    placeholder="Ej: Italia 2906, Piso 2 o Barrio Echesortu"
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                  />
                </div>
              )}

              {/* Payment Method */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Forma de Pago Preferida
                </label>
                <select
                  value={formData.paymentMethod}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      paymentMethod: e.target.value as PaymentMethod,
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs bg-navy-950 cursor-pointer"
                >
                  <option value="transferencia">Transferencia bancaria / Alias (0% recargo)</option>
                  <option value="efectivo">Efectivo al retirar / recibir</option>
                  <option value="tarjeta">Tarjeta de débito / crédito</option>
                </select>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Notas u Observaciones (Opcional)
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  placeholder="Ej: Modelo exacto de mi celular, horario en que puedo retirar, etc."
                  className="w-full px-3.5 py-2 rounded-xl glass-input text-xs resize-none"
                ></textarea>
              </div>
            </form>
          )}
        </div>

        {/* Footer with Subtotal, Total, & WhatsApp Action Button */}
        {items.length > 0 && (
          <div className="p-5 border-t border-white/10 bg-[#060b17]/95 backdrop-blur-md space-y-4">
            {/* Price Breakdown */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal ({totalItems} productos):</span>
                <span className="font-mono text-slate-200">{formatARS(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Entrega:</span>
                <span className="text-orange-400 font-mono">
                  {formData.deliveryMethod === "retiro"
                    ? "Gratis en local"
                    : "A coordinar por WhatsApp"}
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-white/10 font-bold text-base text-white">
                <span className="font-headline">Total Estimado:</span>
                <span className="font-mono text-xl text-orange-400">
                  {formatARS(totalPrice)}
                </span>
              </div>
            </div>

            {/* Buttons */}
            {checkoutStep === "cart" ? (
              <button
                onClick={() => setCheckoutStep("checkout")}
                className="w-full py-3.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-headline font-bold text-sm shadow-glow flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <span>Continuar al Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="space-y-2">
                <button
                  type="submit"
                  form="checkout-form"
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-headline font-black text-sm shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2.5 transition-all active:scale-95"
                >
                  <MessageCircle className="w-5 h-5 fill-black" />
                  <span>Confirmar pedido por WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCheckoutStep("cart")}
                  className="w-full py-2 text-center text-xs text-slate-400 hover:text-orange-400 transition-colors"
                >
                  ← Volver a modificar productos
                </button>
              </div>
            )}
          </div>
        )}

      </aside>
    </div>
  );
};
