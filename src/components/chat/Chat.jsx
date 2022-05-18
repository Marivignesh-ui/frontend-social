import "./chat.css";
import { useState, useEffect } from "react";
import Picker from "emoji-picker-react";

const Chat = () => {
  const [emPicker, setemPicker] = useState("none");
  const [emState, setEmstate] = useState(false);
  console.log(emPicker);
  const handleInput = (e) => {
    console.log(e.target.value);
  };
  const handleClick = () => {
    setEmstate(!emState);
  };
  useEffect(() => {
    setemPicker(emState ? "block" : "none");
  }, [emState]);
  return (
    <>
      <div className="chat">
        <div className="conversation">
          <div className="fromMessage">Hello hai!</div>
          <div className="toMessage">Hello hai!</div>
        </div>
        <div className="chatInput">
          <div className="emPicker" style={{ display: `${emPicker}` }}>
            <Picker disableSearchBar={true} />
          </div>
          <button className="emPickerButton" onClick={handleClick}>
            <i className="far fa-smile"></i>
          </button>
          <textarea className="chatInputText" onChange={handleInput} />
          <button className="sendButton">
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default Chat;
