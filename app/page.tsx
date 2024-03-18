"use client";

import { useEffect, useState } from "react";
import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import ProductCard from "./components/products/ProductCard";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import axios from "axios";
import { categories } from "../utils/Categories"; // Importa el arreglo de categorías

export default function Home() {
  const [data, setData] = useState<any[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "All"
  );
  const [searchTerm, setSearchTerm] = useState<string>(""); // Nuevo estado para el término de búsqueda

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/product");
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value); // Actualiza el término de búsqueda al escribir en el campo de búsqueda
  };

  // Filtra los datos según el término de búsqueda y la categoría seleccionada
  const filteredData = data?.filter((item: any) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      searchTerm === "" ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  return (
    <>
      <div className="p-8">
        <Container>
          <div>
            <HomeBanner />
          </div>
          <div className="mb-4 flex flex-col">
            <div className="flex justify-center">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange} // Maneja cambios en el campo de búsqueda
              className="px-4 w-48 flex items-center justify-between py-2 border border-slate-800 rounded-md focus:outline-none focus:border-blue-500"
            />
            </div>
            <div className="pt-1 flex flex-row items-center justify-between overflow-x-auto">
              {categories.map((category: any, index: any) => (
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
