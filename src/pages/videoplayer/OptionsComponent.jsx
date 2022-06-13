import React, { useContext, useState } from "react";
import CopytoClipboard from "react-copy-to-clipboard";
import { SocketContext } from "../../context/SocketContext";

const Options = ({ children }) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } =
    useContext(SocketContext);
  const [idToCall, setIdToCall] = useState("");

  return (
    <div className="container">
      <div className="paper1">
        {/* <form className="root" noValidate autoComplete="off"> */}
        <div className="gridContainer">
          <div style={{ padding: "20px" }}>
            <h6>Account Info</h6>
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <CopytoClipboard text={me} style={{ marginTop: "20px" }}>
              <div className="tooltip">
                <button className="copybutton">
                  <i className="fas fa-copy"></i>&nbsp;Copy Your ID
                </button>
                <span className="tooltiptext tooltip1">{me}</span>
              </div>
            </CopytoClipboard>
          </div>
          <div style={{ padding: "20px" }}>
            <h6>Make a call</h6>
            <input
              placeholder="ID to call"
              value={idToCall}
              onChange={(e) => setIdToCall(e.target.value)}
              fullWidth
            />
            {callAccepted && !callEnded ? (
              <button
                onClick={leaveCall}
                className="hangupbutton"
                style={{ marginTop: "20px" }}
              >
                <i className="fas fa-phone-slash"></i>&nbsp; Hang Up
              </button>
            ) : (
              <button
                onClick={() => callUser(idToCall)}
                className="callbutton"
                style={{ marginTop: "20px" }}
              >
                <i className="fas fa-phone"></i>&nbsp; Call
              </button>
            )}
          </div>
        </div>
        {/* </form> */}
        {children}
      </div>
    </div>
  );
};

export { Options };
