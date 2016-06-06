# BitScrow
A simple bitcoin escrow service

##Documentation:

    app.post("/accept/:signature",function(req,res){
      //when user clicks this link, payment will go through
      //searches db for transaction and makes the payout
    }

    function payout(value){
      app.post("/payment",function(req,res){
        //pays out the user. to do so the user must click on the email link which accepts the deal as sorted
        
      })
    }
