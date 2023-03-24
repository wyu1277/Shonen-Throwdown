import React, { useEffect, useState, useRef } from "react";
import supabase from "../../lib/supabase";
import { useRouter } from "next/router";

const Messages = ({ props }) => {
  const [chat, setChat] = useState([]);
  const router = useRouter();
  const {
    query: { gameId },
  } = router;

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from("messages").select("*, users(*)");
      setChat(data);
    };
    getData();

    const channel = supabase.channel(`${gameId}`);
    const messages = supabase
      .channel("chat")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages" },
        async (payload) => {
          await setChat((current) => [...current, payload.new]);
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
      .insert({ content: content, user_id: props.id });
  };

  return (
    <div>
      <h2>MESSAGES:</h2>
      <ul>
        {chat.map((message) => (
          <li key={message.id}>
            <h3>{message.users.username}</h3>
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
