import { types } from "react-alert";

const CustomAlertTemplate = ({ style, options, message, close }) => {
    const iconClassName =
        options.type === types.SUCCESS
            ? "bi-check-circle-fill"
            : "bi-x-circle-fill";
    const alertStyles = {
        padding: "15px",
        borderRadius: "4px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 10px 0 rgba(0, 0, 0, 0.2)",
        color: "white",
        width: "310px",
        boxSizing: "border-box",
        // marginTop: "6em",
        // marginBottom: '5em',
        backgroundColor: options.type === types.SUCCESS ? "#28a745" : "#dc3545",
    };

    return (
        <div style={{ ...style, ...alertStyles }}>
            <i
                className={`bi ${iconClassName}`}
                style={{ fontSize: "1.2rem", marginRight: "10px" }}
            ></i>
            <span style={{ flex: 2 }}>{message}</span>
            <button
                onClick={close}
                style={{ background: "none", border: "none", color: "white" }}
            >
                <i className="bi-x-lg"></i>
            </button>
        </div>
    );
};

export default CustomAlertTemplate;
