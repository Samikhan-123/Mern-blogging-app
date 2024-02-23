import { render } from "preact";
import { App } from "./app.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import setupAxiosInterceptors from "./pages/AxiosConfig";
setupAxiosInterceptors()
render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="colored"
      />
    </BrowserRouter>
  </Provider>,
  document.getElementById("app")
);
