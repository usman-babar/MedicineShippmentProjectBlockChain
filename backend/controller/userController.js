import User from "../schema/userSchema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const signIn = async (req, res) => {
    const { username, password } = req.body;
    console.log('Request Body:', req.body); // Log the entire request body
    console.log('Username:', username);
    console.log('Password:', password);

    try {
      const user = await User.findOne({ username });
      console.log('User :', user);

      if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log(password);
        console.log(user.password);
        if (isPasswordValid) {
          // User successfully authenticated
          res.status(200).json({ message: 'Authentication successful' });
        } else {
          // Incorrect password
          res.status(401).json({ message: 'Incorrect password' });
        }
      } else {
        // User not found
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


// export const addUser = async (req, res) => {
//   const userData = req.body;
//   const newUser = new User(userData);

//   try {
//     await newUser.save();
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(409).json({ message: error.message });
//   }
// };

export const addUser = async (req, res) => {
    const userData = req.body;
  
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
  
    // Replace the plain text password with the hashed one
    userData.password = hashedPassword;
  
    const newUser = new User(userData);
  
    try {
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const matchedUser = await User.findById(req.params.id);
    res.status(200).json(matchedUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


// export const editUser = async (req, res) => {
//   const userData = req.body;

//   try {
//     await User.findByIdAndUpdate({ _id: req.params.id }, userData);
//     res.status(201).json(userData);

//   } catch (error) {
//     res.status(409).json({ message: error.message });
//   }
// };

export const editUser = async (req, res) => {
    const updatedUserData = req.body;
  
    try {
      // Fetch the existing user
      const existingUser = await User.findById(req.params.id);
  
      if (!existingUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Compare and exclude fields from updates
      const fieldsToExclude = ['username', 'fullName', 'createdDate', 'role'];
      fieldsToExclude.forEach((field) => {
        if (existingUser[field] !== updatedUserData[field]) {
          // Field is being updated, store the previous value
          updatedUserData[field] = existingUser[field];
        }
      });
  
      // Update the user
      await User.findByIdAndUpdate({ _id: req.params.id }, updatedUserData);
      
      res.status(201).json(updatedUserData);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };
  


export const deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.status(201).json({ message: `User Deleted Successfully` });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const searchUser = async (req, res) => {
  const username = req.body.username;

  try {
    const user = await User.findOne({ username });

    if (user) {
      res.status(200).json([user]);
    } else {
      res.status  (404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
