const express=require('express');
const fs=require('fs');
const PORT=8899;
const app=express();
app.set('view engine','pug');
app.set('views','./views');
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static("public"));
app.use("/image",express.static('public/image'));

app.get("/",(req,res)=>{
    res.render("home");
})

app.get("/about_us",(req,res)=>{
    res.render("about_us");
})

app.get("/gallery",(req,res)=>{
    res.render("gallery");
})

app.get("/services",(req,res)=>{
    res.render("services");
})

app.get("/contact",(req,res)=>{
    res.render("contact");
})

app.post("/contact1",(req,res)=>{
    let name=req.body.name;
    let number=req.body.number;
    if(fs.existsSync('user'))
    {
        fs.appendFile(`user/details.txt`,`\n${name},${number}`,(err)=>{
            if(err) throw err
            else res.write("<script>alert('Thank you for contacting us'); location.assign('/');</script>");
        })
    }
    else
    {
        res.write("<script>alert(File not found);</script>");
        res.end()
    }
})

app.get("/contact_details",(req,res)=>{
    var array=fs.readFileSync('user/details.txt').toString().split("\n");
    res.render('contact_details',{file:array});
})

app.listen(PORT,(err)=>{
    if(err) throw err;
    else console.log(`Server work on ${PORT}`)
})