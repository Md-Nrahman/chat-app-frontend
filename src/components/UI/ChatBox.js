import { ChatState } from "../../Context/ChatProvider";
import SingleChat from "./SingleChat";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <div
      className={` ${
        selectedChat ? "" : "hidden md:flex"
      } md:flex flex-1 flex-col items-center justify-center bg-white w-full h-full md:w-1/3 md:h-full md:rounded-lg md:border-2 md:border-gray-200 md:shadow-lg md:ml-2 md:mr-2`}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </div>
  );
};

export default Chatbox;
