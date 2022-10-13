import { createSlice } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from ".";

type Row = [number, number, number];

export type Grid = [Row, Row, Row];

export type Cell = { row: number; col: number };

export type State = {
  grid: Grid;
  turn: number;
  lastCell?: Cell;
};

export const initialState: State = {
  grid: [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],
  turn: 1,
};

export const { reducer, actions } = createSlice({
  name: "board",
  initialState,
  reducers: {
    restart: () => initialState,
    click: (state, { payload: { row, col } }) => {
      if (state.grid[row][col] > 0) {
        return state;
      }

      const grid = state.grid.map((row) => [...row]) as Grid;
      grid[row][col] = state.turn;

      return {
        grid,
        turn: 3 - state.turn,
        lastCell: { row, col },
      };
    },
  },
});

const useBoard = () => {
  const board = useSelector<RootState>(({ board }) => board) as State;
  const dispatch = useDispatch();
  const restart = () => dispatch(actions.restart());
  const click = (row: number, col: number) =>
    dispatch(actions.click({ row, col }));
  return { ...board, restart, click };
};

export default useBoard;
