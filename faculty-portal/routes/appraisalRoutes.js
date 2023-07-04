const express = require("express");
const router = express.Router();
const {
  setAppraisal,
<<<<<<< HEAD
  setDim1,
  setDim2,
  setDim3,
  setDim4,
} = require("../controllers/AppraisalController");

router.post("/", setAppraisal);
router.post("/dim1", setDim1);
router.post("/dim2", setDim2);
=======
  getAppraisal,
} = require("../controllers/AppraisalController");

router.post("/", setAppraisal);
router.post("/get", getAppraisal);
>>>>>>> 88c0962f54d00e147ed679e7d1de41bce5b361e4

module.exports = router;
