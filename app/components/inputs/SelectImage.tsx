'use client'

import { ImageType } from "@/app/admin/add-products/AddProductForm"

interface SelectImageProps{
    item?: ImageType
    handleFileChange:(value: File)=> void
}
const SelectImage: React.FC<SelectImageProps> = ({item, handleFileChange}) => {
 return (
    <div></div>

 )
}
export default SelectImage