import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import { GET_TEREND_ANIME } from "../graphql/queries";

const TrendingAnime = () => {
  const { loading, data, error } = useQuery(GET_TEREND_ANIME, {
    variables: { page: 2, perPage: 5 },
  });

  if (loading) return <h3 className="error">loading ...</h3>;
  if (error) return <h3 className="error">{error.message} 😥</h3>;

  return (
    <TrendDiv>
      <h2 className="h2">🔥 TrendingAnime</h2>

      <Trend>
        {data &&
          data.Page.mediaTrends.map((movie) => (
            <Link to={`animeDetail/${movie.media.id}`} key={movie.media.id}>
              <StyledAnime>
                <h2>{movie.media.title.english}</h2>
                <h3>{movie.media.title.native}</h3>
                <img src={movie.media.coverImage.large} alt={movie.media.id} />
              </StyledAnime>
            </Link>
          ))}
      </Trend>
    </TrendDiv>
  );
};

export default TrendingAnime;

const TrendDiv = styled(motion.div)`
  .h2 {
    margin: 20px 0;
  }
`;

const Trend = styled(motion.div)`
  margin: 50px 0;
  min-height: 40vh;
  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-column-gap: 3rem;
  grid-row-gap: 5rem;
`;

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
