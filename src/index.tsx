import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Provider as AlertProvider, transitions, positions } from "react-alert";

import reportWebVitals from "./reportWebVitals";

import "bootstrap/dist/css/bootstrap.min.css";

import store from "./store";
import AlertBox from "./components/AlertBox";
import App from "./App";

const alertProps = {
  template: AlertBox,
  position: positions.TOP_RIGHT,
  timeout: 3500,
  transition: transitions.FADE,
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <AlertProvider {...alertProps}>
      <App />
    </AlertProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
