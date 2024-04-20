import "./App.css";
import { ContextProvider } from "./contexts/ContextProvider";
import { router } from "./router/Index";
import { RouterProvider } from "react-router-dom";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
// import AlertTemplate from "react-alert-template-basic";
import CustomAlertTemplate from "./CustomAlertTemplate";


function App() {
    const alertOptions = {
        position: positions.BOTTOM_RIGHT,
        timeout: 5000,
        offset: "30px",
        transition: transitions.SCALE,
    };
    return (
            <AlertProvider template={CustomAlertTemplate} {...alertOptions}>
                <ContextProvider>
                    <RouterProvider router={router} />
                </ContextProvider>
            </AlertProvider>
    );
}

export default App;
