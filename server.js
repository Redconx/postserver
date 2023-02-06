const { response } = require("express");
var express = require("express");
const { default: axios } = require("axios");
var app = express();
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, OPTIONS, PUT, PATCH, POST, DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept,Authorization,*"
        );
    res.header("Access-Control-Expose-Headers","Authorization,X-Auth-Token")
    res.header("Access-Control-Allow-Credentials", "true");
    next();
    });

var port=process.env.PORT||2410
app.listen(port,()=>console.log(`Node app listening on port ${port}!`));

app.post('/getdata',async function(req,res) {
    let {method, fetchurl, txtfield}=req.body
    console.log(method,fetchurl,txtfield);

    if (method === "GET") {
      try {
        let response = await axios.get(fetchurl);
        console.log(response.data);
        res.send(response.data);
      } catch (error) {
        console.log(error);
        res.send(error);
      }
    }
    if (method === "POST") {
      let body = JSON.parse(txtfield)
      try {
        console.log("inpost");
        let response = await axios.post(fetchurl, body);
        console.log(response.data);
        res.send(response.data)
      } catch (error) {
        res.send(error)
      }
    }
})