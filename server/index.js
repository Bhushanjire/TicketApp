const express = require("express");
const axios = require("axios");
const cors = require("cors");
require('dotenv').config()
const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());
const credentials = btoa(`${process.env.USERNAME}:${process.env.PASSWORD}`);    
app.post("/tickets",(req, res) => {
    const {page,per_page} = req.body
  const config = {
    method: "GET",
    url: `https://zendeskcodingchallenge8359.zendesk.com/api/v2/tickets.json?page=${page}&per_page=${per_page}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${credentials}`,    
    },
  };

  axios(config)
    .then((response) =>{
      res.status(200).send(response.data);
    })
    .catch((error)=> {
        res.status(401).send(error);
    });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
