import {
  createUserService,
  deleteUserService,
  getAllUsersService,
  getUserService,
  updateUserService,
} from "../model/userModel.js";

const handleResponse = (res, status, message, data = null) => {
  try {
    res.status(status).json({
      status,
      message,
      data,
    });
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const newUser = await createUserService(name, email);
    handleResponse(res, 201, "User created succesfully", newUser);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await getAllUsersService();
    handleResponse(res, 200, "Users fetched succesfully", allUsers);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await getUserService(req.params.id);
    if (!user) return handleResponse(res, 404, "User not found");
    handleResponse(res, 200, "User fetched succesfully", user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await deleteUserService(req.params.id);
    if (!deletedUser) handleResponse(res, 404, "User not found");
    handleResponse(res, 200, "User deleted succesfully", deletedUser);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    const updatedUser = await updateUserService(req.params.id, name, email);
    if (!updatedUser) handleResponse(res, 404, "User not found");
    handleResponse(res, 200, "User updated succesfully", updatedUser);
  } catch (error) {
    next(error);
  }
};
