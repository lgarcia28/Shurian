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
        className="fixed inset-0 bg-black/35 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
      ></div>

      {/* Slide-out Drawer */}
      <aside className="relative w-full max-w-md bg-white border-l border-zinc-200 shadow-2xl flex flex-col h-full z-10 animate-in slide-in-from-right duration-300 text-zinc-900">
        
        {/* Header */}
        <div className="p-5 border-b border-zinc-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-orange-50 text-orange-600 border border-orange-200">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-headline font-bold text-lg text-zinc-950">
                {checkoutStep === "cart" ? "Tu Carrito" : "Finalizar Pedido"}
              </h2>
              <p className="text-xs text-zinc-500 font-mono">
                {totalItems} {totalItems === 1 ? "ítem" : "ítems"} seleccionados
              </p>
            </div>
          </div>

          <button
            onClick={closeCart}
            className="p-2 rounded-full text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
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
              <div className="w-16 h-16 rounded-2xl bg-zinc-100 text-zinc-500 flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 opacity-60" />
              </div>
              <h3 className="font-headline font-bold text-lg text-zinc-900">
                Tu carrito está vacío
              </h3>
              <p className="text-xs text-zinc-500 max-w-xs">
                Explora nuestros accesorios para celulares, periféricos y repuestos para comenzar tu pedido.
              </p>
              <button
                onClick={closeCart}
                className="mt-2 px-6 py-2.5 rounded-full bg-zinc-950 hover:bg-orange-500 text-white font-headline font-bold text-xs shadow-sm transition-all"
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
                  className="p-3.5 rounded-2xl bg-zinc-50/90 border border-zinc-200/80 flex gap-3 items-center group hover:border-zinc-300 transition-colors"
                >
                  {/* Thumbnail */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-xl object-cover bg-white shrink-0 border border-zinc-200"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-semibold text-zinc-900 truncate group-hover:text-orange-600 transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-xs font-mono text-zinc-950 font-bold mt-0.5">
                      {formatARS(product.price)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center rounded-full bg-white border border-zinc-200 p-0.5">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="p-1 text-zinc-400 hover:text-zinc-900 rounded-full transition-colors"
                          aria-label="Disminuir cantidad"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center font-mono font-bold text-xs text-zinc-900">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="p-1 text-zinc-400 hover:text-zinc-900 rounded-full transition-colors"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(product.id)}
                        className="text-zinc-400 hover:text-rose-500 text-xs p-1 transition-colors"
                        title="Eliminar producto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Subtotal Item */}
                  <div className="text-right font-mono text-xs font-black text-zinc-950">
                    {formatARS(product.price * quantity)}
                  </div>
                </div>
              ))}

              <div className="pt-2 flex justify-end">
                <button
                  onClick={clearCart}
                  className="text-xs text-zinc-400 hover:text-rose-600 flex items-center gap-1 transition-colors font-medium"
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
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center gap-2 text-xs font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>{validationError}</span>
                </div>
              )}

              {/* Customer Name */}
              <div>
                <label className="block text-xs font-semibold text-zinc-800 mb-1.5">
                  Tu Nombre y Apellido <span className="text-orange-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={(e) =>
                    setFormData({ ...formData, customerName: e.target.value })
                  }
                  placeholder="Ej: Juan Pérez"
                  className="w-full px-3.5 py-2.5 rounded-xl minimal-input text-xs sm:text-sm"
                />
              </div>

              {/* Customer Phone */}
              <div>
                <label className="block text-xs font-semibold text-zinc-800 mb-1.5">
                  Teléfono / WhatsApp de contacto (Opcional)
                </label>
                <input
                  type="tel"
                  value={formData.customerPhone}
                  onChange={(e) =>
                    setFormData({ ...formData, customerPhone: e.target.value })
                  }
                  placeholder="Ej: 341 612-3456"
                  className="w-full px-3.5 py-2.5 rounded-xl minimal-input text-xs sm:text-sm"
                />
              </div>

              {/* Delivery Method */}
              <div>
                <label className="block text-xs font-semibold text-zinc-800 mb-2">
                  Método de Entrega <span className="text-orange-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, deliveryMethod: "retiro" })
                    }
                    className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      formData.deliveryMethod === "retiro"
                        ? "bg-orange-50/70 border-orange-500 text-zinc-950 shadow-sm"
                        : "bg-zinc-50 border-zinc-200 text-zinc-600 hover:border-zinc-300"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 text-orange-600 font-bold text-xs">
                      <Store className="w-4 h-4" />
                      <span>Retiro en Local</span>
                    </div>
                    <span className="text-[11px] text-zinc-600">
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
                        ? "bg-orange-50/70 border-orange-500 text-zinc-950 shadow-sm"
                        : "bg-zinc-50 border-zinc-200 text-zinc-600 hover:border-zinc-300"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 text-orange-600 font-bold text-xs">
                      <Truck className="w-4 h-4" />
                      <span>Envío en Rosario</span>
                    </div>
                    <span className="text-[11px] text-zinc-600">
                      Cadetería a convenir
                    </span>
                  </button>
                </div>
              </div>

              {/* Delivery Address */}
              {formData.deliveryMethod === "envio" && (
                <div>
                  <label className="block text-xs font-semibold text-zinc-800 mb-1.5">
                    Dirección de entrega y barrio en Rosario <span className="text-orange-500">*</span>
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
                    className="w-full px-3.5 py-2.5 rounded-xl minimal-input text-xs"
                  />
                </div>
              )}

              {/* Payment Method */}
              <div>
                <label className="block text-xs font-semibold text-zinc-800 mb-1.5">
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
                  className="w-full px-3.5 py-2.5 rounded-xl minimal-input text-xs bg-white cursor-pointer"
                >
                  <option value="transferencia">Transferencia bancaria / Alias (0% recargo)</option>
                  <option value="efectivo">Efectivo al retirar / recibir</option>
                  <option value="tarjeta">Tarjeta de débito / crédito</option>
                </select>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-zinc-800 mb-1.5">
                  Notas u Observaciones (Opcional)
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  placeholder="Ej: Modelo exacto de mi celular, horario en que puedo retirar, etc."
                  className="w-full px-3.5 py-2 rounded-xl minimal-input text-xs resize-none"
                ></textarea>
              </div>
            </form>
          )}
        </div>

        {/* Footer with Subtotal, Total, & WhatsApp Action Button */}
        {items.length > 0 && (
          <div className="p-5 border-t border-zinc-100 bg-zinc-50/80 space-y-4">
            {/* Price Breakdown */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-zinc-500">
                <span>Subtotal ({totalItems} productos):</span>
                <span className="font-mono text-zinc-900 font-semibold">{formatARS(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-zinc-500">
                <span>Entrega:</span>
                <span className="text-zinc-950 font-medium">
                  {formData.deliveryMethod === "retiro"
                    ? "Gratis en local"
                    : "A coordinar por WhatsApp"}
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-zinc-200 font-bold text-base text-zinc-950">
                <span className="font-headline font-black">Total Estimado:</span>
                <span className="font-mono text-xl text-zinc-950 font-black">
                  {formatARS(totalPrice)}
                </span>
              </div>
            </div>

            {/* Buttons */}
            {checkoutStep === "cart" ? (
              <button
                onClick={() => setCheckoutStep("checkout")}
                className="w-full py-3.5 px-4 rounded-xl bg-zinc-950 hover:bg-orange-500 text-white font-headline font-bold text-sm shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <span>Continuar al Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="space-y-2">
                <button
                  type="submit"
                  form="checkout-form"
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-headline font-bold text-sm shadow-sm flex items-center justify-center gap-2.5 transition-all active:scale-95"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Confirmar pedido por WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCheckoutStep("cart")}
                  className="w-full py-2 text-center text-xs text-zinc-500 hover:text-zinc-900 transition-colors font-medium"
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
