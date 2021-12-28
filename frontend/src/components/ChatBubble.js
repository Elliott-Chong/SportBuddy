import React from "react";
import { useGlobalContext } from "../context";
import avatar from "../images/avatar-round.png";
const ChatBubble = ({ chat: { message, user } }) => {
  const { state } = useGlobalContext();
  return (
    <>
      <div className={`flex items-center space-x-4 mt-4 mb-4  `}>
        <img
          src={user.avatar || avatar}
          className="md:w-14 md:h-14 h-10 w-10 rounded-full flex items-center"
          alt="user avatar"
        />
        <div className="flex flex-col">
          <div
            id="userandtime"
            className={`text-gray-700 font-bold ${
              state.user._id === user._id && "text-siena"
            }`}
          >
            {user.username}
          </div>
          <div id="message" className="">
            {message}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBubble;
