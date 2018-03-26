var express=require('express');
var route=express.Router();
var ninja=require('./modals/schema');
var body=require('body-parser');
var ejs =require('ejs');
var url=body.urlencoded({extended:false});


route.get('/',function(req,res)
{
   res.render('front');
});
    route.get('/ninja', function(req, res, next){

        ninja.aggregate([
            {$geoNear: {
                    near: {type: "Point", coordinates: [parseFloat(req.query.lng),parseFloat(req.query.lat)]},
                    distanceField: "dist.calculated",
                    maxDistance: 100000,
                    query: {type: "public"},
                    includeLocs: "dist.location",
                    spherical: true
                }}
        ]).then(function(ninjas){

            res.json(ninjas);
        }).catch(next);
    });

route.get('/postnin',function (req,res) {
    res.render(__dirname+'/views/Addninja.ejs');

});


//let distance = {};

route.post('/ninja',url,function(req,res,next)
{
  //res.render('success');
console.log("Success");
  var k={"name":req.body.name,"rank":req.body.rank,"available":req.body.available,"geometry":{"type":req.body.type,"coordinates":[parseFloat(req.body.lng),parseFloat(req.body.lat)]}};

var ni=new ninja(k);
ni.save().then(function () {
    res.render(__dirname+'/views/success.ejs');
}).catch(next);

});


route.put('/ninja/:id',function(req,res)
{
ninja.findByIdAndUpdate({_id:req.parmas.id},req.body).then(function(ninja)
{
    ninja.findOne({_id:req.params.id}).then(function (value) {
        res.send(value);
    })

})
});

route.get('/ninjadel',function(req,res)
{
   res.render(__dirname+'/views/Delnin.ejs');
});

route.post('/ninjadelt',url,function (req,res) {
    ninja.findByIdAndRemove({_id:req.body.name}).then(function(){
res.render('delt');
    });
});
route.get('/updat',function (req,res) {
    res.render(__dirname+'/views/update.ejs')
});

route.post('/ninjaup',url,function (req,res) {
   ninja.findByIdAndUpdate({_id:req.body.id},req.body).then(function () {
       res.render(__dirname+'/views/success.ejs')
   }).catch(next);
});

module.exports=route;
