import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Moment from "moment";
import Updateprompt from "../components/updateprompt";

function trades() {
  const [showupdate, setshowupdate] = useState(false);
  const [theupdateid, settheupdateid] = useState("");
  const [showbyquantity, setshowbyquantity] = useState(false);

  const changeshowquantity = () => {
    if (showbyquantity) {
      setshowbyquantity(false);
    } else {
      setshowbyquantity(true);
    }
  };

  const thetradeid = (e) => {
    setshowupdate(false);
    getdata();
  };

  const [mydata, setmydata] = useState([]);

  function deletetrade(theid) {
    axios(`http://localhost:8000/api/trades/delete/${theid}`, {
      method: "post",
      data: theid,
    })
      .then((r) => {
        getdata();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function getdata() {
    axios
      .request({ method: "GET", url: "http://localhost:8000/api/trades/show" })
      .then(function (response) {
        console.log(response.data);
        setmydata(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getdata();
  }, []);

  const handleedits = (theupdateid) => {
    settheupdateid(theupdateid);
    setshowupdate(true);
    // router.push("/trades/#theupdateformid");
  };

  return (
    <>
      <div className="themainclass">
        <div className="divide">
          <h2>Trades</h2>
          <span className="buttonside">
            <Link href="/newtrade">
              <button>+ Add New Trade</button>
            </Link>
          </span>
        </div>

        <table className="sortables">
          <thead>
            <tr>
              <th>Stock</th>
              <th>Type</th>
              <th>Date</th>
              <th>Entry</th>
              <th>Quantity</th>
              <th>Exit</th>
              <th>
                Return{" "}
                <span onClick={changeshowquantity}>
                  {showbyquantity ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="12"
                        viewBox="0 0 30 12"
                        fill="none"
                      >
                        <rect
                          x="0.5"
                          y="0.5"
                          width="29"
                          height="11"
                          rx="5.5"
                          fill="white"
                          stroke="#008000"
                        />
                        <circle cx="6" cy="6" r="4" fill="#008000" />
                      </svg>
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="12"
                        viewBox="0 0 30 12"
                        fill="none"
                      >
                        <rect width="30" height="12" rx="6" fill="#008000" />
                        <circle cx="24" cy="6" r="4" fill="white" />
                      </svg>
                    </>
                  )}
                </span>{" "}
              </th>
              <th>Return %</th>
              <th>Timeframe</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mydata.map((trade, index) => (
              <>
                <tr key={index}>
                  <td>{trade.stock}</td>
                  <td>
                    {trade.action === "Buy" ? (
                      <>
                        <span className="buy">B</span>
                      </>
                    ) : (
                      <>
                        <span className="sell">S</span>
                      </>
                    )}
                  </td>
                  <td>{Moment(trade.entrydate).format("D MMM, Y")}</td>
                  <td>{trade.entryprice}</td>
                  <td>{trade.quantity}</td>
                  <td>{trade.exitprice}</td>
                  <td>
                    {showbyquantity ? (
                      <>
                        {trade.action === "Buy" ? (
                          <>{(trade.exitprice - trade.entryprice).toFixed(2)}</>
                        ) : (
                          <>{(trade.entryprice - trade.exitprice).toFixed(2)}</>
                        )}
                      </>
                    ) : (
                      <>
                        {trade.action === "Buy" ? (
                          <>
                            {(
                              (trade.exitprice - trade.entryprice) *
                              trade.quantity
                            ).toFixed(2)}
                          </>
                        ) : (
                          <>
                            {(
                              (trade.entryprice - trade.exitprice) *
                              trade.quantity
                            ).toFixed(2)}
                          </>
                        )}
                      </>
                    )}
                  </td>
                  <td>
                    {trade.action === "Buy" ? (
                      <>
                        {trade.exitprice > trade.entryprice ? (
                          <>
                            <span className="theprofit">
                              {(
                                ((trade.exitprice - trade.entryprice) /
                                  trade.entryprice) *
                                100
                              ).toFixed(2)}{" "}
                              % ▲
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="theloss">
                              {(
                                ((trade.exitprice - trade.entryprice) /
                                  trade.entryprice) *
                                100
                              ).toFixed(2)}{" "}
                              % ▼
                            </span>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        {trade.entryprice > trade.exitprice ? (
                          <>
                            <span className="theprofit">
                              {(
                                ((trade.entryprice - trade.exitprice) /
                                  trade.entryprice) *
                                100
                              ).toFixed(2)}{" "}
                              % ▲
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="theloss">
                              {(
                                ((trade.entryprice - trade.exitprice) /
                                  trade.entryprice) *
                                100
                              ).toFixed(2)}{" "}
                              % ▼
                            </span>
                          </>
                        )}
                      </>
                    )}
                  </td>
                  <td>{trade.timeframe}</td>
                  <td>
                    <div className="tradeaction">
                      <button
                        className="deletetrade"
                        onClick={(event) => deletetrade(trade._id)}
                      >
                        <svg
                          viewBox="64 64 896 896"
                          focusable="false"
                          data-icon="delete"
                          width="1em"
                          height="1em"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path>
                        </svg>
                      </button>
                      <button
                        className="edittrade"
                        onClick={(e) => handleedits(trade._id)}
                      >
                        <svg
                          viewBox="64 64 896 896"
                          focusable="false"
                          data-icon="edit"
                          width="1em"
                          height="1em"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
        <div className="maggi">
          {showupdate ? (
            theupdateid === theupdateid ? (
              <Updateprompt updateid={theupdateid} themagical={thetradeid} />
            ) : null
          ) : null}
        </div>
      </div>
    </>
  );
}

export default trades;
