import { Link, Navigate, Outlet } from "react-router-dom";
import SideBar from "../sideBare/sideBare";
import { useStateContext } from "@/contexts/ContextProvider";
import { useEffect, useState } from "react";
import axiosAdmin from "@/axios-admin";
import image from "../../assets/Icon.png";

export default function Nav() {
    useEffect(() => {
        axiosAdmin.get("/user").then(({ data }) => {
            setUser(data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { token, setUser, setToken } = useStateContext();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    // Optional: Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownOpen && !event.target.closest(".dropdown-toggle")) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownOpen]);

    if (!token) {
        return <Navigate to={"/login"} />;
    }

    const onLogout = (e) => {
        e.preventDefault();
        axiosAdmin.post("/logout").then(() => {
            setUser({});
            setToken(null);
        });
    };

    return (
        <div>
            <header>
                <ul
                    className="nav justify-content-between align-items-center"
                    style={{
                        backgroundColor: "#0969b0",
                        paddingBottom: "1.2em",
                        paddingTop: "1.2em",
                    }}
                >
                    <div className="text-2xl text-white font-semibold inline-flex items-center">
                        <img
                            src={image}
                            style={{
                                width: "1em",
                                height: "1em",
                                marginLeft: "0.5em",
                                marginRight: "0.3em",
                                fontSize: '48px'
                            }}
                            alt=""
                        />
                        <span style={{ color: "white" }} className="logo">
                            Parc Automobile
                        </span>
                    </div>
                    <div className="nav-links">
                        <li
                            className="nav-item dropdown-toggle"
                            onClick={toggleDropdown}
                            style={{ cursor: "pointer", marginRight: "2.5em" }}
                        >
                            <i
                                className="bi bi-person-circle"
                                style={{ color: "white", fontSize: "32px" }}
                            ></i>
                            <div
                                className={`dropdown-menu${
                                    dropdownOpen ? " show" : ""
                                }`}
                                aria-labelledby="dropdownMenuButton"
                                style={{
                                    transform: "translateX(-125px)",
                                    marginTop: "5px",
                                }}
                            >
                                <Link to="/profile" className="dropdown-item">
                                    Profile
                                </Link>
                                <Link
                                    to={"/login"}
                                    onClick={onLogout}
                                    className="dropdown-item"
                                >
                                    Se déconnecter
                                </Link>
                            </div>
                        </li>
                    </div>
                </ul>
            </header>
            <div className="flex">
                <SideBar />
                <main className="container mx-auto px-0 content-inside">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
