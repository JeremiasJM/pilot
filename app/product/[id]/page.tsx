"use client";

import Container from "@/app/components/Container";
import ProductDetail from "./PorductDetail";
import { useEffect, useState } from "react";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import axios from "axios";

interface IParams {
  id?: string;
}

const Product = ({ params }: { params: IParams }) => {
  const [product, setProduct] = useState<any>(null); 
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/product?id=${params.id}`);
        const datoFiltrado = response.data.filter((item: any) => item.id === params.id);
        setProduct(datoFiltrado);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (params.id) {
      fetchProduct(); // Llamada al método fetchProduct solo si hay un ID de producto proporcionado
    }
  }, [params.id]);

  return (
    <div>
      <Container>
        {product ? (
          <ProductDetail product={product} />
        ) : (
          <div className="w-full">
            <Box className="flex justify-center  items-start h-screen mt-8">
              <CircularProgress size={100} />
            </Box>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Product;
