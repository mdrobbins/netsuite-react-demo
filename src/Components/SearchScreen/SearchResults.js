import { useQuery } from '@tanstack/react-query';
import api from '../../api';
import { Link } from 'react-router-dom';
import { clsx } from 'clsx';

function SearchResults({ searchText }) {
    const { isPending, isSuccess, isError, data, error } = useQuery({
        queryKey: ['searchCustomers', searchText],
        queryFn: () => api.searchCustomers(searchText),
        retry: false,
    });

    return (
        <div className="bg-slate-800 rounded-lg shadow-md p-6 border border-slate-700">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-700">
                    <thead>
                        <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-300">
                                Name
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-300">
                                Email
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-300">
                                Phone
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-300">
                                City
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-300">
                                State
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                        {isSuccess &&
                            data.result &&
                            data.result.map((customer, index) => (
                                <tr key={index} className="hover:bg-slate-700/50 transition-colors duration-150">
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white">
                                        <Link
                                            to={`/customer/${customer.id}`}
                                            className="text-indigo-400 hover:text-indigo-300 hover:underline"
                                        >
                                            {customer.companyName}
                                        </Link>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-300">
                                        <a href={`mailto:${customer.email}`} className="text-indigo-400 hover:text-indigo-300 hover:underline">
                                            {customer.email}
                                        </a>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-300">
                                        <a href={`tel:${customer.phone}`} className="text-indigo-400 hover:text-indigo-300 hover:underline">
                                            {customer.phone}
                                        </a>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-300">
                                        {customer.billingCity}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-300">
                                        {customer.billingState}
                                    </td>
                                </tr>
                            ))}

                        {!isPending && (!data || !data.result?.length) && (
                            <tr className="h-16">
                                <td colSpan="5" className="text-center text-slate-300">
                                    {isSuccess && searchText && 'No results found for your search'}
                                    {isSuccess && !searchText && 'Enter a search term to find customers'}
                                    {isError && (
                                        <span className="text-red-400 font-medium">
                                            Error: {error?.message || 'Failed to load customer data'}
                                        </span>
                                    )}
                                </td>
                            </tr>
                        )}

                        {isPending && (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    <div className="animate-pulse bg-slate-800 rounded-lg shadow-md p-6">
                                        <div className="space-y-3">
                                            {[...Array(4)].map((_, i) => (
                                                <div key={i} className="h-10 bg-slate-700 rounded"></div>
                                            ))}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export { SearchResults };
