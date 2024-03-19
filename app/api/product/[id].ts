import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
      
      // Obtener el ID de la consulta de la URL
      const params = new URLSearchParams(request.url.substring(request.url.indexOf("?")));
      const productId = params.get("id");
  
      // Filtrar los productos por ID si está presente
      let product;
      if (productId) {
        product = await prisma.product.findUnique({ where: { id: productId } });
      } else {
        product = await prisma.product.findMany();
      }
  
      return NextResponse.json(product);
    } catch (error) {
      console.error("Error fetching products:", error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }
  