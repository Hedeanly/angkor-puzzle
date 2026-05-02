"use client";

import { useDraggable } from "@dnd-kit/core";

type Props = {
  id: string;
  index: number;
  total: number;
  gridSize: number;
  imageUrl: string;
  isMobile: boolean;
  isSelected: boolean;
  onTap: () => void;
};

export default function PuzzlePiece({ id, index, gridSize, imageUrl, isMobile, isSelected, onTap }: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });

  const row = Math.floor(index / gridSize);
  const col = index % gridSize;
  const pieceSize = 100 / gridSize;

  const style: React.CSSProperties = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: `${gridSize * 100}%`,
    backgroundPosition: `${col * pieceSize * (gridSize / (gridSize - 1))}% ${row * pieceSize * (gridSize / (gridSize - 1))}%`,
    width: "80px",
    height: "80px",
    opacity: isDragging ? 0.5 : 1,
    cursor: isMobile ? "pointer" : "grab",
    border: isSelected ? "2px solid #facc15" : "2px solid #d4af37",
    borderRadius: "4px",
    zIndex: isDragging ? 999 : 1,
    position: "relative",
    boxShadow: isSelected ? "0 0 12px 4px rgba(250,204,21,0.7)" : undefined,
    transition: "box-shadow 0.2s, border 0.2s",
    touchAction: isMobile ? "auto" : "none",
    WebkitUserSelect: "none",
    WebkitTouchCallout: "none",
  };

  if (isMobile) {
    return <div style={style} onClick={onTap} />;
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    />
  );
}
