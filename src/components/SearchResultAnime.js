import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import {
  MdOutlineLayers,
  MdOutlineCasino,
  MdOutlineCheck,
  MdOutlineCalendarToday,
  MdOutlineStarBorderPurple500,
  MdOutlineMovieCreation,
} from "react-icons/md";

const SearchResultAnime = ({ movie }) => {
  const exitHandler = () => {
    document.querySelector(".shadow").style.display = "none";
  };

  return (
    <>
      {movie && (
        <CardShadow className="shadow" onClick={exitHandler}>
          <Detail>
            <Stats>
              <div className="rating">
                <motion.h3>
                  {movie.title.english} <br />
                  {movie.title.native}
                </motion.h3>
              </div>

              <Info>
                <MdOutlineCalendarToday />
                <p>Year: {movie.seasonYear}</p>
              </Info>
            </Stats>

            <Poster>
              <motion.img
                src={movie.coverImage.large}
                alt={movie.title.english}
              />
            </Poster>

            <Description>
              <span>
                <MdOutlineStarBorderPurple500 />
                <strong>Score: </strong> {movie.averageScore}%
              </span>

              <span>
                <MdOutlineLayers />
                <strong>episodes: </strong> {movie.episodes}
              </span>

              <span>
                <MdOutlineCheck />
                <strong>status: </strong> {movie.status}
              </span>

              <span>
                <MdOutlineCasino />
                <strong>type: </strong> {movie.type}
              </span>

              <span className="genres">
                <MdOutlineMovieCreation />
                <strong>Genres: </strong>
                {movie.genres.map((item) => (
                  <span>{item.slice(0, item.length)}, </span>
                ))}
              </span>

              <span className="description">{movie.description}</span>
            </Description>
          </Detail>
        </CardShadow>
      )}
    </>
  );
};

export default SearchResultAnime;

const CardShadow = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  overflow-y: scroll;

  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;

  left: 0;
  z-index: 5;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #6991c7;
    border-radius: 8px;
  }
  &::-webkit-scrollbar-track {
    background: white;
  }
`;

const Detail = styled(motion.div)`
  width: 80%;
  border-radius: 1rem;
  padding: 2rem 5rem;

  background: white;
  position: absolute;
  left: 10%;

  color: black;
  z-index: 10;
  display: flex;

  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  margin: 3rem 0;
`;

const Stats = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
`;

const Info = styled(motion.div)`
  text-align: center;

  svg {
    fill: #6991c7;
  }
`;

const Poster = styled(motion.div)`
  margin-top: 5rem;
  display: flex;
  align-items: center;

  width: 50%;

  img {
    width: 80%;
  }
`;

const Description = styled(motion.div)`
  margin-top: 2rem;
  width: 50%;

  span {
    display: flex;
    margin: 15px 0;
    align-items: center;

    svg {
      margin-right: 10px;
      font-size: 20px;
    }

    p {
      margin-top: 40px;
    }

    strong {
      margin-right: 7px;
    }
  }

  .genres {
  }

  .genres span {
    padding: 0 5px;
  }

  .description {
    line-height: 30px;
  }
`;
