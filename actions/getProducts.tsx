import prisma from '@/libs/prismadb'

export interface IProductParams{
    id: string
    name: string
    description: string
    price: number
    image: string
    categoryId: string

}
