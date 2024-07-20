var express = require("express");
const rolesAllowed = require("../middleware/roleBasedAuth");
const verifyAuth = require("../middleware/verifyAuth");
const { postQuiz, getQuizPaginate, getQuizById,  updateQuizById } = require("../controllers/adminController");

var router = express.Router();


router.use(verifyAuth);

router.use(rolesAllowed(["admin"]));

router.post("/quiz", postQuiz);

router.get("/quiz/:page/:limit", getQuizPaginate);

router.get("/quiz-by-id/:id", getQuizById);

router.put("/quiz/:id", updateQuizById);

// router.delete("/quiz");

module.exports = router;
