import { Link } from "react-router-dom";

export default function Home() {
    return (
        <>
            <div
                className="bg-[url('./assets/car.jpg')] "
                style={{
                    width: "100vw",
                    marginLeft: "0",
                    height: "100vh",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <Link to='/login' className="btn text-white my-4 mx-4" style={{border: 'none'}}>
                    Se connecter
                </Link>
            </div>
        </>
    );
}
