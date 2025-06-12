"use client";

import { WixClientContext } from "@/context/WixContext";

import { useContext } from "react";

export const useWixClient = () => {
  const client = useContext(WixClientContext);
  if (!client) {
    throw new Error("WixClientContext is not provided, ensure your provider is setup.");
  }
  return client;
};