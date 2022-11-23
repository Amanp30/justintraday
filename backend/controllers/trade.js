const { round } = require("lodash");
const Trade = require("../models/trades");

exports.add = (req, res) => {
  let {
    stock,
    action,
    timeframe,
    entrydate,
    quantity,
    entryprice,
    exitdate,
    exitprice,
    profitloss,
    fees,
  } = req.body;
  // const { stock , action, timeframe, entrydate, exitdate} = req.body;

  let newTrade = new Trade({
    stock,
    action,
    timeframe,
    entrydate,
    quantity,
    entryprice,
    exitdate,
    exitprice,
    profitloss,
    fees,
  });
  newTrade.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};

exports.show = (req, res) => {
  Trade.find({})
    .sort({ entrydate: -1 })
    /* .select({ "stock" : "$stock" })
        .select({ "entrydate" : "$entrydate" })
        .select({ "exitdate" : "$exitdate" }) */
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(data);
    });
};

exports.tradedelete = (req, res) => {
  Trade.findByIdAndDelete({ _id: req.params.id }).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};

exports.particular = (req, res) => {
  const id = req.params.id;
  const {
    stock,
    action,
    timeframe,
    entrydate,
    quantity,
    entryprice,
    exitdate,
    exitprice,
    profitloss,
    fees,
  } = req.body;

  Trade.findByIdAndUpdate(id, {
    stock,
    action,
    timeframe,
    entrydate,
    quantity,
    entryprice,
    exitdate,
    exitprice,
    profitloss,
    fees,
  }).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};

exports.tradeparticular = (req, res) => {
  const { stockname, quantity } = req.body;
  Trade.findById(req.params.id).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};

exports.tradeprofit = (req, res) => {
  //  const { stockname, quantity } = req.body;
  Trade.aggregate([
    {
      $group: {
        _id: null,
        totalji: { $avg: "$quantity" },
        profit: { $sum: "$profitloss" },
      },
    },
  ]).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};

exports.profitchart = (req, res) => {
  Trade.find({})
    .sort({ entrydate: -1 })
    .select("entrydate")
    .select("profitloss")
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(data);
    });
};

exports.feechart = (req, res) => {
  Trade.find({})
    .sort({ entrydate: -1 })
    .select("entrydate")
    .select("fees")
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(data);
    });
};

exports.sprofitdatasets = (req, res) => {
  Trade.aggregate([
    {
      $group: {
        _id: "profit chart",
        feeses: { $push: "$fees" },
        profits: { $push: "$profitloss" },
        dates: { $push: "$entrydate" },
        stocks: { $push: "$stock" },
        count: { $sum: "$profitloss" },
        date: {
          $dateToString: { format: "%d-%m-%Y", date: "$entrydate" },
        },
      },
    },
  ]).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};

exports.profitdatasets = (req, res) => {
  Trade.aggregate([
    /*  {
      $match: {
        entrydate: "$entrydate",
      },
    }, */
    {
      $group: {
        _id: "Chart",
        feeses: { $push: "$fees" },
        profits: { $push: "$profitloss" },
        dates: { $push: "$entrydate" },
        stocks: { $push: "$stock" },
        totalprofit: { $sum: "$profitloss" },
        totalfees: { $sum: "$fees" },
        avgreturn: { $avg: { $toInt: "$profitloss" } },

        // belowzero: { $lt: "$profitloss" },
        // thetimeframes: { $push: "$timeframe" },
      },
    },
    /*  {
      $project: {
        feeses: 1,
        _id: 1,
        profits: 1,
        stocks: 1,
        dates: 1,
      },
    }, */
  ]).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};

exports.distinctdata = (req, res) => {
  Trade.aggregate([
    {
      $group: {
        _id: null,
        profitagd: { $push: "$fees" },
      },
    },
  ]).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};

exports.bymonth = (req, res) => {
  const { startdate, enddate } = req.body;
  Trade.aggregate([
    /* {
      $match: {
        entrydate: {
          $gte: new Date("2022-09-07"),
          $lte: new Date("2022-11-18"),
            $gte: new Date(`${startdate}`),
          $lt: new Date(`${enddate}`), 
        },
      },
    }, */
    {
      $group: {
        /* _id: "$action", */ //working
        /* _id: { $year: "$entrydate" }, */ // month working
        /* _id: ["$month", "$year"], */ // month working
        _id: {
          $dateToString: {
            date: "$entrydate",
            format: "%m-%Y",
          },
        }, // month working
        profitloss: { $sum: "$profitloss" },
        fee: { $sum: { $round: ["$fees", 2] } },
        chartpnl: { $push: "$profitloss" },
        chartfee: { $push: "$fees" },
        chartstocks: { $push: "$stock" },
        tradecount: { $count: {} },
        details: {
          $push: {
            id: "$_id",
            stock: "$stock",
            quantity: "$quantity",
            profitloss: "$profitloss",
            fees: "$fees",
            entryprice: "$entryprice",
            exitprice: "$exitprice",
            returnpershare: {
              $cond: {
                if: { $eq: ["$action", "Buy"] },
                then: {
                  $round: [{ $subtract: ["$exitprice", "$entryprice"] }, 2],
                },
                else: {
                  $round: [{ $subtract: ["$entryprice", "$exitprice"] }, 2],
                },
              },
            },
            return: {
              $cond: {
                if: { $eq: ["$action", "Buy"] },
                then: {
                  $multiply: [
                    {
                      $round: [{ $subtract: ["$exitprice", "$entryprice"] }, 2],
                    },
                    "$quantity",
                  ],
                },
                else: {
                  $multiply: [
                    {
                      $round: [{ $subtract: ["$entryprice", "$exitprice"] }, 2],
                    },
                    "$quantity",
                  ],
                },
              },
            },
            action: "$action",
            timeframe: "$timeframe",
            entrydate: {
              $dateToString: { format: "%d-%m-%Y", date: "$entrydate" },
            },
          },
        },
      },
    },
    {
      $project: {
        tradecount: 1,
        chartstocks: 1,
        chartpnl: 1,
        chartfee: 1,
        fee: 1,
        totalScore: 1,
        fees: { $round: ["$fee", 2] },
        profitloss: 1,
        pnl: { $round: ["$profitloss", 2] },
        details: 1,
        dates: 1,
      },
    },
    /* { $sort: { _id: 1 } }, */
  ]).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};

exports.byaction = (req, res) => {
  Trade.aggregate([
    {
      $group: {
        _id: "$action", //working
        returns: {
          $push: {
            $cond: {
              if: { $eq: ["$action", "Buy"] },
              then: {
                $multiply: [
                  {
                    $round: [{ $subtract: ["$exitprice", "$entryprice"] }, 2],
                  },
                  "$quantity",
                ],
              },
              else: {
                $multiply: [
                  {
                    $round: [{ $subtract: ["$entryprice", "$exitprice"] }, 2],
                  },
                  "$quantity",
                ],
              },
            },
          },
        },
        profitloss: { $sum: "$profitloss" },
        chartpnl: { $push: "$profitloss" },
        chartfee: { $push: "$fees" },
        chartstocks: { $push: "$stock" },
        fee: { $sum: { $round: ["$fees", 2] } },
        tradecount: { $count: {} },
        details: {
          $push: {
            id: "$_id",
            stock: "$stock",
            quantity: "$quantity",
            profitloss: "$profitloss",
            fees: "$fees",
            entryprice: "$entryprice",
            exitprice: "$exitprice",
            returnpershare: {
              $cond: {
                if: { $eq: ["$action", "Buy"] },
                then: {
                  $round: [{ $subtract: ["$exitprice", "$entryprice"] }, 2],
                },
                else: {
                  $round: [{ $subtract: ["$entryprice", "$exitprice"] }, 2],
                },
              },
            },
            return: {
              $cond: {
                if: { $eq: ["$action", "Buy"] },
                then: {
                  $multiply: [
                    {
                      $round: [{ $subtract: ["$exitprice", "$entryprice"] }, 2],
                    },
                    "$quantity",
                  ],
                },
                else: {
                  $multiply: [
                    {
                      $round: [{ $subtract: ["$entryprice", "$exitprice"] }, 2],
                    },
                    "$quantity",
                  ],
                },
              },
            },
            action: "$action",
            timeframe: "$timeframe",
            entrydate: {
              $dateToString: { format: "%d-%m-%Y", date: "$entrydate" },
            },
          },
        },
      },
    },
    {
      $project: {
        tradecount: 1,
        chartstocks: 1,
        chartpnl: 1,
        chartfee: 1,
        returns: 1,
        fee: 1,
        fees: { $round: ["$fee", 2] },
        profitloss: 1,
        pnl: { $round: ["$profitloss", 2] },
        details: 1,
        dates: 1,
      },
    },
    { $sort: { _id: 1 } },
  ]).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};

exports.bystocks = (req, res) => {
  Trade.aggregate([
    {
      $group: {
        _id: "$stock", //working

        profitloss: { $sum: "$profitloss" },
        fee: { $sum: { $round: ["$fees", 2] } },
        chartpnl: { $push: "$profitloss" },
        chartfee: { $push: "$fees" },
        chartstocks: { $push: "$stock" },
        tradecount: { $count: {} },
        details: {
          $push: {
            id: "$_id",
            stock: "$stock",
            quantity: "$quantity",
            profitloss: "$profitloss",
            fees: "$fees",

            entryprice: "$entryprice",
            exitprice: "$exitprice",
            returnpershare: {
              $cond: {
                if: { $eq: ["$action", "Buy"] },
                then: {
                  $round: [{ $subtract: ["$exitprice", "$entryprice"] }, 2],
                },
                else: {
                  $round: [{ $subtract: ["$entryprice", "$exitprice"] }, 2],
                },
              },
            },
            return: {
              $cond: {
                if: { $eq: ["$action", "Buy"] },
                then: {
                  $multiply: [
                    {
                      $round: [{ $subtract: ["$exitprice", "$entryprice"] }, 2],
                    },
                    "$quantity",
                  ],
                },
                else: {
                  $multiply: [
                    {
                      $round: [{ $subtract: ["$entryprice", "$exitprice"] }, 2],
                    },
                    "$quantity",
                  ],
                },
              },
            },
            action: "$action",
            timeframe: "$timeframe",
            entrydate: {
              $dateToString: { format: "%d-%m-%Y", date: "$entrydate" },
            },
          },
        },
      },
    },
    {
      $project: {
        tradecount: 1,
        chartstocks: 1,
        chartpnl: 1,
        chartfee: 1,
        fee: 1,
        fees: { $round: ["$fee", 2] },
        profitloss: 1,
        pnl: { $round: ["$profitloss", 2] },
        details: 1,
        dates: 1,
      },
    },
    { $sort: { _id: 1 } },
  ]).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};

exports.bytimeframe = (req, res) => {
  Trade.aggregate([
    {
      $group: {
        _id: "$timeframe", //working

        profitloss: { $sum: "$profitloss" },
        fee: { $sum: { $round: ["$fees", 2] } },
        chartpnl: { $push: "$profitloss" },
        chartfee: { $push: "$fees" },
        chartstocks: { $push: "$stock" },
        tradecount: { $count: {} },
        details: {
          $push: {
            id: "$_id",
            stock: "$stock",
            quantity: "$quantity",
            profitloss: "$profitloss",
            fees: "$fees",
            entryprice: "$entryprice",
            exitprice: "$exitprice",
            returnpershare: {
              $cond: {
                if: { $eq: ["$action", "Buy"] },
                then: {
                  $round: [{ $subtract: ["$exitprice", "$entryprice"] }, 2],
                },
                else: {
                  $round: [{ $subtract: ["$entryprice", "$exitprice"] }, 2],
                },
              },
            },
            return: {
              $cond: {
                if: { $eq: ["$action", "Buy"] },
                then: {
                  $multiply: [
                    {
                      $round: [{ $subtract: ["$exitprice", "$entryprice"] }, 2],
                    },
                    "$quantity",
                  ],
                },
                else: {
                  $multiply: [
                    {
                      $round: [{ $subtract: ["$entryprice", "$exitprice"] }, 2],
                    },
                    "$quantity",
                  ],
                },
              },
            },
            action: "$action",
            timeframe: "$timeframe",
            entrydate: {
              $dateToString: { format: "%d-%m-%Y", date: "$entrydate" },
            },
          },
        },
      },
    },
    {
      $project: {
        tradecount: 1,
        chartstocks: 1,
        chartpnl: 1,
        chartfee: 1,
        fee: 1,
        fees: { $round: ["$fee", 2] },
        profitloss: 1,
        pnl: { $round: ["$profitloss", 2] },
        details: 1,
        dates: 1,
      },
    },
    { $sort: { _id: 1 } },
  ]).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};

exports.byyearly = (req, res) => {
  Trade.aggregate([
    {
      $group: {
        _id: {
          $dateToString: {
            date: "$entrydate",
            format: "%Y",
          },
        },
        profitloss: { $sum: "$profitloss" },
        fee: { $sum: { $round: ["$fees", 2] } },
        chartpnl: { $push: "$profitloss" },
        chartfee: { $push: "$fees" },
        chartstocks: { $push: "$stock" },
        tradecount: { $count: {} },
        details: {
          $push: {
            id: "$_id",
            stock: "$stock",
            quantity: "$quantity",
            profitloss: "$profitloss",
            fees: "$fees",
            entryprice: "$entryprice",
            exitprice: "$exitprice",
            returnpershare: {
              $cond: {
                if: { $eq: ["$action", "Buy"] },
                then: {
                  $round: [{ $subtract: ["$exitprice", "$entryprice"] }, 2],
                },
                else: {
                  $round: [{ $subtract: ["$entryprice", "$exitprice"] }, 2],
                },
              },
            },
            return: {
              $cond: {
                if: { $eq: ["$action", "Buy"] },
                then: {
                  $multiply: [
                    {
                      $round: [{ $subtract: ["$exitprice", "$entryprice"] }, 2],
                    },
                    "$quantity",
                  ],
                },
                else: {
                  $multiply: [
                    {
                      $round: [{ $subtract: ["$entryprice", "$exitprice"] }, 2],
                    },
                    "$quantity",
                  ],
                },
              },
            },
            action: "$action",
            timeframe: "$timeframe",
            entrydate: {
              $dateToString: { format: "%d-%m-%Y", date: "$entrydate" },
            },
          },
        },
      },
    },
    {
      $project: {
        tradecount: 1,
        chartstocks: 1,
        chartpnl: 1,
        chartfee: 1,
        fee: 1,
        fees: { $round: ["$fee", 2] },
        profitloss: 1,
        pnl: { $round: ["$profitloss", 2] },
        details: 1,
        dates: 1,
      },
    },
    { $sort: { _id: 1 } },
  ]).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};

exports.allcharts = (req, res) => {
  Trade.aggregate([
    {
      $facet: {
        bystock: [
          {
            $group: {
              _id: "$stock",
              stock: { $push: "$stock" },
              pnl: { $push: "$profitloss" },
              fee: { $push: "$fees" },
              totalfees: { $sum: "$fees" },
              totalpnl: { $sum: "$profitloss" },
              avgpertrade: { $avg: "$profitloss" },
              tradescount: { $count: {} },
            },
          },
          {
            $project: {
              _id: true,
              pnl: 1,
              fee: 1,
              stock: 1,
              totalfees: 1,
              totalpnl: 1,
              avgpertrade: 1,
              tradescount: 1,
            },
          },
        ],
        byaction: [
          {
            $group: {
              _id: "$action",
              stock: { $push: "$stock" },
              pnl: { $push: "$profitloss" },
              fee: { $push: "$fees" },
              totalfees: { $sum: "$fees" },
              totalpnl: { $sum: "$profitloss" },
              avgpertrade: { $avg: "$profitloss" },
              tradescount: { $count: {} },
            },
          },
          {
            $project: {
              _id: true,
              pnl: 1,
              fee: 1,
              stock: 1,
              totalfees: 1,
              totalpnl: 1,
              avgpertrade: 1,
              tradescount: 1,
            },
          },
        ],
        bytimeframe: [
          {
            $group: {
              _id: "$timeframe",
              stock: { $push: "$stock" },
              pnl: { $push: "$profitloss" },
              fee: { $push: "$fees" },
              totalfees: { $sum: "$fees" },
              totalpnl: { $sum: "$profitloss" },
              avgpertrade: { $avg: "$profitloss" },
              tradescount: { $count: {} },
            },
          },
          {
            $project: {
              _id: true,
              pnl: 1,
              fee: 1,
              stock: 1,
              totalfees: 1,
              totalpnl: 1,
              avgpertrade: 1,
              tradescount: 1,
            },
          },
        ],
        byyearly: [
          {
            $group: {
              _id: {
                $dateToString: {
                  date: "$entrydate",
                  format: "%Y",
                },
              },
              stock: { $push: "$stock" },
              pnl: { $push: "$profitloss" },
              fee: { $push: "$fees" },
              totalfees: { $sum: "$fees" },
              totalpnl: { $sum: "$profitloss" },
              avgpertrade: { $avg: "$profitloss" },
              tradescount: { $count: {} },
            },
          },
          {
            $project: {
              _id: true,
              pnl: 1,
              fee: 1,
              stock: 1,
              totalfees: 1,
              totalpnl: 1,
              avgpertrade: 1,
              tradescount: 1,
            },
          },
        ],
        bymonthly: [
          {
            $group: {
              _id: {
                $dateToString: {
                  date: "$entrydate",
                  format: "%m-%Y",
                },
              },
              stock: { $push: "$stock" },
              pnl: { $push: "$profitloss" },
              fee: { $push: "$fees" },
              totalfees: { $sum: "$fees" },
              totalpnl: { $sum: "$profitloss" },
              avgpertrade: { $avg: "$profitloss" },
              tradescount: { $count: {} },
            },
          },
          {
            $project: {
              _id: true,
              pnl: 1,
              fee: 1,
              stock: 1,
              totalfees: 1,
              totalpnl: 1,
              avgpertrade: 1,
              tradescount: 1,
            },
          },
        ],
      },
    },
  ]).exec((err, data) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};
