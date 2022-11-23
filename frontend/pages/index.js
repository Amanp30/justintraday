import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Chart from "../components/chart";
import axios from "axios";
import _ from "lodash";

function index() {
  const [chartdata, setchartdata] = useState([]);

  function getdata() {
    const options = {
      method: "GET",
      url: "http://localhost:8000/api/trades/profitdatasets",
    };

    axios
      .request(options)
      .then(function (response) {
        setchartdata(response.data[0]);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  console.log(chartdata);

  useEffect(() => {
    getdata();
    //setvalues({...values, mydata})
  }, []);

  console.log(chartdata.profits);

  return (
    <>
      <div className="themainclass">
        <div className="divide">
          <h2>Dashboard</h2>
          <span className="buttonside">
            <Link href="/newtrade">
              <button>+ Add New Trade</button>
            </Link>
          </span>
        </div>
        <div className="thedashsection">
          <div className="sec1">
            <div className="theinsidesec1">
              <p>
                <span className="lightname">Average return Per Trade</span>
                {chartdata.avgreturn}
              </p>
              <p>
                {" "}
                <span className="lightname">fees</span>
                {chartdata.totalfees}
              </p>
              <p>
                {" "}
                <span className="lightname">profit</span>{" "}
                {chartdata.totalprofit}
              </p>
            </div>
            <Chart
              title="profit chart"
              data1={chartdata.stocks}
              data2={chartdata.profits}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default index;
