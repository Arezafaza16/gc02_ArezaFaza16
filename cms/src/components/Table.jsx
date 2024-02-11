import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import rupiah from "../helpers/priceConverter";
import { useParams } from "react-router-dom";

export default function Table() {
    const url = "https://phase2-aio.vercel.app"
    const [cuisines, setCuisine] = useState([])
    // console.log(find, "ini search");


    async function fetchCuisines() {
        try {
            let token = localStorage.getItem("access_token")
            // console.log(token, "ini token");
            const { data } = await axios.get(`${url}/apis/restaurant-app/cuisines?=${find}`, { headers: { Authorization: "Bearer " + `${token}` } })
            setCuisine(data.data)
            console.log(data.data, "ini data");
        } catch (error) {
            console.log(error, "ini errornya");
            Swal.fire({
                icon: "error",
                title: error.response.data.error
            })

        }
    }

    async function handleDelete(id) {
        try {

        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: error.response.data.error
            })
        }
    }
    useEffect(() => {
        fetchCuisines()
    }, [])
    console.log(cuisines, "ini cuisine");

    return (
        <>

            <div className="flex gap-3 justify-center items-center">
                <div className="w-screen  overflow-x-auto shadow-md sm:rounded-lg p-20">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Id
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Image
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Description
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Created By
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {cuisines.map((el) => {
                                return (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="p-4">{el.id}</td>
                                        <td className="p-4">
                                            <img src={el.imgUrl} className="w-16 md:w-32 max-w-full max-h-full" />
                                        </td>
                                        <td className="p-4">
                                            {el.name}
                                        </td>
                                        <td className="p-4">
                                            {el.description
                                            }</td>
                                        <td className="p-4">
                                            {rupiah(el.price)}
                                        </td>
                                        <td className="p-4">
                                            {el.User.username}
                                        </td>
                                        <td className="p-4">
                                            <a href="#"
                                                className="font-medium text-red-600 dark:text-red-500 hover:underline p-2"
                                            >Remove</a>||
                                            <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline p-2">edit</a>
                                        </td>
                                    </tr>

                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}