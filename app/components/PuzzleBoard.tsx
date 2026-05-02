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
  isMobile: boolean;
  hasSelectedPiece: boolean;
  onTapSlot: () => void;
};

export default function PuzzleBoard({
  id,
  index,
  pieceValue,
  gridSize,
  imageUrl,
  isCorrect,
  onRetrieve,
  isMobile,
  hasSelectedPiece,
  onTapSlot,
}: Props) {
  const { setNodeRef, isOver } = useDroppable({ id });

  const isOccupied = pieceValue !== null;

  const pieceRow = pieceValue !== null ? Math.floor(pieceValue / gridSize) : 0;
  const pieceCol = pieceValue !== null ? pieceValue % gridSize : 0;
  const pieceSize = 100 / gridSize;
  const bgPos = `${pieceCol * pieceSize * (gridSize / (gridSize - 1))}% ${pieceRow * pieceSize * (gridSize / (gridSize - 1))}%`;

  const borderColor = isCorrect
    ? "#22c55e"
    : isOccupied
    ? "#ef4444"
    : isMobile && hasSelectedPiece
    ? "#facc15"
    : isOver
    ? "#60a5fa"
    : "#6b7280";

  const style: React.CSSProperties = {
    width: "80px",
    height: "80px",
    border: `2px ${isOccupied ? "solid" : "dashed"} ${borderColor}`,
    borderRadius: "4px",
    backgroundImage: isOccupied ? `url(${imageUrl})` : undefined,
    backgroundSize: isOccupied ? `${gridSize * 100}%` : undefined,
    backgroundPosition: isOccupied ? bgPos : undefined,
    backgroundColor: isOver ? "#1e3a5f" : "#1a1a2e",
    transition: "border 0.2s",
    cursor: isMobile ? (isCorrect ? "default" : "pointer") : isOccupied && !isCorrect ? "pointer" : "default",
    touchAction: "none",
    WebkitUserSelect: "none",
  };

  const handleClick = () => {
    if (isCorrect) return;
    if (isMobile) {
      if (hasSelectedPiece) {
        onTapSlot();
      } else if (isOccupied) {
        onRetrieve();
      }
    } else {
      if (isOccupied) onRetrieve();
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={handleClick}
      title={isMobile && !hasSelectedPiece && isOccupied && !isCorrect ? "Tap to retrieve" : undefined}
    />
  );
}
