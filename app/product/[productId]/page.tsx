"use client";
import Container from "@/app/components/Container";
import ProductDetail from "./PorductDetail";
import { useEffect, useState } from "react";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

interface IParams {
  productId?: string;
}

const Product = ({ params }: { params: IParams }) => {
  const [product, setProduct] = useState<any>(null); // Tipo any para el producto

  useEffect(() => {
    if (!params.productId) return; // No hay necesidad de realizar la solicitud si no hay ID proporcionado

    fetch(`https://fakestoreapi.com/products/${params.productId}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.log(err));
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
