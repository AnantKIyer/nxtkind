"use client";

import { WixClientContext } from "@/context/WixContext";
import { useContext } from "react";

export const useWixClient = () => {
  const context = useContext(WixClientContext);
  if (!context) {
    throw new Error("WixClientContext is not provided, ensure your provider is setup.");
  }
  return context;
};

// Convenience hook for just the client
export const useWixClientOnly = () => {
  const context = useContext(WixClientContext);
  if (!context) {
    throw new Error("WixClientContext is not provided, ensure your provider is setup.");
  }
  return context.wixClient;
};