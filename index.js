import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

const titles = [];
const bodies = [];


app.post("/submit", (req, res) => {
  const { Title, Content } = req.body;
  titles.push(Title);
  bodies.push(Content);

  console.log(titles, bodies);
  res.render("main.ejs", { titles, bodies });
});


app.get("/", (req, res) => {
  res.render("main.ejs");
});


app.get("/blog", (req, res) => {
  const selectedTitle = req.query.title;
  const content = bodies[titles.indexOf(selectedTitle)];
  res.render("blog.ejs", { title: selectedTitle, content });
});


app.get("/edit", (req, res) => {
  const title = req.query.title;
  const content = bodies[titles.indexOf(title)];
  res.render("edit.ejs", { title, content });
});


app.patch("/edit/:title", (req, res) => {
  const titleToEdit = req.params.title;
  const newContent = req.body.content;

  const index = titles.indexOf(titleToEdit);
  if (index !== -1) {
    bodies[index] = newContent;
    res.json({
      message: "Post updated successfully",
      title: titleToEdit,
      content: newContent,
    });
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});

app.listen(port, () => {
  console.log("Listening at port:3000");
});
