'use client'
import { ImageType } from "@/app/admin/add-products/AddProductForm";

interface SelectImageProps {
    item?: ImageType;
    handleFileChange: (files: File[]) => void; // Modificar el tipo de parámetro aquí
}

const SelectImage: React.FC<SelectImageProps> = ({ item, handleFileChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if (fileList && fileList.length > 0) {
            const files = Array.from(fileList); // Convertir FileList a un array de archivos
            handleFileChange(files); // Llamar a la función handleFileChange con el array de archivos
        }
    }

    return (
        <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Select Image
            </label>
            <div className="mt-1 flex items-center">
                <input
                    id="image"
                    name="image"
                    type="file"
                    className="hidden"
                    onChange={handleChange}
                    multiple // Permitir seleccionar múltiples archivos
                />
                <label
                    htmlFor="image"
                    className="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Choose File
                </label>
                {item && item.image && (
                    <span className="ml-2">{item.image.name}</span>
                )}
            </div>
        </div>
    );
}

export default SelectImage;


/* 'use client'
import { ImageType } from "@/app/admin/add-products/AddProductForm";

interface SelectImageProps {
  item?: ImageType;
  handleFileChange: (value: File) => void;
}

const SelectImage: React.FC<SelectImageProps> = ({ item, handleFileChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      handleFileChange(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="rounded-xl border-2 p-4 flex flex-col items-center   gap-2 hover:border-slate-500 transition cursor-pointer "
       
      />
    
    </div>
  );
};

export default SelectImage;
 */
