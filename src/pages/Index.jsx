import React, { useState } from "react";
import { Container, VStack, HStack, Button, Text, useToast } from "@chakra-ui/react";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { motion } from "framer-motion";
import { FaCoins } from "react-icons/fa";

const Index = () => {
  const [cups, setCups] = useState([false, false, false]);
  const [message, setMessage] = useState("");
  const toast = useToast();

  const shuffleCups = () => {
    const newCups = [false, false, false];
    const randomIndex = Math.floor(Math.random() * 3);
    newCups[randomIndex] = true;
    setCups(newCups);
    setMessage("");
  };

  const handleGuess = (index) => {
    if (cups[index]) {
      setMessage("Congratulations! You found the coin!");
      toast({
        title: "You won!",
        description: "You found the coin under the cup!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      setMessage("Sorry, try again!");
      toast({
        title: "Try again!",
        description: "The coin is not under this cup.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const drawCup = (canvas) => {
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#8B4513";
      ctx.beginPath();
      ctx.moveTo(50, 140);
      ctx.lineTo(100, 140);
      ctx.lineTo(120, 50);
      ctx.lineTo(30, 50);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" bgGradient="linear(to-r, teal.500, green.500)">
      <ThemeSwitcher />
      <VStack spacing={4}>
        <Text fontSize="3xl" fontWeight="bold" color="white">
          Guess Where the Coin is!
        </Text>
        <Button onClick={shuffleCups} colorScheme="yellow" size="lg" boxShadow="lg">
          Shuffle Cups
        </Button>
        <HStack spacing={8}>
          {cups.map((hasCoin, index) => (
            <motion.div key={index} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => handleGuess(index)}>
              <canvas ref={(el) => drawCup(el)} width="150" height="150" />
              <Text mt={2} textAlign="center" color="white">
                Cup {index + 1}
              </Text>
            </motion.div>
          ))}
        </HStack>
        {message && (
          <Text fontSize="lg" color="white">
            {message}
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
