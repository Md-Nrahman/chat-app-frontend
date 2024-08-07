import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../../config/ChatLogics";
import { ChatState } from "../../Context/ChatProvider";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <img
                src={m.sender.pic}
                alt="profile"
                className="w-9 h-9 rounded-lg mr-1 mt-4"
              />
            )}
            <span
              className={`text-sm max-w-[300px] min-h-8 p-4 my-2 shadow-md break-words ${
                m.sender._id === user._id
                  ? "bg-[#b3e5fc] rounded-tr-lg rounded-bl-lg rounded-tl-lg "
                  : "bg-white rounded-bl-lg rounded-br-lg rounded-tr-lg"
              }`}
              style={{
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
