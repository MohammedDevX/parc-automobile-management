import axiosAdmin from "@/axios-admin";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { useAlert } from "react-alert";

export default function AddReparation() {
    const { id_reparation } = useParams();
    const navigate = useNavigate();
    const alert = useAlert();
    const [reparation, setReparation] = useState({
        id_vehicule: "",
        date_debut_reparation: "",
        date_fin_reparation: "",
        type: "",
        description: "",
        prix: "",
    });
    const [loading, setLoading] = useState(true);
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        axiosAdmin.get("/vehicule").then((response) => {
            setVehicles(response.data.data || []);
            if (id_reparation) {
                axiosAdmin
                    .get(`/reparations/${id_reparation}`)
                    .then(({ data }) => {
                        setReparation({
                            ...data,
                            id_vehicule: data.vehicule?.id_vehicule,
                        });
                    })
                    .catch(() => {
                        alert.error("Failed to load reparation");
                    })
                    .finally(() => setLoading(false));
            } else {
                setLoading(false);
            }
        }).catch(() => {
            alert.error("Failed to load vehicles");
            setLoading(false);
        });
    }, [id_reparation, alert]);
    

    const onSubmit = (ev) => {
        ev.preventDefault();
        setLoading(true);
        const payload = { ...reparation };
        console.log(payload);

        const request = id_reparation
            ? axiosAdmin.put(`/reparations/${id_reparation}`, payload)
            : axiosAdmin.post("/reparations", payload);

        request
            .then(() => {
                navigate("/reparations");
                alert.success(
                    `Réparation ${
                        id_reparation ? "modifiée" : "ajoutée"
                    } avec succès`
                );
            })
            .catch(() => {
                alert.error(
                    `Erreur lors de la ${
                        id_reparation ? "modification" : "création"
                    } de la réparation`
                );
            })
            .finally(() => setLoading(false));
    };
    return (
        <div className="content">
            {id_reparation && !loading && <h1>Modifier reparation</h1>}
            {!id_reparation && !loading && <h1>Ajouter une reparation</h1>}
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
                <div className="inserts-a shadow-sm">
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label>Véhicule endommagé</label>
                            <select
                                className="form-select"
                                onChange={(e) =>
                                    setReparation({
                                        ...reparation,
                                        id_vehicule: e.target.value,
                                    })
                                }
                                value={reparation.id_vehicule}
                            >
                                <option value="">
                                    Selectionner un véhicule
                                </option>
                                {vehicles.map((vehicle) => (
                                    <option
                                        key={vehicle.id_vehicule}
                                        value={vehicle.id_vehicule}
                                    >
                                        {vehicle.matricule}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Date début réparation</label>
                            <input
                                type="date"
                                id="date_debut_reparation"
                                className="form-control"
                                onChange={(e) =>
                                    setReparation({
                                        ...reparation,
                                        date_debut_reparation: e.target.value,
                                    })
                                }
                                value={reparation.date_debut_reparation}
                            />
                        </div>
                        <div className="form-group">
                            <label>Date fin réparation</label>
                            <input
                                type="date"
                                id="date_fin_reparation"
                                className="form-control"
                                onChange={(e) =>
                                    setReparation({
                                        ...reparation,
                                        date_fin_reparation: e.target.value,
                                    })
                                }
                                value={reparation.date_fin_reparation}
                            />
                        </div>
                        <div className="form-group">
                            <label>Type réparation</label>
                            <select
                                className="form-select"
                                onChange={(e) =>
                                    setReparation({
                                        ...reparation,
                                        type: e.target.value,
                                    })
                                }
                                value={reparation.type}
                            >
                                <option value="">
                                    Selectionner type reparation
                                </option>
                                <option value="Réparations Mécaniques">
                                    Réparations mécaniques
                                </option>
                                <option value="Réparations Électriques">
                                    Réparations Électriques
                                </option>
                                <option value="Réparations de Carrosserie">
                                    Réparations de Carrosserie
                                </option>
                                <option value="Réparations Intérieures">
                                    Réparations Intérieures
                                </option>
                                <option value="Services de Diagnostic ">
                                    Services de Diagnostic
                                </option>
                                <option value="Services de Maintenance">
                                    Services de Maintenance
                                </option>
                                <option value="Services de Pneus et Roues">
                                    Services de Pneus et Roues
                                </option>
                                <option value="Réparations du Système d'Échappement">
                                    Réparations du Système d&apos;Échappement
                                </option>
                                <option value="Réparations du Système HVAC">
                                    Réparations du Système HVAC
                                </option>
                                <option value="Réparations de la Transmission">
                                    Réparations de la Transmission
                                </option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Prix</label>
                            <input
                                type="text"
                                id="prix"
                                placeholder="Prix"
                                className="form-control"
                                onChange={(e) =>
                                    setReparation({
                                        ...reparation,
                                        prix: e.target.value,
                                    })
                                }
                                value={reparation.prix}
                            />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                id="description"
                                className="form-control"
                                cols="120"
                                rows="3"
                                placeholder="Description"
                                onChange={(e) =>
                                    setReparation({
                                        ...reparation,
                                        description: e.target.value,
                                    })
                                }
                                value={reparation.description}
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">
                            {id_reparation
                                ? "Modifier reparation"
                                : "Ajouter reparation"}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
