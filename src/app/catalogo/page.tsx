import React from "react";
import { Metadata } from "next";
import { Catalog } from "@/components/Catalog";
import { fetchElitProducts, fetchElitCategoriesAndBrands } from "@/services/elit";
import { INITIAL_PRODUCTS } from "@/data/products";

export const metadata: Metadata = {
  title: "Catálogo de Productos y Accesorios | SHURIAN Rosario",
  description:
    "Explora nuestro catálogo de informática, componentes, periféricos y accesorios en Rosario con garantía oficial.",
};

// Revalidate page data every 300 seconds (5 minutes)
export const revalidate = 300;

export default async function CatalogoPage() {
  const [{ products: elitProducts, total: elitTotal }, categoriesData] = await Promise.all([
    fetchElitProducts({ limit: 40 }),
    fetchElitCategoriesAndBrands(),
  ]);

  // Merge local curated store products with Elit catalog
  const combinedProducts = [...INITIAL_PRODUCTS, ...elitProducts];
  const combinedTotal = elitTotal + INITIAL_PRODUCTS.length;

  return (
    <div className="pt-52 sm:pt-56 md:pt-32 pb-16 bg-white min-h-screen">
      <Catalog
        initialProducts={combinedProducts}
        initialTotal={combinedTotal}
        availableBrands={categoriesData.marcas || []}
        availableCategories={categoriesData.categorias || []}
      />
    </div>
  );
}
