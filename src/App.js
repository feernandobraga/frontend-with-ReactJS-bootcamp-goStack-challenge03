import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  // useState to store the repos
  const [repos, setRepos] = useState([]);

  /**
   * GET - This useEffect is responsible for getting all repositories from the API and storing it
   * inside the repos state. To pass the test, the app needs to list the title for all repositories in the backend.
   */
  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepos(response.data);
    });
  }, []);

  async function handleAddRepository() {
    /**
     * To pass the automated tests, this function must create a repository in the backend through the API
     * and then, update the array of repositories locally based on the response it got from the API
     */

    // The code below sends a post request to repositories with a body containing title, url and techs
    const response = await api.post("repositories", {
      title: "Hard coded repo",
      url: "http://hard-coded-url.com",
      techs: ["hard", "coded", "techs"],
    });

    // I have stored the data returned from the api inside a variable called newlyCreatedRepo and then I have updated the
    // value of repo using the spread operator and adding the new repository to it. This way, the interface updates with the value
    // that I just added
    const newlyCreatedRepo = response.data;
    setRepos([...repos, newlyCreatedRepo]);
  }

  async function handleRemoveRepository(id) {
    /**
     * To pass the test, this function must delete an element from the front end and from the API.
     */

    const response = await api.delete(`repositories/${id}`);

    // the function filter will return an array with all elements where the ID of each element is NOT EQUALS to the given id
    // one way of reading it is:
    // scan the array and call each element a repo. For each element where the ID of repo is not equals to the given id, store in a new
    // array called updatedRepos
    const updatedRepos = repos.filter((repo) => repo.id !== id);

    setRepos(updatedRepos);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
