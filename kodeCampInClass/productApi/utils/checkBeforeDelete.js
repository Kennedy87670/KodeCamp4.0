const productModel = require("../model/productModel");

async function checkBeforeDelete(req, res, next) {
  const product = await productModel.findById(req.params.id);

  if (req.userDetails.userId.toString() == product.productOwner.toString()) {
    next();
  } else {
    res.status(401).json({
      status: "User created successfully",
      message:
        "You cannot delete this because you are not the owner of the product",
      data: {
        user,
      },
    });
  }
}
