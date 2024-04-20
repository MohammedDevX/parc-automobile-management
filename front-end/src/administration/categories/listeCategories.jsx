import { useState, useEffect } from "react";
import axiosAdmin from "@/axios-admin";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { PulseLoader } from "react-spinners";


export default function ListeCategorie() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        getCategories(currentPage, filter);
    }, [currentPage, filter]);

    const handleSearchChange = (e) => {
        setFilter(e.target.value);
        setCurrentPage(1);
    };

    const getCategories = (page = 1, filter = "") => {
        setLoading(true);
        axiosAdmin
            .get(
                `/categories?page=${page}&filter=${encodeURIComponent(filter)}`
            )
            .then(({ data }) => {
                setCategories(data.data);
                setPageCount(data.last_page);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
                setLoading(false);
            });
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const onDelete = (id_categorie) => {
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
                    .delete(`/categories/${id_categorie}`)
                    .then(() => {
                        Swal.fire(
                            "Supprimé!",
                            "Catégorie a été supprimé.",
                            "success"
                        );
                        getCategories(currentPage);
                        setFilter("");
                    })
                    .catch((error) => {
                        console.error("Error deleting categorie:", error);
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
            <h1>Liste des Categorie&apos;s</h1>
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
                            <th>N.Catégorie</th>
                            <th>catégorie</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loading ? (
                            categories.length > 0 ? (
                                categories.map((categorie) => (
                                    <tr key={categorie.id_categorie}>
                                        <td>{categorie.id_categorie}</td>
                                        <td>{categorie.category}</td>
                                        <td>
                                            <Link
                                                to={`/categories/${categorie.id_categorie}`}
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
                                                        categorie.id_categorie
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
                                        Pas de catégories correspondant à la
                                        recherche.
                                    </td>
                                </tr>
                            )
                        ) : (
                            ""
                        )}
                    </tbody>
                </table>
                <div className="pagination-container">
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
                                        currentPage === pageCount
                                            ? "disabled"
                                            : ""
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
        </div>
    );
}
