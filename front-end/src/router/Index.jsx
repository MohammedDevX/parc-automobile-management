import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Notfound from "../pages/Notfound";
import Layout from "../layouts/navBar/Layout";
import Login from "../pages/login";
import Nav from "@/layouts/navBarDashboard/nav";
import Profile from "@/administration/profile/profile";
import Dashboard from "@/administration/dashboard/dashboard";
import AdmineListe from "@/administration/admins/admineListe";
import AddAdmin from "@/administration/admins/addAdmin";
import EmployesListe from "@/administration/employes/employesListe";
import AddEmploye from "@/administration/employes/addEmploye";
import AddVehicule from "@/administration/vehicules/addVehicule";
import ListeVehicules from "@/administration/vehicules/listeVehicules";
import ListeCategories from "@/administration/categories/listeCategories";
import AddCategorie from "@/administration/categories/addCategorie";
import ListeAccidents from "@/administration/accidents/listeAccidents";
import AddAccident from "@/administration/accidents/addAccident";
import ListeReparation from "@/administration/reparations/listeReparation";
import AddReparation from "@/administration/reparations/addReparation";
import ListeTrajets from "@/administration/trajets/ListeTrajets";
import AddTrajet from "@/administration/trajets/addTrajet";
import ViewAdmin from "@/administration/admins/viewAdmin";
import ViewEmploye from "@/administration/employes/ViewEmploye";
import ViewVehicule from "@/administration/vehicules/ViewVehicule";
import ViewReparation from "@/administration/reparations/ViewReparation";
import ViewAccident from "@/administration/accidents/ViewAccident";
import ViewTrajet from "@/administration/trajets/ViewTrajet";
import AddPrixCarburant from "@/administration/carburant/AddPrixCarburant";
import ListePrixCarburant from "@/administration/carburant/ListePrixCarburant";


export const router = createBrowserRouter([
    {
        element: <Layout />,
        path: "/",
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />,
            },
        ],
    },
    {
        element: <Nav />,
        path: "/",
        children: [
            {
                path: "/profile",
                element: <Profile />,
            },
            {
                path: "/dashboards",
                element: <Dashboard />,
            },
            {
                path: "/users",
                element: <AdmineListe />,
            },
            {
                path: "/users/new",
                element: <AddAdmin key='adminAdd' />,
            },
            {
                path: "/users/:id",
                element: <AddAdmin key='adminUpdate' />,
            },
            {
                path: "/users/view/:id",
                element: <ViewAdmin />,
            },
            {
                path: "/employes",
                element: <EmployesListe />,
            },
            {
                path: "/employes/new",
                element: <AddEmploye key='employesCreate' />,
            },
            {
                path: "/employes/:id",
                element: <AddEmploye key='employesUpdate' />,
            },
            {
                path: "/employes/view/:id",
                element: <ViewEmploye />,
            },
            {
                path: "/vehicules",
                element: <ListeVehicules />,
            },
            {
                path: "/vehicules/new",
                element: <AddVehicule key='vehiculeCreate' />,
            },
            {
                path: "/vehicules/:id_vehicule",
                element: <AddVehicule key='vehiculeUpdate' />,
            },
            {
                path: "/vehicules/view/:id_vehicule",
                element: <ViewVehicule />,
            },
            {
                path: "/categories",
                element: <ListeCategories />,
            },
            {
                path: "/categories/new",
                element: <AddCategorie key='categoriesCreate' />,
            },
            {
                path: "/categories/:id_categorie",
                element: <AddCategorie key='categoriesUpdate' />,
            },
            {
                path: "/accidents",
                element: <ListeAccidents />,
            },
            {
                path: "/accidents/new",
                element: <AddAccident key='accidentAdd' />,
            },
            {
                path: "/accidents/:id_accident",
                element: <AddAccident key='accidentUpdate' />,
            },
            {
                path: "/accidents/view/:id_accident",
                element: <ViewAccident />,
            },
            {
                path: "/reparations",
                element: <ListeReparation />,
            },
            {
                path: "/reparations/new",
                element: <AddReparation key='reparationAdd' />,
            },
            {
                path: "/reparations/:id_reparation",
                element: <AddReparation key='reparationUpdate' />,
            },
            {
                path: "/reparations/view/:id_reparation",
                element: <ViewReparation />,
            },
            {
                path: "/trajets",
                element: <ListeTrajets />,
            },
            {
                path: "/trajets/new",
                element: <AddTrajet key='trajetAdd' />,
            },
            {
                path: "/trajets/:id_trajet",
                element: <AddTrajet key='trajetUpdate' />,
            },
            {
                path: "/trajets/view/:id_trajet",
                element: <ViewTrajet />,
            },
            {
                path: "/carburant",
                element: <ListePrixCarburant />,
            },
            {
                path: "/carburant/new",
                element: <AddPrixCarburant key='carburantAdd' />,
            },
            {
                path: "/carburant/:id_carburant",
                element: <AddPrixCarburant key='carburantUpdate' />,
            },
        ],
    },
    {
        path: "*",
        element: <Notfound />,
    },
]);
