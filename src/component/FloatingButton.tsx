"use client";
import Link from "next/link";
import React from "react";

const FloatingButton = () => {
  return (
    <Link
      href="/scan"
      className=""
    >
      <span className="text-white text-2xl">📷</span>
    </Link>
  );
};

export default FloatingButton;
