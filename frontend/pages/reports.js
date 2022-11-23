import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash";
import Bar from "../components/bar";
import dynamic from "next/dynamic";
const Report = dynamic(() => import("../components/report"), {
  loading: () => (
    <div>
      {" "}
      <div className="wait">
        <p>Chart Loading</p>{" "}
      </div>
    </div>
  ),
  /* suspense: true, */
  ssr: false,
});

function index() {
  const [data, setdata] = useState([]);

  function getdata() {
    const options = {
      method: "GET",
      url: "http://localhost:8000/api/trades/allcharts",
    };

    axios
      .request(options)
      .then(function (response) {
        setdata(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  useEffect(() => {
    getdata();

    //setvalues({...values, mydata})
  }, []);

  console.log(data);

  return (
    <>
      <div className="themainclass">
        <div className="divide">
          <h2>Charts</h2>
          <span className="buttonside">{/*  <button>hello</button> */}</span>
        </div>
        {/*  {data?.[0]?.bystock?.[0].pnl} */}

        <div className="thepattist">
          <a href="#stocks">Stocks</a>
          <a href="#monthly">Monthly</a>
          <a href="#yearly">Yearly</a>
          <a href="#timeframe">Timeframe</a>
          <a href="#action">Action</a>
        </div>
        <div className="chartgrid">
          <h2 id="stocks">Stocks</h2>

          {data?.[0]?.bystock.map((data) => {
            return (
              <>
                <Report
                  id={data._id}
                  stock={data.stock}
                  pnl={data.pnl}
                  fee={data.fee}
                  avgpertrade={data.avgpertrade}
                  totalfees={data.totalfees}
                  totalpnl={data.totalpnl}
                  tradescount={data.tradescount}
                />
              </>
            );
          })}
        </div>

        <div className="chartgrid">
          <h2 id="monthly">Monthly</h2>

          {data?.[0]?.bymonthly.map((data) => {
            return (
              <>
                <Report
                  id={data._id}
                  stock={data.stock}
                  pnl={data.pnl}
                  fee={data.fee}
                  avgpertrade={data.avgpertrade}
                  totalfees={data.totalfees}
                  totalpnl={data.totalpnl}
                  tradescount={data.tradescount}
                />
              </>
            );
          })}
        </div>

        <div className="chartgrid">
          <h2 id="yearly">Yearly</h2>

          {data?.[0]?.byyearly.map((data) => {
            return (
              <>
                <Report
                  id={data._id}
                  stock={data.stock}
                  pnl={data.pnl}
                  fee={data.fee}
                  avgpertrade={data.avgpertrade}
                  totalfees={data.totalfees}
                  totalpnl={data.totalpnl}
                  tradescount={data.tradescount}
                />
              </>
            );
          })}
        </div>

        <div className="chartgrid">
          <h2 id="action">Action</h2>

          {data?.[0]?.byaction.map((data) => {
            return (
              <>
                <Report
                  id={data._id}
                  stock={data.stock}
                  pnl={data.pnl}
                  fee={data.fee}
                  avgpertrade={data.avgpertrade}
                  totalfees={data.totalfees}
                  totalpnl={data.totalpnl}
                  tradescount={data.tradescount}
                />
              </>
            );
          })}
        </div>

        <div className="chartgrid">
          <h2 id="timeframe">Timeframe</h2>

          {data?.[0]?.bytimeframe.map((data) => {
            return (
              <>
                <Report
                  id={data._id}
                  stock={data.stock}
                  pnl={data.pnl}
                  fee={data.fee}
                  avgpertrade={data.avgpertrade}
                  totalfees={data.totalfees}
                  totalpnl={data.totalpnl}
                  tradescount={data.tradescount}
                />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default index;
