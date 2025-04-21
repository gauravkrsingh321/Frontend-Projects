import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { BrowserRouter } from "react-router";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  //Why this is the best structure:
  //Provider gives Redux store access to your entire app, including any route-related components.
  //BrowserRouter wraps <App /> so your routing works properly.
  //This order ensures both Redux and React Router contexts are available wherever needed.
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <Toaster/>
    </BrowserRouter>
  </Provider>
);
