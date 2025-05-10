import { FilterForm } from './FilterForm';
import { ProductList } from './ProductList';
import { useState } from 'react';

function InventoryScreen() {
    const [filters, setFilters] = useState({
        title: '',
        author: '',
        category: '',
    });

    return (
        <>
            <div>
                <h1 className="text-2xl font-bold text-white mb-6">
                    Inventory Management
                </h1>
            </div>
            
            {/* Filters Section */}
            <div className="mb-6">
                <FilterForm setFilters={setFilters} />
            </div>
            
            {/* Products Section */}
            <div>
                <ProductList filters={filters} />
            </div>
        </>
    );
}

export { InventoryScreen };
