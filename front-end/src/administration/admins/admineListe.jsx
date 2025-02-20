import { useState, useEffect } from "react";
import axiosAdmin from "@/axios-admin";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { PulseLoader } from "react-spinners";

export default function AdmineListe() {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        getAdmins(currentPage, filter);
    }, [currentPage, filter]);

    const handleSearchChange = (e) => {
        setFilter(e.target.value);
        setCurrentPage(1);
    };

    const getAdmins = (page = 1, filter = "") => {
        setLoading(true);
        axiosAdmin
            .get(`/users?page=${page}&filter=${encodeURIComponent(filter)}`)
            .then(({ data }) => {
                setAdmins(data.data);
                setPageCount(data.last_page);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching admins:", error);
                setLoading(false);
            });
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const onDelete = (adminId) => {
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
                    .delete(`/users/${adminId}`)
                    .then(() => {
                        Swal.fire(
                            "Supprimé!",
                            "Admin a été supprimé.",
                            "success"
                        );
                        getAdmins(currentPage);
                        setFilter("");
                    })
                    .catch((error) => {
                        console.error("Error deleting admin:", error);
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
            <h1>Liste des Admin&apos;s</h1>
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
                            <th>N.Admin</th>
                            <th>Nom</th>
                            <th>Prenom</th>
                            <th>Tel</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loading ? (
                            admins.length > 0 ? (
                                admins.map((admin) => (
                                    <tr key={admin.id}>
                                        <td>{admin.id}</td>
                                        <td>{admin.name}</td>
                                        <td>{admin.prenom}</td>
                                        <td>{admin.tel}</td>
                                        <td>{admin.email}</td>
                                        <td>
                                            <Link
                                                to={`/users/view/${admin.id}`}
                                                style={{
                                                    marginRight: "10px",
                                                    color: "#17a2b9",
                                                }}
                                            >
                                                <i className="bi bi-eye-fill"></i>
                                            </Link>
                                            <Link
                                                to={`/users/${admin.id}`}
                                                style={{
                                                    marginRight: "10px",
                                                    color: "#17a2b9",
                                                }}
                                            >
                                                <i className="bi bi-pencil-square"></i>
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    onDelete(admin.id)
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
                                        Pas d&apos;admins correspondant à la
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
