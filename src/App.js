import React, { useState, useEffect } from "react";
import Recipe from "./Recipe";
import "./App.css";

function App() {
  const APP_ID = "16957f08";
  const APP_KEY = "0055a123a6ca21d6adb64912128308e8";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");
  // because the data of recipes we are fetching is array of objects, so
  // currently we defined Recipes as empty array

  useEffect(() => {
    getRecipes();
    console.log("fetching data from the server!");
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    console.log(data.hits);
    setRecipes(data.hits);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
    console.log("search: ", search);
  };

  const updateQuery = (e) => {
    e.preventDefault();
    setQuery(search);
    console.log("query: ", query);
    setSearch("");
  };

  return (
    <div className="App">
      <form className="search-form" onSubmit={updateQuery}>
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        ></input>
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.recipe.label}
            calories={recipe.recipe.calories}
            title={recipe.recipe.label}
            src={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
