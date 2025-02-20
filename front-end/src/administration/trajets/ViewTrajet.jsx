import axiosAdmin from "@/axios-admin";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";

export default function ViewTrajet() {
    const { id_trajet } = useParams();

    const [trajet, setTrajet] = useState({
        employe: "",
        vehicule: "",
        type: "",
        lieu_debut_trajet: "",
        lieu_fin_trajet: "",
        environ_total: "",
        date_debut_trajet: "",
        date_fin_trajet: "",
        status: ""
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id_trajet) {
            setLoading(true);
            axiosAdmin
                .get(`/trajets/${id_trajet}`)
                .then(({ data }) => {
                    setTrajet(data);
                })
                .catch(() => {
                    alert.error("Failed to load trajet");
                })
                .finally(() => setLoading(false));
        }
    }, [id_trajet]);
    return (
        <div className="content">
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
                <>
                <h1>Details trajet</h1>
                <div
                    style={{
                        display: "flex",
                        // justifyContent: "center",
                    }}
                >
                    <div
                        className="card shadow-sm"
                        style={{
                            width: "94%",
                            height: "auto",
                            marginLeft: '30px'
                        }}
                    >
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-4">
                                    <p className="mb-0">Véhicule</p>
                                </div>
                                <div className="col-sm-7">
                                    <p className="text-muted mb-0">
                                        {trajet.vehicule?.matricule}
                                    </p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-4">
                                    <p className="mb-0">Employé</p>
                                </div>
                                <div className="col-sm-7">
                                    <p className="text-muted mb-0">
                                        {trajet.employe?.nom} {trajet.employe?.prenom}
                                    </p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-4">
                                    <p className="mb-0">Type de trajet</p>
                                </div>
                                <div className="col-sm-7">
                                    <p className="text-muted mb-0">
                                        {trajet.type}
                                    </p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-4">
                                    <p className="mb-0">Lieu début trajet</p>
                                </div>
                                <div className="col-sm-7">
                                    <p className="text-muted mb-0">
                                        {trajet.lieu_debut_trajet}
                                    </p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-4">
                                    <p className="mb-0">Lieu fin trajet</p>
                                </div>
                                <div className="col-sm-7">
                                    <p className="text-muted mb-0">
                                        {trajet.lieu_fin_trajet}
                                    </p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-4">
                                    <p className="mb-0">Environ total (km)</p>
                                </div>
                                <div className="col-sm-7">
                                    <p className="text-muted mb-0">
                                        {trajet.environ_total}
                                    </p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-4">
                                    <p className="mb-0">Date début trajet</p>
                                </div>
                                <div className="col-sm-7">
                                    <p className="text-muted mb-0">
                                        {trajet.date_debut_trajet}
                                    </p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-4">
                                    <p className="mb-0">Date fin trajet</p>
                                </div>
                                <div className="col-sm-7">
                                    <p className="text-muted mb-0">
                                        {trajet.date_fin_trajet}
                                    </p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-4">
                                    <p className="mb-0">Status trajet</p>
                                </div>
                                <div className="col-sm-7">
                                    <p className="text-muted mb-0">
                                        {trajet.status}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </>
            )}
        </div>
    )
}

