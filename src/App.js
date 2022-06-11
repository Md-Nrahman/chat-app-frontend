import logo from './logo.svg';
import './App.css';
import { Button } from '@chakra-ui/react';
import { Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';

function App() {
  return (
    <div className="App">
      <Route path='/' exact component={HomePage}/>
      <Route path='/chats' exact component={ChatPage}/>
      {/* <Button colorScheme='blue'>Button</Button> */}
    </div>
  );
}

export default App;
