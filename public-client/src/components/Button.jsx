/* eslint-disable react/prop-types */
export default function Button({ onNext, onPrev, pages, onPage }) {
    let countPages = []
    for (let i = 1; i <= pages.totalPage; i++) {
        countPages.push(i)
    }
    return (
        <>
            <nav aria-label="Page navigation example">
                <div className="flex items-center -space-x-px h-10 text-base">
                    <button
                        onClick={onPrev}
                        className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                        </svg>

                    </button>

                    {countPages.map((page, idx) => {
                        return (
                            <div key={idx + 1}>
                                {page == pages.currentPage && (
                                    <button
                                        className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white focus:bg-gray-100"
                                        value={page}
                                        onClick={onPage}
                                    >
                                        {page}
                                    </button>
                                )}
                                {pages.currentPage !== page && (
                                    <button
                                        className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                        value={page}
                                        onClick={onPage}
                                    >
                                        {page}
                                    </button>
                                )}
                            </div>
                        )
                    })}
                    <div>
                    </div>
                    <button
                        onClick={onNext}
                        className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        <span className="sr-only">Next</span>
                        <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                        </svg>

                    </button>

                </div>
            </nav>

        </>
    )
}
