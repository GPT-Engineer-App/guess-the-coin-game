import React from "react";
import { useColorMode, Button } from "@chakra-ui/react";

const ThemeSwitcher = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button onClick={toggleColorMode} position="absolute" top="1rem" right="1rem">
      {colorMode === "light" ? "Dark" : "Light"} Mode
    </Button>
  );
};

export default ThemeSwitcher;
