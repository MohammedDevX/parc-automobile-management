import axiosAdmin from "@/axios-admin";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";

export default function ViewVehicule() {
    const { id_vehicule } = useParams();
    const [vehicule, setVehicule] = useState({
        id_vehicule: null,
        marque: "",
        model: "",
        matricule: "",
        categorie: "",
        etat_de_vehicule: "",
        couleur_de_vehicule: "",
        consommation_essence: "",
    });
    const [detail, setDetail] = useState({});
    const [loading, setLoding] = useState(true);

    useEffect(() => {
        if (id_vehicule) {
            setLoding(true);
            Promise.all([
                axiosAdmin.get(`/vehicules/${id_vehicule}`),
                axiosAdmin.get(`vehicules/${id_vehicule}/details`),
            ])
                .then((responses) => {
                    const [vehiculeData, detailData] = responses.map(
                        (res) => res.data
                    );
                    setVehicule(vehiculeData);
                    setDetail(detailData);
                })
                .catch(() => {
                    alert.error("failed to fetch vehicules");
                })
                .finally(() => {
                    setLoding(false);
                });
        }
    }, [id_vehicule]);

    const bg = (vehicleState) => {
        switch (vehicleState) {
            case "Disponible":
                return "badge bg-success text-white my-1";
            case "Reserve":
                return "badge bg-warning text-white my-1";
            case "En reparation":
                return "badge bg-danger text-white my-1";
            case "Hors service":
                return "badge bg-secondary text-white my-1";
            default:
                return "badge bg-primary text-white my-1";
        }
    };
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
                    <h1>Details vehicule</h1>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-around",
                        }}
                    >
                        <div
                            className="card shadow-sm"
                            style={{
                                width: "23em",
                                height: "19em",
                                // marginTop: "3em",
                            }}
                        >
                            <div
                                style={{
                                    height: "4px",
                                    borderRadius: "370px 370px 0 0",
                                    marginTop: "-0.34px",
                                    backgroundColor: "#0969b0",
                                }}
                            ></div>
                            <div className="card-body">
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        flexDirection: "column",
                                    }}
                                >
                                    <h2
                                        className="card-title"
                                        style={{ marginBottom: "1em" }}
                                    >
                                        {vehicule.marque}
                                    </h2>
                                    <h6
                                        className="card-subtitle mb-2 text-muted"
                                        style={{ marginBottom: "1em" }}
                                    >
                                        {vehicule.categorie?.category}
                                    </h6>
                                    <span
                                        className={bg(
                                            vehicule.etat_de_vehicule
                                        )}
                                    >
                                        {vehicule.etat_de_vehicule}
                                    </span>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-8">
                                        <label
                                            className="mb-0"
                                            style={{ fontWeight: "700" }}
                                        >
                                            Trajets
                                        </label>
                                    </div>
                                    <div className="col-sm-4">
                                        <p className="card-text mb-0">
                                            {detail.total_trips}
                                        </p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-8">
                                        <label
                                            className="mb-0"
                                            style={{ fontWeight: "700" }}
                                        >
                                            Distance Parcourue (km)
                                        </label>
                                    </div>
                                    <div className="col-sm-4">
                                        <p className="card-text mb-0">
                                            {detail.total_distance.toFixed(2)}{" "}

                                        </p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-8">
                                        <label
                                            className="mb-0"
                                            style={{ fontWeight: "700" }}
                                        >
                                            Carburant consommé (L)
                                        </label>
                                    </div>
                                    <div className="col-sm-4">
                                        <p className="card-text mb-0">
                                            {detail.total_fuel_consumed.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "end",
                            }}
                        >
                            <div
                                className="card shadow-sm"
                                style={{
                                    width: "37em",
                                    height: "auto",
                                    // marginTop: "3em",
                                }}
                            >
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <p className="mb-0">Marque</p>
                                        </div>
                                        <div className="col-sm-7">
                                            <p className="text-muted mb-0">
                                                {vehicule.marque}
                                            </p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <p className="mb-0">Modèl</p>
                                        </div>
                                        <div className="col-sm-7">
                                            <p className="text-muted mb-0">
                                                {vehicule.model}
                                            </p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <p className="mb-0">Matricule</p>
                                        </div>
                                        <div className="col-sm-7">
                                            <p className="text-muted mb-0">
                                                {vehicule.matricule}
                                            </p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <p className="mb-0">
                                                Consommation carburant dans 1km
                                            </p>
                                        </div>
                                        <div className="col-sm-7">
                                            <p
                                                className="text-muted mb-0"
                                                style={{ marginTop: "0.6em" }}
                                            >
                                                {vehicule.consommation_essence}L
                                            </p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <p className="mb-0">Catégory</p>
                                        </div>
                                        <div className="col-sm-7">
                                            <p className="text-muted mb-0">
                                                {vehicule.categorie?.category}
                                            </p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <p className="mb-0">
                                                Etat de véhicule
                                            </p>
                                        </div>
                                        <div className="col-sm-7">
                                            <p className="text-muted mb-0">
                                                {vehicule.etat_de_vehicule}
                                            </p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <p className="mb-0">
                                                Couleur de véhicule
                                            </p>
                                        </div>
                                        <div className="col-sm-7">
                                            <p className="text-muted mb-0">
                                                {vehicule.couleur_de_vehicule}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
