import axiosAdmin from "@/axios-admin";
import { useStateContext } from "@/contexts/ContextProvider";
import { useRef, useState } from "react";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { setUser, setToken } = useStateContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        let currentErrors = {};
        const email = emailRef.current.value.trim();
        const password = passwordRef.current.value.trim();

        if (!email) {
            currentErrors.email = "Veuillez saisir votre e-mail.";
        }
        if (!password) {
            currentErrors.password = "Veuillez saisir votre mot de passe.";
        }

        if (Object.keys(currentErrors).length > 0) {
            setErrors(currentErrors);
            setIsLoading(false);
            return;
        }

        setErrors({});

        axiosAdmin
            .post("/login", { email, password })
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors({
                        general: "E-mail ou mot de passe est incorrect.",
                    });
                } else {
                    setErrors({
                        general:
                            "Une erreur est survenue. Veuillez réessayer plus tard.",
                    });
                }
            })
            .finally(() => setIsLoading(false));
    };

    const hasFieldErrors = errors.email || errors.password;

    const cardStyle = {
        height: errors.general || hasFieldErrors ? "450px" : "390px",
        overflow: "hidden",
    };

    return (
        <div className="bg-with-overlay">
            <div
                className="bg-[url('./assets/car.jpg')] "
                style={{
                    width: "100vw",
                    height: "100vh",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    
                }}
            >
                <form onSubmit={handleSubmit}>
                    <div className="card shadow-sm" id="card" style={cardStyle}>
                        <div className="card-body">
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <h1 className="card-title" id="title">
                                    Se connecter
                                </h1>
                            </div>
                            <div className="form1">
                                <label htmlFor="inp1" id="email">
                                    Email :
                                </label>
                                <input
                                    type="text"
                                    id="inp1"
                                    className={`form-control ${
                                        errors.email ? "is-invalid" : ""
                                    }`}
                                    ref={emailRef}
                                />
                                {errors.email && (
                                    <div className="invalid-feedback">
                                        {errors.email}
                                    </div>
                                )}
                            </div>
                            <div className="form2">
                                <label htmlFor="inp2" id="pass">
                                    Mot de passe :
                                </label>
                                <input
                                    type="password"
                                    className={`form-control ${
                                        errors.password ? "is-invalid" : ""
                                    }`}
                                    id="inp2"
                                    ref={passwordRef}
                                />
                                {errors.password && (
                                    <div className="invalid-feedback">
                                        {errors.password}
                                    </div>
                                )}
                            </div>
                            {errors.general && (
                                <div
                                    className="alert alert-danger"
                                    id="alrt"
                                    role="alert"
                                >
                                    <i
                                        className="bi bi-exclamation-circle"
                                        style={{
                                            color: "#dd323d",
                                            marginRight: "7px",
                                        }}
                                    ></i>
                                    {errors.general}
                                </div>
                            )}
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <button
                                    type="submit"
                                    className="btn btn-dark"
                                    id="btn"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <span
                                            className="spinner-border"
                                            style={{
                                                width: "1.7em",
                                                height: "1.7em",
                                            }}
                                        ></span>
                                    ) : (
                                        "Se connecter"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
