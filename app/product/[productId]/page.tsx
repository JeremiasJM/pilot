"use client";

import Container from "@/app/components/Container";
import ProductDetail from "./PorductDetail";
import { useEffect, useState } from "react";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import axios from "axios";

interface IParams {
  productId?: string;
}

const Product = ({ params }: { params: IParams }) => {
  const [product, setProduct] = useState<any>(null); // Tipo any para el producto
  console.log(product);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/product?id=${params.productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (params.productId) {
      fetchProduct(); // Llamada al método fetchProduct solo si hay un ID de producto proporcionado
    }
  }, [params.productId]);

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
