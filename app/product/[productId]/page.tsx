'use client'
import Container from "@/app/components/Container";
import ProductDetail from "./PorductDetail";
import { useEffect, useState } from "react";

interface IParams {
    productId?: string;
}

const Product = ({ params }: { params: IParams }) => {
    const [product, setProduct] = useState<any>(null); // Tipo any para el producto

    useEffect(() => {
        if (!params.productId) return; // No hay necesidad de realizar la solicitud si no hay ID proporcionado

        fetch(`https://fakestoreapi.com/products/${params.productId}`)
            .then(res => res.json())
            .then(data => setProduct(data))
            .catch(err => console.log(err));
    }, [params.productId]);

    return (
        <div>
            <Container>
                {product ? <ProductDetail product={product} /> : <div>Loading...</div>}
            </Container>
        </div>
    );
}

export default Product;
