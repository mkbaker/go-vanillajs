import { API } from "../services/API.js";
import { CollectionPage } from "./CollectionPage.js";

export default class FavoritesPage extends CollectionPage {
  constructor() {
    super(API.getFavorites, "Favorite Movies");
  }
}

customElements.define("favorites-page", FavoritesPage);
