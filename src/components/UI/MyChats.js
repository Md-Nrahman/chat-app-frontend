import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../common/baseUrl";
import { getSender } from "../../config/ChatLogics";
import { ChatState } from "../../Context/ChatProvider";
import ChatLoading from "./ChatLoading";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`${baseUrl}/api/chat`, config);
      setChats(data);
    } catch (error) {
      // toast({
      //   title: "Error Occured!",
      //   description: "Failed to Load the chats",
      //   status: "error",
      //   duration: 5000,
      //   isClosable: true,
      //   position: "bottom-left",
      // });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  console.log(chats);

  return (
    <div
      className={`${selectedChat ? "hidden md:block":""} flex-col items-center justify-center bg-white w-full h-full md:w-1/3 md:max-h-screen md:rounded-lg md:border-2 md:border-gray-200 md:shadow-lg  md:mr-2`}
    >
      <div className="w-full p-4 ">
        <div className="items-center font-bold flex justify-between">
          My Chats
          {/* <GroupChatModal>
            <button
            className="flex p-2 items-center justify-center w-full h-10 text-white bg-blue-500 rounded-lg"
            >
              <FaPlus /><div>New Group Chat</div>
            </button>
          </GroupChatModal> */}
        </div>
      </div>
      <div className="w-full max-h-[90vh] overflow-y-auto">
        <div>
          {chats ? (
            <div className="">
              {chats.map((chat) => (
                <div className={`flex space-x-2 items-center w-full py-3 px-5 rounded-lg cursor-pointer border-t ${
                    selectedChat === chat ? "bg-blue-600/10" : " text-black"
                  }`}
                  onClick={() => setSelectedChat(chat)}
                  key={chat._id}
                  >
                  <img src={chat?.users?.filter((person) => person._id !== user._id)[0]?.pic} alt="profile" className="h-10 w-10 rounded-full object-contain" />

                <div
                  className={` `}
                  
                >
                  <h3 className="font-bold text-gray-800">
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </h3>
                  {chat.latestMessage && (
                    <h3 className="text-xs text-gray-800">
                      <b>{chat.latestMessage.sender.name} : </b>
                      {chat.latestMessage.content.length > 50
                        ? chat.latestMessage.content.substring(0, 11) + " ..."
                        : chat.latestMessage.content}
                    </h3>
                  )}
                </div>
                </div>
              ))}
            </div>
          ) : (
            <ChatLoading />
          )}
        </div>
      </div>
    </div>
  );
};

export default MyChats;
