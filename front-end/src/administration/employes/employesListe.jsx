import { useState, useEffect } from "react";
import axiosAdmin from "@/axios-admin";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { PulseLoader } from "react-spinners";

export default function EmployeListe() {
    const [employes, setEmployes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        getEmployes(currentPage, filter);
    }, [currentPage, filter]);

    const bg = (employeState) => {
        switch (employeState) {
            case "Disponible":
                return "badge bg-success text-white my-1";
            case "En congé":
                return "badge bg-warning text-white my-1";
            case "En arrêt maladie":
                return "badge bg-danger text-white my-1";
            case "Retraite":
                return "badge bg-secondary text-white my-1";
            default:
                return "badge bg-primary text-white my-1";
        }
    };

    const handleSearchChange = (e) => {
        setFilter(e.target.value);
        setCurrentPage(1);
    };

    const getEmployes = (page = 1, filter = "") => {
        setLoading(true);
        axiosAdmin
            .get(`/employes?page=${page}&filter=${encodeURIComponent(filter)}`)
            .then(({ data }) => {
                setEmployes(data.data);
                setPageCount(data.last_page);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching employes:", error);
                setLoading(false);
            });
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const onDelete = (employeId) => {
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
                    .delete(`/employes/${employeId}`)
                    .then(() => {
                        Swal.fire(
                            "Supprimé!",
                            "L'employé a été supprimé.",
                            "success"
                        );
                        getEmployes(currentPage);
                        setFilter("");
                    })
                    .catch((error) => {
                        console.error("Error deleting employe:", error);
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
            <h1>Liste des Employe&apos;s</h1>
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
                            <th>N. Employé</th>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Téléphone</th>
                            <th>Permis conduire</th>
                            <th>Etat</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loading ? (
                            employes.length > 0 ? (
                                employes.map((employe) => (
                                    <tr key={employe.id}>
                                        <td>{employe.id}</td>
                                        <td>{employe.nom}</td>
                                        <td>{employe.prenom}</td>
                                        <td>{employe.tel}</td>
                                        <td>{employe.permis_conduire}</td>
                                        <td><span
                                                className={bg(
                                                    employe.etat_employe
                                                )}
                                            >
                                                {employe.etat_employe}
                                            </span></td>
                                        <td>
                                            <Link
                                                to={`/employes/view/${employe.id}`}
                                                style={{
                                                    marginRight: "10px",
                                                    color: "#17a2b9",
                                                }}
                                            >
                                                <i className="bi bi-eye-fill"></i>
                                            </Link>
                                            <Link
                                                to={`/employes/${employe.id}`}
                                                style={{
                                                    marginRight: "10px",
                                                    color: "#17a2b9",
                                                }}
                                            >
                                                <i className="bi bi-pencil-square"></i>
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    onDelete(employe.id)
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
                                        Pas d&apos;employés correspondant à la
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
