import { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import Swal from "sweetalert2";
import NavBar from "./Navbar";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function Cuisines({ find }) {
    const url = "https://phase2-aio.vercel.app";
    const [cuisine, setCuisine] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pages, setPages] = useState({});
    const [category, setCategory] = useState("");
    const [listCategories, setListCategories] = useState([]);
    const [sorting, setSorting] = useState("DESC");
    const [pageNumber, setPageNumber] = useState(1);
    const navigate = useNavigate();

    async function fetchData() {
        try {
            setLoading(true);
            const { data } = await axios.get(`${url}/apis/pub/restaurant-app/cuisines?q=${find}&i=${category}&limit=12&page=${pageNumber}&sort=${sorting}`);
            setCuisine(data.data.query);
            setPages(data.data.pagination);
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: error.response.data.error,
            });
        }
    }

    async function fetchCategories() {
        try {
            setLoading(true);
            const { data } = await axios.get(`${url}/apis/pub/restaurant-app/categories`);
            setListCategories(data.data);
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: error.response.data.error,
            });
        }
    }

    async function handleDetail(key) {
        navigate(`/cuisines/${key}`);
        console.log(`choosed ${key}`);
    }

    useEffect(() => {
        fetchCategories();
        fetchData();
    }, [find, category, sorting, pageNumber]);

    useEffect(() => {
        setPageNumber(1);
    }, [find, category]);

    function handleCategory(event) {
        setCategory(event.target.value);
        console.log(event.target.value, "ini category blogg");
    }

    function handleSortNewest() {
        setSorting("DESC");
        console.log("ini di sort");
    }

    function handleSortOldest() {
        setSorting("ASC");
    }

    function handleNext() {
        pages.currentPage < pages.totalPage && setPageNumber(pageNumber + 1);
    }

    function handlePrev() {
        pages.currentPage > 1 && setPageNumber(pageNumber - 1);
    }

    function handleMovePage(event) {
        setPageNumber(event.target.value);
    }

    console.log(listCategories, "ini listCategories");
    console.log(category, "ini category");

    return (
        <>
            {/*======filter=====*/}
            <div
                className="flex m-10 justify-between py-20 px-3"
                key={"Filter button"}
            >
                <div
                    className="flex gap-3 justify-center items-center"
                    key={"Button FIlter"}
                >
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
                </div>
            </div>

            <div className="flex gap-3 justify-center items-center">
                <span>Sort by :</span>
                <div>
                    <button
                        name="Recent"
                        className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                        onClick={handleSortNewest}
                    >
                        Recent
                    </button>
                    <button
                        className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                        onClick={handleSortOldest}

                    >
                        Oldest
                    </button>
                </div>
            </div>

            {/*====card====*/}
            <div className="grid grid-cols-4 gap-6 m-10 mt-10">
                {cuisine.map((cuisine) => {
                    return (
                        <Card
                            key={cuisine.id}
                            cuisine={cuisine}
                            onClick={() => handleDetail(cuisine.id)}
                        />
                    );
                })}
            </div>

            {/*====buttonPage===*/}
            <div>
                <div></div>
            </div>
            <div className="flex items-center max-w-lg mx-auto bg-white p-3">
                <div className="max-w-lg mx-auto bg-white p-6">
                    <Button
                        onNext={handleNext}
                        onPrev={handlePrev}
                        pages={pages}
                        onPage={handleMovePage}
                    />
                </div>
            </div>


        </>
    );
}
