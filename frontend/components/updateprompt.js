import React, { useEffect, useState } from "react";
import axios from "axios";
import FormData from "form-data";
import Moment from "moment";
import { Suspense } from "react";

function updateprompt(props) {
  const [values, setvalues] = useState([]);

  const closepopup = (e) => {
    e.preventDefault();
    props.themagical;
  };

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
      url: `http://localhost:8000/api/trades/${props.updateid}`,
      data: values,
    };

    axios
      .request(options)
      .then(function (response) {
        if (response.data) {
          props.themagical();
        }
      })
      .catch(function (error) {
        if (error.response.status >= 400) {
          alert("Error 404");
        } else if (error.response.status >= 500) {
          alert("Server Error");
        }
      });
  };

  function getdata() {
    axios
      .request({
        method: "GET",
        url: `http://localhost:8000/api/trades/particular/${props.updateid}`,
      })
      .then(function (response) {
        console.log(response.data);
        //console.log(response.data[0].stock);
        setvalues(response.data);
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
      <div id="theupdateformid">
        <Suspense fallback={<div>Loading</div>}>
          <form method="post" encType="multipart/form-data" id="thetrade">
            <div className="formupdatetitle">
              <h2 className="formupdatetitle">Update Details</h2>
            </div>
            <h2>Basic</h2>
            <div className="thegroups">
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
                  <option value="Buy">Buy</option>
                  <option value="Sell">Sell</option>
                </select>
              </div>
              <div className="ffg">
                <label htmlFor="timeframe">Timeframe</label>
                <select
                  name="timeframe"
                  value={values.timeframe}
                  onChange={handleSubmit}
                  title="timeframe"
                >
                  <option value="1 Minute">1 Minute</option>
                  <option value="5 Minute">5 Minute</option>
                  <option value="15 Minute">15 Minute</option>
                  <option value="30 Minute">30 Minute</option>
                  <option value="1 Hour">1 Hour</option>
                  <option value="4 Hour">4 Hour</option>
                  <option value="1 Day">1 Day</option>
                  <option value="1 Week">1 Week</option>
                  <option value="1 Month">1 Month</option>
                </select>
              </div>
            </div>
            <h2>Entry</h2>
            <div className="thegroups">
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
            </div>
            <h2>Exit and Profit</h2>
            <div className="thegroups">
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
            </div>

            <div className="theactionbutton">
              <input
                type="button"
                value="Update"
                onClick={submitdata}
                className="updateji"
              />
              <input
                type="button"
                value="Cancel"
                onClick={props.themagical}
                className="cancelji"
              />
            </div>
          </form>
        </Suspense>
      </div>
    </>
  );
}

export default updateprompt;
