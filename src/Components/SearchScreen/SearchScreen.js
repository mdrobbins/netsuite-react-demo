import { SearchResults } from './SearchResults';
import { useState } from 'react';
import { Slide, toast } from 'react-toastify';
import { Toast } from '../Toast';

function SearchScreen() {
    const [searchText, setSearchText] = useState('');

    function handleSubmit(e) {
        e.preventDefault();

        setSearchText(e.target.elements.searchText.value);
        // toast(<Toast title="Contact Created" message="This is a test message" />, {
        //     hideProgressBar: true,
        //     transition: Slide,
        //     closeButton: false,
        //     className: 'p-0 w-[400px]',
        // });
    }

    return (
        <>
            <form
                className="md:w-1/2 w-max-6xl justify-self-center flex flex-col gap-1"
                onSubmit={handleSubmit}
            >
                <label
                    htmlFor="searchText"
                    className="block min-w-0 grow bg-transparent py-1.5 pl-1 pr-3 text-base text-white placeholder:text-gray-500 focus:outline focus:outline-0 sm:text-sm/6"
                >
                    Global Search
                </label>
                <div className="flex gap-2">
                    <input
                        id="searchText"
                        name="searchText"
                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                        defaultValue={searchText}
                    />
                    <button className="bg-indigo-500 text-slate-100 px-2 py-1 rounded">
                        Search
                    </button>
                </div>
            </form>
            <SearchResults searchText={searchText} />
        </>
    );
}

export { SearchScreen };
