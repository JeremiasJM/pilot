import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";

export async function GET(request: Request) {
    try {
      const currentUser = await getCurrentUser();
      
      // Obtener el ID de la consulta de la URL
      const params = new URLSearchParams(request.url.substring(request.url.indexOf("?")));
      const productId = params.get("id");
  
      // Filtrar los productos por ID si está presente
      let products;
      if (productId) {
        products = await prisma.product.findUnique({ where: { id: productId } });
      } else {
        products = await prisma.product.findMany();
      }
  
      return NextResponse.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }
  