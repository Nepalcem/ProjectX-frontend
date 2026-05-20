import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Character } from "@/types/character";

type CharacterState = {
  character: Character | null;
};

const initialState: CharacterState = {
  character: null,
};

const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    setCharacter: (state, action: PayloadAction<Character | null>) => {
      state.character = action.payload;
    },
    clearCharacter: (state) => {
      state.character = null;
    },
  },
});

export const { setCharacter, clearCharacter } = characterSlice.actions;
export default characterSlice.reducer;
