import React, { useEffect, useState, useRef } from "react";
import supabase from "../../lib/supabase";
import styles from "./Messages.module.css";

const Messages = ({ props }) => {
  const [chat, setChat] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

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
    <div className={styles.wrapper}>
      <h2 className={styles.h2} onClick={() => setIsVisible(!isVisible)}>CHAT</h2>
      {isVisible && (
        <>
          <ul className={styles.messagesContainer}>
            {chat.map((message) => (
              <li key={message.id}>
                <h3>{message.users.username}</h3>
                <h4>Message:</h4>
                <p>{message.content}</p>
              </li>
            ))}
          </ul>
          <form className={styles.form} onSubmit={submitHandler}>
            <label htmlFor="content">Message</label>
            <textarea className={styles.textarea} name="content" type="text"></textarea>
            <button className={styles.button}>Send</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Messages;