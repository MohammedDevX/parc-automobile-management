import axiosAdmin from "@/axios-admin";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { useAlert } from "react-alert";

export default function AddVehicule() {
    const { id_vehicule } = useParams();
    const navigate = useNavigate();
    const alert = useAlert();
    const [vehicule, setVehicule] = useState({
        id_vehicule: null,
        marque: "",
        model: "",
        matricule: "",
        id_categorie: "",
        etat_de_vehicule: "",
        couleur_de_vehicule: "",
        consommation_essence: "",
    });
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axiosAdmin.get("/categories").then((categoriesResponse) => {
            setCategories(categoriesResponse.data.data || []);

            if (id_vehicule) {
                axiosAdmin.get(`/vehicules/${id_vehicule}`).then((vehiculeResponse) => {
                    setVehicule(vehiculeResponse.data);
                    setLoading(false);
                }).catch((error) => {
                    console.error("Failed to load vehicle", error);
                    alert.error("Failed to load vehicle");
                    setLoading(false);
                });
            } else {
                setLoading(false);
            }
        }).catch((error) => {
            console.error("Failed to load categories", error);
            alert.error("Failed to load categories");
            setLoading(false);
        });
    }, [id_vehicule, alert, navigate]);

    const onSubmit = (ev) => {
        ev.preventDefault();
        setLoading(true);
        const payload = { ...vehicule };
        console.log(payload);

        const request = id_vehicule
            ? axiosAdmin.put(`/vehicules/${id_vehicule}`, payload)
            : axiosAdmin.post("/vehicules", payload);

        request
            .then(() => {
                navigate("/vehicules");
                alert.success(
                    `Véhicule ${
                        id_vehicule ? "modifié" : "ajouté"
                    } avec succès`
                );
            })
            .catch(() => {
                alert.error(
                    `Erreur lors de la ${
                        id_vehicule ? "modification" : "création"
                    } du véhicule`
                );
            })
            .finally(() => setLoading(false));
    };
    console.log(vehicule)
    return (
        <div className="content">
            {vehicule.id_vehicule && !loading && <h1>Modifier vehicule</h1>}
            {!vehicule.id_vehicule && !loading && <h1>Ajouter une vehicule</h1>}
            {loading ? (
                <div style={{ marginTop: "-16px", paddingTop: "1px" }}>
                    <PulseLoader
                        color="#369bd6"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "15em",
                        }}
                    />
                </div>
            ) : (
                <div className="inserts shadow-sm">
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label>Marque</label>
                            <input
                                type="text"
                                id="marque"
                                className="form-control"
                                placeholder="Marque"
                                onChange={(e) =>
                                    setVehicule({
                                        ...vehicule,
                                        marque: e.target.value,
                                    })
                                }
                                value={vehicule.marque}
                            />
                        </div>
                        <div className="form-group">
                            <label>Modèl</label>
                            <input
                                type="text"
                                id="model"
                                className="form-control"
                                placeholder="Model"
                                onChange={(e) =>
                                    setVehicule({
                                        ...vehicule,
                                        model: e.target.value,
                                    })
                                }
                                value={vehicule.model}
                            />
                        </div>
                        <div className="form-group">
                            <label>Matricule</label>
                            <input
                                type="text"
                                id="matricule"
                                className="form-control"
                                placeholder="Matricule"
                                onChange={(e) =>
                                    setVehicule({
                                        ...vehicule,
                                        matricule: e.target.value,
                                    })
                                }
                                value={vehicule.matricule}
                            />
                        </div>
                        <div className="form-group">
                            <label>Consommation carburant dans 1KM</label>
                            <input
                                type="text"
                                id="consommation_essence"
                                className="form-control"
                                placeholder="Consommation essence dans 1km "
                                onChange={(e) =>
                                    setVehicule({
                                        ...vehicule,
                                        consommation_essence: e.target.value,
                                    })
                                }
                                value={vehicule.consommation_essence}
                            />
                        </div>
                        <div className="form-group">
                            <label>Catégory</label>
                            <select
                                className="form-select"
                                onChange={(e) =>
                                    setVehicule({
                                        ...vehicule,
                                        id_categorie: e.target.value,
                                    })
                                }
                                value={vehicule.id_categorie}
                            >
                                <option value="">
                                    Selectionner categorie vehicule
                                </option>
                                {categories.map((category) => (
                                    <option
                                        key={category.id_categorie}
                                        value={category.id_categorie}
                                    >
                                        {category.category}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Etat de véhicule</label>
                            <select
                                className="form-select"
                                onChange={(e) =>
                                    setVehicule({
                                        ...vehicule,
                                        etat_de_vehicule: e.target.value,
                                    })
                                }
                                value={vehicule.etat_de_vehicule}
                            >
                                <option value="">
                                    Selectionner etat vehicule
                                </option>
                                <option value="Disponible">Disponible</option>
                                <option value="Reserve">Reserve</option>
                                <option value="En reparation">
                                    En reparation
                                </option>
                                <option value="Hors service">
                                    Hors service
                                </option>
                                <option value="Vendu">Vendu</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Couleur de véhicule</label>
                            <input
                                type="text"
                                id="couleur"
                                className="form-control"
                                placeholder="Couleur de vehicule"
                                onChange={(e) =>
                                    setVehicule({
                                        ...vehicule,
                                        couleur_de_vehicule: e.target.value,
                                    })
                                }
                                value={vehicule.couleur_de_vehicule}
                            />
                        </div>
                    </form>
                    {vehicule.id_vehicule ? (
                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: "auto", height: "auto" }}
                            onClick={onSubmit}
                        >
                            Modifier vehicule
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={onSubmit}
                        >
                            Ajouter vehicule
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
