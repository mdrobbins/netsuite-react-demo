import {FilterForm} from "./FilterForm";
import {ProductList} from "./ProductList";
import {useState} from "react";

function InventoryScreen() {
    const [filters, setFilters] = useState({
        title: '',
        author: '',
        category: ''
    });

    return (
        <div className="flex flex-col gap-5">
            <FilterForm setFilters={setFilters} />

            <ProductList filters={filters} />
        </div>
    )
}

export {InventoryScreen}