export const API = {
  baseURL: "/api/",
  getTopMovies: async () => {
    return API.fetch("movies/top");
  },
  getRandomMovies: async () => {
    return API.fetch("movies/random");
  },
  getMovieById: async (id) => {
    return API.fetch(`movies/${id}`);
  },
  getGenres: async () => {
    return API.fetch("genres");
  },
  searchMovies: async (q, order, genre) => {
    return API.fetch(`movies/search`, { q, order, genre });
  },
  register: async (name, email, password) => {
    return await API.send("account/register/", { name, email, password });
  },
  login: async (email, password) => {
    return await API.send("account/authenticate/", { email, password });
  },
  getFavorites: async () => {
    return await API.fetch("account/favorites");
  },
  getWatchlist: async () => {
    return await API.fetch("account/watchlist");
  },
  saveToCollection: async (movie_id, collection) => {
    return await API.send("/account/save-to-collection/", {
      movie_id,
      collection,
    });
  },
  send: async (serviceName, data) => {
    try {
      const response = await fetch(API.baseURL + serviceName, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: app.Store.jwt ? `Bearer ${app.Store.jwt}` : null,
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      return result;
    } catch (e) {
      console.log(e);
    }
  },
  fetch: async (service, args) => {
    try {
      const queryString = args ? new URLSearchParams(args).toString() : "";
      const response = await fetch(API.baseURL + service + "?" + queryString, {
        headers: {
          Authorization: app.Store.jwt ? `Bearer ${app.Store.jwt}` : null,
        },
      });
      const result = await response.json();
      return result;
    } catch (e) {
      console.log(e);
    }
  },
};
