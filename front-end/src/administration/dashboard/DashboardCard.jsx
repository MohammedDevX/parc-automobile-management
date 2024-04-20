// eslint-disable-next-line react/prop-types
const DashboardCard = ({ icon, title, value, color }) => {
    return (
        <div className="dashboard-card" style={{ backgroundColor: color }}>
            <div className="card-content">
                <div className="card-title">{title}</div>
                <div className="card-value">{value}</div>
            </div>
            <i className={`${icon} card-icon`}></i>
        </div>
    );
};

export default DashboardCard;
