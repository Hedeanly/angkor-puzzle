"use client";

  import { useDraggable } from "@dnd-kit/core";

  type Props = {
    id: string;
    index: number;
    total: number;
    gridSize: number;
    imageUrl: string;
  };

  export default function PuzzlePiece({ id, index, gridSize, imageUrl }:
  Props) {
    const { attributes, listeners, setNodeRef, transform, isDragging } =
      useDraggable({ id });

    const row = Math.floor(index / gridSize);
    const col = index % gridSize;
    const pieceSize = 100 / gridSize;

    const style = {
      transform: transform
        ? `translate(${transform.x}px, ${transform.y}px)`
        : undefined,
      backgroundImage: `url(${imageUrl})`,
      backgroundSize: `${gridSize * 100}%`,
      backgroundPosition: `${col * pieceSize * (gridSize / (gridSize - 1))}%
   ${row * pieceSize * (gridSize / (gridSize - 1))}%`,
      width: "80px",
      height: "80px",
      opacity: isDragging ? 0.5 : 1,
      cursor: "grab",
      border: "2px solid #d4af37",
      borderRadius: "4px",
      zIndex: isDragging ? 999 : 1,
      position: "relative" as const,
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
      />
    );
  }