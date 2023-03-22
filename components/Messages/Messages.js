import React, { useEffect, useState } from "react";
import supabase from "../../lib/supabase";

const Messages = () => {
  const [chat, setChat] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from("messages").select("*, users(*)");
      setChat(data);
    };
    getData();
  }, []);

  useEffect(() => {
    const channel = supabase.channel("chat");
    const messages = supabase
      .channel("chat")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages" },
        (payload) => {
          setChat((current) => [...current, payload.new]);
          console.log(payload);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  });

  return (
    <ul>
      {chat.map((message) => (
        <li key={message.id}>
          <h2>{message.users.username}</h2>
          <h4>Message:</h4>
          <p>{message.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default Messages;
