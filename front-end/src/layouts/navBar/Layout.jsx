import { useStateContext } from "@/contexts/ContextProvider";
import { Navigate, Outlet } from "react-router-dom";

export default function Layout() {
    const { token } = useStateContext();
    if (token) {
        return <Navigate to={"/dashboards"} />;
    }

    return (
        <div>
            {/* <header>
                <ul
                    className="nav justify-content-between align-items-center py-4"
                    style={{ backgroundColor: "#0969b0" }}
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
                        <li className="nav-item">
                            <Link
                                to={"/"}
                                style={{
                                    color: "white",
                                    textDecoration: "none",
                                }}
                            >
                                Page principale
                            </Link>
                        </li>
                        <li className="nav-item px-4">
                            <Link
                                to={"/login"}
                                style={{
                                    color: "white",
                                    textDecoration: "none",
                                }}
                            >
                                Se connecter
                            </Link>
                        </li>
                    </div>
                </ul>
            </header> */}
            <main className="">
                <Outlet />
            </main>
        </div>
    );
}
