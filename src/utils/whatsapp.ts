import { CartItem, CheckoutData, RepairInquiry } from "@/types";
import { formatARS } from "./currency";

export const SHURIAN_WHATSAPP_NUMBER = "5493417551501";
export const SHURIAN_PHONE_DISPLAY = "341 755-1501";
export const SHURIAN_ADDRESS = "Bv. Segui 1501, Rosario, Santa Fe";
export const SHURIAN_INSTAGRAM = "https://www.instagram.com/shurian.pc/";

/**
 * Builds the WhatsApp direct order link based on cart items and customer details.
 */
export function generateCartWhatsAppUrl(
  items: CartItem[],
  total: number,
  checkout: CheckoutData
): string {
  const itemsList = items
    .map(
      (item) =>
        `- ${item.quantity}x ${item.product.name} (${formatARS(
          item.product.price * item.quantity
        )})`
    )
    .join("\n");

  const methodText =
    checkout.deliveryMethod === "retiro"
      ? `Retiro en local (${SHURIAN_ADDRESS})`
      : `Envío a acordar en Rosario${
          checkout.deliveryAddress ? ` - Destino: ${checkout.deliveryAddress}` : ""
        }`;

  const paymentText =
    checkout.paymentMethod === "transferencia"
      ? "Transferencia bancaria / Alias"
      : checkout.paymentMethod === "efectivo"
      ? "Efectivo"
      : "Tarjeta de débito/crédito";

  const messageLines = [
    "¡Hola Shurian! Quiero hacer el siguiente pedido:",
    itemsList,
    "",
    `Total estimado: ${formatARS(total)}`,
    `Cliente: ${checkout.customerName.trim()}`,
    checkout.customerPhone ? `Teléfono: ${checkout.customerPhone.trim()}` : "",
    `Método: ${methodText}`,
    `Forma de pago: ${paymentText}`,
  ];

  if (checkout.notes && checkout.notes.trim()) {
    messageLines.push(`Notas adicionales: ${checkout.notes.trim()}`);
  }

  const message = messageLines.filter(Boolean).join("\n");
  return `https://wa.me/${SHURIAN_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message
  )}`;
}

/**
 * Builds the WhatsApp technical repair inquiry link.
 */
export function generateRepairWhatsAppUrl(inquiry: RepairInquiry): string {
  const deviceLabels: Record<string, string> = {
    celular: "Celular / Smartphone",
    notebook: "Notebook / Laptop",
    "pc-escritorio": "PC de Escritorio / Gamer",
    tablet: "Tablet / iPad",
    consola: "Consola de Videojuegos",
  };

  const deviceText = deviceLabels[inquiry.deviceType] || inquiry.deviceType;

  const lines = [
    "¡Hola Shurian! Quiero consultar por un servicio técnico:",
    `• Dispositivo: ${deviceText}`,
    `• Marca y Modelo: ${inquiry.brandModel.trim()}`,
    `• Falla / Problema: ${inquiry.issueType}`,
  ];

  if (inquiry.description && inquiry.description.trim()) {
    lines.push(`• Detalle: ${inquiry.description.trim()}`);
  }

  if (inquiry.customerName && inquiry.customerName.trim()) {
    lines.push(`• Cliente: ${inquiry.customerName.trim()}`);
  }

  if (inquiry.urgency === "urgente") {
    lines.push("• Prioridad: Urgente (necesito en el día si es posible)");
  }

  lines.push("", "¿Me podrían indicar costo estimado y demora? Muchas gracias!");

  const message = lines.join("\n");
  return `https://wa.me/${SHURIAN_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message
  )}`;
}

/**
 * Direct inquiry link for a single product.
 */
export function generateProductInquiryWhatsAppUrl(
  productName: string,
  price: number
): string {
  const message = `¡Hola Shurian! Estoy viendo en su web el producto "${productName}" (${formatARS(
    price
  )}) y quería consultar si tienen stock disponible y qué formas de pago tienen. ¡Gracias!`;

  return `https://wa.me/${SHURIAN_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message
  )}`;
}
