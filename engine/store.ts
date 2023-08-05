import { create } from "zustand";

import { MatchSlice, createMatchSlice } from "./match";
import { GameSlice, createGameSlice } from "./game";
import { devtools } from "zustand/middleware";

export const useBoundStore = create(
  devtools<GameSlice & MatchSlice>((...a) => ({
    ...createGameSlice(...a),
    ...createMatchSlice(...a),
  }))
);
