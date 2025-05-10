import { SearchResults } from './SearchResults';
import { useState } from 'react';

function SearchScreen() {
    const [searchText, setSearchText] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        setSearchText(e.target.elements.searchText.value);
    }

    return (
        <>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-white mb-6">
                    Customer Search
                </h1>
            </div>
            
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="flex gap-2">
                            <input
                                id="searchText"
                                name="searchText"
                                className="block w-full rounded-md bg-slate-700 border border-slate-600 px-3 py-2 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                defaultValue={searchText}
                                autoFocus
                                placeholder="Search by name, email, or phone number..."
                            />
                            <button
                                type="submit"
                                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </form>

            <SearchResults searchText={searchText} />
        </>
    );
}

export { SearchScreen };
