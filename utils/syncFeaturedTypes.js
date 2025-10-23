import Product from "../models/Product.js";
import FeaturedProduct from "../models/featuredProducts.js";

export const syncFeaturedTypes = async () => {

    try {
    // 1️⃣ Get all unique types
    const productTypes = await Product.distinct("type");

    const featuredProducts = [];

    // 2️⃣ For each type, pick the first product and first image
    for (const type of productTypes) {
      const product = await Product.findOne({ type });

      if (product) {
        featuredProducts.push({
          name: product.name,
          price: product.price,
          type: product.type,
          image: product.image.length > 0 ? product.image : "/images/placeholder-bottle.png",
          productId: product._id,
        });
      }
    }

    // 3️⃣ Clear old featured products
    await FeaturedProduct.deleteMany({});

    // 4️⃣ Insert new featured products
    const inserted = await FeaturedProduct.insertMany(featuredProducts);

    return inserted;
  } catch (err) {
    console.error("Error syncing featured products:", err);
    throw err;
  }
};
