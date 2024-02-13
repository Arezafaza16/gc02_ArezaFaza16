import Cuisines from "../components/Cuisine";
import NavBar from "../components/Navbar";
import { useState } from 'react'
import { Outlet } from 'react-router-dom'



export default function HomePage() {
    // const find = search
    const [search, setSearch] = useState('')

    return (
        <>
            <NavBar setSearch={setSearch} />
            <Cuisines find={search} />
            <Outlet />

        </>
    )
}   