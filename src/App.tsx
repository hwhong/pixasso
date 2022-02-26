import React from "react";
import "./App.css";
import { useSelector } from "react-redux";
import { RootState } from "./reducer/pixel";

export function App() {
  const color = useSelector((state: RootState) => state.colors);
  return <div className="App">ededed</div>;
}
