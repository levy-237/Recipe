import React, { useEffect, useState } from "react";
import { BsFillHeartFill } from "react-icons/bs";
import { BiHeart } from "react-icons/bi";
import { IconContext } from "react-icons";
import axios from "axios";
import { useGetUserId } from "../hooks/useGetUserId";
import { useCookies } from "react-cookie";
export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);
  const userID = useGetUserId();
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "https://recipe-server-apguzhdor-levy-237.vercel.app/recipes/"
        );
        setRecipes(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    const savedFetch = async () => {
      try {
        const response = await axios.get(
          `https://recipe-server-apguzhdor-levy-237.vercel.app/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
    if (cookies.access_token) savedFetch();
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        "https://recipe-server-apguzhdor-levy-237.vercel.app/recipes/",
        {
          recipeID,
          userID,
        },
        { headers: { authorization: cookies.access_token } }
      );
      setSavedRecipes(response.data.savedRecipes);
    } catch (error) {
      console.log(error);
    }
  };

  const displayRecipe = recipes.map((rec) => {
    const ing = rec.ingredients;
    return (
      <div key={rec._id} className="recipeCard">
        <img src={rec.imageUrl} />
        <h2>{rec.name}</h2>
        <p>{rec.instruction}</p>
        <span>
          <b>Ingredients:</b>
        </span>
        <div className="ingredients">
          {ing.map((inst, i) => (
            <div key={i}>{inst}</div>
          ))}
        </div>
        <div className="recipeCardLow">
          <p>Cooking time: {rec.cookingTime}Min</p>

          {savedRecipes.includes(rec._id) ? (
            <IconContext.Provider value={{ size: "1.2rem" }}>
              <BsFillHeartFill />
            </IconContext.Provider>
          ) : null}
          {savedRecipes.includes(rec._id) ? null : (
            <span className="save" onClick={() => saveRecipe(rec._id)}>
              <IconContext.Provider value={{ size: "1.5rem" }}>
                <BiHeart />
              </IconContext.Provider>
            </span>
          )}
        </div>
      </div>
    );
  });
  return (
    <>
      <header>Recipes</header>
      <div className="recContainer">{displayRecipe}</div>
    </>
  );
}
