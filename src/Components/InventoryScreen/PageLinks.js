// noinspection JSCheckFunctionSignatures,JSValidateTypes

import {Link, useLocation} from "react-router-dom";

function PageLinks({ currentPage, maxPage }) {
    const pageNumbers = Array
        .from({length: 5}, (x, i) => i + Math.max(currentPage - 2, 1))
        .filter(p => p <= maxPage);

    const {pathname, search} = useLocation();
    const searchParams = new URLSearchParams(search);

    function urlForPage(page) {
        searchParams.set('page', page);

        return {
            pathname,
            search: searchParams.toString()
        };
    }

    return (
        <nav className="flex items-center justify-between border-t border-gray-700 px-4 mt-2 mb-8 sm:px-0">
            <div className="-mt-px flex w-0 flex-1">
                {currentPage !== 1 && (
                    <Link to={urlForPage(currentPage - 1)} className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                        <svg className="mr-3 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                            <path fillRule="evenodd"
                                  d="M18 10a.75.75 0 0 1-.75.75H4.66l2.1 1.95a.75.75 0 1 1-1.02 1.1l-3.5-3.25a.75.75 0 0 1 0-1.1l3.5-3.25a.75.75 0 1 1 1.02 1.1l-2.1 1.95h12.59A.75.75 0 0 1 18 10Z"
                                  clipRule="evenodd"/>
                        </svg>
                        Previous
                    </Link>
                )}
            </div>

            <div className="hidden md:-mt-px md:flex">
                {1 < Math.min(...pageNumbers) &&
                    <Link to={urlForPage(1)} className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">1</Link>
                }

                {1 < Math.min(...pageNumbers) - 1 &&
                    <span className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">...</span>
                }

                {pageNumbers.map(page => {
                    if (page === currentPage) {
                        return <Link key={page} to={urlForPage(page)} className="inline-flex items-center border-t-2 border-indigo-500 px-4 pt-4 text-sm font-medium text-indigo-600">{page}</Link>
                    }
                    return <Link key={page} to={urlForPage(page)} className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">{page}</Link>
                })}

                {maxPage > Math.max(...pageNumbers) + 1 &&
                    <span className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">...</span>
                }

                {maxPage > Math.max(...pageNumbers) &&
                    <Link to={urlForPage(maxPage)} className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">{maxPage}</Link>
                }
            </div>

            <div className="-mt-px flex w-0 flex-1 justify-end">
                {currentPage !== maxPage && (
                    <Link to={urlForPage(currentPage + 1)} className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                        Next
                        <svg className="ml-3 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                            <path fillRule="evenodd"
                                  d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z"
                                  clipRule="evenodd"/>
                        </svg>
                    </Link>
                )}
            </div>
        </nav>

    );
}

export {PageLinks};