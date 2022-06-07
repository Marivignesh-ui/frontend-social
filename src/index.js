import { IKContext } from "imagekitio-react";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext.js";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <IKContext publicKey={process.env.REACT_APP_IMAGEKITPUBLICKEY} urlEndpoint={process.env.REACT_APP_IMAGEKITURLENDPOINT} authenticationEndpoint={process.env.REACT_APP_IMAGEAUTHENDPOINT}>
      <App />
      </IKContext>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
