import { create } from "zustand";

import { MatchSlice, createMatchSlice } from "./match";
import { GameSlice, createGameSlice } from "./game";
import { devtools } from "zustand/middleware";

/**
 * The store with the game and match slices.
 * It acts as the Game Engine for the current game and tracks past games.
 */
export const useBoundStore = create(
  devtools<GameSlice & MatchSlice>((...a) => ({
    ...createGameSlice(...a),
    ...createMatchSlice(...a),
  }))
);
