import React from "react";

const Pokeinfo = (data) => {
  return (
    <>
      {!data || !data.data || !data.data.sprites ? (
        ""
      ) : (
        <div className="poke-card">
          <div className="poke-card-image">
            <img src={data.data.sprites.front_default} alt={data.data.name} />
          </div>
          <div className="poke-card-details">
            <div className="poke-card-name">{data.data.name}</div>
            <div className="poke-card-abilities">
              <div className="poke-card-abilities-label">Abilities:</div>
              <div className="poke-card-abilities-list">
                {data.data.abilities.map((poke) => (
                  <div key={poke.ability.name} className="poke-card-ability">
                    {poke.ability.name}
                  </div>
                ))}
              </div>
            </div>
            <div className="poke-card-stats">
              <div className="poke-card-stats-label">Base Stats:</div>
              <div className="poke-card-stats-list">
                {data.data.stats.map((poke) => (
                  <div key={poke.stat.name} className="poke-card-stat">
                    {poke.stat.name}: {poke.base_stat}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Pokeinfo;
