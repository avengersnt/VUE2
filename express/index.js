const express = require('express')
const bodyParser = require('body-parser')
// corsポリシーに抵触するため、その対策としてcorsを利用する
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())
var request = require('request');

var domain = require('express-domain-middleware');
app.use(domain);


app.post('/test', function(req, res) {
  var lat =  req.body.lat
  var lng =  req.body.lng
  var options = {
      url: 'https://map.yahooapis.jp/search/local/V1/localSearch?output=json&appid=dj00aiZpPWk0clhRdTdrVVd0ZiZzPWNvbnN1bWVyc2VjcmV0Jng9ZDA-&gc=0306005&lat='+ lat +'&lon='+ lng +'&dist=0.5&results=5&sort=dist',
      method: 'GET',
      json: true
  }
  var lat = [];
  var lng = [];
  var Feature;
  var Coordinates;
  request(options, function (error, response, body) {


    Feature = body.Feature;

    var ResultInfo = body.ResultInfo;
    var Count = ResultInfo.Count;
    for ( var i=0;  i<Count;   i++)  {

  // 繰り返す処理を書く
    var Feature_JSON = Feature[i]
    var Geometry = Feature_JSON.Geometry;
    Coordinates = Geometry.Coordinates;
    var result = Coordinates.split(',');
    lat[i] = result[0];
    lng[i] = result[1]

  }

  console.log(lat);
　console.log(lng);
  res.send({
    lat: lat,
    lng: lng,

  })



  })



});

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '10.0.0.247',
  user     : 'root',
  password : 'pTgL6%ec',
  database : 'avengers'
});

/*
function getMysql(){
  connection.query('select * from locate', function (error, results, fields) {
    if (error) throw error;
    res.send(results);
  });
  };
  */

app.get('/test', function (req, res) {
  connection.query('select * from coordinate_report', function (error, results, fields) {
    if (error) throw error;
    res.send(results);
  });
});


app.post('/', async function (req, res) {
  //var result0 = new Promise(function(resolve) {
  var lat2 =  req.body.lat;
  var lng2 =  req.body.lng;
  var value = [lat2,lng2];
  //var lat2 = 26.231408
  //var lng2 = 127.685525
//});
//result0.then(function(response){
  var result1 = new Promise(function(resolve) {
  connection.query('insert into coordinate_report value(?,?)',value, function (error, results, fields) {
    if (error) throw error;
    res.send(results[0]); //ないと勝手にリクエスト飛ばす・・・
    console.log("1/98");
    resolve();
  });
});
result1.catch(function(err){
  console.log("1");
});
  result1.then(function(response){
    var states;
    //console.log(2);
    var result2 = new Promise(function(resolve) {
   //process.on('unhandledRejection', console.dir);
  connection.query('select * from coordinate_report', function (error, results, fields) {
    if (error) throw error;
      //sres.send(results);
      //console.log(3);
      states = results;
      resolve(states);
    });
  });
  result2.catch(function(err){
    console.log("2");
  });
  result2.then(function(states){
    //onsole.log(4);
    //console.log(states.length);
    //console.log(states);
    //console.log(states[0].lat);

    for(var i=0;i<states.length;i++){
      var result3 = new Promise(function(resolve) {
      var closePosition = [];
      closePosition.push(states[i]);
      //console.log("rrr");
      for(var j=0;j<states.length;j++){
        if(states[i] != states[j]){
        //console.log(5);
        var x, y, dist;
        if(states[i].lat < states[j].lat){
          x = states[j].lat - states[i].lat
        }else{
          x = states[i].lat - states[j].lat
        }

        if(states[i].lng < states[j].lng){
          y = states[j].lng - states[i].lng
        }else{
          y = states[i].lng - states[j].lng
        }
       dist = Math.sqrt(Math.pow(x,2) + Math.pow(y,2));
       //console.log(6);
       //console.log(dist);
       if(dist<0.0001){//約10m以下
         closePosition.push(states[j]);
       }
      }
    }
      //console.log(closePosition+"aa");
      //console.log(closePosition.length);
      resolve(closePosition);
    });
    result3.catch(function(err){
      console.log("3");
    });
    result3.then(function(closePosition){
      //console.log(closePosition.length);
     var result4 = new Promise(function(resolve) {
       var value2 = [0,0];
     if(closePosition.length > 5){
      var setX, setY;
      var tempX = 0;
      var tempY = 0;
      for(i=0;i<closePosition.length;i++){
        tempX = tempX + closePosition[i].lat;
        tempY = tempY + closePosition[i].lng;
      }
      setX = tempX/closePosition.length;
      setY = tempY/closePosition.length;
      value2[0] = setX;
      value2[1] = setY;
      //console.log(value2+"gg");
    }
    resolve(value2);
  });
  result4.catch(function(err){
    console.log("4");
  });
  result4.then(function(value2){
    //console.log(value2[0] != 0);
    if(value2[0] != 0){
      //console.log(value2+"gg");
      connection.query('insert ignore into coordinate_addition value(?,?)', value2, function (error, results, fields) {
        if (error) throw error;
        //res.send(results[0]);
        console.log(212121);
      });
      for(var i = 0;i<closePosition.length;i++){
        connection.query('DELETE FROM coordinate_report WHERE lat=?',closePosition[i].lat , function (error, results, fields) {
          if (error) throw error;
          //res.send(results);
        });
      }
    //break;
    }
    //resolve();
    });

});
 };
  });
});
});
//});

app.listen(process.env.PORT || 3000)
