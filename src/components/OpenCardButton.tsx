"use client";
import React from "react";

const OpenCardButton = ({
  setState,
}: {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <button
      onClick={() => {
        setState((prev) => !prev);
      }}
    >
      📃
    </button>
  );
};

export default OpenCardButton;
