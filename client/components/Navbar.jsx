// src/components/Navbar.jsx
import React, { useContext } from "react";
import {
  Box, Flex, Spacer, Button, Link as ChakraLink, Heading
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box bg="teal.500" px={6} py={4} color="white">
      <Flex alignItems="center">
        {/* Logo / Title */}
        <Heading size="md">
          <ChakraLink as={Link} to="/">
            Admin Panel
          </ChakraLink>
        </Heading>

        <Spacer />

        {/* Authenticated links */}
        {token ? (
          <>
            <ChakraLink as={Link} to="/dashboard" mx={2}>
              Dashboard
            </ChakraLink>

            {/* 👉 NEW Products link */}
            <ChakraLink as={Link} to="/products" mx={2}>
              Products
            </ChakraLink>

            <Button size="sm" colorScheme="red" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          /* Guest links */
         <>
          <ChakraLink as={Link} to="/login" mx={2}>
            Login
          </ChakraLink>
          <ChakraLink as={Link} to="/register" mx={2}>
            Register
          </ChakraLink>
         </>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
