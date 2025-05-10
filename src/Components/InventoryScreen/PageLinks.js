// noinspection JSCheckFunctionSignatures,JSValidateTypes

import { Link, useLocation } from 'react-router-dom';
import { LeftArrow } from '../icons/LeftArrow';
import { RightArrow } from '../icons/RightArrow';

function PageLinks({ currentPage, maxPage }) {
    const { pathname, search } = useLocation();
    const searchParams = new URLSearchParams(search);

    const baseClasses =
        'inline-flex items-center px-4 pt-4 text-sm font-medium';
    const activeClasses = `${baseClasses} border-t-2 border-indigo-500 text-indigo-600`;
    const defaultClasses = `${baseClasses} border-t-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700`;

    // Create an array of page numbers centered around the current page
    const pageNumbers = Array.from(
        { length: 5 },
        (x, i) => i + Math.max(currentPage - 2, 1),
    ).filter(p => p <= maxPage);

    function urlForPage(page) {
        searchParams.set('page', page);
        return {
            pathname,
            search: searchParams.toString(),
        };
    }

    if (!currentPage || !maxPage || maxPage === 1) {
        return <div></div>;
    }

    return (
        <nav className="flex items-center justify-between border-t border-gray-700 px-6 md:px-8 mt-2 mb-8">
            <div className="-mt-px flex w-0 flex-1">
                {currentPage !== 1 && (
                    <Link
                        to={urlForPage(currentPage - 1)}
                        className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        aria-label={`Go to page ${currentPage - 1}`}
                    >
                        <LeftArrow />
                        Previous
                    </Link>
                )}
            </div>

            <div className="hidden md:-mt-px md:flex">
                {1 < Math.min(...pageNumbers) && (
                    <Link
                        to={urlForPage(1)}
                        className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    >
                        1
                    </Link>
                )}

                {1 < Math.min(...pageNumbers) - 1 && (
                    <span className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">
                        ...
                    </span>
                )}

                {pageNumbers.map(page => (
                    <Link
                        key={page}
                        to={urlForPage(page)}
                        className={
                            page === currentPage
                                ? activeClasses
                                : defaultClasses
                        }
                    >
                        {page}
                    </Link>
                ))}

                {maxPage > Math.max(...pageNumbers) + 1 && (
                    <span className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">
                        ...
                    </span>
                )}

                {maxPage > Math.max(...pageNumbers) && (
                    <Link
                        to={urlForPage(maxPage)}
                        className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    >
                        {maxPage}
                    </Link>
                )}
            </div>

            <div className="-mt-px flex w-0 flex-1 justify-end">
                {currentPage !== maxPage && (
                    <Link
                        to={urlForPage(currentPage + 1)}
                        className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        aria-label={`Go to page ${currentPage + 1}`}
                    >
                        Next
                        <RightArrow />
                    </Link>
                )}
            </div>
        </nav>
    );
}

export { PageLinks };
