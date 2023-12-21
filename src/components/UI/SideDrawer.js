import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { baseUrl } from "../../common/baseUrl";
import { ChatState } from "../../Context/ChatProvider";
import UserListItem from "../User/UserListItem";
import ChatLoading from "./ChatLoading";
import ProfileModal from "./ProfileModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SideDrawer = () => {
  const [search, setsearch] = useState("");
  const [searchResult, setsearchResult] = useState([]);
  const [loading, setloading] = useState(false);
  const [chatLoading, setchatLoading] = useState();
  const { user, setSelectedChat, chats, setChats } = ChatState();

  const history = useHistory();

  const logOutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast.warn("Please Enter value to search");
      setloading(false);
      return;
    }

    try {
      setloading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `${baseUrl}/api/user?search=${search}`,
        config
      );
      setloading(false);
      setsearchResult(data);
    } catch (error) {
      toast.error("There was an error");
      setloading(false);
      return;
    }
  };

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setchatLoading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `${baseUrl}/api/chat`,
        { userId },
        config
      );

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setchatLoading(false);
      // onClose();
    } catch (error) {
      toast.error("Error fetching the chat");
    }
  };

  return (
    <>
      <div
        className="w-full p-2 border-4"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <div justify="space-between" align="center">
          <button variant="ghost">
            <i className="fas fa-search"></i>
            <h3 d={{ base: "none", md: "flex" }} px="4">
              Search User
            </h3>
          </button>

          <h3 fontSize="2xl" fontFamily="Work sans">
            Talk-A-Tive
          </h3>
          <div>
            <div>
              <button p={1}>{/* <BellIcon fontSize="2xl" m={1} /> */}</button>
            </div>

            <div>
              <button>
                {/* <Avatar
                  size="sm"
                  cursor="pointer"
                  name={user.name}
                  src={user.pic}
                /> */}
              </button>
              <div>
                <ProfileModal user={user}>
                  <div>My Profile</div>
                </ProfileModal>

                <div />
                <div onClick={logOutHandler}>Log Out</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div placement="left">
        <div />
        <div>
          <h3 borderBottomWidth="1px">Search users</h3>
          <div>
            <div pb={2}>
              <div>
                <input
                  placeholder="Search by name or email"
                  value={search}
                  onChange={(e) => setsearch(e.target.value)}
                />
                <button onClick={handleSearch}>Go</button>
              </div>
            </div>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {chatLoading && <div> {/* <Spinner ml="auto" /> */}</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default SideDrawer;
