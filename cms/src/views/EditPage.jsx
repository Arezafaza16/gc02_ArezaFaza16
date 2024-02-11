import { useEffect, useState } from "react";
import Form from "../components/Form";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
const url = "https://phase2-aio.vercel.app"


export default function EditPage() {
    const [cuisine, setCuisine] = useState({})
    const { id } = useParams()
    const endPoint = "editPage"

    async function fetchDataById() {
        try {
            let token = localStorage.getItem("access_token")
            // console.log(token);
            const { data } = await axios.get(`${url}/apis/restaurant-app/cuisines/${id}`, { headers: { Authorization: "Bearer " + `${token}` } })
            setCuisine(data.data)
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: error.response.data.error
            })
        }
    }


    useEffect(() => {
        fetchDataById()
    }, [id])

    // console.log(cuisine);

    return (
        <>
            <div className="bg-white shadow-md rounded-3xl w-11/12 h-9/12 p-20">
                <Form cuisine={cuisine} endPoint={endPoint} />
            </div>

        </>
    )
}