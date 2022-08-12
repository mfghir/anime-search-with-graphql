import { gql } from "@apollo/client";

const GET_ANIME_LIST = gql`
  query getAnimeList($perPage: Int!, $page: Int!) {
    Page(perPage: $perPage, page: $page) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }

      media {
        id
        # siteUrl
        description
        episodes
        genres
        duration
        averageScore
        title {
          english
          native
        }
        coverImage {
          large
        }
      }
    }
  }
`;

const GET_ANIME = gql`
  query getAnime($mediaId: Int!) {
    Media(id: $mediaId) {
      id
      title {
        english
        native
      }
      coverImage {
        large
      }
      description
      episodes
      averageScore
      status
      type
      genres
      seasonYear
    }
  }
`;

const SEARCH = gql`
  query getSearch($search: String!) {
    Media(search: $search) {
      id
      title {
        english
        native
      }
      coverImage {
        large
      }
      description
      episodes
      averageScore
      status
      type
      genres
      seasonYear
    }
  }
`;

const GET_TEREND_ANIME = gql`
  query getTrendAnime($page: Int!, $perPage: Int!) {
    Page(page: $page, perPage: $perPage) {
      mediaTrends {
        media {
          id
          title {
            english
            native
          }
          coverImage {
            large
          }
          description
          episodes
          averageScore
          status
          type
          genres
          seasonYear
        }
      }
    }
  }
`;

export { GET_ANIME_LIST, GET_ANIME, SEARCH, GET_TEREND_ANIME };
