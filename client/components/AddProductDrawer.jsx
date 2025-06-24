// src/components/AddProductDrawer.jsx
import React, { useState } from "react";
import {
  Drawer, DrawerBody, DrawerHeader, DrawerOverlay,
  DrawerContent, DrawerCloseButton, Button, Input,
  FormControl, FormLabel, VStack, useToast
} from "@chakra-ui/react";
import api from "../utils/api";

const AddProductDrawer = ({ isOpen, onClose, refresh }) => {
  const toast = useToast();
  const [form, setForm] = useState({
    title: "", price: "", totalStock: "",
    category: "", brand: "", description: ""
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const uploadImage = async () => {
    const fd = new FormData();
    fd.append("my_file", imageFile);
    const res = await api.post("/products/upload-image", fd);
    return res.data.url; // backend returns {url: "..."}
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const imageUrl = await uploadImage();

      await api.post("/products", {
        ...form,
        price: Number(form.price),
        totalStock: Number(form.totalStock),
        image: imageUrl,
      });

      toast({ title: "Product added", status: "success", duration: 3000 });
      onClose();
      refresh();
    } catch (err) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Add New Product</DrawerHeader>

        <DrawerBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input name="title" onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Price</FormLabel>
              <Input type="number" name="price" onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Stock</FormLabel>
              <Input type="number" name="totalStock" onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Category</FormLabel>
              <Input name="category" onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Brand</FormLabel>
              <Input name="brand" onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input name="description" onChange={handleChange} />
            </FormControl>

            <FormControl>
              <FormLabel>Image</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </FormControl>

            <Button
              colorScheme="teal"
              width="100%"
              onClick={handleSubmit}
              isLoading={loading}
              isDisabled={!imageFile}
            >
              Save
            </Button>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default AddProductDrawer;
