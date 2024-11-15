const userService = require('../services/userService');

const { generateToken } = require('../utils/auth');  

const UserController = {
  async createUser(req, res) {
    try {
      if (!req.body.password) {
        return res.status(400).json({ message: "Password is required" });
      }

      const user = await userService.createUser(req.body);

      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await userService.getUserByEmail(email);
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      const isPasswordValid = await userService.comparePassword(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = generateToken(user);

      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  async getUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getUser(req, res) {
    try {
      const user = await userService.getUserById(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async updateUser(req, res) {
    try {
      const updatedUser = await userService.updateUser(req.params.id, req.body);
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async updateUserStatus(req, res) {
    try {
      const updatedUser = await userService.updateUserStatus(req.params.id, req.body.status);
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async deleteUser(req, res) {
    try {
      await userService.deleteUser(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async putUserInPosition(req, res) {
    try {
      const position = await userService.putUserInPosition(req.params.id, req.body);
      res.status(201).json(position);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

module.exports = UserController;
