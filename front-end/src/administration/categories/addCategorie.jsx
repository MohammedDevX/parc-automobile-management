import axiosAdmin from "@/axios-admin";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { useAlert } from "react-alert";

export default function AddCategorie() {
    const { id_categorie } = useParams();
    const navigate = useNavigate();
    const alert = useAlert();
    const [category, setcategory] = useState({
        id_categorie: null,
        category: "",
    });
    const [loading, setLoading] = useState(!!id_categorie);

    useEffect(() => {
        if (id_categorie) {
            setLoading(true);
            axiosAdmin
                .get(`/categories/${id_categorie}`)
                .then(({ data }) => {
                    setcategory(data);
                })
                .catch(() => {
                    alert.error("Failed to load category");
                })
                .finally(() => setLoading(false));
        }
    }, [id_categorie, alert]);

    const onSubmit = (ev) => {
        ev.preventDefault();
        setLoading(true);
        const isUpdating = category.id_categorie ? true : false;
        const url = isUpdating
            ? `/categories/${category.id_categorie}`
            : "/categories";
        const action = isUpdating ? "put" : "post";

        axiosAdmin[action](url, category)
            .then(() => {
                navigate("/categories");
                alert.success(
                    `Catégorie ${
                        isUpdating ? "modifiée" : "ajoutée"
                    } avec succès.`
                );
            })
            .catch(() => {
                const errorMessage = isUpdating
                    ? "Erreur modification categorie"
                    : "Erreur ajoute categorie";
                alert.error(errorMessage); //
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="content">
            {category.id_categorie && !loading && <h1>Modifier categorie</h1>}
            {!category.id_categorie && !loading && (
                <h1>Ajouter une categorie</h1>
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
                        <label className="lab">Catégorie</label>
                        <input
                            type="text"
                            id="inp"
                            name="categorie"
                            className="form-control"
                            placeholder="Catégorie"
                            onChange={(e) =>
                                setcategory({
                                    ...category,
                                    category: e.target.value,
                                })
                            }
                            value={category.category}
                        />
                    </form>
                    {category.id_categorie ? (
                        <button
                            type="submit"
                            className="btn btn-primary mt-3"
                            style={{ wid_categorieth: "auto", height: "auto" }}
                            onClick={onSubmit}
                        >
                            Modifier categorie
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="btn btn-primary mt-3"
                            onClick={onSubmit}
                        >
                            Ajouter categorie
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
