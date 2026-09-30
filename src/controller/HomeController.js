class HomeController{
    home(req,res){
        res.render("home",{
            title:"This is home page"
        })
    }
}
module.exports=new HomeController()