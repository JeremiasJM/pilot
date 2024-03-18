'use client'

import { useEffect, useState } from "react";
import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import ProductCard from "./components/products/ProductCard";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import axios from "axios";
import { categories } from "../utils/Categories"; // Importa el arreglo de categorías

export default function Home() {
  const [data, setData] = useState<any[] | null>(null); // Establece un tipo any[] para 'data'
  const [selectedCategory, setSelectedCategory] = useState<string | null>("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/product"); // Ruta donde está la función GET
        setData(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  const filteredData = selectedCategory === "All" ? data : data?.filter((item: any) => item.category === selectedCategory);

  return (
    <>
      <div className="p-8">
        <Container>
          <div>
            <HomeBanner />
          </div>
          <div className="mb-4">
            <div className="pt-1 flex flex-row items-center justify-between overflow-x-auto">
              {categories.map((category:any, index:any) => (
                <button
                  key={index}
                  className={`flex items-center justify-center text-center gap-1 p-2 border-b-2 hover:text-slate-800 transition cursor-pointer ${
                    selectedCategory === category.label
                      ? "border-b-slate-800 text-slate-800"
                      : "border-transparent text-slate-500"
                  }`}
                  onClick={() => handleCategoryChange(category.label)}
                >
                  <category.icon size={20} />
                  <div className="font-medium text-sm">{category.label}</div>
                </button>
              ))}
            </div>
          </div>
          <div
            className={
              filteredData
                ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl-grid-cols 2xl:grid-cols-6 gap-8"
                : "w-full"
            }
          >
            {!filteredData ? (
              <div className="w-full">
                <Box className="flex justify-center pt-10 items-start h-screen">
                  <CircularProgress size={100} />
                </Box>
              </div>
            ) : (
              filteredData.map((item: any) => (
                <ProductCard key={item.id} data={item} />
              ))
            )}
          </div>
        </Container>
      </div>
    </>
  );
}
