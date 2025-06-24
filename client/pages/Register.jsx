// src/pages/Register.jsx
import React, { useState } from "react";
import {
  Box, Button, FormControl, FormLabel, Input, Heading, VStack, useToast
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import api from "../api"; // Use your centralized API instance

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use the api instance, which handles baseURL and token
      const res = await api.post("/auth/register", formData);
      toast({
        title: "Registration Successful",
        description: res.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/login");
    } catch (err) {
      toast({
        title: "Registration Failed",
        description: err.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={12} p={6} borderWidth={1} borderRadius="lg">
      <Heading mb={6} textAlign="center">Admin Register</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input name="name" value={formData.name} onChange={handleChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input name="email" type="email" value={formData.email} onChange={handleChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input name="password" type="password" value={formData.password} onChange={handleChange} />
          </FormControl>
          <Button colorScheme="teal" type="submit" width="full">Register</Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Register;
