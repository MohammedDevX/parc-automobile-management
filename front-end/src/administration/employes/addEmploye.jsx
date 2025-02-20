import axiosAdmin from "@/axios-admin";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { useAlert } from "react-alert";

export default function FormEmploye() {
    const { id } = useParams();
    const navigate = useNavigate();
    const alert = useAlert();
    const [employe, setEmploye] = useState({
        id: null,
        cin: "",
        nom: "",
        prenom: "",
        genre: "",
        date_naissance: "",
        age: "",
        tel: "",
        adresse: "",
        permis_conduire: "",
        etat_employe: "",
        email: "",
    });
    const [loading, setLoading] = useState(id);

    useEffect(() => {
        if (id) {
            setLoading(true);
            axiosAdmin
                .get(`/employes/${id}`)
                .then(({ data }) => {
                    setEmploye(data);
                })
                .catch(() => {
                    alert.error("Failed to load employe");
                })
                .finally(() => setLoading(false));
        }
    }, [id, alert]);

    const onSubmit = (ev) => {
        ev.preventDefault();
        setLoading(true);
        const isUpdating = employe.id ? true : false;
        const url = isUpdating ? `/employes/${employe.id}` : "/employes";
        const action = isUpdating ? "put" : "post";

        axiosAdmin[action](url, employe)
            .then(() => {
                navigate("/employes");
                alert.success(
                    `Employé ${isUpdating ? "modifié" : "ajouté"} avec succès.`
                );
            })
            .catch(() => {
                const errorMessage = isUpdating
                    ? "Erreur modification employé."
                    : "Erreur ajoute employé.";
                alert.error(errorMessage); //
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="content">
            {employe.id && !loading && <h1>Modifier employe</h1>}
            {!employe.id && !loading && <h1>Ajouter un employe</h1>}
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
                            <label>CIN</label>
                            <input
                                type="text"
                                id="cin"
                                className="form-control"
                                placeholder="CIN"
                                onChange={(e) =>
                                    setEmploye({
                                        ...employe,
                                        cin: e.target.value,
                                    })
                                }
                                value={employe.cin}
                            />
                        </div>
                        <div className="form-group">
                            <label>Nom</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nom"
                                onChange={(e) =>
                                    setEmploye({
                                        ...employe,
                                        nom: e.target.value,
                                    })
                                }
                                value={employe.nom}
                            />
                        </div>
                        <div className="form-group">
                            <label>Prénom</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Prenom"
                                onChange={(e) =>
                                    setEmploye({
                                        ...employe,
                                        prenom: e.target.value,
                                    })
                                }
                                value={employe.prenom}
                            />
                        </div>
                        <div className="form-group">
                            <label>Genre</label>
                            <select
                                className="form-select"
                                onChange={(e) =>
                                    setEmploye({
                                        ...employe,
                                        genre: e.target.value,
                                    })
                                }
                                value={employe.genre}
                            >
                                <option value="">
                                    Selectionner votre genre
                                </option>
                                <option value="Homme">Homme</option>
                                <option value="Femme">Femme</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Date de naissance</label>
                            <input
                                type="date"
                                className="form-control"
                                onChange={(e) =>
                                    setEmploye({
                                        ...employe,
                                        date_naissance: e.target.value,
                                    })
                                }
                                value={employe.date_naissance}
                            />
                        </div>
                        <div className="form-group">
                            <label>Age</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Age"
                                onChange={(e) =>
                                    setEmploye({
                                        ...employe,
                                        age: e.target.value,
                                    })
                                }
                                value={employe.age}
                            />
                        </div>
                        <div className="form-group">
                            <label>Numéro de téléphone</label>
                            <input
                                type="numbero"
                                className="form-control"
                                placeholder="Tel"
                                onChange={(e) =>
                                    setEmploye({
                                        ...employe,
                                        tel: e.target.value,
                                    })
                                }
                                value={employe.tel}
                            />
                        </div>
                        <div className="form-group">
                            <label>Adresse</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Adresse"
                                onChange={(e) =>
                                    setEmploye({
                                        ...employe,
                                        adresse: e.target.value,
                                    })
                                }
                                value={employe.adresse}
                            />
                        </div>
                        <div className="form-group">
                            <label>Permis conduire</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Permis conduire"
                                onChange={(e) =>
                                    setEmploye({
                                        ...employe,
                                        permis_conduire: e.target.value,
                                    })
                                }
                                value={employe.permis_conduire}
                            />
                        </div>
                        <div className="form-group">
                            <label>Etat employé</label>
                            <select
                                className="form-select"
                                onChange={(e) =>
                                    setEmploye({
                                        ...employe,
                                        etat_employe: e.target.value,
                                    })
                                }
                                value={employe.etat_employe}
                            >
                                <option value="">
                                    Selectionner etat employe
                                </option>
                                <option value="Disponible">Disponible</option>
                                <option value="En mission">En mission</option>
                                <option value="En congé">En congé</option>
                                <option value="En arrêt maladie">
                                    En arrêt maladie
                                </option>
                                <option value="Retraite">Retraite</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                onChange={(e) =>
                                    setEmploye({
                                        ...employe,
                                        email: e.target.value,
                                    })
                                }
                                value={employe.email}
                            />
                        </div>
                    </form>
                    {employe.id ? (
                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: "auto", height: "auto" }}
                            onClick={onSubmit}
                        >
                            Modifier employe
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={onSubmit}
                        >
                            Ajouter employe
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
