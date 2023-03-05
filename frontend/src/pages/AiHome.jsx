import React from "react";
import { useState, useEffect } from "react";
import Card from "../components/Card";
import PokeCard from "../components/PokeCard";
import CardNew from "../components/CardNew";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <CardNew key={post._id} {...post} />);
  }

  return (
    <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
  );
};

const AiHome = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState("");

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/v1/post", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-2xl">the community showcase!</h1>
        <p className="mt-2 text-[#666e75] text-md">
          Brosw thru a collection of imaginative and visually stuninig images!
        </p>
      </div>
      <div className="mt-16">{/* <FormField /> */}</div>
      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            Loading Component goes here
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-xl mb-3">
                Showing results for <span className="">{searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-8">
              {searchText ? (
                <RenderCards data={[]} title="no search resutls found" />
              ) : (
                <RenderCards data={allPosts} title="no posts fgound" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default AiHome;
