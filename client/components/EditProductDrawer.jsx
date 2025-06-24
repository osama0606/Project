import React, { useState, useEffect } from "react";
import {
  Drawer, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton,
  DrawerBody, FormControl, FormLabel, Input, Textarea, Button, VStack,
  useToast, Image
} from "@chakra-ui/react";
import api from "../utils/api";

const EditProductDrawer = ({ isOpen, onClose, product, refresh }) => {
  const toast = useToast();
  const [form, setForm] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // populate form when product changes
  useEffect(() => setForm(product || {}), [product]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const uploadImage = async () => {
    if (!imageFile) return form.image;
    const fd = new FormData();
    fd.append("my_file", imageFile);
    const res = await api.post("/products/upload-image", fd);
    return res.data.url;
  };

  const handleSave = async () => {
    if (!product) return;
    try {
      setLoading(true);
      const imageUrl = await uploadImage();
      await api.put(`/products/${product._id}`, { ...form, image: imageUrl });
      toast({ title: "Product updated", status: "success", duration: 2000 });
      refresh();
      onClose();
    } catch (err) {
      toast({
        title: "Update failed",
        description: err.response?.data?.message || "Server error",
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
        <DrawerHeader>Edit Product</DrawerHeader>
        <DrawerBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input name="title" value={form.title || ""} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea name="description" value={form.description || ""} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Category</FormLabel>
              <Input name="category" value={form.category || ""} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Brand</FormLabel>
              <Input name="brand" value={form.brand || ""} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Price</FormLabel>
              <Input type="number" name="price" value={form.price || ""} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Sale Price</FormLabel>
              <Input type="number" name="salePrice" value={form.salePrice || ""} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Stock</FormLabel>
              <Input type="number" name="totalStock" value={form.totalStock || ""} onChange={handleChange} />
            </FormControl>

            {form.image && (
              <Image src={form.image} boxSize="120px" objectFit="cover" borderRadius="md" />
            )}
            <FormControl>
              <FormLabel>Change Image</FormLabel>
              <Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
            </FormControl>

            <Button
              width="100%"
              colorScheme="teal"
              isLoading={loading}
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default EditProductDrawer;
