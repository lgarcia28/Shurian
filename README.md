# SHURIAN | Tienda Online & Servicio Técnico (Rosario, Argentina)

Aplicación web moderna y ágil para **SHURIAN**, especialistas en venta de accesorios/tecnología y servicio técnico de celulares y computadoras en Rosario, Santa Fe.

- **Ubicación:** Bv. Segui 1501, Rosario, Santa Fe.
- **WhatsApp Oficial:** +54 9 341 755-1501
- **Instagram:** [@shurian.pc](https://www.instagram.com/shurian.pc/)

---

## Características Principales

1. **Identidad Visual Oficial de Instagram:**
   - Paleta de color: Azul medianoche oscuro (`#060b17`) con acentos en naranja circuito eléctrico (`#ff6b00`).
   - Logotipo oficial de Shurian integrado en el Navbar, Hero, Wizard de servicio técnico y Footer.
   - Efecto Glassmorphism sutil y moderno, optimizado para mobile y desktop.

2. **Catálogo Dinámico & Filtros:**
   - Listado de productos y repuestos categorizados (Celulares, Notebooks & PC, Periféricos, Cables/Cargadores, Fundas/Vidrios, Audio, Servicio Técnico).
   - Precios formateados en pesos argentinos (ARS).
   - Barra de búsqueda interactiva en tiempo real y selector de ordenación por precio o destacados.
   - Modal de vista rápida de productos con especificaciones completas y selector de cantidades.

3. **Asistente de Cotización para Servicio Técnico:**
   - Wizard interactivo para celulares, notebooks, computadoras gamer y consolas.
   - Selección de falla y prioridad.
   - Generación automática de consulta estructurada directa por WhatsApp.

4. **Carrito de Compras & Checkout Directo vía WhatsApp:**
   - Drawer deslizable lateral para gestionar pedidos con persistencia en `localStorage`.
   - Formulario de checkout rápido con selección de método de entrega (Retiro por local en Bv. Segui 1501 o Envío en Rosario a acordar).
   - Genera enlace directo a WhatsApp con el detalle del pedido preformateado.

5. **Ubicación & Contacto:**
   - Horarios de atención y mapa interactivo de Google Maps embebido.
   - Botón flotante persistente de WhatsApp.

---

## Stack Tecnológico

- **Framework:** Next.js 15 (App Router, React 19)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS con tokens personalizados de Shurian
- **Iconos:** Lucide React
- **Estado Global:** Zustand con persistencia en `localStorage`

---

## Cómo ejecutar localmente

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/lgarcia28/Shurian.git
   cd Shurian
   ```

2. Instalar dependencias:
   ```bash
   npm install
   # o
   pnpm install
   ```

3. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abrir en el navegador: [http://localhost:3000](http://localhost:3000)

---

## Compilación para Producción

```bash
npm run build
npm run start
```
