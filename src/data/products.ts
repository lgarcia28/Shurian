import { Product } from "@/types";

export const INITIAL_PRODUCTS: Product[] = [
  // 1. Auriculares Redragon
  {
    id: "prod-redragon-zeus",
    name: "Auriculares Gamer Redragon Zeus X H510 RGB 7.1",
    category: "perifericos",
    categoryLabel: "Periféricos & Gaming",
    description: "Sonido envolvente 7.1 virtual, micrófono desmontable con cancelación de ruido pasiva y almohadillas viscoelásticas ultra confortables.",
    price: 68500,
    originalPrice: 79000,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    stockCount: 8,
    badge: "MÁS VENDIDO",
    features: [
      "Sonido 7.1 envolvente",
      "Iluminación RGB dinámica",
      "Almohadillas de memoria de alta densidad",
      "Conector USB compatible con PC y PS5"
    ],
    specs: {
      "Conectividad": "USB 2.0 enmallado",
      "Drivers": "53 mm con imanes de neodimio",
      "Impedancia": "64 Ω",
      "Longitud de cable": "2 metros"
    },
    warranty: "6 meses de garantía oficial"
  },
  // 2. Vidrio Templado iPhone
  {
    id: "prod-vidrio-iphone",
    name: "Vidrio Templado 9D Cerámico Full Cover iPhone (Todas las Series)",
    category: "fundas-vidrios",
    categoryLabel: "Fundas & Vidrios",
    description: "Máxima protección de borde a borde anti-impacto. No se astilla, resistente a rayaduras nivel 9H y revestimiento oleofóbico anti-huellas.",
    price: 8500,
    originalPrice: 11000,
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    stockCount: 45,
    badge: "OFERTA",
    features: [
      "Cobertura completa borde a borde",
      "Tratamiento oleofóbico que repele grasitud",
      "Adhesivo full glue libre de burbujas",
      "Instalación sin cargo en nuestro local de Bv. Segui 1501"
    ],
    specs: {
      "Material": "Cristal templado cerámico 9D",
      "Dureza": "9H reforzado",
      "Espesor": "0.33 mm ultra fino",
      "Compatibilidad": "iPhone 11 hasta iPhone 16 Pro Max"
    },
    warranty: "Garantía de colocación"
  },
  // 3. Cargador Rápido 20W Type-C
  {
    id: "prod-cargador-20w",
    name: "Cargador Rápido USB-C 20W Power Delivery para iPhone / Samsung",
    category: "cables-cargadores",
    categoryLabel: "Cables & Cargadores",
    description: "Carga rápida Power Delivery 3.0. Lleva tu batería de 0 a 50% en solo 30 minutos. Chip inteligente con protección de sobrevoltaje y temperatura.",
    price: 19500,
    originalPrice: 24000,
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    stockCount: 22,
    badge: "EXPRESS",
    features: [
      "Power Delivery 20W Real",
      "Control térmico inteligente anti-recalentamiento",
      "Compatible con Apple MagSafe y Fast Charge Android",
      "Diseño compacto y seguro"
    ],
    specs: {
      "Entrada": "100-240V ~ 50/60Hz 0.5A",
      "Salida": "5V/3A, 9V/2.22A, 12V/1.67A",
      "Puerto": "USB Type-C Hembra",
      "Certificaciones": "CE, FCC, RoHS"
    },
    warranty: "6 meses de garantía"
  },
  // 4. Teclado Mecánico K552 RGB
  {
    id: "prod-redragon-kumara",
    name: "Teclado Mecánico Redragon Kumara K552 RGB TKL",
    category: "perifericos",
    categoryLabel: "Periféricos & Gaming",
    description: "El teclado mecánico más elegido en Argentina. Switches Outemu Red intercambiables (Hot-Swap), chasis de acero y ABS reforzado con iluminación RGB configurable.",
    price: 54900,
    originalPrice: 62000,
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    stockCount: 6,
    badge: "MÁS VENDIDO",
    features: [
      "Formato TKL compacto al 80%",
      "Switches mecánicos Outemu Red lineales",
      "Teclas de doble inyección indelebles",
      "Estructura reforzada resistente a salpicaduras"
    ],
    specs: {
      "Tipo de switch": "Outemu Red (Lineal suave)",
      "Teclas multimedia": "Sí, mediante tecla FN",
      "Anti-Ghosting": "100% Full Key Rollover",
      "Conexión": "USB chapado en oro"
    },
    warranty: "1 año de garantía oficial"
  },
  // 5. iPhone 13 128GB Midnight (Sellado / Reacondicionado Premium)
  {
    id: "prod-iphone-13",
    name: "Apple iPhone 13 128GB Midnight (Batería 100% / Garantía)",
    category: "celulares",
    categoryLabel: "Celulares & Smartphones",
    description: "Pantalla Super Retina XDR de 6.1\", chip A15 Bionic ultra rápido, sistema de dos cámaras de 12 MP con modo Cinemático y compatibilidad 5G.",
    price: 890000,
    originalPrice: 950000,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    stockCount: 3,
    badge: "NUEVO",
    features: [
      "Batería al 100% de salud",
      "Libre de fábrica para cualquier compañía",
      "Incluye cable lightning y protector de pantalla colocado",
      "Verificación técnica en 30 puntos de control"
    ],
    specs: {
      "Pantalla": "OLED Super Retina XDR 6.1 pulgadas",
      "Procesador": "Chip A15 Bionic (6 núcleos)",
      "Almacenamiento": "128 GB",
      "Cámaras": "Principal 12MP + Ultra Gran Angular 12MP"
    },
    warranty: "90 días de garantía directa en local"
  },
  // 6. Cable Reforzado USB-C a Lightning 1.2m
  {
    id: "prod-cable-lightning-c",
    name: "Cable Reforzado Tipo-C a Lightning 1.2m Carga Rápida 20W",
    category: "cables-cargadores",
    categoryLabel: "Cables & Cargadores",
    description: "Malla de nylon trenzado de alta resistencia a la tracción y flexión continua. Soporta transferencia de datos rápida y carga PD de hasta 27W.",
    price: 11900,
    image: "https://images.unsplash.com/photo-1541658016709-82535e94bc69?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    stockCount: 30,
    features: [
      "Malla de nylon balístico indestructible",
      "Puntas reforzadas en aleación de aluminio",
      "Compatible con iPhone, iPad y AirPods"
    ],
    specs: {
      "Largo": "1.2 metros",
      "Potencia soportada": "Hasta 27W PD",
      "Tasa de transferencia": "480 Mbps",
      "Color": "Gris Grafito / Negro"
    },
    warranty: "3 meses de garantía"
  },
  // 7. Mouse Gamer Logitech G502 HERO
  {
    id: "prod-logitech-g502",
    name: "Mouse Gamer Logitech G502 HERO 25K Sensor RGB",
    category: "perifericos",
    categoryLabel: "Periféricos & Gaming",
    description: "El mouse gamer más aclamado del mundo. Sensor HERO de 25.600 DPI, 11 botones programables y sistema de pesas ajustables de precisión.",
    price: 74900,
    originalPrice: 83000,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    stockCount: 5,
    badge: "MÁS VENDIDO",
    features: [
      "Sensor HERO 25K de precisión submimétrica",
      "11 botones totalmente programables",
      "5 pesas de 3.6g para ajuste de balance",
      "Rueda de desplazamiento de giro hiperrápido"
    ],
    specs: {
      "Resolución": "100 a 25.600 DPI",
      "Velocidad de respuesta": "1.000 Hz (1 ms)",
      "Peso": "121 g (ajustable hasta 139 g)",
      "Iluminación": "LIGHTSYNC RGB 16.8M colores"
    },
    warranty: "1 año de garantía oficial"
  },
  // 8. Funda Magnética MagSafe Shockproof
  {
    id: "prod-funda-magsafe",
    name: "Funda Case Magnética MagSafe Anti-Impacto iPhone / Samsung",
    category: "fundas-vidrios",
    categoryLabel: "Fundas & Vidrios",
    description: "Dorso acrílico transparente anti-amarilleo con anillo de imanes de neodimio N52 integrados para un agarre magnético firme en accesorios y cargadores.",
    price: 14500,
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    stockCount: 18,
    features: [
      "Alineación magnética MagSafe de alta adherencia",
      "Bordes elevados para protección de cámara y pantalla",
      "Esquinas con tecnología de amortiguación Air-Cushion",
      "Acabado transparente premium sin distorsión"
    ],
    specs: {
      "Material": "Acrílico rígido + Bordes de TPU flexible",
      "Fuerza magnética": "1500 g de tracción",
      "Modelos": "iPhone 11 al 16 Pro Max / Galaxy S23/S24"
    },
    warranty: "Garantía de calidad"
  },
  // 9. SSD Kingston NV2 NVMe M.2 1TB PCIe 4.0
  {
    id: "prod-ssd-kingston-1tb",
    name: "Disco Sólido SSD Kingston NV2 1TB M.2 PCIe 4.0 NVMe",
    category: "notebooks-pc",
    categoryLabel: "Notebooks & Computadoras",
    description: "Actualiza tu computadora o notebook a velocidades supersónicas de hasta 3500 MB/s de lectura. Ideal para gaming, edición y arranque instantáneo de Windows.",
    price: 92000,
    originalPrice: 104000,
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    stockCount: 9,
    badge: "OFERTA",
    features: [
      "Velocidades de hasta 3.500 MB/s lectura y 2.100 MB/s escritura",
      "Factor de forma M.2 2280 ultra delgado",
      "Ideal para laptops y gabinetes modernos",
      "Instalación y clonación de sistema disponible en nuestro taller"
    ],
    specs: {
      "Interfaz": "PCIe 4.0 x4 NVMe",
      "Capacidad": "1000 GB (1 TB)",
      "Formato": "M.2 2280",
      "TBW": "320 TB"
    },
    warranty: "3 años de garantía oficial"
  },
  // 10. Parlante Bluetooth Portátil Shurian Bass 20W
  {
    id: "prod-parlante-tws",
    name: "Parlante Bluetooth Portátil Waterproof 20W Extra Bass TWS",
    category: "audio",
    categoryLabel: "Audio & Parlantes",
    description: "Sonido estéreo potente con radiadores pasivos de bajos, certificación IPX7 resistente a salpicaduras y lluvia, y hasta 12 horas de reproducción continua.",
    price: 36000,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    stockCount: 11,
    features: [
      "20W RMS de potencia nítida",
      "Protección contra el agua IPX7",
      "Modo TWS para enlazar 2 parlantes en simultáneo",
      "Batería recargable de 3600 mAh con puerto Type-C"
    ],
    specs: {
      "Bluetooth": "Versión 5.3 de bajo consumo",
      "Autonomía": "Hasta 12 horas (a volumen medio)",
      "Entradas": "Bluetooth, Auxiliar 3.5mm, MicroSD",
      "Peso": "540 gramos"
    },
    warranty: "6 meses de garantía"
  },
  // 11. Servicio Técnico: Cambio de Módulo Pantalla
  {
    id: "serv-pantalla-modulo",
    name: "Servicio Técnico: Cambio de Módulo Pantalla Celular (Original / OLED)",
    category: "servicio-tecnico",
    categoryLabel: "Servicio Técnico",
    description: "Reparación y cambio de pantalla para iPhone, Samsung, Motorola y Xiaomi. Incluye diagnóstico previo, colocación con adhesivo original y calibración de táctil.",
    price: 45000,
    image: "https://images.unsplash.com/photo-1588508065123-287b28e013da?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    badge: "EXPRESS",
    features: [
      "Reparaciones en el día (según disponibilidad de repuesto)",
      "Pantallas calidad Original / OLED certificadas",
      "Preservación de datos de tu teléfono",
      "Garantía escrita de 90 días"
    ],
    specs: {
      "Ubicación de taller": "Bv. Segui 1501, Rosario",
      "Tiempo promedio": "2 a 4 horas",
      "Marcas": "Apple, Samsung, Motorola, Xiaomi, Huawei"
    },
    warranty: "90 días de garantía escrita"
  },
  // 12. Servicio Técnico: Mantenimiento Térmico PC Gamer & Notebook
  {
    id: "serv-mantenimiento-pc",
    name: "Servicio Técnico: Mantenimiento Integral Térmico PC Gamer / Notebook",
    category: "servicio-tecnico",
    categoryLabel: "Servicio Técnico",
    description: "Limpieza profunda de coolers, disipadores y placa con alcohol isopropílico, cambio de pasta térmica por Arctic MX-4 / Thermal Grizzly y optimización de software.",
    price: 28000,
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    features: [
      "Baja entre 15°C y 25°C la temperatura de tu CPU y placa de video",
      "Eliminación total de polvo y pelusas del flujo de ventilación",
      "Pasta térmica de grado profesional de alto rendimiento",
      "Test de estrés y reporte de temperaturas antes y después"
    ],
    specs: {
      "Pasta térmica": "Arctic MX-4 o Thermal Grizzly Aeronaut",
      "Plazo de entrega": "24 horas hábiles",
      "Garantía": "Control de estabilidad 30 días"
    },
    warranty: "Garantía de servicio técnico Shurian"
  }
];

export const CATEGORIES = [
  { id: "todos", label: "Todos los productos", icon: "LayoutGrid" },
  { id: "celulares", label: "Celulares", icon: "Smartphone" },
  { id: "notebooks-pc", label: "Notebooks & PC", icon: "Laptop" },
  { id: "perifericos", label: "Periféricos & Gaming", icon: "Keyboard" },
  { id: "cables-cargadores", label: "Cables & Cargadores", icon: "Zap" },
  { id: "fundas-vidrios", label: "Fundas & Vidrios", icon: "Shield" },
  { id: "audio", label: "Audio & Parlantes", icon: "Headphones" },
  { id: "servicio-tecnico", label: "Servicio Técnico", icon: "Wrench" },
] as const;
