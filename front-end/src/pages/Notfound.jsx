import { Link } from "react-router-dom";

export default function Notfound() {
return (
    <div className="not-found">
        <h1>404 - Page non disponible</h1>
        <Link to={'/'}><button type="submit" className="btn btn-dark">Go back home</button></Link>
    </div>
)
}
