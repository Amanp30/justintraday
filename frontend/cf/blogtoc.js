"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const slugify = require("slugify");

exports.blogtoc = async function (div) {
  if (typeof window !== "undefined") {
    var thepage = document.getElementById(`${div}`);
    var childs = thepage.childNodes;
    var toc = [];
    Array.from(childs).forEach((child, index) => {
      if (
        child.nodeName === "H2" ||
        child.nodeName === "H3" ||
        child.nodeName === "H4" ||
        child.nodeName === "H5" ||
        child.nodeName === "H6"
      ) {
        child.setAttribute("id", slugify(child.innerHTML));

        toc.push({
          heading: child.innerHTML,
          url: `#${slugify(child.innerHTML)}`,
        });
      }
    });

    console.log(toc);
    return await toc;
  }
};

/* 
NODE_ENV=developement
PORT=8000
CLIENT_URL=http://localhost:3000
DATABASE='mongodb+srv://amanapp:123456Aman@amanapp.d4aogd5.mongodb.net/justintraday?retryWrites=true&w=majority' */
