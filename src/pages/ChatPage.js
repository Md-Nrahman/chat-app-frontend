import { Box } from "@chakra-ui/layout";
import { Flex, Spacer } from '@chakra-ui/react'
import { useState } from "react";
import SideDrawer from "../components/UI/SideDrawer";
import { ChatState } from "../Context/ChatProvider";
import Chatbox from "../components/UI/ChatBox";
import MyChats from "../components/UI/MyChats";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user, selectedChat } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box  w="100%" h="91.5vh" p="10px" display={{ md: 'flex' }}>
        {/* <Flex justify="space-between"> */}
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
        {/* </Flex> */}
        
      </Box>
    </div>
  );
};

export default Chatpage;