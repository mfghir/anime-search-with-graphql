import AnimeList from "./components/AnimeList";
import Search from "./components/Serach";
import AnimeDetail from "./components/AnimeDetail";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Search />
      <Routes>
        <Route path="animeDetail/:id" element={<AnimeDetail />} />
        <Route path="/" element={<AnimeList />} />
      </Routes>
    </>
  );
}

export default App;
