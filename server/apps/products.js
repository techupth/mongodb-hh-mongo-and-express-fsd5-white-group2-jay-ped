import { Router } from "express";
import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  const collection = db.collection("products");
  const allProducts = await collection.find().limit(10).toArray();
  return res.json({ data: allProducts });
});

productRouter.get("/:id", async (req, res) => {
  const collection = db.collection("products");
  const productId = new ObjectId(req.params.id);

  const productById = await collection.findOne({ _id: productId });

  return res.json({ data: productById });
});

productRouter.post("/", async (req, res) => {
  const collection = db.collection("products");
  const newProductData = await collection.insertOne(req.body);
  return res.json({
    message: "Product has been created successfully",
  });
});

productRouter.put("/:id", async (req, res) => {
  const collection = db.collection("products");

  const editedProductData = { ...req.body };
  const productId = new ObjectId(req.params.id);

  await collection.updateOne(
    {
      _id: productId,
    },
    {
      $set: editedProductData,
    }
  );
  return res.json({
    message: "Product has been updated successfully",
  });
});

productRouter.delete("/:id", async (req, res) => {
  const collection = db.collection("products");
  await collection.deleteOne({ _id: new ObjectId(req.params.id) });

  return res.json({
    message: "Product has been deleted successfully",
  });
});

export default productRouter;
