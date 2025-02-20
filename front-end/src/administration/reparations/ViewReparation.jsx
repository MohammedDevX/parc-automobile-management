import axiosAdmin from "@/axios-admin";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";

export default function ViewReparation() {
    const { id_reparation } = useParams();

    const [reparation, setReparation] = useState({
        vehicule: "",
        date_debut_reparation: "",
        date_fin_reparation: "",
        type: "",
        description: "",
        prix: "",
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id_reparation) {
            setLoading(true);
            axiosAdmin
                .get(`/reparations/${id_reparation}`)
                .then(({ data }) => {
                    setReparation(data);
                    console.log(data)
                })
                .catch(() => {
                    alert.error("Failed to load reparation");
                })
                .finally(() => setLoading(false));
        }
    }, [id_reparation]);
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
                <h1>Details reparation</h1>
                <div
                    style={{
                        display: "flex",
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
                                    <p className="mb-0">Véhicule endommagé</p>
                                </div>
                                <div className="col-sm-7">
                                    <p className="text-muted mb-0">
                                        {reparation.vehicule?.matricule}
                                    </p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-4">
                                    <p className="mb-0">Date début réparation</p>
                                </div>
                                <div className="col-sm-7">
                                    <p className="text-muted mb-0">
                                        {reparation.date_debut_reparation}
                                    </p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-4">
                                    <p className="mb-0">Date fin réparation</p>
                                </div>
                                <div className="col-sm-7">
                                    <p className="text-muted mb-0">
                                        {reparation.date_fin_reparation}
                                    </p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-4">
                                    <p className="mb-0">Type réparation</p>
                                </div>
                                <div className="col-sm-7">
                                    <p className="text-muted mb-0">
                                        {reparation.type}
                                    </p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-4">
                                    <p className="mb-0">Prix</p>
                                </div>
                                <div className="col-sm-7">
                                    <p className="text-muted mb-0">
                                        {reparation.prix}
                                    </p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-4">
                                    <p className="mb-0">Description</p>
                                </div>
                                <div className="col-sm-7">
                                    <p className="text-muted mb-0">
                                        {reparation.description}
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

