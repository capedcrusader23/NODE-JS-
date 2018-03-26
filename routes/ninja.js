var express=require('express');
var route=express.Router();
var ninja=require('../modals/schema');
var body=require('body-parser');
var url=body.urlencoded({extended:false});

    route.get('/ninja', function(req, res, next){
        /* Ninja.find({}).then(function(ninjas){
            res.send(ninjas);
        }); */

        Ninja.aggregate([
            {$geoNear: {
                    near: {type: "Point", coordinates: [0,100]},
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
    res.sendFile(__dirname+'./views/Addninja');
   //res.render('Addninja');
});


let distance = {};

route.post('/ninja',url,function(req,res,next)
{
  //res.render('success');
console.log("Success");
  var k={"name":req.body.name,"rank":req.body.rank,"available":req.body.available,"geometry":{"type":req.body.type,"coordinates":[parseFloat(req.body.lng),parseFloat(req.body.lat)]}};
  k.save().then(function (value) {
    res.sendFile(__dirname+'../views/success');
  }).catch(next);

});

route.post('/delnin',function(req,res)
{
ninja.findByIdAndRemove({_id:req.body.val}).then(function(ninja)
{
res.send(ninja);
});
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


module.exports=route;
