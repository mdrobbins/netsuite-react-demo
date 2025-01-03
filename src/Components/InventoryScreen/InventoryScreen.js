import {FilterForm} from "./FilterForm";
import {ProductList} from "./ProductList";
import {useState} from "react";

function InventoryScreen() {
    const [titleFilter, setTitleFilter] = useState('');
    const [authorFilter, setAuthorFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');

    return (
        <div className="flex flex-col gap-5">
            <FilterForm setTitleFilter={setTitleFilter}
                        setAuthorFilter={setAuthorFilter}
                        setCategoryFilter={setCategoryFilter}
            />

            <ProductList titleFilter={titleFilter}
                         authorFilter={authorFilter}
                         categoryFilter={categoryFilter}
            />
        </div>
    )
}

export {InventoryScreen}