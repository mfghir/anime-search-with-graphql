import React from "react";
import Anime from "./Anime";
import styled from "styled-components";

import { motion } from "framer-motion";
import { useQuery } from "@apollo/client";
import { GET_ANIME_LIST } from "../graphql/queries";

import { Link, useNavigate } from "react-router-dom";
import Loading from "../utils/loading.gif";
import TrendingAnime from "./TrendingAnime";

const AnimeList = () => {
  const navigate = useNavigate();
  const { loading, data, error } = useQuery(GET_ANIME_LIST, {
    variables: { perPage: 50, page: 10 },
  });

  if (loading)
    return (
      <figure className="loading">
        <img src={Loading} alt="loading" />
      </figure>
    );
  if (error) return <h3 className="error">{error.message} 😥</h3>;

  return (
    <AnimeListStyle>
      <TrendingAnime />

      <h2 className="h2">🎬 AnimeList</h2>
      <AnimesStyle>
        {data.Page.media.map((movie) => (
          <Link to={`animeDetail/${movie.id}`} key={movie.id}>
            <Anime
              movie={movie}
              key={movie.id}
              onClick={() => navigate(`animeDetail/${movie.id}`)}
            />
          </Link>
        ))}
      </AnimesStyle>
    </AnimeListStyle>
  );
};

export default AnimeList;

const AnimeListStyle = styled(motion.div)`
  padding: 5rem;

  .h2 {
    color: #ffffff;
    margin-bottom: 30px;
  }
`;

const AnimesStyle = styled(motion.div)`
  min-height: 80vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

  grid-column-gap: 3rem;
  grid-row-gap: 5rem;
`;
