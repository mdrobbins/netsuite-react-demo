import { useState } from 'react';
import { PurchaseOrderList } from './PurchaseOrderList';

function PurchasingScreen() {
    const [searchText, setSearchText] = useState('');
    const [statusFilter, setStatusFilter] = useState('open');

    function handleSubmit(e) {
        e.preventDefault();
        setSearchText(e.target.elements.searchText.value);
    }

    return (
        <>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-white mb-6">
                    Open Purchase Orders
                </h1>
            </div>

            <PurchaseOrderList searchText={searchText} statusFilter={statusFilter} />
        </>
    );
}

export { PurchasingScreen };
