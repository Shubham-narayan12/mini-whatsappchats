const express=require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chatfrommodel =require("./models/schema.js")
const methodOverride = require('method-override');

app.use(methodOverride("_method"));
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));


//setup of mongodb to node js
main().
then(()=>{
    console.log("connected to DB");
}).
catch(err => console.log(err));

async function main(){
    await mongoose.connect("mongodb+srv://narayandivya00:0OABJiPpNNJp6OJp@cluster0.0wpjdpm.mongodb.net/?retryWrites=true&w=majority");
}

/**let chat1 = new Chat({
    from:"chunna",
    to:"munna",
    msg:"thk baa",
    created_at: new Date(),
}); 

chat1.save().then(res=>{
    console.log(res)
}) */

//listening Route
app.listen(3000,()=>{
  console.log("server is listening")    
});

app.get("/",(req,res)=>{
    res.send("route is working");
});

//show chats route
app.get("/chats",async (req,res)=>{
    let chats = await Chatfrommodel.find();   //nodejs mai mongo ka query aishe hi likhte hain route k andar main.
    res.render("showChats.ejs",{chats});
});


//create new msg route.
app.get("/newchat",(req,res)=>{
    res.render("newchat.ejs");
});

app.post("/newchat",(req,res)=>{
    let {from:newfrom ,msg:newmsg ,to:newto} =req.body;
    let chat1 = new Chatfrommodel({
        from:newfrom,
        msg:newmsg,
        to:newto,
        created_at: new Date(),
    });

    chat1.save().then(res=>{console.log("saved")}).catch(err=>{console.log(err)});
    res.redirect("/chats");
});


//Edit msg Route
app.get("/edit/:id",async (req,res)=>{
    let {id}=req.params;
    let chat = await Chatfrommodel.findById(id);
    res.render("editForm.ejs",{chat});
});

app.patch("/edit/:id",async (req,res)=>{
    let {id} = req.params;
    let{msg:newmsg} =req.body;
   let chat = await Chatfrommodel.findByIdAndUpdate(
    id,{
        msg :newmsg,
    },
    {runValidators:true , new:true}
   )
   res.redirect("/chats");
})

//Delete route

app.delete("/deletechat/:id",async (req,res)=>{
    let {id} = req.params;
    let chat = await Chatfrommodel.findByIdAndDelete(id);
    res.redirect("/chats");
})



