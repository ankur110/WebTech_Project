// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const session = require('express-session');
// const bcrypt = require('bcrypt'); // For password hashing
// const app = express();
// const port = process.env.PORT || 5000;

// // Connect to MongoDB (replace with your connection string)
// mongoose.connect('mongodb://localhost:27017/your-database-name', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.error(err));

// // Define User model (schema)
// const UserSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     required: true
//   }
// });

// // Hash password before saving (using a middleware)
// UserSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     return next();
//   }
//   try {
//     const salt = await bcrypt.genSalt(10); // Adjust salt rounds as needed
//     const hash = await bcrypt.hash(this.password, salt);
//     this.password = hash;
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

// const User = mongoose.model('User', UserSchema);

// // Middleware
// app.use(bodyParser.json()); // Parse incoming JSON data
// app.use(cors({ credentials: true, origin: 'http://localhost:3000' })); // Configure CORS (replace with your frontend origin)
// app.use(session({
//   secret: 'your-secret-key', // Replace with a strong, unique secret
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false } // Set to true for production (HTTPS)
// }));

// // Routes (replace with your actual authentication routes)
// app.post('/api/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (isMatch) {
//       req.session.user = user; // Store user data in session (adjust based on your needs)
//       res.json({ message: 'Login successful' });
//     } else {
//       res.status(401).json({ message: 'Invalid email or password' });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // ... Add additional routes (e.g., logout, protected routes)

// // Server start
// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });
