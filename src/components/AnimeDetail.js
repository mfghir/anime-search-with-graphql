import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@apollo/client";

import Loading from "../utils/loading.gif";
import { GET_ANIME } from "../graphql/queries";

import {
  MdOutlineLayers,
  MdOutlineCasino,
  MdOutlineCheck,
  MdOutlineCalendarToday,
  MdOutlineStarBorderPurple500,
  MdOutlineMovieCreation,
} from "react-icons/md";

const AnimeDetail = ({ pathId }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const exitmediaHandler = (e) => {
    const element = e.target;
    if (element.classList.contains("shadow")) {
      document.body.style.overflow = "auto";
      navigate("/");
    }
  };

  const { loading, data, error } = useQuery(GET_ANIME, {
    variables: { mediaId: id },
  });

  if (loading)
    return (
      <figure className="loading">
        <img src={Loading} alt="loading" />
      </figure>
    );
  if (error) return <h3 className="error">sth went wrong...</h3>;

  return (
    <>
      <CardShadow className="shadow" onClick={exitmediaHandler}>
        <Detail layoutId={pathId}>
          <Stats>
            <div className="rating">
              <motion.h3 layoutId={`title ${pathId}`}>
                {data.Media.title.english} <br />
                {data.Media.title.native}
              </motion.h3>
            </div>

            <Info>
              <MdOutlineCalendarToday />
              <p>Year: {data.Media.seasonYear}</p>
            </Info>
          </Stats>

          <Poster>
            <motion.img
              layoutId={`image ${pathId}`}
              src={data.Media.coverImage.large}
              alt={data.Media.title.english}
            />
          </Poster>

          <Description>
            <span>
              <MdOutlineStarBorderPurple500 />
              <strong>Score: </strong> {data.Media.averageScore} %
            </span>

            <span>
              <MdOutlineLayers />
              <strong>episodes: </strong> {data.Media.episodes}
            </span>

            <span>
              <MdOutlineCheck />
              <strong>status: </strong> {data.Media.status}
            </span>

            <span>
              <MdOutlineCasino />
              <strong>type: </strong> {data.Media.type}
            </span>

            <span className="genres">
              <MdOutlineMovieCreation />
              <strong>Genres:</strong>
              {data.Media.genres.map((item) => (
                <span>{item.slice(0, item.length)}, </span>
              ))}
            </span>

            <span className="description">{data.Media.description}</span>
          </Description>
        </Detail>
      </CardShadow>
    </>
  );
};

export default AnimeDetail;

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
