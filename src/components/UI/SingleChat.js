import axios from "axios";
import { useEffect, useState } from "react";
import Lottie from "react-lottie";
import { getSender, getSenderFull } from "../../config/ChatLogics";
import ScrollableChat from "./ScrollableChat";
// import animationData from "../animations/typing.json";

import { IoArrowBack } from "react-icons/io5";
import { LineWave } from "react-loader-spinner";
import io from "socket.io-client";
import { ChatState } from "../../Context/ChatProvider";
import { baseUrl } from "../../common/baseUrl";
import UpdateGroupChatModal from "../UI/UpdateGroupChatModal";
import ProfileModal from "./ProfileModal";
const ENDPOINT = "https://chat-backend-zxi2.onrender.com/";
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const [profileModal, setProfileModal] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    // animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const { selectedChat, setSelectedChat, user, notification, setNotification } =
    ChatState();

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `${baseUrl}/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      // toast({
      //   title: "Error Occured!",
      //   description: "Failed to Load the Messages",
      //   status: "error",
      //   duration: 5000,
      //   isClosable: true,
      //   position: "bottom",
      // });
    }
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    if (!newMessage) return;
    socket.emit("stop typing", selectedChat._id);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      setNewMessage("");
      const { data } = await axios.post(
        `${baseUrl}/api/message`,
        {
          content: newMessage,
          chatId: selectedChat,
        },
        config
      );
      socket.emit("new message", data);
      setMessages([...messages, data]);
    } catch (error) {
      // toast({
      //   title: "Error Occured!",
      //   description: "Failed to send the Message",
      //   status: "error",
      //   duration: 5000,
      //   isClosable: true,
      //   position: "bottom",
      // });
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  console.log(selectedChat);

  return (
    <>
      {selectedChat ? (
        <>
          <h3 className="p-3 bg-white w-full h-20 rounded-lg overflow-y-hidden flex items-center space-x-2">
            <button className="flex md:hidden" onClick={() => setSelectedChat("")}><IoArrowBack /></button>
            {messages &&
              (!selectedChat.isGroupChat ? (
                <div className="flex items-center space-x-5">
                  <img
                    className="h-12 w-12 rounded-full object-contain hover:cursor-pointer"
                    src={selectedChat?.users?.filter(person=>person._id !== user._id)[0]?.pic}
                    alt="profile"
                    onClick={() => setProfileModal(true)}
                  />
                  {getSender(user, selectedChat.users)}
                  {profileModal && <ProfileModal
                    user={getSenderFull(user, selectedChat.users)}
                    closeModal={setProfileModal}
                  />}
                </div>
              ) : (
                <>
                  {selectedChat.chatName.toUpperCase()}
                  <UpdateGroupChatModal
                    fetchMessages={fetchMessages}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  />
                </>
              ))}
          </h3>
          <div className="flex flex-col bg-[#FAFAFA] w-full h-[calc(100vh-6rem)] rounded-lg overflow-y-hidden">
            {loading ? (
              <div className="messages flex-1 p-3 w-full justify-center items-center h-[calc(90vh-6rem)]">
                <LineWave
                  color="#3367EA"
                  height={100}
                  width={100}
                  margin="auto"
                  wrapperStyle={{ margin: "auto", height: "100%", width: "100%",
                  display: "flex", justifyContent: "center", alignItems: "center",
                   }}
                />

             
              </div>
            ) : (
              <div
                className="messages flex-1 p-3 w-full h-[calc(90vh-6rem)]"
                // style={{ height: "80%" }}
              >
                <ScrollableChat
                  messages={messages}
                  style={{ height: "100%" }}
                />
              </div>
            )}

            <form
              className="bg-white py-4 px-4 flex items-center h-16"
              onSubmit={sendMessage}
              id="first-name"
              isRequired
              mt={3}
            >
              {istyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    // height={50}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>
              ) : (
                <></>
              )}
              <input
                className="w-full h-10 px-3 border-b border-gray-300 outline-none"
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
              />
            </form>
          </div>
        </>
      ) : (
        // to get socket.io on same page
        <div className="flex justify-center items-center h-full">
          <h3 className="text-2xl pb-3 font-sans">
            Click on a user to start chatting
          </h3>
        </div>
      )}
    </>
  );
};

export default SingleChat;
