import React, { useState } from "react";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  AlertDialog,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogOverlay,
  Alert,
  AlertIcon,
  Button
} from "@chakra-ui/react";
import { FaEllipsisV, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

const ActionButton = ({ url, cowId }) => {
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const openDeleteDialog = () => {
    setDeleteOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteOpen(false);
  };

  const deleteTask = async () => {
    try {
      await axios.post(`${url}/delete/${cowId}`);
      setSuccessMessage("Task deleted successfully");
      closeDeleteDialog();
    } catch (error) {
      setErrorMessage("Failed to delete task");
      console.error("Axios error:", error);
    }
  };

  return (
    <div>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<FaEllipsisV />}
          boxSize={8}
        />
        <MenuList>
          <MenuItem icon={<FaEdit />}>Update</MenuItem>
          <MenuItem color="red" icon={<FaTrash />} onClick={openDeleteDialog}>
            Delete
          </MenuItem>
        </MenuList>
      </Menu>

      <AlertDialog isOpen={isDeleteOpen} onClose={closeDeleteDialog}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Delete Task</AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this task?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={closeDeleteDialog}>Cancel</Button>
              <Button colorScheme="red" onClick={deleteTask} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {successMessage && (
        <Alert status="success" mt={4}>
          <AlertIcon />
          {successMessage}
        </Alert>
      )}
      {errorMessage && (
        <Alert status="error" mt={4}>
          <AlertIcon />
          {errorMessage}
        </Alert>
      )}
    </div>
  );
};

export default ActionButton;
