import { useQuery } from '@tanstack/react-query';
import api from '../../api';

function extractOrderStatus(status) {
    return status ? status.split(' : ').pop() : '';
}

function PurchaseOrderList() {
    const { isPending, isSuccess, isError, data, error } = useQuery({
        queryKey: ['getPurchaseOrders'],
        queryFn: () => api.getOpenPOs()
    });

    if (isError) {
        return (
            <div className="rounded-lg bg-red-500/10 p-6 text-red-400 border border-red-900">
                <h3 className="text-lg font-medium mb-2">Error Loading Purchase Orders</h3>
                <p>{error.message || "Failed to load purchase order data"}</p>
            </div>
        );
    }

    if (isSuccess && (!data.result || data.result.length === 0)) {
        return (
            <div className="rounded-lg bg-slate-800/30 border border-slate-700 p-8 text-center">
                <h3 className="text-lg font-medium mb-2 text-slate-300">No Purchase Orders Found</h3>
                <p className="text-slate-400">Try adjusting your search criteria or status filter</p>
            </div>
        );
    }

    return (
        <div className="rounded-lg bg-slate-800/30 border border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-700">
                    <thead className="bg-slate-800/50">
                        <tr>
                            <th
                                scope="col"
                                className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-white"
                            >
                                Order #
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                            >
                                Vendor
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3.5 text-right text-sm font-semibold text-white"
                            >
                                Amount
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3.5 text-center text-sm font-semibold text-white"
                            >
                                Approval Status
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3.5 text-center text-sm font-semibold text-white"
                            >
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700 bg-slate-800/20">
                        {isSuccess &&
                            data.result &&
                            data.result.map((order, idx) => (
                                <tr key={order.id || idx} className="hover:bg-slate-700/30 transition-colors duration-150">
                                    <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-white">
                                        <a
                                            href={`/app/common/transaction/transaction.nl?id=${order.id}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-indigo-400 hover:text-indigo-300"
                                        >
                                            {order.poNumber}
                                        </a>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-300">
                                        {order.vendorName}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-right text-sm text-slate-300">
                                        {new Intl.NumberFormat(
                                            'en-US',
                                            {
                                                style: 'currency',
                                                currency: 'USD',
                                            },
                                        ).format(order.amount)}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-slate-300">
                                        {order.approvalStatusName}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-slate-300">
                                        {extractOrderStatus(order.statusName)}
                                    </td>
                                </tr>
                            ))}
                        {isPending && (
                            <tr>
                                <td colSpan="5" className="p-4">
                            <div className="animate-pulse">
                                <div className="grid grid-cols-1 gap-4">
                                    {[...Array(2)].map((_, i) => (
                                        <div key={i} className="h-10 bg-slate-700 rounded-lg"></div>
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

export { PurchaseOrderList };
