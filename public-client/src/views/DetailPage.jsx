
import { useEffect, useState } from "react"
import axios from "axios"
import rupiah from "../helpers/priceConverter"
import Swal from "sweetalert2"
import { Link, useParams } from "react-router-dom"
import NavBar from "../components/Navbar"
// import Cuisines from "../components/Cuisine"


export default function DetailPage() {

    const url = "https://phase2-aio.vercel.app"
    const [cuisine, setCuisine] = useState({})
    let { id } = useParams()
    const searchBar = true;

    async function fetchCuisineDetail() {
        try {
            const { data } = await axios.get(`${url}/apis/pub/restaurant-app/cuisines/${id}`)
            setCuisine(data.data)
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Ooops",
                text: `${error.response.data.error}`
            })
            console.log(error);
        }
    }
    useEffect(() => {
        fetchCuisineDetail()
    }, [id])

    return (
        <>
            <NavBar searchBar={searchBar} />
            <section>
                <div className="container my-24 mx-auto md:px-6">
                    <section className="mb-32">
                        <div
                            className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                            <div className="flex flex-wrap items-center">
                                <div className="hidden shrink-0 grow-0 basis-auto lg:flex lg:w-6/12 xl:w-4/12">
                                    <img src={cuisine?.imgUrl} alt="Trendy Pants and Shoes"
                                        className="w-full rounded-t-lg lg:rounded-tr-none lg:rounded-bl-lg" />
                                </div>
                                <div className="w-full shrink-0 grow-0 basis-auto lg:w-6/12 xl:w-8/12">
                                    <div className="px-6 py-12 md:px-12">
                                        <h2 className="mb-4 text-2xl font-bold">
                                            {cuisine.name}
                                        </h2>
                                        <p className="mb-6 flex items-center font-bold uppercase text-danger dark:text-danger-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                                                stroke="currentColor" className="mr-2 h-5 w-5">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                    d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                    d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
                                            </svg>
                                            {rupiah(cuisine.price)}
                                        </p>
                                        <p className="mb-6 text-neutral-500 dark:text-neutral-300">
                                            {cuisine?.Category?.name}
                                        </p>
                                        <p className="text-neutral-500 dark:text-neutral-300">
                                            {cuisine?.description}
                                        </p>
                                        <p className="text-neutral-500 dark:text-neutral-300">
                                            {cuisine?.User?.name}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </>
    )
}