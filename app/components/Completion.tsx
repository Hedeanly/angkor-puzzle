"use client";

import { useEffect, useState } from "react";

export default function Completion() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        overflow: "hidden",
        opacity: visible ? 1 : 0,
        transition: "opacity 1.5s ease-in-out",
      }}
    >
      {/* Blurred background */}
      <img
        src="/angkor-ending3.png"
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "blur(18px) brightness(0.5)",
          transform: "scale(1.05)",
        }}
      />

      {/* Dark overlay */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }} />

      {/* Main content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
        }}
      >
        <img
          src="/angkor-ending3-removebg-preview.png"
          alt="Angkor Wat"
          style={{
            maxWidth: "90vw",
            maxHeight: "75vh",
            objectFit: "contain",
            borderRadius: 0,
            filter: "drop-shadow(0 0 40px rgba(251,191,36,0.6)) drop-shadow(0 20px 40px rgba(0,0,0,0.5))",
            animation: "float 3s ease-in-out infinite",
          }}
        />

        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 4rem)",
            fontWeight: "bold",
            color: "#fbbf24",
            textShadow: "0 0 30px #f59e0b, 0 2px 8px rgba(0,0,0,0.9)",
            letterSpacing: "0.1em",
            textAlign: "center",
          }}
        >
          Welcome to Angkor
        </h1>
      </div>

      <style>{`
        @keyframes float {
          0%   { transform: translateY(0px); }
          50%  { transform: translateY(-18px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
}
