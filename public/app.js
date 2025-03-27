import { API } from "./services/API.js";
import "./components/AnimatedLoading.js";
import "./components/YouTubeEmbed.js";
import { Router } from "./services/Router.js";
import Store from "./services/Store.js";

window.addEventListener("DOMContentLoaded", (event) => {
  app.Router.init();
});

window.app = {
  Router,
  Store,
  API,
  showError: (message = "There was an error.", goToHome = false) => {
    document.getElementById("alert-modal").showModal();
    document.querySelector("#alert-modal p").textContent = message;
    if (goToHome) app.Router.go("/");
  },
  closeError: () => {
    document.getElementById("alert-modal").close();
  },
  search: (event) => {
    event.preventDefault();
    const query = document.querySelector("input[type=search]").value;
    app.Router.go("/movies?q=" + query);
  },
  api: API,
  register: async (event) => {
    event.preventDefault();
    const name = document.getElementById("register-name").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const passwordConfirmation = document.getElementById(
      "register-password-confirmation"
    ).value;

    const errors = [];
    if (name.length < 4) errors.push("Your name must be 5 or more characters");
    if (password.length < 7)
      errors.push("Your password must be at least 7 characters");
    if (email.length < 4) errors.push("Enter your complete email");
    if (password !== passwordConfirmation) errors.push("Passwords don't match");

    if (errors.length === 0) {
      const response = await API.register(name, email, password);
      if (response.success) {
        app.Store.jwt = response.jwt;
        app.Router.go("/account/");
      } else {
        app.showError(response.message);
      }
    } else {
      app.showError(errors.join(". "));
    }
  },
  login: async (event) => {
    event.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const errors = [];
    if (password.length < 7)
      errors.push("Your password must be at least 7 characters");
    if (email.length < 4) errors.push("Enter your complete email");

    if (errors.length === 0) {
      const response = await API.login(email, password);
      if (response.success) {
        app.Store.jwt = response.jwt;
        app.Router.go("/account/");
      } else {
        app.showError(response.message);
      }
    } else {
      app.showError(errors.join(". "));
    }
  },
  logout: () => {
    Store.jwt = null;
    app.Router.go = "/";
  },
  searchOrderChange: (order) => {
    const urlParams = new URLSearchParams(window.location.search);
    const q = urlParams.get("q");
    const genre = urlParams.get("genre") ?? "";
    app.Router.go(`/movies?q=${q}&order=${order}&genre=${genre}`);
  },
  searchFilterChange: (genre) => {
    const urlParams = new URLSearchParams(window.location.search);
    const q = urlParams.get("q");
    const order = urlParams.get("order") ?? "";
    app.Router.go(`/movies?q=${q}&order=${order}&genre=${genre}`);
  },
  saveToCollection: async (movie_id, collection) => {
    if (app.Store.loggedIn) {
      try {
        const response = await API.saveToCollection(movie_id, collection);
        if (response.success) {
          switch (collection) {
            case "favorites":
              app.Router.go("/account/favorites");
              break;
            case "watchlist":
              app.Router.go("/account/watchlist");
          }
        } else {
          app.showError("We couldn't save the movie.");
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      app.Router.go("/account/");
    }
  },
};
