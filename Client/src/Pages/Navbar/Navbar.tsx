import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"

export default function Navbar({ toggle, setToggle }: { toggle: string, setToggle: (toggle: string) => void }) {
    useEffect(() => {
        let mood = localStorage.getItem('toggle')
        setToggle(mood!)
    })
    let user = false
    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        localStorage.setItem("toggle", e.target.checked.toString())
        setToggle(e.target.checked.toString())
    }
    return (
        <div className={`flex justify-between bg-${toggle == "true" ? "white" : "black"} text-2xl border rounded mx-1 border-${toggle == "true" ? "black" : "white"} items-center`}>
            <h1 className={`px-3 py-1 border bg-${toggle == "true" ? "white" : "black"} border-${toggle == 'true' ? "black" : "white"}
             rounded mx-5 my-3`}>
                <span className={`text-${toggle == "true" ? "black" : "white"}`}>Testing System</span>
            </h1>
            <div className="flex items-center">
                <i className={`text-white border  border-black ${toggle == "true" ? "hidden" : ""} bi bi-moon-fill`}></i>
                <label className="w-[105%] relative   inline-flex items-center cursor-pointer">
                    <input onChange={(e) => handleToggle(e)} type="checkbox" className="sr-only peer" />
                    <div className={`border border-${toggle == "true" ? "black" : "white"} w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600`}>
                    </div>
                </label>
                <i className={`mx-2 ${toggle == "true" ? "" : "hidden"} bi bi-emoji-sunglasses-fill`}></i>
            </div>
            <div className="flex">
                <NavLink to={'/register'} className={`rounded  justify-between text-${toggle == "true" ? "black" : "white"} flex px-2 py-1 bg-${toggle == "true" ? "white" : "black"} border border-${toggle == "true" ? "black" : "white"} mx-[30px] ${user ? "hidden" : ""} `}>Sign in</NavLink>
                <NavLink to={"/login"} className={`rounded justify-between text-${toggle == "true" ? "black" : "white"} flex px-2 py-1 bg-${toggle == "true" ? "white" : "black"} border border-${toggle == "true" ? "black" : "white"} mx-[30px] ${user ? "hidden" : ""} `}>Sign up</NavLink>
            </div>
            <div className={`${user ? "" : "hidden"}`}>

            </div>
        </div>
    )
}