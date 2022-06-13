import "./chat.css";
import { useState, useEffect, useRef, useContext } from "react";
import Picker from "emoji-picker-react";
import axios from "axios";
import { notify } from "../notify/notify";
import { AuthContext } from "../../context/AuthContext";
import { io } from "socket.io-client";
import { format } from "timeago.js";

function ReceivedMessage({ userAvatar, text, time }) {
  return (
    <div className="chat-msg">
      <div className="chat-msg-profile">
        <img
          className="chat-msg-img"
          src={`${process.env.REACT_APP_IMAGEKITURLENDPOINT+userAvatar}`}
          alt=""
        />
        <div className="chat-msg-date">Message seen {format(time)}</div>
      </div>
      <div className="chat-msg-content">
        <div className="chat-msg-text">{text}</div>
      </div>
    </div>
  );
}

function SentMessage({ userAvatar, text, time }) {
  return (
    <div className="chat-msg owner">
      <div className="chat-msg-profile">
        <img
          className="chat-msg-img"
          src={`${process.env.REACT_APP_IMAGEKITURLENDPOINT}/${userAvatar}`}
          alt=""
        />
        <div className="chat-msg-date">Message seen {format(time)}</div>
      </div>
      <div className="chat-msg-content">
        <div className="chat-msg-text">{text}</div>
      </div>
    </div>
  );
}

const Chat = ({ conversationId, otheruser }) => {
  const { user } = useContext(AuthContext);
  const [emPicker, setemPicker] = useState("none");
  const [emState, setEmstate] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newmessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const socket = useRef();

  useEffect(() => {
    socket.current = io(process.env.REACT_APP_CHATENDPOINT);
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);
  
  useEffect(() => {
    arrivalMessage && otheruser._id === arrivalMessage.sender && setMessages((prev) => [...prev, arrivalMessage]);
  },[arrivalMessage,otheruser]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
  },[user]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_BACKENDPOINT + "messages/" + conversationId
        );
        console.log(res.data);
        if (res.data.ok) {
          setMessages(res.data.responseObject);
        } else {
          notify(false, "Error Retrieving Messages");
        }
      } catch (error) {
        notify(false, "Network Error");
      }
    };
    getMessages();
  }, [conversationId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newmessage,
      conversationId: conversationId,
    };

    socket.current.emit("sendMessage",{
      senderId: user._id,
      receiverId: otheruser._id,
      text: newmessage
    });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKENDPOINT}messages`,
        message
      );
      if (res.data.ok) {
        setMessages([...messages, res.data.responseObject]);
      }
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  const onEmojiClick = (event, emojiObject) => {
    console.log(emojiObject);
    setNewMessage(newmessage + emojiObject.emoji);
    handleClick();
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
          {messages.map((message) => (
            <div ref={scrollRef}>
              {message.sender === user._id ? (
                <SentMessage
                  userAvatar={user.profilePicture}
                  text={message.text}
                  time={message.createdAt}
                />
              ) : (
                <ReceivedMessage
                  userAvatar={otheruser.profilePicture}
                  text={message.text}
                  time={message.createdAt}
                />
              )}
            </div>
          ))}
        </div>
        <div className="chatInput">
          <div className="emPicker" style={{ display: `${emPicker}` }}>
            <Picker disableSearchBar={true} onEmojiClick={onEmojiClick} />
          </div>
          <button className="emPickerButton" onClick={handleClick}>
            <i className="far fa-smile"></i>
          </button>
          <textarea
            className="chatInputText"
            onChange={(e) => setNewMessage(e.target.value)}
            value={newmessage}
          />
          <button className="sendButton" onClick={handleSubmit}>
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
