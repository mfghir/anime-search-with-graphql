import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import { fadeIn } from "../utils/animation";
import { MdLocalFireDepartment, MdSearch } from "react-icons/md";
import SearchResultAnime from "./SearchResultAnime";

import { useLazyQuery } from "@apollo/client";
import { SEARCH } from "../graphql/queries";
import Loading from "../utils/loading.gif";

const Search = () => {
  const nameRef = useRef();
  const [animeSearched, setAnimeSearched] = useState("");

  const [getSearch, { loading, data, error, called }] = useLazyQuery(SEARCH, {
    variables: { search: animeSearched },
  });

  function submitHandler(e) {
    e.preventDefault();
    setAnimeSearched(nameRef.current.value);
    getSearch();
  }

  console.log({ loading, data, error, called });
  if (loading)
    return (
      <figure className="loading">
        <img src={Loading} alt="loading" />
      </figure>
    );
  if (error) return <h3 className="error">{error.message} 😥</h3>;

  return (
    <>
      <StyledNav variants={fadeIn} initial="hidden" animate="show">
        <Logo>
          <MdLocalFireDepartment />
          <h1>Anime Land</h1>
        </Logo>

        <form onSubmit={submitHandler}>
          <input type="text" placeholder="Anime name..." ref={nameRef} />
          <button type="submit">
            <MdSearch />
          </button>
        </form>
      </StyledNav>

      {data && <SearchResultAnime movie={data.Media} key={data.Media.id} />}
    </>
  );
};

export default Search;

const StyledNav = styled(motion.div)`
  padding: 3rem 5rem;
  text-align: center;

  form {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }

  input {
    width: 30%;
    font-size: 1rem;
    padding: 0.8rem 1rem;

    border: none;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);

    border-radius: 10px 0px 0px 10px;
  }

  input:focus {
    outline: 2px solid #182d62;
  }

  button {
    font-size: 1.5rem;
    border: none;
    padding: 0.5rem 0.8rem;

    cursor: pointer;
    color: white;
    background: #182d62;

    border-radius: 0px 10px 10px 0px;
  }
`;

const Logo = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 1rem;
  font-family: "Abril Fatface", cursive;
  color: #182d62;

  svg {
    font-size: 30px;
    margin-right: 10px;
    fill: #182d62;
  }
`;
