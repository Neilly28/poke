import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRandomPrompt } from "../utils";

const CreatePokemon = () => {
  const navigate = useNavigate();
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const [pokemonType, setPokemonType] = useState("");

  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
    type: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === "type") {
      setPokemonType(e.target.value);
    }
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    if (form.prompt && form.type) {
      try {
        setGeneratingImg(true);
        const response = await fetch("/api/v1/dalle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt:
              "Pokemon Full Body White Background" + form.type + form.prompt,
            type: form.type,
          }),
        });

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please provide proper prompt");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo && form.type) {
      setLoading(true);
      try {
        const response = await fetch("/api/v1/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
        await response.json();
        navigate("/ai");
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Enter a prompt and generate image");
    }
  };

  return {
    handleSubmit,
    form,
    handleChange,
    handleSurpriseMe,
    generatingImg,
    loading,
    generateImage,
  };
};

export default CreatePokemon;