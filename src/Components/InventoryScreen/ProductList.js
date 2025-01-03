import {useQuery} from "@tanstack/react-query";
import api from "../../api";

function ProductList({categoryFilter}) {
    const { isPending, isSuccess, isError, data, error } = useQuery({
        queryKey: ['getProducts', [categoryFilter]],
        queryFn: () => api.getProducts(categoryFilter),
        retry: false,
    });

    return (
        <ul className="divide-y divide-gray-800">
            {isSuccess &&
                data.result &&
                data.result.map(product => (
                    <li key={product.id} className="flex justify-between gap-x-6 py-5 px-2 items-center hover:bg-slate-500/10">
                        <div className="flex min-w-0 gap-x-4 items-center">
                            <img
                                className="w-12 h-18 flex-none bg-gray-800"
                                src={product.imageUrl}
                                alt=""
                            />
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm/6 truncate font-semibold text-slate-200">
                                    {product.description}
                                </p>
                                <p className="mt-1 truncate text-xs/5 text-gray-400">
                                    {product.itemName} - {product.category}
                                </p>
                            </div>
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm/6 text-white">
                                {product.author}
                            </p>
                            <p className="mt-1 text-xs/5 text-gray-400">
                                Rating: {product.rating.toFixed(1)} with {product.reviewCount} Reviews
                            </p>
                        </div>
                    </li>
                ))}
        </ul>
    );
}

export { ProductList };