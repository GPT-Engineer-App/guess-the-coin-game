import React, { useState } from "react";
import { Container, VStack, HStack, Button, Text, Box, useToast, Image } from "@chakra-ui/react";
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
            <Box key={index} textAlign="center" as={motion.div} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} boxShadow="xl" borderRadius="full" p={4} bgGradient="linear(to-b, gray.300, gray.500)" border="2px solid" borderColor="gray.600" height="150px" width="100px">
              <Button onClick={() => handleGuess(index)} colorScheme="blue" size="lg" boxShadow="md" borderRadius="full">
                <FaCoins />
              </Button>
              <Text mt={2}>Cup {index + 1}</Text>
            </Box>
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
