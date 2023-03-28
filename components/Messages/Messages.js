"use client";
import React, { useEffect, useState, useRef, useContext } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/router";
import styles from "./Messages.module.css";

const Messages = (props) => {
  const [channels, setChannels] = useState(null);
  const [chat, setChat] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  let messagesUl = useRef();

  const getChannel = async () => {
    const newChannel = await router.query;
    console.log("this is new channel", newChannel);
    setChannels(newChannel.id);
  };

  const user = props.props;

  useEffect(() => {
    getChannel();

    const getData = async () => {
      const { data } = await supabase.from("messages").select("*, users(*)");
      setChat(data);
    };
    getData();
    const channel = supabase.channel(`${channels}`);

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

    msgScroll();
    return () => {
      supabase.removeChannel(channel);
      console.log("channel removed", channel);
    };
  }, [channels]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const { content } = Object.fromEntries(new FormData(form));

    form.reset();
    const { data } = await supabase.from("messages").insert({
      content: content,
      user_id: user.id,
      username: user.username,
      channel_id: channels,
    });
  };
  console.log("chat", chat);
  console.log("current channel", channels);

  const msgScroll = () => {
    console.log(
      "🚀 ~ file: Messages.js:70 ~ msgScroll ~ height :",
      messagesUl.current.children
    );
    // messagesUl.current.scrollTop = messagesUl.current.scrollHeight;
    // current.scrollTop = current.scrollHeight;
  };

  const filteredChat =
    channels !== undefined
      ? chat.filter((message) => message.channel_id === channels)
      : chat.filter((message) => message.channel_id === null);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.h2} onClick={() => setIsVisible(!isVisible)}>
        CHAT
      </h2>
      {isVisible && (
        <>
          <div className={`${styles.messagesContainer}`} ref={messagesUl}>
            {filteredChat.map((message) => (
              <div key={message.id}>
                <h6>{message.created_at}</h6>
                <h3>{message.username}</h3>
                <h4>Says: </h4>
                <p>{message.content}</p>
              </div>
            ))}
          </div>
          <form className={styles.form} onSubmit={submitHandler}>
            <label htmlFor="content">Message</label>
            <textarea
              className={styles.textarea}
              name="content"
              type="text"
            ></textarea>
            <button className={styles.button}>Send</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Messages;
