import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    BarChart,
    Bar,
} from "recharts";
import DashboardCard from "./DashboardCard";
import { useEffect, useState } from "react";
import axiosAdmin from "@/axios-admin";
import { PulseLoader } from "react-spinners";

const Dashboard = () => {
    const [dashboards, setDashboards] = useState({
        total_vehicules: "",
        total_employes: "",
        total_trajets: {
            months: "",
            count: "",
        },
        months_accidents: {
            months: "",
            count: "",
        },
    });
    const [monthlyFuelConsumption, setMonthlyFuelConsumption] = useState([]);
    const [monthlyReparationsCost, setMonthlyReparationsCost] = useState([]);
    const [prixCarburant, setPrixCarburant] = useState({
        id_carburant: null,
        prix_carburant: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        Promise.all([
            axiosAdmin
                .get("/dashboards")
                .then(({ data }) => setDashboards(data)),
            axiosAdmin.get("/essence").then(({ data }) => {
                const year = new Date().getFullYear();
                const allMonths = Array.from({ length: 12 }, (v, i) => ({
                    monthYear: `${year}-${(i + 1).toString().padStart(2, "0")}`,
                    total_fuel: 0,
                }));

                const mergedData = allMonths.map((month) => {
                    const [year, monthStr] = month.monthYear.split("-");
                    const monthNum = parseInt(monthStr, 10);
                    const found = data.find(
                        (d) =>
                            d.year === parseInt(year, 10) &&
                            d.month === monthNum
                    );

                    return found
                        ? { ...month, total_fuel: found.total_fuel }
                        : month;
                });

                setMonthlyFuelConsumption(mergedData);
            }),
            axiosAdmin.get("/carburants").then(({ data }) => {
                setPrixCarburant(data);
            }),
            axiosAdmin.get("/reparationsprix").then(({ data }) => {
                setMonthlyReparationsCost(data);
                console.log(monthlyReparationsCost);
            }),
        ]).finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        console.log("Updated monthlyReparationsCost:", monthlyReparationsCost);
    }, [monthlyReparationsCost]);

    const totalCostData = monthlyFuelConsumption.map((fuel) => {
        const fuelMonthYear = fuel.monthYear;
        const [fuelYear, fuelMonth] = fuelMonthYear.split("-").map(Number);

        const reparation = monthlyReparationsCost.find(
            (rep) => rep.year === fuelYear && rep.month === fuelMonth
        );

        return {
            monthYear: fuelMonthYear,
            totalFuelCost: fuel.total_fuel * prixCarburant.prix_carburant,
            totalReparationCost: reparation
                ? reparation.total_reparation_cost
                : 0,
        };
    });

    const calculateTotalCount = (dataObject) => {
        return Object.values(dataObject).reduce(
            (total, item) => total + (item.count || 0),
            0
        );
    };

    const currentYear = new Date().getFullYear();
    return (
        <div className="content">
            {!loading && <h1>Dashboard</h1>}
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
                    <div className="card-container">
                        <DashboardCard
                            icon="fa-solid fa-user"
                            title="Total Employes"
                            value={dashboards.total_employes}
                            color="#007bff"
                        />
                        <DashboardCard
                            icon="fa-solid fa-truck"
                            title="Total Vehicules"
                            value={dashboards.total_vehicules}
                            color="#28a745"
                        />
                        <DashboardCard
                            icon="fa-solid fa-car-burst"
                            title="Total Accidents"
                            value={
                                calculateTotalCount(
                                    dashboards.months_accidents
                                ) || "0"
                            }
                            color="#ffc107"
                        />
                        <DashboardCard
                            icon="fa-solid fa-route"
                            title="Total Trajets"
                            value={
                                calculateTotalCount(dashboards.total_trajets) ||
                                "0"
                            }
                            color="#dc3545"
                        />
                    </div>
                    <div className="doss my-3">
                        <div className="tabless shadow-sm" style={{width: '29em'}}>
                            <div
                                style={{
                                    textAlign: "center",
                                    marginLeft: '1em',
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    marginBottom: "10px",
                                }}
                            >
                                Consommation de carburant {currentYear} par L
                            </div>
                            <LineChart
                                width={450}
                                height={270}
                                data={monthlyFuelConsumption}
                                margin={{
                                    top: 5,
                                    right: 0,
                                    left: 10,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="monthYear"
                                    tickFormatter={(value) =>
                                        value.split("-")[1]
                                    }
                                />
                                <YAxis />
                                <Tooltip
                                    formatter={(value, name) => [
                                        value,
                                        name === "total_fuel"
                                            ? "Carburant Total"
                                            : name,
                                    ]}
                                />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="total_fuel"
                                    name="Carburant Total"
                                    stroke="#8884d8"
                                    activeDot={{ r: 8 }}
                                />
                            </LineChart>
                        </div>
                        <div className="tabless shadow-sm p-12" style={{width: '32.7em'}}>
                            <div
                                style={{
                                    textAlign: "center",
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    marginBottom: "10px",
                                    marginLeft: '1em'
                                }}
                            >
                                Coût de carburant et des réparations {currentYear} par DH
                            </div>
                            <BarChart
                                width={510}
                                height={270}
                                data={totalCostData}
                                margin={{
                                    top: 5,
                                    right: 0,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="monthYear"
                                    tickFormatter={(value) =>
                                        value.split("-")[1]
                                    }
                                />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar
                                    dataKey="totalFuelCost"
                                    name="Coût du Carburant"
                                    fill="#8884d8"
                                    barSize={20}
                                />
                                <Bar
                                    dataKey="totalReparationCost"
                                    name="Coût des Réparations"
                                    fill="#82ca9d"
                                    barSize={20}
                                />
                            </BarChart>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;
