import React, { useState } from "react";
import axios from "axios";
import { useGetUserId } from "../hooks/useGetUserId";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
export default function CreateRecipe() {
  const userId = useGetUserId();
  const [cookies, _] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instruction: "",
    imageUrl: "",
    cookingTime: 10,
    userOwner: userId,
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const addIng = () => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  };
  const handleIng = (e, i) => {
    const { value } = e.target;
    const ingredients = [...recipe.ingredients];
    ingredients[i] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      "http://localhost:4000/recipes",
      { ...recipe },
      { headers: { authorization: cookies.access_token } }
    );

    navigate("/");
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <header>Create Recipe</header>
      <form onSubmit={onSubmit} className="createRec">
        <label htmlFor="name">Recipe Name</label>
        <input
          id="name"
          type="text"
          name="name"
          onChange={onChange}
          placeholder="Name.."
        />
        <label>Ingredients</label>
        <button type="button" onClick={addIng} className="ingButton">
          Add ingredients
        </button>
        {recipe.ingredients.map((ing, i) => (
          <input
            placeholder="Ingredients.."
            key={i}
            type="text"
            name="ingredients"
            value={ing}
            onChange={(e) => handleIng(e, i)}
          />
        ))}
        <label htmlFor="instruction">Instruction</label>
        <input
          className="instructionInput"
          id="instruction"
          type="text"
          name="instruction"
          onChange={onChange}
        />
        <label htmlFor="imageUrl" placeholder="photo address..">
          imageUrl
        </label>
        <input id="imageUrl" type="text" name="imageUrl" onChange={onChange} />
        <label htmlFor="cookingtime">Cooking time</label>
        <input
          id="cookingtime"
          type="number"
          name="cookingTime"
          onChange={onChange}
        />
        <button type="submit" className="createButton">
          Submit
        </button>
      </form>
    </div>
  );
}
