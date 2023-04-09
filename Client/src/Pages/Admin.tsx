import { useParams } from "react-router";
import { Toaster, toast } from "react-hot-toast"
import Navbar from "./Navbar/Navbar";
import { useEffect, useState } from "react";

export default function AdminPage({ toggle, setToggle }: { toggle: string, setToggle: (togle: string) => void }) {
    let [change, setChange] = useState<boolean>(false)
    const [name, setName] = useState("")
    const [lastname, setLastname] = useState("")
    const [age, setAge] = useState<number>()
    const [address, setAddress] = useState("")
    const [school, setSchool] = useState("")
    const { id } = useParams()
    const clickButton = (link: string) => {
        window.location.href = link
    }
    const handleParams = (link: string) => {
        if (id == link) {
            return `cursor-pointer bg-green-600 px-3 rounded py-1 border border-${toggle == "true" ? "black" : "white"}`
        } else if (id == undefined && link == "/") {
            return `cursor-pointer bg-green-600 px-3 rounded py-1 border border-${toggle == "true" ? "black" : "white"}`
        }
        return `cursor-pointer px-3 rounded py-1 border border-${toggle == "true" ? "black" : "white"}`
    }
    let user = {
        name: "Xasanboy",
        lastname: "Abdurasulov",
        age: 15,
        address: "Turkiston 19",
        school: "UrDU huzuri"
    }
    useEffect(() => {
        setName(user.name)
        setLastname(user.lastname)
        setAddress(user.address)
        setAge(user.age)
        setSchool(user.school)
    }, [])
    useEffect(() => {
        if (name !== user.name || lastname !== user.lastname || age !== user.age || address !== user.address || school !== user.school) {
            setChange(true)
        } else {
            setChange(false)
        }
    }, [name, lastname, age, school, address])
    const saveSettgins = async () => {
        throw new Error("Hello World");
    }
    const saveHanlde = (text: "save" | "cancel") => {
        if (text == "save") {
            if (change) {
                toast.promise(saveSettgins(),
                    {
                        loading: 'Saving...',
                        error: <b>Could not save.</b>,
                        success: <b>Settings saved!</b>,
                    })
            } else {
                toast.error("You must to write something!", {
                    style: {
                        borderRadius: '10px',
                        background: toggle == "true" ? "white" : "#333",
                        color: toggle == "true" ? "#333" : "white",
                        border: `1px solid ${toggle == "true" ? "black" : "white"}`,
                    },
                })
            }
        } else {
            setName(user.name)
            setLastname(user.lastname)
            setAge(user.age)
            setAddress(user.address)
        }
    }
    return (
        <div style={{ height: innerHeight }} className={`bg-${toggle == "true" ? "white" : "black"} text-${toggle == "true" ? "black" : "white"} text-2xl`}>
            <Navbar setToggle={setToggle} toggle={toggle} />
            <ul className="flex my-5 justify-center gap-[10%]">
                <li onClick={() => clickButton("/admin/")} className={`${handleParams("/")}`}>Profile</li>
                <li onClick={() => clickButton("createTest")} className={`${handleParams("createTest")}`}>Create Test</li>
                <li onClick={() => clickButton("pupils")} className={`${handleParams("pupils")}`}>My pupils</li>
            </ul>
            {id == undefined &&
                <div className="py-5">
                    <table className=" table-auto w-full mx-auto">
                        <thead>
                            <tr>
                                <th><label htmlFor="name">Your name:</label></th>
                                <th><input id="name" className={`px-3 py-1 rounded border border-${toggle == "true" ? "black" : "white"} text-black`} onChange={(e) => setName(e.target.value)} value={name} /></th>
                            </tr>
                            <br />
                        </thead>
                        <tbody>
                            <tr>
                                <th><label htmlFor="lastname">Your lastname:</label></th>
                                <th><input id="lastname" className={`px-3 py-1 rounded border border-${toggle == "true" ? "black" : "white"} text-black`} onChange={(e) => setLastname(e.target.value)} value={lastname} /></th>
                            </tr>
                            <br />
                            <tr>
                                <th><label htmlFor="age">Your age:</label></th>
                                <th><input id="age" type="number" className={`px-3 py-1 rounded border border-${toggle == "true" ? "black" : "white"} text-black`} onChange={(e) => setAge(+e.target.value)} value={age} /></th>
                            </tr>
                            <br />
                            <tr>
                                <th><label htmlFor="address">Your address:</label></th>
                                <th><input id="address" className={`px-3 py-1 rounded border border-${toggle == "true" ? "black" : "white"} text-black`} onChange={(e) => setAddress(e.target.value)} value={address} /></th>
                            </tr>
                            <br />
                            <tr>
                                <th>Your school:</th>
                                <th>
                                    <select onChange={(e) => setSchool(e.target.value)} value={school} className={` px-3 py-1 rounded border border-${toggle == "true" ? "black" : "white"} text-black`}>
                                        <option disabled>UrDU huzuri</option>
                                    </select>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                    <div className="flex my-[125px] justify-center gap-[25px]">
                        <a className={`cursor-${change ? "pointer" : "not-allowed"}
                         border border-${toggle == "true" ? "black" : "white"} 
                         px-3 py-1 rounded bg-${change ? "green-700" : ""}`} onClick={() => saveHanlde("save")}>Save</a>
                        <a className={`cursor-${change ? "pointer" : "not-allowed"}
                         border border-${toggle == "true" ? "black" : "white"} 
                         px-3 py-1 rounded bg-${change ? "red-700" : ""}`} onClick={() => saveHanlde("cancel")}>Cancel</a>
                    </div>
                </div>
            }
            {id == "createTest" &&
                <div>
                    Create test
                </div>
            }
            {id == "pupils" &&
                <div>
                    All pupils
                </div>
            }
        </div>
    )
}  