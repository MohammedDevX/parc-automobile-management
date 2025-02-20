import axiosAdmin from "@/axios-admin";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";

export default function ViewAdmin() {
    const { id } = useParams();

    const [user, setUser] = useState({
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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            setLoading(true);
            axiosAdmin
                .get(`/users/${id}`)
                .then(({ data }) => {
                    setUser(data);
                    console.log(data);
                })
                .catch(() => {
                    alert.error("Failed to load admin");
                })
                .finally(() => setLoading(false));
        }
    }, [id]);
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
                    <h1>Details admin </h1>
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
                                        <p className="mb-0">Nom complet</p>
                                    </div>
                                    <div className="col-sm-7">
                                        <p className="text-muted mb-0">
                                            {user.name} {user.prenom}
                                        </p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-4">
                                        <p className="mb-0">CIN</p>
                                    </div>
                                    <div className="col-sm-7">
                                        <p className="text-muted mb-0">
                                            {user.cin}
                                        </p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-4">
                                        <p className="mb-0">Genre</p>
                                    </div>
                                    <div className="col-sm-7">
                                        <p className="text-muted mb-0">
                                            {user.genre}
                                        </p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-4">
                                        <p className="mb-0">
                                            Date de naissance
                                        </p>
                                    </div>
                                    <div className="col-sm-7">
                                        <p className="text-muted mb-0">
                                            {user.date_naissance}
                                        </p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-4">
                                        <p className="mb-0">Age</p>
                                    </div>
                                    <div className="col-sm-7">
                                        <p className="text-muted mb-0">
                                            {user.age}
                                        </p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-4">
                                        <p className="mb-0">
                                            Numéro de télépone
                                        </p>
                                    </div>
                                    <div className="col-sm-7">
                                        <p className="text-muted mb-0">
                                            {user.tel}
                                        </p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-4">
                                        <p className="mb-0">Adresse</p>
                                    </div>
                                    <div className="col-sm-7">
                                        <p className="text-muted mb-0">
                                            {user.adresse}
                                        </p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-4">
                                        <p className="mb-0">E-mail</p>
                                    </div>
                                    <div className="col-sm-5">
                                        <p className="text-muted mb-0">
                                            {user.email}
                                        </p>
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
