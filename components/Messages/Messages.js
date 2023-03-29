"use client";
import React, { useEffect, useState, useRef, useContext } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/router";
import styles from "./Messages.module.css";
import { Noto_Serif } from "next/font/google";

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: "400",
});

const Messages = (props) => {
  const [channels, setChannels] = useState(null);
  const [chat, setChat] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  const filteredChat =
    channels !== undefined
      ? chat.filter((message) => message.channel_id === channels)
      : chat.filter((message) => message.channel_id === null);

  const getChannel = async () => {
    const newChannel = await router.query;
    console.log("this is new channel", newChannel);
    setChannels(newChannel.id);
  };

  const user = props.props;

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from("messages").select("*, users(*)");
      setChat(data);
    };
    getData();
  }, [channels]);

  useEffect(() => {
    const messages = async () => {
      getChannel();
      const channel = supabase.channel(`${channels}`);
      await channel
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
        // console.log("channel removed", channel);
      };
    };
    messages();
  }, []);

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
  // console.log("chat", chat);
  // console.log("current channel", channels);

  const messagesUl = useRef(null);
  useEffect(() => {
    msgScroll();
  }, [filteredChat]);

  const msgScroll = () => {
    console.log("🚀 ~ file: Messages.js:70 ~ msgScroll ~ height :", messagesUl);
    if (messagesUl.current) {
      messagesUl.current.scrollTop = messagesUl.current.scrollHeight;
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.h2} onClick={() => setIsVisible(!isVisible)}>
        CHAT
      </h2>
      {isVisible && (
        <>
          <div
            className={`${styles.messagesContainer} messagesContainer`}
            ref={messagesUl}
          >
            {filteredChat.map((message) => (
              <div key={message.id} className={styles.singleMessage}>
                <h6 className={`${notoSerif.className}`}>
                  {message.created_at}
                </h6>
                <h4 className={`${notoSerif.className}`}>
                  {message.username}:
                  <span className={styles.messageContent}>
                    {message.content}
                  </span>
                </h4>
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
