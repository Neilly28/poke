import React from "react";
import { useParams } from "react-router-dom";

const PokeDetails = () => {
  const { id } = useParams();
  return (
    <div>
      <h2> Poke Details! - {id}</h2>
    </div>
  );
};

export default PokeDetails;
