import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Billing from "./pages/Billing";
import Home from "./pages/Home";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "billing",
            element: <Billing />,
        },
    ]);

    return (
        <>
            <div className="App">
                <RouterProvider router={router} />
            </div>
        </>
    );
}

export default App;
