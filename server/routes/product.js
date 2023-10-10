const express = require("express");
const productRouter = express.Router();
const { Product } = require("../models/product");

//POST
productRouter.post("/api/add-product", async (req, res) => {
  try {
    const { name, description, images, quantity, price } = req.body; // Gelen veriyi alıyoruz

    // Veriyi kullanarak yeni bir ürün oluşturuyoruz
    const newProduct = new Product({
      name,
      description,
      images,
      quantity,
      price,
    });

    // Ürünü veritabanına kaydediyoruz
    const savedProduct = await newProduct.save();

    // Başarılı bir yanıt gönderiyoruz
    res.status(200).json({
      statusCode: 200,
      message: "Ürün başarıyla eklendi.",
    });
  } catch (e) {
    // Hata durumunda hata mesajını ve 500 Internal Server Error kodunu gönderiyoruz
    res.status(500).json({ statusCode: 500, error: e.message });
  }
});

//GET
productRouter.get("/api/get-products", async (req, res) => {
  try {
    // Tüm ürünleri veritabanından çekiyoruz
    const products = await Product.find({});

    if (products.length === 0) {
      // Ürün bulunamazsa, boş array döndürüyoruz
      return res.status(200).json({
        statusCode: 200,
        products: [],
        message: "Ürün bulunamadı.",
      });
    }

    // Başarılı bir yanıt gönderiyoruz
    res.status(200).json({
      statusCode: 200,
      products: products,
      message: "Tüm ürünler başarıyla getirildi.",
    });
  } catch (e) {
    // Hata durumunda hata mesajını ve 500 Internal Server Error kodunu gönderiyoruz
    res.status(500).json({ statusCode: 500, error: e.message });
  }
});

//PUT (UPDATE)
productRouter.put("/api/update-product/:id", async (req, res) => {
  try {
    const productId = req.params.id; // URL'den ürün ID'sini alıyoruz
    const { name, description, images, quantity, price } = req.body; // Güncellenecek veriyi alıyoruz

    // Ürünü veritabanında güncelliyoruz
    const updatedProduct = await Product.findByIdAndUpdate(productId, {
      name,
      description,
      images,
      quantity,
      price,
    });

    if (!updatedProduct) {
      // Ürün bulunamazsa hata döndürüyoruz
      return res
        .status(404)
        .json({ statusCode: 404, message: "Ürün bulunamadı." });
    }

    // Başarılı bir yanıt gönderiyoruz
    res.status(200).json({
      statusCode: 200,
      message: "Ürün başarıyla güncellendi.",
    });
  } catch (e) {
    // Hata durumunda hata mesajını ve 500 Internal Server Error kodunu gönderiyoruz
    res.status(500).json({ statusCode: 500, error: e.message });
  }
});

//DELETE
productRouter.delete("/api/delete-product/:id", async (req, res) => {
  try {
    const productId = req.params.id; // URL'den ürün ID'sini alıyoruz

    // Ürünü veritabanından silme işlemi
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      // Ürün bulunamazsa hata döndürüyoruz
      return res
        .status(404)
        .json({ statusCode: 404, message: "Ürün bulunamadı." });
    }

    // Başarılı bir yanıt gönderiyoruz
    res.status(200).json({
      statusCode: 200,
      message: "Ürün başarıyla silindi.",
    });
  } catch (e) {
    // Hata durumunda hata mesajını ve 500 Internal Server Error kodunu gönderiyoruz
    res.status(500).json({ statusCode: 500, error: e.message });
  }
});

module.exports = productRouter;
