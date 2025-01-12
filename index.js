import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set('view engine', 'ejs'); 

app.use(express.static("public")); 
app.use(bodyParser.urlencoded({extended:true}));

const title=[]
const bod = []

app.post("/submit",(req,res)=>{
	const data = (req.body);
	title.push(req.body.Title)
	bod.push(req.body.Content)

	console.log(title,bod)
	
	 //if you have any search query write req.query
	 res.render("main.ejs",{bod,title})
	 
})
let a;
app.get("/",(req,res)=>{
	res.render('main.ejs')});


app.get("/blog",(req,res)=>{
	const selectedTitle = req.query.title;
	const content  = bod[title.indexOf(selectedTitle)];
	res.render("blog.ejs",{a:selectedTitle,content});

})
app.get("/edit",(req,res)=>{
	const Title = req.query.title;
	const content  = bod[title.indexOf(Title)];
	res.render("edit.ejs",{Title,content});
	
})


app.post('/edit', (req, res) => {
    // Extract the data sent from the frontend
    const { name, email } = req.body;

    // You can perform any operation with the data here
    // For example, saving to a database (this is just a mock response)
    
    console.log('Received data:', { name, email });

    // Respond with a success message
    res.json({
        message: 'Data submitted successfully',
        data: { name, email }
    });
});
app.listen(port, ()=>{
	console.log("Listening at port:3000")
})