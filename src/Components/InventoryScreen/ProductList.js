import { useQuery } from '@tanstack/react-query';
import api from '../../api';

function ProductList({ filters }) {
    const filterValues = Object.values(filters);

    const { isPending, isSuccess, isError, data, error } = useQuery({
        queryKey: ['getProducts', [filterValues]],
        queryFn: () => api.getProducts(filters),
        retry: false,
    });

    if (isPending) {
        return (
            <div className="animate-pulse">
                <div className="grid grid-cols-1 gap-4 mb-6">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-24 bg-slate-700 rounded-lg"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="rounded-lg bg-red-500/10 p-6 text-red-400 border border-red-900">
                <h3 className="text-lg font-medium mb-2">Error Loading Products</h3>
                <p>{error.message || "Failed to load inventory data"}</p>
            </div>
        );
    }

    return (
        <div className="rounded-lg bg-slate-800/30 border border-slate-700">
            <ul className="divide-y divide-gray-800">
                {isSuccess && data.result && data.result.map(product => (
                        <li key={product.id} className="flex justify-between gap-x-6 py-5 px-4 items-center hover:bg-slate-500/10 transition-colors duration-150">
                            <div className="flex min-w-0 gap-x-4 items-center">
                                <img className="w-12 h-18 flex-none bg-gray-800 rounded" src={product.imageUrl} alt="" />
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
                                    Rating: {product.rating.toFixed(1)} with{' '}
                                    {product.reviewCount} Reviews
                                </p>
                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export { ProductList };
