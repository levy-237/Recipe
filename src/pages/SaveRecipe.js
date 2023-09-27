import React, { useEffect, useState } from "react";
import { useGetUserId } from "../hooks/useGetUserId";
import axios from "axios";
import { useCookies } from "react-cookie";
export default function SaveRecipe() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserId();
  const [cookies, _] = useCookies(["access_token"]);
  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/recipes/savedRecipes/${userID}`,
          { headers: { authorization: cookies.access_token } }
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, []);
  const displayRecipe = savedRecipes.map((rec) => {
    const ing = rec.ingredients;
    return !savedRecipes ? (
      <h1>No saved recipes</h1>
    ) : (
      <div key={rec._id} className="recipeCard">
        <img src={rec.imageUrl} />
        <h2>{rec.name}</h2>
        <p>{rec.instruction}</p>
        <span>
          <b>ingredients:</b>
        </span>
        <div className="ingredients">
          {ing.map((inst, i) => (
            <div key={i}>{inst}</div>
          ))}
        </div>
        <div className="recipeCardLow">
          <p>Cooking time: {rec.cookingTime}Min</p>
        </div>
      </div>
    );
  });
  return (
    <>
      <header>Saved Recipes</header>
      <div className="recContainer">{displayRecipe}</div>
    </>
  );
}
