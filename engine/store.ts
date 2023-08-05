import { create } from "zustand";

import { MatchSlice, createMatchSlice } from "./match";
import { GameSlice, createGameSlice } from "./game";
import { immer } from "zustand/middleware/immer";

export const useBoundStore = create(
  immer<GameSlice & MatchSlice>((...a) => ({
    ...createGameSlice(...a),
    ...createMatchSlice(...a),
  }))
);
