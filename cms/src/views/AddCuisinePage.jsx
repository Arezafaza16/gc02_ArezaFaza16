import axios from "axios";
import Swal from "sweetalert2";
import Form from "../components/Form";
const url = "https://phase2-aio.vercel.app"


export default function AddCuisine() {
    const endPoint = "addPage"

    async function handleAdd() {
        try {
            let token = localStorage.getItem("access_token")
            const { data } = await axios.post(`${url}/apis/restaurant-app/cuisines`)

        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: error.response.data.error
            })
        }
    }
    return (
        <>
            <div className="bg-white shadow-md rounded-3xl w-11/12 h-9/12 p-20">
                <Form endPoint={endPoint} />
            </div>
        </>
    )
}