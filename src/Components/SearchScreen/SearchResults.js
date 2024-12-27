import { useQuery } from '@tanstack/react-query';
import api from '../../api';

function SearchResults({ searchText }) {
    const { isPending, isSuccess, isError, data, error } = useQuery({
        queryKey: ['searchCustomers', searchText],
        queryFn: () => api.searchCustomers(searchText),
        retry: false,
    });

    return (
        <div className="max-w-6xl w-2/3 justify-self-center">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="text-left text-sm text-slate-500">
                                Name
                            </th>
                            <th className="text-left text-sm text-slate-500">
                                Email
                            </th>
                            <th className="text-left text-sm text-slate-500">
                                Phone
                            </th>
                            <th className="text-left text-sm text-slate-500">
                                City
                            </th>
                            <th className="text-left text-sm text-slate-500">
                                State
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {isSuccess &&
                            data.result &&
                            data.result.map(customer => (
                                <tr className="odd:bg-slate-800 h-12 hover:bg-indigo-800">
                                    <td className="px-2">
                                        <a href={`/app/common/entity/custjob.nl?id=${customer.id}`} target="_blank" rel="noreferrer" className="hover:underline hover:text-indigo-300">{customer.companyName}</a>
                                    </td>
                                    <td className="px-2">{customer.email}</td>
                                    <td className="px-2">{customer.phone}</td>
                                    <td className="px-2">
                                        {customer.billingCity}
                                    </td>
                                    <td className="px-2">
                                        {customer.billingState}
                                    </td>
                                </tr>
                            ))}

                        {(!data || !data.result?.length) && (
                            <tr className="odd:bg-slate-800 h-12">
                                <td colSpan="5" className="text-center">
                                    {isSuccess && 'No Search Results'}
                                    {isPending && 'Searching...'}
                                    {isError && (
                                        <span className="text-red-500 font-bold">
                                            {error}
                                        </span>
                                    )}
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
