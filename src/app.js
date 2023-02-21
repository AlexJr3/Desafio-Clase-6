import express from "express";
import ProductManager from "./productManager.js";

const app = express();
const manager = new ProductManager("./Products.json");

app.get("/products", async (req, res) => {
  const products = await manager.getProduct();
  const { limit } = req.query;
  if (!limit) {
    res.send(products);
    return;
  }
  const productLimit = await products.slice(0, limit);
  res.send(productLimit);
});

app.get("/products/:pid", async (req, res) => {
  try {
    const pid = Number(req.params.pid);
    const productId = await manager.getProductById(pid);

    res.send(productId);
  } catch (error) {
    res.status(404).send(`${error}`);
  }
});

app.listen(8080, () => {
  console.log("Server listening in port 8080");
});
