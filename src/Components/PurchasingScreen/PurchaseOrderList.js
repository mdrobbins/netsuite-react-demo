import { useQuery } from '@tanstack/react-query';
import api from '../../api';

function extractOrderStatus(status) {
    return status.split(' : ').pop();
}

function PurchaseOrderList() {
    const { isPending, isSuccess, isError, data, error } = useQuery({
        queryKey: ['getPurchaseOrders'],
        queryFn: () => api.getOpenPOs(),
        retry: false,
    });

    return (
        <div className="bg-slate-900">
            <div className="mx-auto max-w-7xl">
                <div className="bg-slate-900">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="mt-8 flow-root">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                    <table className="min-w-full divide-y divide-slate-800">
                                        <thead>
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
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
                                        <tbody className="divide-y divide-slate-800">
                                            {isSuccess &&
                                                data.result &&
                                                data.result.map(order => (
                                                    <tr className="hover:bg-slate-500/10">
                                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
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
                                                                    currency:
                                                                        'USD',
                                                                },
                                                            ).format(
                                                                order.amount,
                                                            )}
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-slate-300">
                                                            {
                                                                order.approvalStatusName
                                                            }
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-slate-300">
                                                            {extractOrderStatus(
                                                                order.statusName,
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            {(!data ||
                                                !data.result?.length) && (
                                                <tr className="odd:bg-slate-800 h-12">
                                                    <td
                                                        colSpan="5"
                                                        className="text-center"
                                                    >
                                                        {isSuccess &&
                                                            'No Search Results'}
                                                        {isPending &&
                                                            'Loading...'}
                                                        {isError && (
                                                            <span className="text-red-500 font-bold">
                                                                {error.message}
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { PurchaseOrderList };
