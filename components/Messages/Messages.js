import React, { useEffect, useState } from "react";
import supabase from "../../lib/supabase";

const Messages = ({ user }) => {
  const [chat, setChat] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from("messages").select("*, users(*)");
      setChat(data);
    };
    getData();

    const channel = supabase.channel("chat");
    const messages = supabase
      .channel("chat")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages" },
        async (payload) => {
          await setChat((current) => [...current, payload.new]);
          console.log("THIS IS THE MUTHAFUCKIN PAYLOAD", payload);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [chat]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const { content } = Object.fromEntries(new FormData(form));

    form.reset();
    const { data } = await supabase
      .from("messages")
      .insert({ content: content, user_id: user.id });
    console.log(
      "this is userid in submit handler################################################",
      user
    );
  };

  return (
    <div>
      <ul>
        {chat.map((message) => (
          <li key={message.id}>
            <h2>{message.users.username}</h2>
            <h4>Message:</h4>
            <p>{message.content}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={submitHandler}>
        <label htmlFor="content">Message</label>
        <textarea name="content" type="text"></textarea>
        <button>Send</button>
      </form>
    </div>
  );
};

export default Messages;
