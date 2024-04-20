import { useState, useEffect } from "react";
import axiosAdmin from "@/axios-admin";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { PulseLoader } from "react-spinners";


export default function ListePrixCarburant() {
    const [carburant, setCarburant] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    // const [pageCount, setPageCount] = useState(0);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        getCarburant(currentPage, filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, filter]);

    const handleSearchChange = (e) => {
        setFilter(e.target.value);
        setCurrentPage(1);
    };

    const getCarburant = (page = 1, filter = "") => {
        setLoading(true);
        axiosAdmin
            .get(
                `/carburant?page=${page}&filter=${encodeURIComponent(filter)}`
            )
            .then(({ data }) => {
                setCarburant(data.data);
                console.log('carburant :', carburant)
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching prix:", error);
                setLoading(false);
            });
    };

    const onDelete = (id_carburant) => {
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
                    .delete(`/carburant/${id_carburant}`)
                    .then(() => {
                        Swal.fire(
                            "Supprimé!",
                            "Prix carburant a été supprimé.",
                            "success"
                        );
                        getCarburant(currentPage);
                        setFilter("");
                    })
                    .catch((error) => {
                        console.error("Error deleting carburant:", error);
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
            <h1>Liste prix carburant</h1>
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
                            <th>N.Carburant</th>
                            <th>Prix Carburant</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loading ? (
                            carburant.length > 0 ? (
                                carburant.map((carburantt) => (
                                    <tr key={carburantt.id_carburant}>
                                        <td>{carburantt.id_carburant}</td>
                                        <td>{carburantt.prix_carburant}</td>
                                        <td>
                                            <Link
                                                to={`/carburant/${carburantt.id_carburant}`}
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
                                                        carburantt.id_carburant
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
                </div>
            </div>
        </div>
    );
}
