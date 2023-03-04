import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url);

        if (res.status !== 200) {
          throw Error("Sorry, could not fetch data for that resource.");
        }

        const arr = res.data.results;
        const itemUrls = arr.map((item) => {
          return item.url;
        });

        const data = await Promise.all(
          itemUrls.map(async (itemUrl) => {
            const itemRes = await axios.get(itemUrl);
            return itemRes.data;
          })
        );

        setCharacters(data);
        setIsPending(false);
        setError(null);
        setLoading(false);
      } catch (err) {
        setIsPending(false);
        setError(err.message);
        console.log(err);
      }
    };

    fetchData();
  }, [url]);

  const filteredCharacters = characters.filter((char) =>
    char.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    characters,
    searchTerm,
    setSearchTerm,
    isPending,
    error,
    filteredCharacters,
    loading,
    setLoading,
  };
};

export default useFetch;
