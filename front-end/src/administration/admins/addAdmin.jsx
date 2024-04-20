import axiosAdmin from "@/axios-admin";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { useAlert } from "react-alert";

export default function FormEmploye() {
    const { id } = useParams();
    const navigate = useNavigate();
    const alert = useAlert();
    const [admin, setAdmin] = useState({
        id: null,
        cin: "",
        name: "",
        prenom: "",
        genre: "",
        date_naissance: "",
        age: "",
        tel: "",
        adresse: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(!!id);

    useEffect(() => {
        if (id) {
            setLoading(true);
            axiosAdmin
                .get(`/users/${id}`)
                .then(({ data }) => {
                    setAdmin(data);
                })
                .catch(() => {
                    alert.error("Failed to load admin");
                })
                .finally(() => setLoading(false));
        }
    }, [id, alert]);

    const onSubmit = (ev) => {
        ev.preventDefault();
        setLoading(true);
        const isUpdating = admin.id ? true : false;
        const url = isUpdating
            ? `/users/${admin.id}`
            : "/users";
        const action = isUpdating ? "put" : "post";

        axiosAdmin[action](url, admin)
            .then(() => {
                navigate("/users");
                alert.success(
                    `Admin ${
                        isUpdating ? "modifié" : "ajouté"
                    } avec succès.`
                );
            })
            .catch(() => {
                const errorMessage = isUpdating
                    ? "Erreur modification admin."
                    : "Erreur ajoute admin.";
                alert.error(errorMessage); //
            })
            .finally(() => setLoading(false));
    };
    return (
        <div className="content">
            {admin.id && !loading && <h1>Modifier admin</h1>}
            {!admin.id && !loading && <h1>Ajouter un admin</h1>}
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
                                    setAdmin({
                                        ...admin,
                                        cin: e.target.value,
                                    })
                                }
                                value={admin.cin}
                            />
                        </div>
                        <div className="form-group">
                            <label>Nom</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nom"
                                onChange={(e) =>
                                    setAdmin({
                                        ...admin,
                                        name: e.target.value,
                                    })
                                }
                                value={admin.name}
                            />
                        </div>
                        <div className="form-group">
                            <label>Prénom</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Prenom"
                                onChange={(e) =>
                                    setAdmin({
                                        ...admin,
                                        prenom: e.target.value,
                                    })
                                }
                                value={admin.prenom}
                            />
                        </div>
                        <div className="form-group">
                            <label>Genre</label>
                            <select
                                className="form-select"
                                onChange={(e) =>
                                    setAdmin({
                                        ...admin,
                                        genre: e.target.value,
                                    })
                                }
                                value={admin.genre}
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
                                    setAdmin({
                                        ...admin,
                                        date_naissance: e.target.value,
                                    })
                                }
                                value={admin.date_naissance}
                            />
                        </div>
                        <div className="form-group">
                            <label>Age</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Age"
                                onChange={(e) =>
                                    setAdmin({
                                        ...admin,
                                        age: e.target.value,
                                    })
                                }
                                value={admin.age}
                            />
                        </div>
                        <div className="form-group">
                            <label>Numéro de téléphone</label>
                            <input
                                type="numbero"
                                className="form-control"
                                placeholder="Tel"
                                onChange={(e) =>
                                    setAdmin({
                                        ...admin,
                                        tel: e.target.value,
                                    })
                                }
                                value={admin.tel}
                            />
                        </div>
                        <div className="form-group">
                            <label>Adresse</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Adresse"
                                onChange={(e) =>
                                    setAdmin({
                                        ...admin,
                                        adresse: e.target.value,
                                    })
                                }
                                value={admin.adresse}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                onChange={(e) =>
                                    setAdmin({
                                        ...admin,
                                        email: e.target.value,
                                    })
                                }
                                value={admin.email}
                            />
                        </div>
                        <div className="form-group">
                            <label>Mot de passe</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Mot de passe"
                                onChange={(e) =>
                                    setAdmin({
                                        ...admin,
                                        password: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </form>
                    {admin.id ? (
                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: "auto", height: "auto" }}
                            onClick={onSubmit}
                        >
                            Modifier admin
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={onSubmit}
                        >
                            Ajouter admin
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
