import "./chat.css";
import { useState, useEffect } from "react";
import Picker from "emoji-picker-react";

function ReceivedMessage() {
  return (
    <div className="chat-msg">
      <div className="chat-msg-profile">
        <img
          className="chat-msg-img"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%283%29+%281%29.png"
          alt=""
        />
        <div className="chat-msg-date">Message seen 1.22pm</div>
      </div>
      <div className="chat-msg-content">
        <div className="chat-msg-text">Hai mari How are you?</div>
        <div className="chat-msg-text">
          Are you learning react making progress?
        </div>
      </div>
    </div>
  );
}

function SentMessage() {
  return (
    <div className="chat-msg owner">
      <div className="chat-msg-profile">
        <img
          className="chat-msg-img"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png"
          alt=""
        />
        <div className="chat-msg-date">Message seen 2.50pm</div>
      </div>
      <div className="chat-msg-content">
        <div className="chat-msg-text">Hello Hai How are you</div>
        <div className="chat-msg-text">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error
          deserunt nesciunt minus id a ad officia magnam quibusdam
        </div>
      </div>
    </div>
  );
}

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
    <div className="chatOut">
      <div className="chat">
        <div className="conversation">
          <ReceivedMessage />
          <SentMessage />
          <ReceivedMessage />
          <ReceivedMessage />
          <SentMessage />
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
    </div>
  );
};

export default Chat;
