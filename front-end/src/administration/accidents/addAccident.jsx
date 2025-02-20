import axiosAdmin from "@/axios-admin";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { useAlert } from "react-alert";

export default function AddAccident() {
    const { id_accident } = useParams();
    const navigate = useNavigate();
    const alert = useAlert();
    const [accident, setAccident] = useState({
        id_vehicule: "",
        employe_id: "",
        date_accident: "",
        lieu: "",
        degats: "",
        description: "",
    });
    const [loading, setLoading] = useState(true);
    const [vehicles, setVehicles] = useState([]);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        Promise.all([
            axiosAdmin.get("/vehicule"),
            axiosAdmin.get("/employe")
        ]).then(([vehiclesResponse, employeesResponse]) => {
            setVehicles(vehiclesResponse.data.data || []);
            setEmployees(employeesResponse.data.data || []);

            if (id_accident) {
                axiosAdmin.get(`/accidents/${id_accident}`)
                    .then(({ data }) => {
                        setAccident({
                            ...data,
                            id_vehicule: data.vehicule?.id_vehicule,
                            employe_id: data.employe?.id,
                        });
                    })
                    .catch(() => {
                        alert.error("Failed to load accident");
                    })
                    .finally(() => setLoading(false));
            } else {
                setLoading(false);
            }
        }).catch(() => {
            alert.error("Failed to load initial data");
            setLoading(false);
        });
    }, [id_accident, alert]);

    const onSubmit = (ev) => {
        ev.preventDefault();
        setLoading(true);
        const payload = { ...accident, id: accident.employe_id };
        delete payload.employe_id;
        console.log(payload);

        const request = id_accident
            ? axiosAdmin.put(`/accidents/${id_accident}`, payload)
            : axiosAdmin.post("/accidents", payload);

        request
            .then(() => {
                navigate("/accidents");
                alert.success(
                    `Accident ${id_accident ? "modifié" : "ajouté"} avec succès`
                );
            })
            .catch(() => {
                alert.error(
                    `Erreur lors de la ${
                        id_accident ? "modification" : "création"
                    } de l'accident`
                );
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="content">
            {id_accident && !loading && <h1>Modifier accident</h1>}
            {!id_accident && !loading && <h1>Ajouter un accident</h1>}
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
                                    setAccident({
                                        ...accident,
                                        id_vehicule: e.target.value,
                                    })
                                }
                                value={accident.id_vehicule}
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
                            <label>Nom employé</label>
                            <select
                                className="form-select"
                                onChange={(e) =>
                                    setAccident({
                                        ...accident,
                                        employe_id: e.target.value,
                                    })
                                }
                                value={accident.employe_id}
                            >
                                <option value="">
                                    Selectionner un employé
                                </option>
                                {employees.map((employee) => (
                                    <option
                                        key={employee.id}
                                        value={employee.id}
                                    >
                                        {employee.nom} {employee.prenom}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Date de l&apos;accident</label>
                            <input
                                type="date"
                                id="date_accident"
                                className="form-control"
                                onChange={(e) =>
                                    setAccident({
                                        ...accident,
                                        date_accident: e.target.value,
                                    })
                                }
                                value={accident.date_accident}
                            />
                        </div>
                        <div className="form-group">
                            <label>Lieu</label>
                            <input
                                type="text"
                                id="lieu"
                                className="form-control"
                                placeholder="Lieu"
                                onChange={(e) =>
                                    setAccident({
                                        ...accident,
                                        lieu: e.target.value,
                                    })
                                }
                                value={accident.lieu}
                            />
                        </div>
                        <div className="form-group">
                            <label>Dégats matériels</label>
                            <select
                                className="form-select"
                                onChange={(e) =>
                                    setAccident({
                                        ...accident,
                                        degats: e.target.value,
                                    })
                                }
                                value={accident.degats}
                            >
                                <option value="">
                                    Selectionner degat materiel
                                </option>
                                <option value="eraflures">
                                    Éraflures et égratignures
                                </option>
                                <option value="bosses">Bosses</option>
                                <option value="parechocs">
                                    Pare-chocs endommagés
                                </option>
                                <option value="vitre">
                                    Vitres cassées ou fissurées
                                </option>
                                <option value="retroviseurs">
                                    Rétroviseurs endommagés
                                </option>
                                <option value="lumieres">
                                    Lumières cassées
                                </option>
                                <option value="jantes">
                                    Jantes endommagées
                                </option>
                                <option value="mecaniques">
                                    Problèmes mécaniques
                                </option>
                                <option value="interieur">
                                    Intérieur endommagé
                                </option>
                            </select>
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
                                    setAccident({
                                        ...accident,
                                        description: e.target.value,
                                    })
                                }
                                value={accident.description}
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">
                            {id_accident
                                ? "Modifier l'accident"
                                : "Ajouter l'accident"}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
