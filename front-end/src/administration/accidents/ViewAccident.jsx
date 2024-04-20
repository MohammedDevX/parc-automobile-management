import axiosAdmin from "@/axios-admin";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";

export default function ViewReparation() {
    const { id_accident } = useParams();

    const [accident, setAccident] = useState({
        vehicule: "",
        employe: "",
        date_accident: "",
        lieu: "",
        degats: "",
        description: "",
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id_accident) {
            setLoading(true);
            axiosAdmin
                .get(`/accidents/${id_accident}`)
                .then(({ data }) => {
                    setAccident(data);
                    console.log(data)
                })
                .catch(() => {
                    alert.error("Failed to load accident");
                })
                .finally(() => setLoading(false));
        }
    }, [id_accident]);
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
                <h1>Details accident</h1>
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
                                    <p className="mb-0">Véhicule endommagé</p>
                                </div>
                                <div className="col-sm-7">
                                    <p className="text-muted mb-0">
                                        {accident.vehicule?.matricule}
                                    </p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-4">
                                    <p className="mb-0">Nom employé</p>
                                </div>
                                <div className="col-sm-7">
                                    <p className="text-muted mb-0">
                                        {accident.employe?.nom} {accident.employe?.prenom}
                                    </p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-4">
                                    <p className="mb-0">Date de l&apos;accident</p>
                                </div>
                                <div className="col-sm-7">
                                    <p className="text-muted mb-0">
                                        {accident.date_accident}
                                    </p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-4">
                                    <p className="mb-0">Lieu</p>
                                </div>
                                <div className="col-sm-7">
                                    <p className="text-muted mb-0">
                                        {accident.lieu}
                                    </p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-4">
                                    <p className="mb-0">Dégats matériels</p>
                                </div>
                                <div className="col-sm-7">
                                    <p className="text-muted mb-0">
                                        {accident.degats}
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
                                        {accident.description}
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

