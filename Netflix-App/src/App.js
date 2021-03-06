import "./App.css";
// import MyCarousel from "./components/carousel/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchQuery from "./components/Search/SearchQuery";
import MyNav from "./components/Navbar/MyNav.jsx";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ShowDetail from "./components/ShowDetail";
import TVShows from "./components/TVShows";
import Registration from "./components/Registration";

// import MyFooter from "./components/Footer/MyFooter";

const App = () => {
  return (
    <div className="App">
      <Router>
        <MyNav />
        {/* <SearchQuery genre="action" /> */}
        <Route
          render={(routerProps) => (
            <SearchQuery genre="action" title="MOVIES" {...routerProps} />
          )}
          path="/"
          exact
        />
        <Route
          render={(routerProps) => (
            <ShowDetail title="DETAILS" {...routerProps} />
          )}
          path="/details/:movieId"
        />
        <Route
          render={(routerProps) => <TVShows type="series" {...routerProps} />}
          path="/TVShows"
        />
        <Route
          render={(routerProps) => (
            <Registration type="series" {...routerProps} />
          )}
          path="/register"
        />

        {/* <MyFooter /> */}
        {/* <ShowDetail /> */}
      </Router>
    </div>
  );
};

export default App;
