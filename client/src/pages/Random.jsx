import React from "react";
import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_API_KEY,
});

const openai = new OpenAIApi(configuration);

const Random = () => {
  // const [userPrompt, setUserPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState("");

  const generateImage = async () => {
    try {
      setIsLoading(true);
      const response = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: "512x512",
      });
      console.log(response.data.data[0].url);
      setImageUrl(response.data.data[0].url);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <>
      <div>
        <h1>Hello from openAI</h1>
        <input
          type="text"
          placeholder="Describe your Pokemon..."
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
        />
        <button onClick={generateImage}>Generate</button>
      </div>
      <div>
        {isLoading ? (
          <>
            <h1>generating pokemon...</h1>
          </>
        ) : (
          <img src={imageUrl} alt="" />
        )}
      </div>
    </>
  );
};

export default Random;
