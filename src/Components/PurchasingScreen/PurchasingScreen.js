import { useQuery } from '@tanstack/react-query';
import api from '../../api';
import { PurchaseOrderList } from './PurchaseOrderList';

function extractOrderStatus(status) {
    return status.split(' : ').pop();
}

function PurchasingScreen() {

    return (
        <>
            <div className="block min-w-0 grow bg-transparent py-1.5 pl-1 pr-3 text-center text-base text-white placeholder:text-gray-500 focus:outline focus:outline-0 sm:text-sm/6">
                Open Purchase Orders
            </div>
            <PurchaseOrderList />
        </>
    );
}

export { PurchasingScreen };
