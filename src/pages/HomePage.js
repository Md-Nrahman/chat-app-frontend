import React, { useEffect } from 'react'
import {Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text} from '@chakra-ui/react'
import Login from '../components/Auth/Login'
import SignUp from '../components/Auth/SignUp'
import { useHistory } from 'react-router-dom'

const HomePage = () => {

  const history = useHistory()

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"))
        if(!userInfo){
            history.push('/')
        }
    }, [history]);

  return (
    <Container maxW='xl' centerContent>
      <Box
      d="flex"
      justifyContent="center"
      p={3}
      bg="white"
      w="100%"
      m="40px 0 15px 0"
      borderRadius="lg"
      borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="Work sans" color="black">Talk-A-Tive</Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
      <Tabs>
  <TabList mb='1em'>
    <Tab width="50%">Login</Tab>
    <Tab width="50%">Sign Up</Tab>
  </TabList>

  <TabPanels>
    <TabPanel>
      <Login/>
    </TabPanel>
    <TabPanel>
      <SignUp/>
    </TabPanel>
  </TabPanels>
</Tabs>
      </Box>
    </Container>
  )
}

export default HomePage