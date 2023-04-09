import { Outlet } from "react-router";
import HomePage from "./HomePage";

export default function Layout({ toggle, setToggle }: { toggle: "true" | "false", setToggle: (toggle: string) => void }) {
    return (
        <div>
            <HomePage setToggle={setToggle} toggle={toggle} />
            <Outlet />
        </div>
    )
}