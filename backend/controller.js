const url = require('url');
const {
  getData,
  addData,
  deleteData,
  updateData
 } = require("./database.js");


exports.getCounter = async (req, res) => {
  let statusCode, response;
  try{
    const result = await getData();
    response = {message: "Success", data: result.rows};
    statusCode = 200;
  }catch(err){
    response = {message: err.message};
    statusCode = 404;
  }
  res.statusCode = statusCode;
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('content-Type', 'Application/json');
  res.end(JSON.stringify(response))
}

exports.createCounter = async (req, res) => {
  let statusCode, response;
  try{
    await addData();
    response = {
      message: "Counter created!",
    }
    statusCode = 201;
  }catch(err){
    response = {message: err.message};
    statusCode = 404;
  }

  res.statusCode = statusCode;
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('content-Type', 'Application/json');
  res.end(JSON.stringify(response))
}

exports.deleteCounter = async (req, res) => {
  let statusCode, response;
  try{
    let data = new Promise((resolve, rej) => {
      req.on('data', chunk => resolve(chunk.toString()))
    })
    const item = JSON.parse(await data);
    await deleteData(item);
    response = {
      message: "Counter deleted!",
      data: item
    }
    statusCode = 200;
  }catch(err){
    response = {message: err.message};
    statusCode = 404;
  }
  res.statusCode = statusCode;
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('content-Type', 'Application/json');
  res.end(JSON.stringify(response))
}



exports.updateCounter = async (req, res) => {
  let statusCode, response;
  try{
    let data = new Promise((resolve, rej) => {
      req.on('data', chunk => resolve(chunk.toString()))
    })

    const item = JSON.parse(await data);
    await updateData(item);
    response = {
      message: "Counter updated!",
      data: item
    }
    statusCode = 200;
  }catch(err){
    response = {message: err.message};
    statusCode = 404;
  }

  res.statusCode = statusCode;
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('content-Type', 'Application/json');
  res.end(JSON.stringify(response))
}
