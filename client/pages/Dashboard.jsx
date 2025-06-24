// src/pages/Dashboard.jsx
import React, { useContext } from "react";
import {
  Box, Heading, Text, Button, useToast
} from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast({ title: "Logged out", status: "info", duration: 3000 });
    navigate("/login");
  };

  return (
    <Box maxW="xl" mx="auto" mt={20} p={6} boxShadow="md" borderRadius="md">
      <Heading>Welcome, {user?.name} 👋</Heading>
      <Text mt={2}>Email: {user?.email}</Text>
      <Text mt={2}>Role: {user?.role}</Text>

      <Button mt={6} colorScheme="red" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default Dashboard;
