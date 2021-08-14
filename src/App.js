import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import BusinessCards from "./pages/BusinessCards";
import BusinessCardEdit from "./pages/BusinessCardEdit";
import { themes, ThemeContext } from "./components/ThemeContext";
import { useState } from "react";

const App = () => {
  const [theme, setTheme] = useState(themes.light);

  function handleThemeChange() {
    setTheme(theme === themes.light ? themes.dark : themes.light);
  }

  return (
    <>
      <Router>
        <ThemeContext.Provider value={theme}>
          <Header onToggleThemeChange={handleThemeChange} />
          <Switch>
            <Route path="/business-cards/:id/edit">
              <BusinessCardEdit />
            </Route>
            <Route path="/business-cards">
              <BusinessCards />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </ThemeContext.Provider>
      </Router>
    </>
  );
};

export default App;
