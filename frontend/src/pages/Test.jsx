import React from "react";
import MarcroPie from "../components/MacroPie";
import MiniMealChart from "../components/MiniMealChart";

const Test = ({ meals }) => {
  return (
    <div className="h-96">
      <figure className="hover-gallery max-w-60">
        <img src="https://img.daisyui.com/images/stock/daisyui-hat-1.webp" />
        <img src="https://img.daisyui.com/images/stock/daisyui-hat-2.webp" />
        <img src="https://img.daisyui.com/images/stock/daisyui-hat-3.webp" />
        <img src="https://img.daisyui.com/images/stock/daisyui-hat-4.webp" />
      </figure>

    </div>
  );
};

export default Test;
