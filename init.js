const mongoose = require("mongoose");
const Chatfrommodel =require("./models/schema.js")


main()
.then(()=>{console.log("connected to db")
}).
catch(err => {console.log(err)})

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/fakewhatsaap")
}


let chats = [{
    from:"rahul",
    to:"munna",
    msg:"thk hai aate hain",
    created_at: new Date(),
},
{
    from:"shubham",
    to:"munna",
    msg:"mera beta mera beta",
    created_at: new Date(),
},
{
    from:"laila",
    to:"munna",
    msg:"thk baa",
    created_at: new Date(),
},
{
    from:"kajal",
    to:"munna",
    msg:"thk",
    created_at: new Date(),
},
{
    from:"chunna",
    to:"munna",
    msg:"thk baa",
    created_at: new Date(),
}
];


Chatfrommodel.insertMany(chats).then(res=>{console.log("Data inserted")}).catch(err=>{console.log(err)});
