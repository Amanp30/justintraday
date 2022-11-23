const express = require("express");
const router = express.Router();
const {
  add,
  show,
  tradeupdate,
  particular,
  tradeprofit,
  profitchart,
  feechart,
  profitdatasets,
  distinctdata,
  tradedelete,
  tradeparticular,
  byyearly,
  bymonth,
  byaction,
  bytimeframe,
  bystocks,
  allcharts,
} = require("../controllers/trade");

router.post("/trades/add", add);
router.get("/trades/show", show);
router.get("/trades/profit", tradeprofit);
router.get("/trades/chartprofit", profitchart);
router.get("/trades/profitdatasets", profitdatasets);
router.get("/trades/thedistinct", distinctdata);
router.get("/trades/feeschart", feechart);
router.get("/trades/particular/:id", tradeparticular);
router.post("/trades/:id", particular);
router.post("/trades/delete/:id", tradedelete);

router.get("/trades/allcharts", allcharts);
router.get("/trades/yearly", byyearly);
router.get("/trades/monthly", bymonth);
router.get("/trades/stocks", bystocks);
router.get("/trades/actions", byaction);
router.get("/trades/timeframe", bytimeframe);

module.exports = router;
