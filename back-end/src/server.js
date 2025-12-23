require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
// const authMiddleware = require('./middlewares/authMiddleware');

const errorHandler = require('./middlewares/errorHandler');

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: "Backend Express aktif!" });
});

app.use('/users', userRoutes);
app.use('/authentications', authRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));