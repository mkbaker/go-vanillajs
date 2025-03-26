import { API } from "../services/API.js";
import { MovieItemComponent } from "./MovieItem.js";

export class HomePage extends HTMLElement {
  async render() {
    const topMovies = await API.getTopMovies();
    renderMoviesInList(topMovies, document.querySelector("#top-10 ul"));

    const randomMovies = await API.getRandomMovies();
    renderMoviesInList(randomMovies, document.querySelector("#random ul"));

    function renderMoviesInList(movies, ul) {
      ul.innerHTML = "";
      movies?.forEach((movie) => {
        const li = document.createElement("li");
        li.textContent = movie.Title;
        ul.appendChild(li);
        li.appendChild(new MovieItemComponent(movie));
      });
    }
  }

  // this is a method overriding the super class
  connectedCallback() {
    const template = document.getElementById("template-home");
    const content = template.content.cloneNode(true);
    this.appendChild(content);

    this.render();
  }
}

// custom elements MUST have a hyphen in them, so if it's a single word it would have to be like "reelingit-home"
customElements.define("home-page", HomePage);
