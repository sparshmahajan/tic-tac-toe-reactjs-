import { createSlice, configureStore } from "@reduxjs/toolkit";

let initialState = {
    turn: "Opponent",
}

const turnSlice = createSlice({
    name: "turn",
    initialState,
    reducers: {
        changeTurn: (state) => {
            state.turn = state.turn === "Your" ? "Opponent" : "Your";
        }
    }
});

const store = configureStore({
    reducer: turnSlice.reducer
});

export const { changeTurn } = turnSlice.actions;
export default store;
