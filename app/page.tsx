"use client";
import { useEffect, useState } from "react";
import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import ProductCard from "./components/products/ProductCard";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Home() {
  const [data, setData] = useState<any[] | null>(null); // Establece un tipo any[] para 'data'

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setData(data)) // No se necesita especificar el tipo aquí, se puede dejar como está
      .catch((err) => console.log(err));
  }, [setData]);

  return (
    <>
      <div className="p-8">
        <Container>
          <div>
            <HomeBanner />
          </div>
          <div className={data? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl-grid-cols 2xl:grid-cols-6 gap-8' : 'w-full'}>
            {!data ? (
              <div className="w-full">
                <Box className="flex justify-center pt-10 items-start h-screen">
                  <CircularProgress size={100} />
                </Box>
              </div>
            ) : (
              data.map(
                (
                  item: any // Usa 'any' para los elementos del array
                ) => (
                  <ProductCard key={item.id} data={item} /> // Añade una key para evitar advertencias de React
                )
              )
            )}
          </div>
        </Container>
      </div>
    </>
  );
}
