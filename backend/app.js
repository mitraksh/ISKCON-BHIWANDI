const express = require('express');
require('dotenv').config();
const { sequelize } = require('./models');
const cors = require('cors')
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const registrationRoutes = require('./routes/registrationRoutes');
const eventRegistrationRoutes = require("./routes/eventRegistrationRoutes");
const userRoutes = require("./routes/userRoutes");
const locationRoutes = require("./routes/locationRoutes");

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/events', eventRoutes);
app.use('/registration', registrationRoutes);
app.use("/eventReg", eventRegistrationRoutes);
app.use("/user", userRoutes);
app.use("/locations", locationRoutes);



const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
});
