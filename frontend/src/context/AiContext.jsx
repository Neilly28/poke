import { createContext, useState } from "react";
import { getRandomPrompt } from "../components/getRandomPrompt";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const AiContext = createContext();

export const AiContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
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

  const resetForm = () => {
    setForm({
      name: "",
      prompt: "",
      photo: "",
      type: "",
    });
  };

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
            mode: "cors",
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
          resetForm();
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

  return (
    <AiContext.Provider
      value={{
        handleSubmit,
        form,
        handleChange,
        handleSurpriseMe,
        generatingImg,
        loading,
        generateImage,
        imageGenerated,
      }}
    >
      {children}
    </AiContext.Provider>
  );
};
