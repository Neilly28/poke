import React from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();
  if (pathname === "/login" || pathname === "/signup" || pathname === "/") {
    return null;
  } else {
    return (
      <div className="bg-white py-8 flex flex-col items-center justify-center bottom-0 left-0 w-full">
        <p className="text-black text-center mt-4">
          ©Pokémon. ©Nintendo/Creatures Inc./GAME FREAK inc.
          ポケットモンスター・ポケモン・Pokémonは任天堂・クリーチャーズ・ゲームフリークの登録商標です。
        </p>
      </div>
    );
  }
};

export default Footer;
