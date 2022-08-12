import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { popup } from "../utils/animation";

const Anime = ({ movie }) => {

  const loadDetailHandler = () => {
    document.body.style.overflow = "hidden";
  };

  return (
    <StyledAnime
      layoutId={movie.id}
      onClick={loadDetailHandler}
      variants={popup}
      initial="hidden"
      animate="show"
    >
      <h2>{movie.title.english}</h2>
      <h3>{movie.title.native}</h3>
      <img src={movie.coverImage.large} alt={movie.id} />
    </StyledAnime>
  );
};

export default Anime;

const StyledAnime = styled(motion.div)`
  min-height: 30vh;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
  text-align: center;

  border-radius: 1rem;
  cursor: pointer;
  overflow: hidden;

  background: #ffffff;
  display: flex;
  justify-content: center;
  
  align-items: center;
  flex-direction: column;
  padding: 20px 10px;

  img {
    height: 40vh;
    object-fit: cover;
  }
`;
