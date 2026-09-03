export type ProductCategory =
  | "todos"
  | "celulares"
  | "notebooks-pc"
  | "perifericos"
  | "cables-cargadores"
  | "fundas-vidrios"
  | "audio"
  | "servicio-tecnico";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  description: string;
  price: number; // in ARS
  originalPrice?: number; // for discount badges
  image: string;
  inStock: boolean;
  stockCount?: number;
  badge?: "NUEVO" | "OFERTA" | "MÁS VENDIDO" | "EXPRESS";
  features?: string[];
  specs?: Record<string, string>;
  warranty?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type DeliveryMethod = "retiro" | "envio";
export type PaymentMethod = "transferencia" | "efectivo" | "tarjeta";

export interface CheckoutData {
  customerName: string;
  customerPhone: string;
  deliveryMethod: DeliveryMethod;
  deliveryAddress?: string;
  paymentMethod: PaymentMethod;
  notes?: string;
}

export type DeviceType = "celular" | "notebook" | "pc-escritorio" | "tablet" | "consola";

export interface RepairInquiry {
  deviceType: DeviceType;
  brandModel: string;
  issueType: string;
  description: string;
  customerName: string;
  customerPhone?: string;
  urgency: "normal" | "urgente";
}
