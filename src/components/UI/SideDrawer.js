import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Avatar, Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spinner, Text, Tooltip, useDisclosure, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { baseUrl } from '../../common/baseUrl';
import { ChatState } from '../../Context/ChatProvider';
import UserListItem from '../User/UserListItem';
import ChatLoading from './ChatLoading';
import ProfileModal from './ProfileModal';

const SideDrawer = () => {
    const [search, setsearch] =  useState("")
    const [searchResult, setsearchResult] = useState([]);
    const [loading, setloading] = useState(false);
    const [chatLoading, setchatLoading] = useState();
    const {user, setSelectedChat,chats, setChats}= ChatState()

    const history = useHistory()
const toast = useToast()
    const {isOpen, onOpen, onClose} = useDisclosure()

    const logOutHandler=()=>{
        localStorage.removeItem("userInfo");
        history.push("/")
    }

    const handleSearch=async()=>{
        if(!search){
            toast({
                title: 'Please Enter value to search',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position:'top-right',
              });
            //   setloading(false);
              return;
        }

        try {
            setloading(true)
            const config={
                headers:{
                    Authorization:`Bearer ${user.token}`
                }
            }

            const {data}= await axios.get(`${baseUrl}/api/user?search=${search}`,config)
            setloading(false)
            setsearchResult(data)
        } catch (error) {
            toast({
                title: 'There was an error',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position:'bottom',
              });
              setloading(false);
              return;
        }
    }

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
          const { data } = await axios.post(`${baseUrl}/api/chat`, { userId }, config);
    
          if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
          setSelectedChat(data);
          setchatLoading(false);
          onClose();
        } catch (error) {
          toast({
            title: "Error fetching the chat",
            description: error.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
          });
        }
      };

  return (
    <>
    <Box
    bg="white"
    w="100%"
    p="5px 10px 5px 10px"
    borderWidth="5px">
      <Flex justify="space-between" align="center">
        <Tooltip label="Search users to chat" hasArrow placement='bottom-end'>
            <Button variant="ghost" onClick={onOpen}>
    <i className='fas fa-search'></i>
    <Text d={{base:"none", md:"flex"}} px="4">
        Search User
    </Text>
            </Button>
        </Tooltip>

        <Text fontSize="2xl" fontFamily="Work sans">Talk-A-Tive</Text>
        <div>
          <Menu>
          <MenuButton p={1}>
                <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
          </Menu>

          <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
                <Avatar size="sm" cursor='pointer' name={user.name} src={user.pic} />
            </MenuButton>
            <MenuList>
                <ProfileModal user={user}>

          <MenuItem>My Profile</MenuItem>
                </ProfileModal>

          <MenuDivider/>
              <MenuItem onClick={logOutHandler}>Log Out</MenuItem>
          </MenuList>
          </Menu>
         
            
        </div>
        </Flex>
    </Box>

    <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
    <DrawerOverlay/>
    <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">Search users</DrawerHeader>
        <DrawerBody>
        <Box pb={2}>
          <Flex>
            <Input placeholder="Search by name or email" value={search} onChange={(e)=>setsearch(e.target.value)}/>
            <Button onClick={handleSearch}>Go</Button>
            </Flex>
        </Box>
        {loading?(
            <ChatLoading/>
        ):(
            searchResult.map((user)=>(
                <UserListItem key={user._id} user={user} handleFunction={()=>accessChat(user._id)} />
            ))
        )}
         {chatLoading && <Flex> <Spinner ml="auto" /></Flex>}
    </DrawerBody>
    </DrawerContent>
   
    </Drawer>
    </>
  )
}

export default SideDrawer