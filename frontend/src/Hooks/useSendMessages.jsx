import { useState } from "react";
import useConversation from "../zustand/useConversation";
import { toast } from "react-hot-toast";

const useSendMessages = () => {
  const [loading, setLoading] = useState(false); // Correctly initialize state
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    // Use the same name as in MessageInput
    setLoading(true);
    try {
      const res = await fetch(
        `/api/messages/send/${selectedConversation._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        }
      );

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading }; // Ensure the name matches
};

export default useSendMessages;
