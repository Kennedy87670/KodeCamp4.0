const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const orderSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    itemCount: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Order", orderSchema);
