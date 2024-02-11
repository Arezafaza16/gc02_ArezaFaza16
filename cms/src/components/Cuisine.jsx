import { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import Swal from "sweetalert2";
import NavBar from "./Navbar";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Filter from "./Filter";

export default function Cuisines() {
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

    function handleSortNewest() {
        setSorting("DESC");
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

    return (
        <>
            <div className="flex m-10 justify-between p-20">
                <div className="flex gap-3 justify-center items-center">
                    <Filter key="filterButton" listCategories={listCategories} />
                </div>
            </div>

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

            <div className="flex items-center max-w-lg mx-auto bg-white p-3">
                <div className="max-w-lg mx-auto bg-white p-6">
                    <Button
                        key="paginationButton"
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
