import logo from "./logo.svg";
import "./App.css";
import { Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Route path="/" exact component={HomePage} />
      <Route path="/chats" exact component={ChatPage} />
      {/* <Button colorScheme='blue'>Button</Button> */}
    </>
  );
}

export default App;
