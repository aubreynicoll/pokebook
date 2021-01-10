import React from "react";
import pokeball_icon from "../assets/images/pokeball512.svg";

const LoadingScreen: React.FC = () => (
  <div className="LoadingScreen-root">
    <img className="LoadingScreen-img" src={pokeball_icon} alt="pokeball_icon" />
  </div>
);

export default LoadingScreen;
