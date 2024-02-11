import { useState } from "react";

export default function Filter({ listCategories }) {
    const [category, setCategory] = useState('');

    function handleCategory(event) {
        setCategory(event.target.value);
        console.log(event.target.value, "ini category blogg");
    }

    return (
        <>
            <span>Show only :</span>
            <div>
                {listCategories.map((list) => {
                    return (
                        <button
                            key={list.id}
                            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            onClick={(handleCategory)}
                            value={list.name}
                        >
                            {list.name}
                        </button>
                    );
                })}
            </div>
        </>
    );
}
