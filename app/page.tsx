'use client'
import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import { useEffect, useState } from "react";
import {truncateText} from "@/utils/truncateText";
import ProductCard from "./components/products/ProductCard";



export default function Home() {
  const [data , setData] = useState(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err))
  },[setData])
 

  return (
    <>
      <div className="p-8">
        <Container>
          <div>
            <HomeBanner />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl-grid-cols 2xl:grid-cols-6 gap-8">
            {!data ? <div>Loading...</div> : data.map((item: any) => {
              return <ProductCard data={item}/>
            })}
          </div>
        </Container>
      </div>
    </>
  );
}
