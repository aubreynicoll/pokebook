import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import {
  Container, AppBar, Toolbar, IconButton, Button, ThemeProvider, createMuiTheme, CssBaseline,
} from "@material-ui/core";
import "./App.css";

import PokedexView from "./components/PokedexListView";
import Footer from "./components/Footer";
import AboutView from "./components/AboutView";
import PokemonDetailView from "./components/PokedexDetailView";

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#CC0000",
    },
    secondary: {
      main: "#3B4CCA",
    },
    background: {
      default: "#f5f5dc",
    },
  },
  typography: {
    htmlFontSize: 10,
    body1: {
      fontSize: "1.6rem",
    },
    body2: {
      fontSize: "1.4rem",
    },
  },
});

const App: React.FC = () => (
  <ThemeProvider theme={muiTheme}>
    <CssBaseline />
    <Container color="background">

      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" />
          <Button color="inherit" component={Link} to="/">
            Pokédex
          </Button>
          <Button color="inherit" component={Link} to="/about">
            About
          </Button>
        </Toolbar>
      </AppBar>

      <Switch>
        <Route path="/about">
          <AboutView />
        </Route>
        <Route path="/pokemon/:id">
          <PokemonDetailView />
        </Route>
        <Route path="/">
          <PokedexView />
        </Route>
      </Switch>

      <Footer />

    </Container>
  </ThemeProvider>
);

export default App;
