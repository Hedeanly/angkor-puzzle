"use client";

import { useDroppable } from "@dnd-kit/core";

type Props = {
  id: string;
  index: number;
  pieceValue: number | null;
  gridSize: number;
  imageUrl: string;
  isCorrect: boolean;
  onRetrieve: () => void;
};

export default function PuzzleBoard({
  id,
  index,
  pieceValue,
  gridSize,
  imageUrl,
  isCorrect,
  onRetrieve,
}: Props) {
  const { setNodeRef, isOver } = useDroppable({ id });

  const isOccupied = pieceValue !== null;

  // Use the PIECE's index for background position, not the slot's index
  const pieceRow = pieceValue !== null ? Math.floor(pieceValue / gridSize) : 0;
  const pieceCol = pieceValue !== null ? pieceValue % gridSize : 0;
  const pieceSize = 100 / gridSize;
  const bgPos = `${pieceCol * pieceSize * (gridSize / (gridSize - 1))}% ${pieceRow * pieceSize * (gridSize / (gridSize - 1))}%`;

  const borderColor = isCorrect
    ? "#22c55e"
    : isOccupied
    ? "#ef4444"
    : isOver
    ? "#60a5fa"
    : "#6b7280";

  const borderStyle = isOccupied ? "solid" : "dashed";

  const style = {
    width: "80px",
    height: "80px",
    border: `2px ${borderStyle} ${borderColor}`,
    borderRadius: "4px",
    backgroundImage: isOccupied ? `url(${imageUrl})` : undefined,
    backgroundSize: isOccupied ? `${gridSize * 100}%` : undefined,
    backgroundPosition: isOccupied ? bgPos : undefined,
    backgroundColor: isOver ? "#1e3a5f" : "#1a1a2e",
    transition: "border 0.2s",
    cursor: isOccupied && !isCorrect ? "pointer" : "default",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={isOccupied && !isCorrect ? onRetrieve : undefined}
      title={isOccupied && !isCorrect ? "Click to retrieve piece" : undefined}
    />
  );
}
