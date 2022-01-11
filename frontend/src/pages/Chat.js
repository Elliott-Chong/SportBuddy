import React from "react";
import { useGlobalContext } from "../context";
import io from "socket.io-client";
import Spinner from "../images/loading.gif";
import ChatBubble from "../components/ChatBubble";
const production = process.env.REACT_APP_PRODUCTION==='true';

const Chat = ({ match }) => {
  const chatRef = React.useRef();
  const inputRef = React.useRef();
  const {
    enter,
    dispatch,
    fetchSingleListing,
    state: { listing },
  } = useGlobalContext();
  const ENDPOINT = production
    ? "https://elliott-project.com:444"
    : "http://192.168.50.74:5001";
  const [message, setMessage] = React.useState("");
  const socketRef = React.useRef();
  const {
    params: { id },
  } = match;
  React.useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
    fetchSingleListing(id);
    const socket = io(ENDPOINT);
    socketRef.current = socket;
    socket.on("new message", (data) => {
      dispatch({
        type: "ADD_CHAT",
        payload: { user: data.user, message: data.message },
      });
      if (chatRef.current) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
      setMessage("");
    });
    return () => {
      socket.disconnect();
    };
  }, [fetchSingleListing, id, dispatch, ENDPOINT]);
  if (!listing) return <img src={Spinner} alt="spinner gif" />;
  // })
  return (
    <div
      id="chat-container"
      className="bg-anothershadeofgrey pb-2 md:pb-4 rounded-2xl"
    >
      <div
        id="info-bar"
        className="bg-cardGrey rounded-t-2xl flex justify-center items-center md:py-4 py-1 text-xl md:text-2xl font-bold"
      >
        {listing.sport}
      </div>
      <div
        ref={chatRef}
        id="chat"
        onClick={() => inputRef.current.focus()}
        style={{ height: "65vh", scrollBehavior: "smooth" }}
        className="px-4 md:px-10 md:pt-8 md:space-y-5 pb-5 overflow-scroll"
      >
        {listing.chat.map((chat, idx) => {
          return <ChatBubble key={idx} chat={chat} />;
        })}
      </div>
      <div id="input">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            enter(message, socketRef.current);
          }}
          className="mx-2 md:mx-4 rounded-2xl"
        >
          <input
            ref={inputRef}
            autoComplete={"off"}
            type="text"
            className="w-full py-2 px-4 rounded-2xl text-lg "
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            id="msg"
          />
        </form>
      </div>
    </div>
  );
};

export default Chat;
