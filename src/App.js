import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link,
} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import CreateRecipe from "./pages/CreateRecipe";
import SaveRecipe from "./pages/SaveRecipe";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/Auth" element={<Auth />} />
        <Route path="/createRec" element={<CreateRecipe />} />
        <Route path="/SavedRec" element={<SaveRecipe />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
