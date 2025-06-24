import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Button,
  useDisclosure,
  Image,
  Input,
  Flex,
  IconButton,
  useToast,
  Select,
  Text,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import api from "../utils/api";
import AddProductDrawer from "../components/AddProductDrawer";
import EditProductDrawer from "../components/EditProductDrawer";  // ← import

const PAGE_SIZE = 5;

const Products = () => {
  const toast = useToast();

  // separate disclosures for add & edit
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const [editingProduct, setEditingProduct] = useState(null);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  /* fetch products */
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get(
        `/products?page=${page}&limit=${PAGE_SIZE}&search=${search}&sort=${sort}`
      );
      const fetchedProducts = Array.isArray(res.data)
        ? res.data
        : res.data.products || [];
      setProducts(fetchedProducts);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      toast({
        title: "Error loading products",
        description: err.response?.data?.message || "Server error",
        status: "error",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, [page, sort]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await api.delete(`/products/${id}`);
      toast({ title: "Deleted", status: "success", duration: 2000 });
      fetchProducts();
    } catch (err) {
      toast({
        title: "Delete failed",
        description: err.response?.data?.message || "Server error",
        status: "error",
        duration: 3000,
      });
    }
  };

  /* open edit drawer */
  const handleEdit = (product) => {
    setEditingProduct(product);
    onEditOpen();
  };

  const handleSearch = () => {
    setPage(1);
    fetchProducts();
  };

  return (
    <Box p={8}>
      <Heading mb={4}>Products</Heading>

      {/* search + sort + add */}
      <Flex mb={4} gap={2} flexWrap="wrap">
        <Input
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>

        <Select
          width="200px"
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setPage(1);
          }}
        >
          <option value="">Sort By</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="titleAsc">Title: A-Z</option>
          <option value="titleDesc">Title: Z-A</option>
        </Select>

        <Button ml="auto" colorScheme="teal" onClick={onAddOpen}>
          + Add Product
        </Button>
      </Flex>

      {/* table */}
      {loading ? (
        <Spinner />
      ) : products.length === 0 ? (
        <Text>No products found.</Text>
      ) : (
        <>
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>Image</Th>
                <Th>Title</Th>
                <Th isNumeric>Price</Th>
                <Th isNumeric>Stock</Th>
                <Th>Category</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.map((p) => (
                <Tr key={p._id}>
                  <Td>
                    <Image
                      src={p.image}
                      alt={p.title}
                      boxSize="60px"
                      objectFit="cover"
                      borderRadius="md"
                    />
                  </Td>
                  <Td>{p.title}</Td>
                  <Td isNumeric>₹ {p.price}</Td>
                  <Td isNumeric>{p.totalStock}</Td>
                  <Td>{p.category}</Td>
                  <Td>
                    <Flex gap={2}>
                      <IconButton
                        size="sm"
                        colorScheme="blue"
                        icon={<EditIcon />}
                        aria-label="Edit"
                        onClick={() => handleEdit(p)}
                      />
                      <IconButton
                        size="sm"
                        colorScheme="red"
                        icon={<DeleteIcon />}
                        aria-label="Delete"
                        onClick={() => handleDelete(p._id)}
                      />
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          {/* pagination */}
          <Flex mt={4} alignItems="center" gap={3}>
            <Button onClick={() => setPage((p) => p - 1)} isDisabled={page === 1}>
              Prev
            </Button>
            <Box>
              Page {page} of {totalPages}
            </Box>
            <Button
              onClick={() => setPage((p) => p + 1)}
              isDisabled={page === totalPages}
            >
              Next
            </Button>
          </Flex>
        </>
      )}

      {/* Drawers */}
      <AddProductDrawer
        isOpen={isAddOpen}
        onClose={onAddClose}
        refresh={fetchProducts}
      />

      <EditProductDrawer
        isOpen={isEditOpen}
        onClose={() => {
          setEditingProduct(null);
          onEditClose();
        }}
        product={editingProduct}
        refresh={fetchProducts}
      />
    </Box>
  );
};

export default Products;
