import { useState, useEffect } from "react";

export function useFetch(){
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((data) => setData(data)) // No se necesita especificar el tipo aquí, se puede dejar como está
        .catch((err) => console.log(err));
    }, [setData]); 
 }