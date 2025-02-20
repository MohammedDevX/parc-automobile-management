// import { useEffect, useState } from "react";

// export default function ListeTrajets() {
//     const [status, setStatus] = useState("");

//     useEffect(() => {
//         const data = document.getElementById("status").innerText;
//         setStatus(data);
//     }, []);

//     const bg = () => {
//         if (status === "Termine") {
//             return "badge bg-success text-white my-1";
//         } else if (status === "En cours") {
//             return "badge bg-warning text-white my-1";
//         } else if (status === "Annule") {
//             return "badge bg-danger text-white my-1";
//         } else {
//             return "badge bg-primary text-white my-1";
//         }
//     };
//     return (
//         <div className="content">
//             <h1 className="">Trajet&apos;s Liste</h1>
//             <div className="tables shadow-sm">
//                 <div className="search">
//                     <label>Rechercher :</label>
//                     <input type="text" className="form-control" />
//                 </div>
//                 <table className="table">
//                     <thead>
//                         <tr>
//                             <th>N.Trajet</th>
//                             <th>Employe</th>
//                             <th>Vehicule</th>
//                             <th>Type trajet</th>
//                             <th>Status</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         <tr>
//                             <td>1</td>
//                             <td>Bakhtaoui</td>
//                             <td>GU67843</td>
//                             <td>Aller</td>
//                             <td id="status">
//                                 <span className={bg()}>
//                                     Pas encore commence
//                                 </span>
//                             </td>
//                             <td>
//                                 <button type="submit">
//                                     <i className="bi bi-eye-fill"></i>
//                                 </button>{" "}
//                                 |{" "}
//                                 <button type="submit">
//                                     <i className="bi bi-pencil-square"></i>
//                                 </button>
//                             </td>
//                         </tr>
//                     </tbody>
//                 </table>
//                 <nav aria-label="Page navigation example pagination">
//                     <ul className="pagination">
//                         <li className="page-item">
//                             <a className="page-link" href="#">
//                                 Previous
//                             </a>
//                         </li>
//                         <li className="page-item">
//                             <a className="page-link" href="#">
//                                 1
//                             </a>
//                         </li>
//                         <li className="page-item">
//                             <a className="page-link" href="#">
//                                 2
//                             </a>
//                         </li>
//                         <li className="page-item">
//                             <a className="page-link" href="#">
//                                 3
//                             </a>
//                         </li>
//                         <li className="page-item">
//                             <a className="page-link" href="#">
//                                 Next
//                             </a>
//                         </li>
//                     </ul>
//                 </nav>
//             </div>
//         </div>
//     );
// }









import { useState, useEffect } from "react";
import axiosAdmin from "@/axios-admin";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { PulseLoader } from "react-spinners";

export default function ListeTrajets() {
    const [trajets, setTrajets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        getTrajets(currentPage, filter);
    }, [currentPage, filter]);

    const bg = (trajetState) => {
        switch (trajetState) {
            case "Termine":
                return "badge bg-success text-white my-1";
            case "En cours":
                return "badge bg-warning text-white my-1";
            case "Annule":
                return "badge bg-danger text-white my-1";
            default:
                return "badge bg-primary text-white my-1";
        }
    };

    const handleSearchChange = (e) => {
        setFilter(e.target.value);
        setCurrentPage(1);
    };

    const getTrajets = (page = 1, filter = "") => {
        setLoading(true);
        axiosAdmin
            .get(`/trajets?page=${page}&filter=${encodeURIComponent(filter)}`)
            .then(({ data }) => {
                setTrajets(data.data);
                setPageCount(data.last_page);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching trajets:", error);
                setLoading(false);
            });
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const onDelete = (trajetId) => {
        Swal.fire({
            title: "Es-tu sûr?",
            text: "Cette action est irréversible!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Annuler",
            confirmButtonText: "Oui, supprimez-le!"
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true);
                axiosAdmin
                    .delete(`/trajets/${trajetId}`)
                    .then(() => {
                        Swal.fire("Supprimé!", "Le trajet a été supprimé.", "success");
                        getTrajets(currentPage, filter);
                    })
                    .catch((error) => {
                        console.error("Error deleting trajet:", error);
                        Swal.fire("Erreur!", "La suppression a échoué.", "error");
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            }
        });
    };
    return (
        <div className="content">
            <h1>Liste des Trajet&apos;s</h1>
            <div className="tables shadow-sm p-12">
                <div className="search">
                    <label>Rechercher :</label>
                    <input
                        type="text"
                        className="form-control"
                        value={filter}
                        onChange={handleSearchChange}
                    />
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>N.Trajet</th>
                            <th>Employé</th>
                            <th>Véhicule</th>
                            <th>Type trajet</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loading ? (
                            trajets.length > 0 ? (
                                trajets.map((trajet) => (
                                    <tr key={trajet.id_trajet}>
                                        <td>{trajet.id_trajet}</td>
                                        <td>{trajet.employe?.nom} {trajet.employe?.prenom}</td>
                                        <td>{trajet.vehicule?.matricule}</td>
                                        <td>{trajet.type}</td>
                                        <td>
                                            <span
                                                className={bg(
                                                    trajet.status
                                                )}
                                            >
                                                {trajet.status}
                                            </span>
                                        </td>
                                        <td>
                                            <Link
                                                to={`/trajets/view/${trajet.id_trajet}`}
                                                style={{
                                                    marginRight: "10px",
                                                    color: "#17a2b9",
                                                }}
                                            >
                                                <i className="bi bi-eye-fill"></i>
                                            </Link>
                                            <Link
                                                to={`/trajets/${trajet.id_trajet}`}
                                                style={{
                                                    marginRight: "10px",
                                                    color: "#17a2b9",
                                                }}
                                            >
                                                <i className="bi bi-pencil-square"></i>
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    onDelete(
                                                        trajet.id_trajet
                                                    )
                                                }
                                                style={{
                                                    border: "none",
                                                    background: "none",
                                                }}
                                            >
                                                <i className="bi bi-trash-fill text-danger"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center">
                                        Pas de trajets correspondant à la
                                        recherche.
                                    </td>
                                </tr>
                            )
                        ) : (
                            ""
                        )}
                    </tbody>
                </table>
                {loading && (
                    <PulseLoader
                        color="#369bd6"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "3em",
                        }}
                    />
                )}
                {!loading && (
                    <nav>
                        <ul className="pagination">
                            <li
                                className={`page-item ${
                                    currentPage === 1 ? "disabled" : ""
                                }`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() =>
                                        handlePageChange(currentPage - 1)
                                    }
                                >
                                    Précédent
                                </button>
                            </li>
                            {[...Array(pageCount).keys()].map((number) => (
                                <li
                                    key={number + 1}
                                    className={`page-item ${
                                        number + 1 === currentPage
                                            ? "active"
                                            : ""
                                    }`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() =>
                                            handlePageChange(number + 1)
                                        }
                                    >
                                        {number + 1}
                                    </button>
                                </li>
                            ))}
                            <li
                                className={`page-item ${
                                    currentPage === pageCount ? "disabled" : ""
                                }`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() =>
                                        handlePageChange(currentPage + 1)
                                    }
                                >
                                    Suivant
                                </button>
                            </li>
                        </ul>
                    </nav>
                )}
            </div>
        </div>
    );
}
