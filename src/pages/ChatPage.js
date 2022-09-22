import { Box } from "@chakra-ui/layout";
import { Flex, Show, Spacer } from '@chakra-ui/react'
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
      <Box  w="100%" h="91.5vh" p="10px">
        <Flex justify="space-between">
        {user && !selectedChat && <Show below="sm">
          <MyChats fetchAgain={fetchAgain} /></Show>}

        {user && <Show above="sm">
          <MyChats fetchAgain={fetchAgain} /></Show>}

        {user && selectedChat && (
          <Show below="sm">
            <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          </Show>
        )}

        {user && (
          <Show above="sm">
            <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          </Show>
        )}
        </Flex>
        
      </Box>
    </div>
  );
};

export default Chatpage;