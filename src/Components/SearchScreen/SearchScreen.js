import { SearchResults } from './SearchResults';
import { useState } from 'react';

function SearchScreen() {
    const [searchText, setSearchText] = useState('');

    function handleSubmit(e) {
        e.preventDefault();

        setSearchText(e.target.elements.searchText.value);
    }

    return (
        <div className="p-8 w-full text-slate-300 space-y-8">
            <form
                className="md:w-1/2 w-max-6xl justify-self-center flex flex-col gap-2"
                onSubmit={handleSubmit}
            >
                <label htmlFor="searchText">Global Search</label>
                <div className="flex gap-2">
                    <input
                        id="searchText"
                        name="searchText"
                        className="w-full bg-slate-200 text-slate-700 px-2 py-1 rounded"
                        defaultValue={searchText}
                    />
                    <button className="bg-indigo-500 text-slate-100 px-2 py-1 rounded">
                        Search
                    </button>
                </div>
            </form>
            <SearchResults searchText={searchText} />
        </div>
    );
}

export { SearchScreen };
