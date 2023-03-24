import React from "react";
// import TeamMate from "@/components/teammate";
import { motion } from "framer-motion";
import container from "@/styles/variants";

const About = () => {
  const team = [
    {
      img: "",
      name: "Kyle Wong",
      email: "kwong498@gmail.com",
      bio: "loremipsumloreamipsum",
      linkedIn: "kylematthewwong",
      github: "Kywongster",
    },
    {
      img: "",
      name: "Victor Flores",
      email: "thelegendofvictor@gmail.com",
      bio: "loremipsumloreamipsum",
      linkedIn: "mikloflores",
      github: "Miklo1775",
    },
    {
      img: "",
      name: "Wilson Yu",
      email: "wyu1277@gmail.com",
      bio: "loremipsumloreamipsum",
      linkedIn: "whydesigns",
    },
    {
      img: "",
      name: "Jonathan Wei",
      email: "jkwei.86@gmail.com",
      bio: "loremipsumloreamipsum",
      linkedIn: "loremipsumloreamipsum",
    },
  ];

  return (
    <motion.div
      variants={container}
      initial="initial"
      animate="visible"
      exit="exit"
    >
      <h1>ABOUT</h1>
      <h2>The Game</h2>
      <p>
        This game is great and we're gonna knock it out of this park in the next
        coming week
      </p>
      <h2>The Team</h2>
      <div>
        {team.map((teamMember) => (
          <div key={teamMember.name}>
            <h3>{teamMember.name}</h3>
            <p>{teamMember.bio}</p>
            <a href={`mailto:${teamMember.email}}`}>✉️</a>
            <a href={`https://www.linkedin.com/in/${teamMember.linkedIn}`}>
              👨🏽‍💼
            </a>
            <a href={`https://github.com/${teamMember.github}`}>🐈‍⬛</a>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default About;
