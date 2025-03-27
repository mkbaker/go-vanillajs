import { routes } from "./Routes.js";

export const Router = {
  init: () => {
    window.addEventListener("popstate", () => {
      Router.go(location.pathname, false);
    });

    document.querySelectorAll("a.navlink").forEach((a) => {
      a.addEventListener("click", (event) => {
        event.preventDefault();
        const href = a.getAttribute("href");
        Router.go(href);
      });
    });
    // go to the initial route
    Router.go(location.pathname + location.search);
  },
  go: (route, addToHistory = true) => {
    if (addToHistory) {
      history.pushState(null, "", route);
    }
    let pageElement = null;

    const routePath = route.includes("?") ? route.split("?")[0] : route;

    for (const r of routes) {
      if (typeof r.path === "string" && r.path === routePath) {
        // when route path is a string
        pageElement = new r.component();
        pageElement.loggedIn = r.loggedIn;
        // break;
      } else if (r.path instanceof RegExp) {
        // when route path is a regular expression
        const match = r.path.exec(route);
        if (match) {
          pageElement = new r.component();
          const params = match.slice(1);
          pageElement.loggedIn = r.loggedIn;
          pageElement.params = params;
          // break;
        }
      }
      if (pageElement) {
        // A page was found, we checked if we have access to it.
        if (pageElement.loggedIn && app.Store.loggedIn == false) {
          app.Router.go("/account/login");
          return;
        }
        break;
      }
    }

    if (pageElement == null) {
      pageElement = document.createElement("h1");
      pageElement.textContent = "Page not found";
    }

    // inserting the new page
    const oldPage = document.querySelector("main").firstElementChild;
    if (oldPage) oldPage.computedStyleMap.viewTransitionName = "old";
    pageElement.style.viewTransitionName = "new";

    function updatePage() {
      document.querySelector("main").innerHTML = "";
      document.querySelector("main").appendChild(pageElement);
    }

    if (!document.startViewTransition) {
      updatePage();
    } else {
      document.startViewTransition(() => {
        updatePage();
      });
    }
  },
};
