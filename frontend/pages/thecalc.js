import { useState } from "react";

function thecalc() {
  const [values, setvalues] = useState({
    action: "Sell",
    quantity: "",
    entryprice: "",
    exitprice: "",
  });

  const handleSubmit = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setvalues({ ...values, [name]: value });
  };

  var buyvalue = (values.quantity * values.entryprice).toFixed(2);
  var sellvalue = (values.quantity * values.exitprice).toFixed(2);
  var ifbuyprofitpershare = (values.exitprice - values.entryprice).toFixed(2);
  var ifsellprofitpershare = (values.entryprice - values.exitprice).toFixed(2);
  var ifbuytotalprofit = (sellvalue - buyvalue).toFixed(2);
  var ifselltotalprofit = (buyvalue - sellvalue).toFixed(2);

  var gst18 = (
    (18 / 100) *
    ((0.0035 / 100) * buyvalue + (0.0035 / 100) * sellvalue)
  ).toFixed(2);
  var ap, ep, bkrg, sttsell, buytxn, selltxn, gst;
  ap = (0.05 / 100) * buyvalue;
  ep = (0.05 / 100) * sellvalue;
  sttsell = (0.025 / 100) * sellvalue;
  buytxn = (0.00345 / 100) * buyvalue;
  selltxn = (0.00345 / 100) * sellvalue;

  if (ap > 20 && ep > 20) {
    bkrg = 40;
  } else if (ap > 20 && ep < 20) {
    bkrg = 20 + ep;
  } else if (ep > 20 && ap < 20) {
    bkrg = 20 + ap;
  } else if (ap < 20 && ep < 20) {
    bkrg = ap + ep;
  }
  return (
    <>
      <div>
        <form id="upstocbrokeragecalculator">
          <div className="ffg">
            <label htmlFor="action">Action</label>
            <select
              name="action"
              value={values.action}
              onChange={handleSubmit}
              title="action"
            >
              <option value="Buy">Buy</option>
              <option value="Sell">Sell</option>
            </select>
          </div>
          <div className="ffg">
            <label htmlFor="quantity">Quantity </label>
            <input
              type="number"
              value={values.quantity}
              name="quantity"
              onChange={handleSubmit}
            />
          </div>
          <div className="ffg">
            <label htmlFor="entryprice">Entry Price </label>
            <input
              type="number"
              value={values.entryprice}
              name="entryprice"
              onChange={handleSubmit}
            />
          </div>
          <div className="ffg">
            <label htmlFor="exitprice">Exit Price </label>
            <input
              type="number"
              value={values.exitprice}
              name="exitprice"
              onChange={handleSubmit}
            />
          </div>
        </form>
        {values.action}
        {values.quantity}
        {values.entryprice}
        {values.exitprice}
        <hr></hr>
        <p> Buy value {buyvalue}</p>
        <p> Sell value {sellvalue}</p>
        <p>
          Profit per share{" "}
          {values.action === "Buy" ? ifbuyprofitpershare : ifsellprofitpershare}
        </p>
        <p>
          Brokerage
          {bkrg.toFixed(2)}
        </p>
        <p>
          Total Profit
          {values.action === "Buy" ? ifbuytotalprofit : ifselltotalprofit}
        </p>
      </div>
    </>
  );
}

export default thecalc;
