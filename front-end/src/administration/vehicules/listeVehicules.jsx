import { useState, useEffect } from "react";
import axiosAdmin from "@/axios-admin";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { PulseLoader } from "react-spinners";

export default function EmployeListe() {
    const [vehicules, setVehicules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        getVehicules(currentPage, filter);
    }, [currentPage, filter]);

    const bg = (vehicleState) => {
        switch (vehicleState) {
            case "Disponible":
                return "badge bg-success text-white my-1";
            case "Reserve":
                return "badge bg-warning text-white my-1";
            case "En reparation":
                return "badge bg-danger text-white my-1";
            case "Hors service":
                return "badge bg-secondary text-white my-1";
            default:
                return "badge bg-primary text-white my-1";
        }
    };

    const handleSearchChange = (e) => {
        setFilter(e.target.value);
        setCurrentPage(1);
    };

    const getVehicules = (page = 1, filter = "") => {
        setLoading(true);
        axiosAdmin
            .get(`/vehicules?page=${page}&filter=${encodeURIComponent(filter)}`)
            .then(({ data }) => {
                setVehicules(data.data);
                setPageCount(data.last_page);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching vehicules:", error);
                setLoading(false);
            });
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const onDelete = (vehiculeId) => {
        Swal.fire({
            title: "Es-tu sûr?",
            text: "Cette action est irréversible!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Annuler",
            confirmButtonText: "Oui, supprimez-le!",
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true);
                axiosAdmin
                    .delete(`/vehicules/${vehiculeId}`)
                    .then(() => {
                        Swal.fire(
                            "Supprimé!",
                            "Véhicule a été supprimé.",
                            "success"
                        );
                        getVehicules(currentPage);
                        setFilter("");
                    })
                    .catch((error) => {
                        console.error("Error deleting vehicule:", error);
                        Swal.fire(
                            "Erreur!",
                            "La suppression a échoué.",
                            "error"
                        );
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            }
        });
    };
    return (
        <div className="content">
            <h1>Liste des Vehicule&apos;s</h1>
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
                            <th>N.Véhicule</th>
                            <th>Marque</th>
                            <th>Modèl</th>
                            <th>Matricule</th>
                            <th>Catégorie</th>
                            <th>Etat</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loading ? (
                            vehicules.length > 0 ? (
                                vehicules.map((vehicule) => (
                                    <tr key={vehicule.id_vehicule}>
                                        <td>{vehicule.id_vehicule}</td>
                                        <td>{vehicule.marque}</td>
                                        <td>{vehicule.model}</td>
                                        <td>{vehicule.matricule}</td>
                                        <td>{vehicule.categorie?.category}</td>
                                        <td>
                                            <span
                                                className={bg(
                                                    vehicule.etat_de_vehicule
                                                )}
                                            >
                                                {vehicule.etat_de_vehicule}
                                            </span>
                                        </td>
                                        <td>
                                            <Link
                                                to={`/vehicules/view/${vehicule.id_vehicule}`}
                                                style={{
                                                    marginRight: "10px",
                                                    color: "#17a2b9",
                                                }}
                                            >
                                                <i className="bi bi-eye-fill"></i>
                                            </Link>
                                            <Link
                                                to={`/vehicules/${vehicule.id_vehicule}`}
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
                                                        vehicule.id_vehicule
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
                                        Pas de véhicules correspondant à la
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

