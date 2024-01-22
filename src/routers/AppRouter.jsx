import { Route, Routes } from "react-router-dom";
import Home from "../views/Home";
import Pokemones from "../views/Pokemones";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pokemones/" element={<Pokemones />} />
    </Routes>
  );
};

export default AppRouter;