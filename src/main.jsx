import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import './styles/globals.css';


// You can add a global CSS file later and import it here, e.g.:
// import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);