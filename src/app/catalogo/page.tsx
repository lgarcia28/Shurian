import React from "react";
import { Metadata } from "next";
import { Catalog } from "@/components/Catalog";

export const metadata: Metadata = {
  title: "Catálogo de Productos y Accesorios | SHURIAN Rosario",
  description:
    "Explora nuestro catálogo de accesorios para celulares, fundas, cables de carga rápida, vidrios templados, periféricos y repuestos en Rosario con retiro inmediato en Bv. Segui 1501.",
};

export default function CatalogoPage() {
  return (
    <div className="pt-24 sm:pt-28 pb-16 bg-white min-h-screen">
      <Catalog />
    </div>
  );
}
