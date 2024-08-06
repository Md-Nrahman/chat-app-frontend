import { useState } from "react";
import Chatbox from "../components/UI/ChatBox";
import MyChats from "../components/UI/MyChats";
import { ChatState } from "../Context/ChatProvider";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user, selectedChat } = ChatState();

  return (
    <div className="w-full h-screen">
      <div className="w-full h-screen p-4">
        <div justify="space-between h-screen">
          {user ? (
            <div className="md:flex h-screen">
              <MyChats fetchAgain={fetchAgain} />
              <Chatbox
                fetchAgain={fetchAgain}
                setFetchAgain={setFetchAgain}
                selectedChat={selectedChat}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Chatpage;
