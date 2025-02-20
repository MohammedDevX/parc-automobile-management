/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SideBareItems({ item }) {
    const [open, setOpen] = useState(false);
    if (item.childrens) {
        return (
            <div className={open ? "sidebare-item open" : "sidebare-item"}>
                <div className="sidebare-title">
                    <span>
                        {item.icon && <i className={item.icon}></i>}
                        {item.title}
                    </span>
                    <i
                        className="bi-chevron-down toggle-btn"
                        onClick={() => setOpen(!open)}
                    ></i>
                </div>
                <div className="sidebare-content">
                    {item.childrens.map((child, index) => (
                        <SideBareItems key={index} item={child} />
                    ))}
                </div>
            </div>
        );
    } else {
        return (
            <Link to={item.path || "#"} className="sidebare-item plain">
                {item.icon && <i className={item.icon}></i>}
                {item.title}
            </Link>
        );
    }
}
