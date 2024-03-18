import { IconType } from "react-icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import queryString from "query-string";

interface CategoryProps {
  label: string;
  icon: IconType;
  selected?: boolean;
}

const Category: React.FC<CategoryProps> = ({ label, icon: Icon, selected }) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};
    if (params) {
      currentQuery = queryString.parse(params.toString());
    }
    
    const updatedQuery = label === "All" ? {} : { category: label };

    const mergedQuery = { ...currentQuery, ...updatedQuery };

    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: mergedQuery,
      },
      {
        skipNull: true,
      }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`flex items-center justify-center text-center gap-1 p-2 border-b-2 hover:text-slate-800 transition cursor-pointer ${
        selected
          ? "border-b-slate-800 text-slate-800"
          : "border-transparent text-slate-500"
      } `}
    >
      <Icon size={20} />
      <div className="font-medium text-sm">{label} </div>
    </div>
  );
};

export default Category;
