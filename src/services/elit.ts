import { Product, ProductCategory } from "@/types";

export interface ElitProductRaw {
  id: number;
  codigo_alfa?: string;
  codigo_producto?: string;
  nombre: string;
  categoria: string;
  sub_categoria?: string;
  marca: string;
  precio: number;
  impuesto_interno?: number;
  iva?: number;
  moneda?: number;
  markup?: number;
  cotizacion?: number;
  pvp_usd?: number;
  pvp_ars: number;
  peso?: number;
  stock_total: number;
  garantia?: string;
  link?: string;
  uri?: string;
  imagenes?: string[];
  miniaturas?: string[];
  atributos?: { atributo: string; valor: string }[];
  gamer?: boolean;
  descripcion?: string;
}

export interface ElitApiResponse {
  codigo: number;
  paginador: {
    total: number;
    limit: number;
    offset: number;
  };
  resultado: ElitProductRaw[];
}

// Map Elit's categories to Shurian's category system
export function mapElitCategory(categoria: string, subCategoria?: string): { category: ProductCategory; label: string } {
  const catLower = (categoria || "").toLowerCase();
  const subLower = (subCategoria || "").toLowerCase();

  // Celulares & Accesorios Mobile
  if (catLower.includes("celular") || subLower.includes("celular") || subLower.includes("smartphone")) {
    return { category: "celulares", label: "Celulares & Telefonía" };
  }

  // Fundas, Vidrios & Estuches
  if (catLower.includes("estuche") || subLower.includes("funda") || subLower.includes("vidrio") || subLower.includes("templado")) {
    return { category: "fundas-vidrios", label: "Fundas & Vidrios" };
  }

  // Cables & Cargadores
  if (catLower.includes("cable") || subLower.includes("cargador") || catLower.includes("unidad de energia") || subLower.includes("ups") || subLower.includes("fuente")) {
    return { category: "cables-cargadores", label: "Cables & Cargadores" };
  }

  // Audio & Sonido
  if (catLower.includes("audio") || subLower.includes("auricular") || subLower.includes("parlante") || subLower.includes("soundbar")) {
    return { category: "audio", label: "Audio & Parlantes" };
  }

  // Computadoras, Notebooks & PC
  if (catLower.includes("computadora") || subLower.includes("notebook") || subLower.includes("aio") || subLower.includes("all in one") || subLower.includes("pc")) {
    return { category: "notebooks-pc", label: "Notebooks & PC" };
  }

  // Hardware & Componentes
  if (catLower.includes("hardware") || catLower.includes("almacenamiento") || catLower.includes("memorias")) {
    return { category: "notebooks-pc", label: "Hardware & Componentes" };
  }

  // Periféricos & Gaming (default para mouse, teclado, webcams, accesorios, etc.)
  if (catLower.includes("perif") || catLower.includes("accesorio") || catLower.includes("video juego") || catLower.includes("simulador")) {
    return { category: "perifericos", label: "Periféricos & Gaming" };
  }

  return { category: "perifericos", label: categoria || "Tecnología" };
}

// Convert raw Elit product into Shurian Product
export function transformElitProduct(raw: ElitProductRaw): Product {
  const { category, label } = mapElitCategory(raw.categoria, raw.sub_categoria);

  const image =
    (raw.imagenes && raw.imagenes.length > 0 && raw.imagenes[0]) ||
    (raw.miniaturas && raw.miniaturas.length > 0 && raw.miniaturas[0]) ||
    "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=800&auto=format&fit=crop";

  // Build spec dictionary from attributes
  const specs: Record<string, string> = {};
  if (raw.marca) specs["Marca"] = raw.marca;
  if (raw.codigo_alfa) specs["Código / SKU"] = raw.codigo_alfa;
  if (raw.sub_categoria) specs["Subcategoría"] = raw.sub_categoria;
  if (raw.atributos && Array.isArray(raw.atributos)) {
    raw.atributos.forEach((item) => {
      if (item.atributo && item.valor) {
        specs[item.atributo] = item.valor;
      }
    });
  }

  // Features list
  const features: string[] = [];
  if (raw.marca) features.push(`Marca oficial ${raw.marca}`);
  if (raw.gamer) features.push("Línea Gamer de alto rendimiento");
  if (raw.garantia) features.push(`Garantía oficial de ${raw.garantia} meses`);
  if (raw.atributos && Array.isArray(raw.atributos)) {
    raw.atributos.slice(0, 3).forEach((item) => {
      if (item.atributo && item.valor) {
        features.push(`${item.atributo}: ${item.valor}`);
      }
    });
  }

  // Badge logic
  let badge: "NUEVO" | "OFERTA" | "MÁS VENDIDO" | "EXPRESS" | undefined = undefined;
  if (raw.gamer) {
    badge = "NUEVO";
  } else if (raw.stock_total > 15) {
    badge = "MÁS VENDIDO";
  } else if (raw.stock_total > 0 && raw.stock_total <= 3) {
    badge = "EXPRESS";
  }

  // Final Price in ARS rounded
  const finalPrice = Math.round(raw.pvp_ars || 0);

  return {
    id: `elit-${raw.id}`,
    name: raw.nombre,
    category,
    categoryLabel: `${raw.categoria}${raw.sub_categoria ? ` › ${raw.sub_categoria}` : ""}`,
    description: raw.descripcion || `${raw.nombre} - Marca ${raw.marca}. Producto 100% original con garantía oficial.`,
    price: finalPrice,
    originalPrice: finalPrice > 0 ? Math.round(finalPrice * 1.12) : undefined, // Precio de lista referencial
    image,
    inStock: (raw.stock_total || 0) > 0,
    stockCount: raw.stock_total || 0,
    badge,
    features: features.length > 0 ? features : undefined,
    specs: Object.keys(specs).length > 0 ? specs : undefined,
    warranty: raw.garantia ? `${raw.garantia} meses de garantía oficial` : "Garantía oficial Shurian",
  };
}

export interface FetchElitParams {
  limit?: number;
  offset?: number;
  nombre?: string;
  categoria?: string;
  sub_categoria?: string;
  marca?: string;
}

export async function fetchElitProducts(params: FetchElitParams = {}): Promise<{
  products: Product[];
  total: number;
  offset: number;
  limit: number;
}> {
  const apiUrl = process.env.ELIT_API_URL || "https://clientes.elit.com.ar/v1/api/productos";
  const userId = Number(process.env.ELIT_USER_ID || 28435);
  const token = process.env.ELIT_TOKEN || "seup3oavav";

  const queryParams = new URLSearchParams();
  const limit = Math.min(params.limit || 100, 100);
  queryParams.set("limit", limit.toString());

  if (params.offset !== undefined && params.offset > 0) {
    queryParams.set("offset", params.offset.toString());
  }
  if (params.nombre && params.nombre.trim()) {
    queryParams.set("nombre", params.nombre.trim());
  }
  if (params.categoria && params.categoria.trim()) {
    queryParams.set("categoria", params.categoria.trim());
  }
  if (params.sub_categoria && params.sub_categoria.trim()) {
    queryParams.set("sub_categoria", params.sub_categoria.trim());
  }
  if (params.marca && params.marca.trim()) {
    queryParams.set("marca", params.marca.trim());
  }

  const fullUrl = `${apiUrl}?${queryParams.toString()}`;

  try {
    const res = await fetch(fullUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        token: token,
      }),
      // Cache data for 300 seconds (5 minutes) for real-time freshness with high-speed response
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      console.error(`[Elit API] Error ${res.status}: ${res.statusText}`);
      return { products: [], total: 0, offset: 0, limit };
    }

    const data: ElitApiResponse = await res.json();

    if (!data.resultado || !Array.isArray(data.resultado)) {
      console.warn("[Elit API] Respuesta sin resultado:", data);
      return { products: [], total: 0, offset: 0, limit };
    }

    const products = data.resultado.map(transformElitProduct);

    return {
      products,
      total: data.paginador?.total || products.length,
      offset: data.paginador?.offset || 0,
      limit: data.paginador?.limit || limit,
    };
  } catch (error) {
    console.error("[Elit API] Fetch exception:", error);
    return { products: [], total: 0, offset: 0, limit };
  }
}

export interface ElitCategoryItem {
  nombre: string;
  uri: string;
  sub_categorias: { nombre: string; uri: string }[];
}

export interface ElitCategoriesResponse {
  codigo: number;
  categorias: ElitCategoryItem[];
  marcas: string[];
}

export async function fetchElitCategoriesAndBrands(): Promise<{
  categorias: ElitCategoryItem[];
  marcas: string[];
}> {
  const apiUrl = process.env.ELIT_CATEGORIAS_URL || "https://clientes.elit.com.ar/v1/api/categorias";
  const userId = Number(process.env.ELIT_USER_ID || 28435);
  const token = process.env.ELIT_TOKEN || "seup3oavav";

  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, token: token }),
      next: { revalidate: 3600 }, // Cache 1 hour
    });

    if (!res.ok) {
      console.error(`[Elit API] Categories error ${res.status}`);
      return { categorias: [], marcas: [] };
    }

    const data: ElitCategoriesResponse = await res.json();
    return {
      categorias: data.categorias || [],
      marcas: data.marcas || [],
    };
  } catch (error) {
    console.error("[Elit API] Categories exception:", error);
    return { categorias: [], marcas: [] };
  }
}

