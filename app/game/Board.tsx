import { useState, useEffect } from 'react';
import { CellItem } from './Cell';
import { HighlightedCels } from './SelectCellLogic';
import { InitedGameData, Cell, SelectedCell } from './types';

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const possibleMoves = new HighlightedCels();

export function Board({
  isActive = true,
  initData,
}: {
  isActive: boolean;
  initData: InitedGameData;
}) {
  const [board, setBoard] = useState(initData.board);
  const [selectedCell, setSelectedCell] = useState<SelectedCell>({
    cell: null,
    possibleMoves: [],
  });

  const cellClick = (coordinate: Cell) => {
    if (!selectedCell || selectedCell.cell !== coordinate) {
      const side = initData.side === 'w' ? board.white : board.black;
      const figure = side[coordinate];
      if (figure) {
        const dottedCels = possibleMoves.createPossibleMoves(
          figure,
          coordinate,
        );
        setSelectedCell({ cell: coordinate, possibleMoves: dottedCels });
      }
    }
  };

  useEffect(() => {
    possibleMoves.setData(initData.board, initData.side);
  }, []);

  const result = [];
  for (let i = 0; i < 8; i++) {
    const row = [];
    for (let j = 0; j < 8; j++) {
      const color = (i + j) % 2 === 0 ? 'bg-stone-500' : 'bg-stone-200';
      const cell = `${letters[j]}${i + 1}`;
      const figure = board.white[cell] || board.black[cell];
      row.push(
        <CellItem
          highlighted={selectedCell.cell === cell}
          dotted={selectedCell.possibleMoves.find((c) => c === cell)}
          figure={figure}
          coord={cell}
          cellClick={cellClick}
          color={color}
          side={board.white[cell] ? 'w' : 'b'}
          key={letters[j] + (i + 1)}
        />,
      );
    }
    result.push(row);
  }

  const rendered = result.map((row, i) => (
    <div key={`row-${i}`} className="flex">
      {row}
    </div>
  ));

  return (
    <div className="flex flex-col">
      {initData.side === 'w' ? rendered.reverse() : rendered}
    </div>
  );
}
