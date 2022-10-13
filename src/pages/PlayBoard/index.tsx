import React, { useEffect, useMemo, useState } from "react";
import { useAlert } from "react-alert";
import { Row, Col, Container } from "react-bootstrap-v5";
import {
  EmojiSmile,
  EmojiDizzy,
  XLg as Cross,
  Circle,
  Icon,
} from "react-bootstrap-icons";
import clsx from "clsx";

import useBoard from "../../store/reducers/board";

import "./style.css";

const PlayBoard: React.FC = () => {
  const { success, info } = useAlert();

  const { grid, turn, lastCell, restart, click } = useBoard();

  const [RestartIcon, setRestartIcon] = useState<Icon>(EmojiSmile);

  useEffect(() => {
    setRestartIcon(EmojiDizzy);
    setTimeout(() => setRestartIcon(EmojiSmile), 200);
  }, [grid]);

  const isFull = useMemo(
    () => grid.every((row) => row.every((cell) => cell > 0)),
    [grid]
  );

  const isMatching = (line: number[]) => line.every((v) => v === 3 - turn);

  const matching = useMemo(
    () => {
      if (!lastCell) {
        return;
      }

      const { row, col } = lastCell;

      // Check if the last click makes a matching row.
      if (isMatching(grid[row])) {
        return (x: number, y: number) => x === row;
      }

      // Check if the last click makes a matching column.
      if (isMatching(grid.map((row) => row[col]))) {
        return (x: number, y: number) => y === col;
      }

      // Check if the last click makes a matching primary diagonal.
      if (row === col && isMatching(grid.map((row, i) => row[i]))) {
        return (x: number, y: number) => x === y;
      }

      // Check if the last click makes a matching secondary diagonal.
      if (row + col === 2 && isMatching(grid.map((row, i) => row[2 - i]))) {
        return (x: number, y: number) => x + y === 2;
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [grid, lastCell]
  );

  useEffect(
    () => {
      if (!matching && isFull) {
        info("It's full!");
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [isFull]
  );

  useEffect(
    () => {
      if (!!matching) {
        success(`Player ${3 - turn} won!`);
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [matching]
  );

  return (
    <Container
      className="position-relative d-flex flex-column align-items-center justify-content-center min-vh-100"
      fluid
    >
      <RestartIcon
        className="btn-restart position-absolute start-50 top-50 text-warning"
        role="button"
        size={80}
        onClick={restart}
      />
      <Row className="board">
        {grid
          .flat()
          .map((player, i) => ({
            Mark: [null, Cross, Circle][player],
            row: Math.floor(i / 3),
            col: i % 3,
          }))
          .map(({ Mark, row, col }, i) => (
            <Col
              className={
                "cell d-flex align-items-center justify-content-center border " +
                clsx({
                  "border-start-0": !col,
                  "border-top-0": !row,
                  "border-end-0": col === 2,
                  "border-bottom-0": row === 2,
                })
              }
              key={i}
              xs={4}
              onClick={() => !matching && click(row, col)}
            >
              {Mark && (
                <Mark
                  className={clsx({
                    "text-danger":
                      matching?.(row, col) ||
                      (row === lastCell?.row && col === lastCell?.col),
                  })}
                  size="80%"
                />
              )}
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default PlayBoard;
