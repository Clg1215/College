import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import CreateTrip from "./create-trip/index.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Header from "./components/ui/custom/Header.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster} from "@/components/ui/sonner";  
 const router = createBrowserRouter([
  {
     path: "/",
     element: <App />,
   },
   {
     path: "create-trip",
     element: <CreateTrip />,
   },
 ]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <Header/>
    {/* <RouterProvider router={router} basename="/PLANORA" /> */}
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "/",
          element: <App />,
        },
        {
          path: "create-trip",
          element: <CreateTrip />,
        },
      ])}
      basename="/PLANORA"
    />
    </GoogleOAuthProvider>
  </StrictMode>
);