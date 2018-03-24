new  Vue({

 el:'pr' ,
 data:{
     lat:'',
     lng:'',
     dat:[]

 },
computed:{
     sub:function()
     {
         this.lat=this.$refs.lat.value;
         this.lng=this.$refs.lng.value;
         fetch('/api/ninja?lng='+this.lng+'&lat='+this.lat).then(function(data)
         {
          return data.json();
         }).then(function(dat)
         {
             this.dat=dat;
         }).catch(function(er)
         {
             console.log(er);
         })
     }
}

});