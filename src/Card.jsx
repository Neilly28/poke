import React from "react";
// import "./Card.css";

const Card = ({ pokemon, loading, infoPokemon }) => {
  return (
    <>
      {loading ? (
        <h1 className="loading-text">Catching Pokemon...</h1>
      ) : (
        <div className="card-container">
          {pokemon.map((poke) => {
            return (
              <div
                className="card"
                key={poke.id}
                onClick={() => {
                  infoPokemon(poke);
                  console.log(poke);
                }}
              >
                <div className="card-header">
                  <h1 className="card-id">{poke.id}</h1>
                  <img
                    className="card-image"
                    src={poke.sprites.front_default}
                    alt={poke.name}
                  />
                </div>
                <div className="card-body">
                  <h2 className="card-name">{poke.name}</h2>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Card;
