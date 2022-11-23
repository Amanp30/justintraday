import React from "react";
import Bar from "../components/bar";

function report({
  id,
  avgpertrade,
  totalfees,
  totalpnl,
  tradescount,
  stock,
  pnl,
  fee,
}) {
  return (
    <>
      <h2>{id}</h2>
      <div className="helloji">
        <Bar
          charttitle={`Chart for ${id} side`}
          data1={stock}
          data2={pnl}
          data3={fee}
        />
        <div className="maindetail">
          <div className="huzoor">
            <span className="belowthis">Average Per Trade</span>
            <span className="thisside">{avgpertrade.toFixed(2)}</span>
          </div>
          <div className="huzoor">
            <span className="belowthis">Trade Count</span>
            <span className="thisside">{tradescount.toFixed(2)}</span>
          </div>{" "}
          <div className="huzoor">
            <span className="belowthis">Total Profit / Loss</span>
            <span className="thisside">{totalpnl.toFixed(2)}</span>
          </div>
          <div className="huzoor">
            <span className="belowthis">Total Fee</span>
            <span className="thisside">{totalfees.toFixed(2)}</span>
          </div>
          <div className="huzoor">
            <span className="belowthis">Profit </span>
            <span className="thisside">
              {(totalpnl - totalfees).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default report;
