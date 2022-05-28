import { createSlice, configureStore } from "@reduxjs/toolkit";

let initialState = {
    turn: "Opponent",
    isGameActive: true,
}

const turnSlice = createSlice({
    name: "turn",
    initialState,
    reducers: {
        changeTurn: (state) => {
            state.turn = state.turn === "Your" ? "Opponent" : "Your";
        },
        changeIsGameActive: (state, action) => {
            state.isGameActive = action.payload;
        }
    }
});

const store = configureStore({
    reducer: turnSlice.reducer
});

export const { changeTurn, changeIsGameActive } = turnSlice.actions;
export default store;
