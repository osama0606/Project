// src/pages/Login.jsx
import React, { useState, useContext } from "react";
import {
  Box, Button, FormControl, FormLabel,
  Input, Heading, useToast, VStack
} from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const toast = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await login(form);
      toast({ title: "Login successful", status: "success", duration: 3000 });
      navigate("/dashboard");
    } catch (err) {
      toast({
        title: "Login failed",
        description: err.response?.data?.message || "Invalid credentials",
        status: "error",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={20} p={6} boxShadow="md" borderRadius="md">
      <Heading mb={6} textAlign="center">Admin Login</Heading>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="admin@example.com"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
          />
        </FormControl>
        <Button
          colorScheme="teal"
          width="100%"
          onClick={handleSubmit}
          isLoading={loading}
        >
          Login
        </Button>
      </VStack>
    </Box>
  );
};

export default Login;
