import { Router } from "express";
import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";

const productRouter = Router();

const collection = db.collection("products");

productRouter.get("/", async (req, res) => {
  const product = await collection.find().toArray();

  return res.json({ data: product });
});

productRouter.get("/:id", async (req, res) => {
  const product = await collection.findOne({
    _id: new ObjectId(req.params.id),
  });

  return res.json({ data: product });
});

productRouter.post("/", async (req, res) => {
  await collection.insertOne(req.body);

  return res.json({ message: "Product has been created successfully" });
});

productRouter.put("/:id", async (req, res) => {
  await collection.updateOne(
    { _id: new ObjectId(req.params.id) },
    {
      $set: req.body,
    }
  );

  return res.json({ message: "Product has been updated successfully" });
});

productRouter.delete("/:id", async (req, res) => {
  await collection.deleteOne({ _id: new ObjectId(req.params.id) });

  return res.json({ message: "Product has been deleted successfully" });
});

export default productRouter;
