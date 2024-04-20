import axiosAdmin from "@/axios-admin";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { useAlert } from "react-alert";

export default function AddPrixCarburant() {
    const { id_carburant } = useParams();
    const navigate = useNavigate();
    const alert = useAlert();
    const [carburant, setCarburant] = useState({
        id_carburant: null,
        prix_carburant: "",
    });
    const [loading, setLoading] = useState(!!id_carburant);

    useEffect(() => {
        if (id_carburant) {
            setLoading(true);
            axiosAdmin
                .get(`/carburant/${id_carburant}`)
                .then(({ data }) => {
                    setCarburant(data);
                })
                .catch(() => {
                    alert.error("Failed to load prix carburant");
                })
                .finally(() => setLoading(false));
        }
    }, [id_carburant, alert]);

    const onSubmit = (ev) => {
        ev.preventDefault();
        setLoading(true);
        const isUpdating = carburant.id_carburant ? true : false;
        const url = isUpdating
            ? `/carburant/${carburant.id_carburant}`
            : "/carburant";
        const action = isUpdating ? "put" : "post";

        axiosAdmin[action](url, carburant)
            .then(() => {
                navigate("/carburant");
                alert.success(
                    `Prix carburant ${
                        isUpdating ? "modifié" : "ajouté"
                    } avec succès.`
                );
            })
            .catch(() => {
                const errorMessage = isUpdating
                    ? "Erreur modification prix carburant"
                    : "Erreur ajoute prix carburant";
                alert.error(errorMessage); //
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="content">
            {carburant.id_carburant && !loading && <h1>Modifier categorie</h1>}
            {!carburant.id_carburant && !loading && (
                <h1>Ajouter prix carburant</h1>
            )}
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
                <div className="inserts-c shadow-sm">
                    <form onSubmit={onSubmit}>
                        <label className="lab">Prix carburant</label>
                        <input
                            type="text"
                            id="inp"
                            name="carburant"
                            className="form-control"
                            placeholder="Prix carburant"
                            onChange={(e) =>
                                setCarburant({
                                    ...carburant,
                                    prix_carburant: e.target.value,
                                })
                            }
                            value={carburant.prix_carburant}
                        />
                    </form>
                    {carburant.id_carburant ? (
                        <button
                            type="submit"
                            className="btn btn-primary mt-3"
                            style={{ wid_categorieth: "auto", height: "auto" }}
                            onClick={onSubmit}
                        >
                            Modifier
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="btn btn-primary mt-3"
                            onClick={onSubmit}
                        >
                            Ajouter
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
