import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import SideDrawer from "../components/UI/SideDrawer";
import { ChatState } from "../Context/ChatProvider";
import Chatbox from "../components/UI/ChatBox";
import MyChats from "../components/UI/MyChats";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chatpage;