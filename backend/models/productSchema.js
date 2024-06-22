const mongoose = require("mongoose");
const modelConfig = require("../config/modelConfig");

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: Number,
    images: [String],
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
  },
  modelConfig
);

productSchema.virtual('imageUrls').get(function() {
  return this.images.map(image => `${process.env.BASE_URL}/uploads/${image}`);
});

productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
