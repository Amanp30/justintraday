import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import FormData from "form-data";
import Moment from "moment";

function trades() {
  //const [mydata, setmydata] = useState({});

  /*   const [values, setvalues] = useState({
        stock: "",
        action: "",
        timeframe: "",
        entrydate: "",
        exitdate: "",
        quantity: "",
        entryprice: "",
        exitprice: "",
        profitloss: "",
        fees: ""
    }); */

  const [values, setvalues] = useState([]);

  const handleSubmit = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (e.target.type === "file") {
      setvalues({ ...values, [name]: e.target.files[0] });
      console.log(values);
    } else {
      setvalues({ ...values, [name]: value });
    }
    console.log(values);
  };

  const submitdata = (e) => {
    e.preventDefault();

    // Handle File Data from the state Before Sending
    const form = document.getElementById("thetrade");
    const data = new FormData(form);

    //const { name, username, youtube } = values;
    const options = {
      method: "POST",
      url: "http://localhost:8000/api/trades/63256770a26319eccfadc74a",
      data: values,
    };

    axios
      .request(options)
      .then(function (response) {
        //console.log(response.data);
        getdata();
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  function getdata() {
    axios
      .request({ method: "GET", url: "http://localhost:8000/api/trades/show" })
      .then(function (response) {
        // console.log(response.data);
        //console.log(response.data[0].stock);
        // setvalues(response.data[9])
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  //    console.log(values)

  useEffect(() => {
    getdata();
    //setvalues({...values, mydata})
  }, []);

  return (
    <>
      <div>
        <form
          method="post"
          onSubmit={submitdata}
          encType="multipart/form-data"
          id="thetrade"
        >
          <div className="ffg">
            <label htmlFor="stock">Stock Name</label>
            <input
              type="text"
              value={values.stock}
              name="stock"
              onChange={handleSubmit}
            />
          </div>
          <div className="ffg">
            <label htmlFor="action">Action</label>
            <select
              name="action"
              value={values.action}
              onChange={handleSubmit}
              title="action"
            >
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>
          </div>
          <div className="ffg">
            <label htmlFor="timeframe">Action</label>
            <select
              name="timeframe"
              value={values.timeframe}
              onChange={handleSubmit}
              title="timeframe"
            >
              <option value="1minute">1 Minute</option>
              <option value="5minute">5 Minute</option>
              <option value="15minute">15 Minute</option>
              <option value="30minute">30 Minute</option>
              <option value="1hour">1 Hour</option>
              <option value="4hour">4 Hour</option>
              <option value="1day">1 Day</option>
              <option value="1week">1 Week</option>
              <option value="1month">1 Month</option>
            </select>
          </div>
          <div className="ffg">
            <label htmlFor="entrydate">Entry Date </label>
            <input
              type="datetime-local"
              value={Moment(values.entrydate).format("YYYY-MM-DDTHH:mm")}
              name="entrydate"
              onChange={handleSubmit}
            />
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
            <label htmlFor="entryprice">entryprice </label>
            <input
              type="number"
              value={values.entryprice}
              name="entryprice"
              onChange={handleSubmit}
            />
          </div>
          <div className="ffg">
            <label htmlFor="exitdate">Exit Date </label>
            <input
              type="datetime-local"
              value={Moment(values.exitdate).format("YYYY-MM-DDTHH:mm")}
              name="exitdate"
              onChange={handleSubmit}
            />
          </div>

          <div className="ffg">
            <label htmlFor="exitprice">exitprice </label>
            <input
              type="number"
              value={values.exitprice}
              name="exitprice"
              onChange={handleSubmit}
            />
          </div>
          <div className="ffg">
            <label htmlFor="profitloss">profitloss </label>
            <input
              type="number"
              value={values.profitloss}
              name="profitloss"
              onChange={handleSubmit}
            />
          </div>
          <div className="ffg">
            <label htmlFor="fees">fees </label>
            <input
              type="number"
              value={values.fees}
              name="fees"
              onChange={handleSubmit}
            />
          </div>

          <input type="submit" />
        </form>
        {values.stock}
      </div>
    </>
  );
}

export default trades;
