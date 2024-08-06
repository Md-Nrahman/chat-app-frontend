import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../common/baseUrl";
import { ChatState } from "../../Context/ChatProvider";
import UserListItem from "../User/UserListItem";
import ChatLoading from "./ChatLoading";
import ModalComponent from "./ModalComponent";
import ProfileModal from "./ProfileModal";

const SideDrawer = () => {
  const [search, setsearch] = useState("");
  const [searchResult, setsearchResult] = useState([]);
  const [searchUserShow, setsearchUserShow] = useState(false);
  const [loading, setloading] = useState(false);
  const [chatLoading, setchatLoading] = useState();
  const [profileModal, setProfileModal] = useState(false);
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
        className="w-full py-2 px-5 border-4 bg-white flex justify-between items-center"
      >
       <button className="flex justify-center items-center" onClick={()=>{setsearchUserShow(!searchUserShow);setsearchResult([])}}>
            <i className="fas fa-search"></i>
            <h3 className="px-4 hidden md:flex">
              Search User
            </h3>
          </button>

          <h3 className="font-bold text-2xl font-sans text-blue-800">
            GoChat
          </h3>
          <div>

            <div className="flex justify-between items-center">
              <button>
                <img className="h-10 hover:cursor-pointer" src={user.pic} alt="profile" onClick={()=>setProfileModal(true)} />
              </button>
              <div className="flex space-x-4">
                  {/* <div>My Profile</div> */}
                {profileModal && <ProfileModal user={user} closeModal={setProfileModal}>
                </ProfileModal>}

                <div />
                <div className="hover:cursor-pointer" onClick={logOutHandler}>Log Out</div>
              </div>
            </div>
          </div>
      </div>

      {searchUserShow && 
      <ModalComponent title="Search User" closeModal={()=>setsearchUserShow(false)}>
        <div placement="left">
        
        <div>
          <div>
            <div className="pb-2">
              <div className="flex pb-2 space-x-2">
                <input
                className="w-full h-10 px-3 border-b border-gray-300 outline-none"
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
                  handleFunction={() => {accessChat(user._id);setsearchResult([]);setsearchUserShow(false)}}
                />
              ))
            )}
            {chatLoading && <div> {/* <Spinner ml="auto" /> */}</div>}
          </div>
        </div>
      </div>
      </ModalComponent>
      }
    </>
  );
};

export default SideDrawer;
