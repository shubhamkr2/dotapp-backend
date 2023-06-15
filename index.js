const express = require("express");
const app = express();
const cors = require("cors");
const { connection } = require("./config/db");
const { userRoute } = require("./routes/userRoute");
const { productRoute } = require("./routes/productRoute");
const { cartRoute } = require("./routes/cartRoute");
const { addressRoute } = require("./routes/addressRoute");
const { orderRoute } = require("./routes/orderRoute");
require("dotenv").config();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/users", userRoute);
app.use("/products", productRoute);
app.use("/carts", cartRoute);
app.use("/address", addressRoute);
app.use("/orders", orderRoute);

app.get("/", (req, res) => {
  res.status(200).json({ Message: "Welcome to dotapp Home" });
});

const startServer = async () => {
  try {
    await connection();
    app.listen(process.env.PORT, () => {
      console.log(`Express server listening on PORT ${process.env.PORT}`);
    });
  } catch (err) {
    console.error("Error starting the server:", err);
  }
};

startServer();
