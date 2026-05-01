"use client";

import { useReducer, useCallback, useEffect, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import PuzzlePiece from "../components/PuzzlePiece";
import PuzzleBoard from "../components/PuzzleBoard";
import Completion from "../components/Completion";

const GRID_SIZE = 4;
const TOTAL = GRID_SIZE * GRID_SIZE;
const IMAGE_URL = "/angkor.jpg";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function addPieceToTray(pieces: (number | null)[], piece: number): (number | null)[] {
  const copy = [...pieces];
  const emptyIdx = copy.findIndex((x) => x === null);
  if (emptyIdx !== -1) {
    copy[emptyIdx] = piece;
    return copy;
  }
  return [...copy, piece];
}

type State = {
  pieces: (number | null)[];
  board: (number | null)[];
};

type Action =
  | { type: "PLACE"; pieceIndex: number; boardSlot: number }
  | { type: "RETRIEVE"; slotIndex: number }
  | { type: "RESET" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "PLACE": {
      const { pieceIndex, boardSlot } = action;
      const newBoard = [...state.board];
      const displaced = newBoard[boardSlot];
      newBoard[boardSlot] = pieceIndex;

      let newPieces = state.pieces.map((p) => (p === pieceIndex ? null : p));
      if (displaced !== null) {
        newPieces = addPieceToTray(newPieces, displaced);
      }

      return { pieces: newPieces, board: newBoard };
    }

    case "RETRIEVE": {
      const piece = state.board[action.slotIndex];
      if (piece === null) return state;

      const newBoard = [...state.board];
      newBoard[action.slotIndex] = null;
      const newPieces = addPieceToTray([...state.pieces], piece);

      return { pieces: newPieces, board: newBoard };
    }

    case "RESET": {
      return {
        pieces: shuffle(Array.from({ length: TOTAL }, (_, i) => i)),
        board: Array(TOTAL).fill(null),
      };
    }
  }
}

const initialState: State = {
  pieces: Array.from({ length: TOTAL }, (_, i) => i),
  board: Array(TOTAL).fill(null),
};

export default function PuzzlePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [mounted, setMounted] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    dispatch({ type: "RESET" });
    setMounted(true);
  }, []);

  const completed = mounted && state.board.every((val, idx) => val === idx);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const pieceIndex = parseInt(active.id as string);
    const boardSlot = parseInt(over.id as string);
    if (isNaN(boardSlot)) return;
    dispatch({ type: "PLACE", pieceIndex, boardSlot });
  }, []);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center py-10 px-4">
        <h1 className="text-3xl font-bold text-yellow-400 mb-1">
          Angkor Wat Puzzle
        </h1>
        <p className="text-gray-400 mb-4">
          Drag pieces onto the board. Click a wrong piece to retrieve it.
        </p>

        {/* Preview toggle */}
        <div className="mb-6 flex flex-col items-center">
          <button
            onClick={() => setShowPreview((v) => !v)}
            className="text-sm bg-gray-800 text-yellow-300 px-4 py-1 rounded-full hover:bg-gray-700 transition"
          >
            {showPreview ? "Hide Preview" : "Show Preview"}
          </button>
          {showPreview && (
            <div className="mt-3 rounded-lg overflow-hidden border-2 border-yellow-500" style={{ width: "320px" }}>
              <img
                src={IMAGE_URL}
                alt="Angkor Wat preview"
                style={{ width: "320px", height: "auto", display: "block" }}
              />
            </div>
          )}
        </div>

        {/* Board */}
        <div
          className="grid mb-10"
          style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 80px)`, gap: "4px" }}
        >
          {state.board.map((val, i) => (
            <PuzzleBoard
              key={i}
              id={String(i)}
              index={i}
              pieceValue={val}
              gridSize={GRID_SIZE}
              imageUrl={IMAGE_URL}
              isCorrect={val === i}
              onRetrieve={() => dispatch({ type: "RETRIEVE", slotIndex: i })}
            />
          ))}
        </div>

        {/* Piece Tray */}
        <div className="flex flex-wrap justify-center gap-2 max-w-md bg-gray-900 p-4 rounded-xl">
          {state.pieces.map(
            (p) =>
              p !== null && (
                <PuzzlePiece
                  key={p}
                  id={String(p)}
                  index={p}
                  total={TOTAL}
                  gridSize={GRID_SIZE}
                  imageUrl={IMAGE_URL}
                />
              )
          )}
        </div>

        <button
          onClick={() => dispatch({ type: "RESET" })}
          className="mt-6 bg-yellow-500 text-black px-6 py-2 rounded-lg font-bold hover:bg-yellow-400 transition"
        >
          Reset Puzzle
        </button>

        {completed && <Completion />}
      </main>
    </DndContext>
  );
}
