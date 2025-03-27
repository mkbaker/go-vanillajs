import { HomePage } from "../components/HomePage.js";
import { LoginPage } from "../components/LoginPage.js";
import { MovieDetailsPage } from "../components/MovieDetailsPage.js";
import { MoviesPage } from "../components/MoviesPage.js";
import { RegisterPage } from "../components/RegisterPage.js";
import { AccountPage } from "../components/AccountPage.js";
import FavoritesPage from "../components/FavoritesPage.js";
import WatchlistPage from "../components/WatchlistPage.js";

export const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: /\/movies\/(\d+)/,
    component: MovieDetailsPage,
  },
  {
    path: "/movies", // search results
    component: MoviesPage,
  },
  {
    path: "/account/register",
    component: RegisterPage,
  },
  {
    path: "/account/login",
    component: LoginPage,
  },
  {
    path: "/account/favorites",
    component: FavoritesPage,
    loggedIn: true,
  },
  {
    path: "/account/watchlist",
    component: WatchlistPage,
    loggedIn: true,
  },
  {
    path: "/account/",
    component: AccountPage,
    loggedIn: true,
  },
];
