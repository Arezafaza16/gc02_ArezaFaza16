import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
const url = "https://phase2-aio.vercel.app"

export default function TableCategory() {
    const [category, setCategory] = useState([])


    async function fetchCategory() {
        try {
            let token = localStorage.getItem("access_token")
            console.log(token, "token");
            const { data } = await axios.get(`${url}/apis/restaurant-app/categories`, { headers: { Authorization: "Bearer " + `${token}` } })
            setCategory(data.data)
            console.log(data, "ini data catergoyr");

        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: error.response.data.error
            })
        }
    }

    useEffect(() => {
        fetchCategory()
    }, [])

    console.log(category, "ini juga");
    return (
        <>
            <div className="w-full relative overflow-x-auto shadow-md sm:rounded-lg p-20">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {category.map((el) => {
                            return (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="p-4">{el.id}</td>
                                    <td className="p-4">{el.name}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}