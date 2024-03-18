'use client'

import { categories } from "@/utils/Categories";
import Container from "../Container";
import Category from "./Category";
import { usePathname, useSearchParams } from "next/navigation";

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get("category") ?? ''; // Asignar un valor por defecto si category es undefined

    const pathname = usePathname()

    const isMainPage = pathname ==='/'
    if(!isMainPage) return null;

    return (
        <div className="bg-white">
            <Container>
                <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
                    {categories && categories.map((item) => {
                        if (!item) return null; // Manejar el caso en que item sea undefined
                        return (
                            <Category
                                key={item.label}
                                label={item.label ?? ''}
                                icon={item.icon}
                                selected={category === item.label || (category === '' && item.label === 'All')} // Asegurarse de que selected sea un booleano
                            />
                        );
                    })}
                </div>
            </Container>
        </div>
    );
}

export default Categories;