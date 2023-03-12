import React from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();
  if (pathname === "/login" || pathname === "/signup" || pathname === "/") {
    return null;
  } else {
    return (
      <div className="mt-48 justify-center items-center bg-black p-8">
        <div
          className="h-96 bg-cover bg-center w-1/2 mx-auto"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/footer.jpg)`,
          }}
        ></div>
        <p className="text-white text-center">
          ©Pokémon. ©Nintendo/Creatures Inc./GAME FREAK inc.
          ポケットモンスター・ポケモン・Pokémonは任天堂・クリーチャーズ・ゲームフリークの登録商標です。
        </p>
      </div>
    );
  }
};

export default Footer;
