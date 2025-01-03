import {useQuery} from "@tanstack/react-query";
import api from "../../api";

function FilterForm({ setFilters }) {
    const { isPending, isSuccess, isError, data, error } = useQuery({
        queryKey: ['getCategories'],
        queryFn: () => api.getCategories(),
        retry: false,
    });

    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const values = Object.fromEntries(formData);

        setFilters(values);
    }

    return (
        <form onSubmit={handleSubmit} className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2">
                <label htmlFor="title" className="block text-sm/6 text-white">Title (contains)</label>
                <div className="mt-2">
                    <input type="text" name="title" id="title"
                           className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    />
                </div>
            </div>

            <div className="sm:col-span-2">
                <label htmlFor="author" className="block text-sm/6 text-white">Author (contains)</label>
                <div className="mt-2">
                    <input type="text" name="author" id="author"
                           className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    />
                </div>
            </div>

            <div className="sm:col-span-2">
                <label htmlFor="category" className="block text-sm/6 text-white">Category</label>
                <div className="flex gap-4 items-end">
                <div className="mt-2 grid grid-cols-1 flex-1">
                    <select id="category" name="category"
                            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white/5 py-1.5 pr-8 pl-3 text-base text-white outline-1 -outline-offset-1 outline-white/10 *:bg-gray-800 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    >
                        <option value="">- No Category Selected -</option>
                        {isSuccess && data.result && data.result.map(({value, text}) => (
                            <option key={value} value={value}>{text}</option>
                        ))}
                    </select>
                    <svg className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-400 sm:size-4" viewBox="0 0 16 16" fill="currentColor"
                         aria-hidden="true" data-slot="icon">
                        <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                              clipRule="evenodd"></path>
                    </svg>
                </div>
                <button className="bg-indigo-500 text-white py-1.5 px-3 rounded">Apply</button>
                </div>
            </div>
        </form>
    );
}

export {FilterForm};