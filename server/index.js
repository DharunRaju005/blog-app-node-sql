const express=require('express');
const cors=require('cors');
const Connection=require('./database')
const AuthRoute=require("./Routes/Auth");
const PostRoute=require("./Routes/Post");
const CommentRoute=require("./Routes/Comments");
const BookMarkRoute=require("./Routes/BookMarks");
const FollowRoute=require("./Routes/Followers")
const cookieParser = require('cookie-parser');


const app =express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin:["http://localhost:5173"],
    methods:["GET","POST"],
    credentials:true,
}));

app.use("/",AuthRoute);
app.use("/post",PostRoute);
app.use("/comment",CommentRoute);
app.use("/bookmark",BookMarkRoute);
app.use("/follows",FollowRoute)



Connection.connect((err) => {
    if (err) {
        console.log(err);
        return; // Exit the function if there's an error
    }
    
    console.log('Database connected!');
    
    app.listen(5173, () => {
        console.log("Listening to port 5173");
    });
});

