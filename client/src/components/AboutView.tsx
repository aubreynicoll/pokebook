import React from "react";
import { Box } from "@material-ui/core";

const AboutView: React.FC = () => (
  <Box id="AboutView-flex-wrapper">
    <Box id="AboutView-flex-left">
      <img id="AboutView-img" src="https://cdn.bulbagarden.net/upload/3/30/FireRed_LeafGreen_Professor_Oak.png" alt="Professor Oak" />
    </Box>
    <Box id="AboutView-flex-right">
      <h2>Welcome to PokéBook!</h2>
      <p>
        Thanks for taking the time to check out this project.
      </p>
      <p>
        PokéBook is one of my first React projects, and is built for the purposes
        of demonstrating the skills I learned during Full Stack Open 2020.
      </p>
    </Box>
  </Box>
);

export default AboutView;
