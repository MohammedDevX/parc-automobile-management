import { useState, useEffect } from "react";
import axiosAdmin from "@/axios-admin";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { PulseLoader } from "react-spinners";

export default function ListeReparation() {
    const [reparations, setReparations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        getReparations(currentPage, filter);
    }, [currentPage, filter]);

    const handleSearchChange = (e) => {
        setFilter(e.target.value);
        setCurrentPage(1);
    };

    const getReparations = (page = 1, filter = "") => {
        setLoading(true);
        axiosAdmin
            .get(`/reparations?page=${page}&filter=${encodeURIComponent(filter)}`)
            .then(({ data }) => {
                setReparations(data.data);
                setPageCount(data.last_page);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching reparations:", error);
                setLoading(false);
            });
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const onDelete = (reparationId) => {
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
                    .delete(`/reparations/${reparationId}`)
                    .then(() => {
                        Swal.fire(
                            "Supprimé!",
                            "La réparation a été supprimée.",
                            "success"
                        );
                        // Properly fetches updated reparations list
                        getReparations(currentPage, filter);
                    })
                    .catch((error) => {
                        console.error("Error deleting reparation:", error);
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
            <h1>Liste des Reparation&apos;s</h1>
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
                            <th>N.Réparation</th>
                            <th>Véhicule endommagé</th>
                            <th>Date début réparation</th>
                            <th>Date fin réparation</th>
                            <th>Prix</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loading ? (
                            reparations.length > 0 ? (
                                reparations.map((reparation) => (
                                    <tr key={reparation.id_reparation}>
                                        <td>{reparation.id_reparation}</td>
                                        <td>{reparation.vehicule?.matricule}</td>
                                        <td>{reparation.date_debut_reparation}</td>
                                        <td>{reparation.date_fin_reparation}</td>
                                        <td>{reparation.prix}</td>
                                        <td>
                                            <Link
                                                to={`/reparations/view/${reparation.id_reparation}`}
                                                style={{
                                                    marginRight: "10px",
                                                    color: "#17a2b9",
                                                }}
                                            >
                                                <i className="bi bi-eye-fill"></i>
                                            </Link>
                                            <Link
                                                to={`/reparations/${reparation.id_reparation}`}
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
                                                        reparation.id_reparation
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
                                        Pas de réparations correspondant à la
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
