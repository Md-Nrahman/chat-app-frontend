import { Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import axios from 'axios';
import { baseUrl } from '../../common/baseUrl';
import { useHistory } from 'react-router-dom';
import { ChatState } from '../../Context/ChatProvider';

const SignUp = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [pic, setPic] = useState();
const [loading, setloading] = useState(false);
const toast = useToast()

const {setUser}= ChatState()

const history = useHistory()

    const postDetails=(pics)=>{
        setloading(true)
        if(pics===undefined){
            toast({
                title: 'Please Select an image.',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position:'bottom',
              });
              return;
        }

        if(pics.type==="image/jpeg" || pics.type==="image/jpg" || pics.type==="image/png"){
            const data = new FormData();
            data.append("file",pics);
            data.append("upload_preset", "chat_app");
            data.append("cloud_name", "dmqtbhrrx")
            fetch("https://api.cloudinary.com/v1_1/dmqtbhrrx/image/upload",{
                method:'post', body:data,
            }).then((res)=>res.json())
            .then(data=>{
                setPic(data.url.toString());
                console.log(data.url.toString());
                setloading(false)
            })
            .catch((err)=>{
                console.log(err);
                setloading(false)
            })
        } else {
            toast({
                title: 'Please Select an image.',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position:'bottom',
              });
              return;
        }
    }

    const submitHandler=async()=>{
        setloading(true);
        if(!name || !email || !password || !confirmPassword){
            toast({
                title: 'Please Fill all the fields',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position:'bottom',
              });
              setloading(false);
              return;
        }

        if(password!==confirmPassword){
            toast({
                title: 'Passwords do not match',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position:'bottom',
              });
              return;
        }


        try{

            const config={
                headers:{
                    "Content-type": "application/json",
                }
            }

            const {data} = await axios.post(`${baseUrl}/api/user`,{name,email,password,pic},
            config)

            if(data){
                toast({
                    title: 'Registration Successful',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position:'bottom',
                  });
                  localStorage.setItem('userInfo', JSON.stringify(data));
                  setUser(data);
                  setloading(false)
                  history.push("/chats")
            }
        }catch(error){
            toast({
                title: 'Error occurred',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position:'bottom',
              });
              setloading(false)
        }
    }

  return (
    <VStack spacing='5px'>
        <FormControl id='first-name' isRequired>
            <FormLabel>Name</FormLabel>
            <Input placeholder="Enter your name" onChange={(e)=>setName(e.target.value)} />
        </FormControl>
        <FormControl id='email' isRequired>
            <FormLabel>Email</FormLabel>
            <Input placeholder="Enter your name" onChange={(e)=>setEmail(e.target.value)} />
        </FormControl>
        <FormControl id='password' isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" placeholder="Enter your name" onChange={(e)=>setPassword(e.target.value)} />
        </FormControl>
        <FormControl id='confirm-password' isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Input type="password" placeholder="Enter your name" onChange={(e)=>setConfirmPassword(e.target.value)} />
        </FormControl>
        <FormControl id='pic' isRequired>
            <FormLabel>Upload pic</FormLabel>
            <Input type="file" p={1.5} accept="image/*" onChange={(e)=>postDetails(e.target.files[0])} />
        </FormControl>
        <Button isLoading={loading} colorScheme="blue" width="100%" style={{marginTop:15}} onClick={submitHandler}>Sign Up</Button>
    </VStack>
  )
}

export default SignUp