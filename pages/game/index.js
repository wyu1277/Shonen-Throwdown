import React, { useEffect, useState } from "react";
import Messages from "@/components/Messages/Messages";
import supabase from "@/lib/supabase";
import GameRoom from "@/components/GameRoom/GameRoom";

const Game = () => {
  const submitHandler = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const { content } = Object.fromEntries(new FormData(form));

    form.reset();
    const { data } = await supabase
      .from("messages")
      .insert({ content: content });
  };

  return (
    <div>
      <GameRoom />
      <Messages />
      <form onSubmit={submitHandler}>
        <label htmlFor="content">Message</label>
        <textarea name="content" type="text"></textarea>
        <button>Send</button>
      </form>
    </div>
  );
};

export default Game;
