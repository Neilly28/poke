import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRandomPrompt } from "./getRandomPrompt";
import { useAuthContext } from "../hooks/useAuthContext";

const AiGenerate = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [generatingImg, setGeneratingImg] = useState(false);
  const [imageGenerated, setImageGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pokemonType, setPokemonType] = useState("");
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
    type: "",
  });

  const handleChange = (e) => {
    setForm((prevForm) => {
      return { ...prevForm, [e.target.name]: e.target.value };
    });

    if (e.target.name === "type") {
      setPokemonType(e.target.value);
    }
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm((prevForm) => {
      return { ...prevForm, prompt: randomPrompt };
    });
  };

  const generateImage = async () => {
    if (form.prompt && form.type) {
      try {
        setGeneratingImg(true);
        const response = await fetch(
          "https://cute-erin-codfish-sari.cyclic.app/api/v1/dalle",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prompt: `Pokemon or Monster Full Body White Background ${form.type} ${form.prompt}`,
              type: form.type,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setForm((prevForm) => {
            return {
              ...prevForm,
              photo: `data:image/jpeg;base64,${data.photo}`,
            };
          });
          setImageGenerated(true);
        } else {
          throw new Error(
            "Oops! OpenAI usage limits have been reached. Please try again later."
          );
        }
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo && form.type) {
      setLoading(true);
      try {
        const response = await fetch(
          "https://cute-erin-codfish-sari.cyclic.app/api/v1/post",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(form),
          }
        );

        if (response.ok) {
          await response.json();
          navigate("/ai");
        } else {
          throw new Error("Unable to submit form");
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
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
    imageGenerated,
  };
};

export default AiGenerate;
