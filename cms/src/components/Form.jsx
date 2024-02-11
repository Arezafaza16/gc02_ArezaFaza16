import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
const url = "https://phase2-aio.vercel.app"


export default function Form({ cuisine, endPoint }) {
    // console.log(cuisine.id, "ini cuisine form");
    console.log(endPoint);
    const [form, setForm] = useState({ ...cuisine });
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

    async function handleEdit(event) {
        try {
            event.preventDefault()
            let token = localStorage.getItem("access_token")
            await axios.put(`${url}/apis/restaurant-app/cuisines/${cuisine.id}`, form, { headers: { Authorization: "Bearer " + `${token}` } })

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: error.response.data.error
            })
        }
    }

    function handleChange(event) {
        const { name, value } = event.target;
        let newValue = value; // Initialize newValue with the value from the event

        // If the name is 'price', convert value to a float
        if (name === 'price') {
            newValue = parseFloat(value);
        }
        // If the name is 'categoryId', convert value to an integer
        else if (name === 'categoryId') {
            newValue = parseInt(value, 0);
        }
        setForm({
            ...form,
            [name]: newValue
        });
    }
    useEffect(() => {
        fetchCategory()
    }, [])

    console.log(category, "ini dari form yang form");

    return (
        <>
            {endPoint === "editPage" ?
                <form className="max-w-md mx-auto">

                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark: dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder="Name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder="Description"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="number"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder="Price"
                            value={form.price || ''}
                            name="price"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder="ImgUrl"
                            value={form.imgUrl}
                            name="imgUrl"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <select
                            name="categoryId"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"

                        >
                            <option selected hidden>
                                please select any categories
                            </option>
                            {category.map((el) => {
                                return (
                                    <option value={el.id} key={el.id}>{el.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <button type="button"
                        className=" bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={handleEdit}
                    >
                        Submit
                    </button>
                </form>

                :

                <form className="max-w-md mx-auto">

                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark: dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder="Name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder="Description"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="number"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder="Price"
                            value={form.price || ''}
                            name="price"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder="ImgUrl"
                            value={form.imgUrl}
                            name="imgUrl"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <select
                            name="categoryId"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"

                        >
                            <option selected hidden>
                                please select any categories
                            </option>
                            {category.map((el) => {
                                return (
                                    <option value={el.id} key={el.id}>{el.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <button type="button"
                        className=" bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={handleEdit}
                    >
                        Submit
                    </button>
                </form>
            }

        </>
    )
}