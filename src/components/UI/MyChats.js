import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../common/baseUrl";
import { ChatState } from "../../Context/ChatProvider";
import ChatLoading from "./ChatLoading";
import { getSender } from "../../config/ChatLogics";
import GroupChatModal from "./GroupChatModal";

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

  return (
    <div
      className={`flex-col items-center justify-center bg-white w-full h-full md:w-1/3 md:h-full md:rounded-lg md:border-2 md:border-gray-200 md:shadow-lg md:ml-2 md:mr-2`}
    >
      <div direction="column" align="center"></div>
      <div className="w-full p-2 border-4">
        <div className="" justify="space-between" align="center">
          My Chats
          <GroupChatModal>
            <button
              fontSize={{ base: "17px", md: "10px", lg: "17px" }}
              // rightIcon={<AddIcon />}
            >
              <div>New Group Chat</div>
            </button>
          </GroupChatModal>
        </div>
      </div>
      <div className="w-full h-full">
        <div>
          {chats ? (
            <div overflowY="scroll">
              {chats.map((chat) => (
                <div
                  className={`py-3 px-5 rounded-lg cursor-pointer border-t ${
                    selectedChat === chat ? "bg-blue-600/10" : " text-black"
                  }`}
                  onClick={() => setSelectedChat(chat)}
                  key={chat._id}
                >
                  <h3>
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </h3>
                  {chat.latestMessage && (
                    <h3 fontSize="xs">
                      <b>{chat.latestMessage.sender.name} : </b>
                      {chat.latestMessage.content.length > 50
                        ? chat.latestMessage.content.substring(0, 51) + "..."
                        : chat.latestMessage.content}
                    </h3>
                  )}
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
