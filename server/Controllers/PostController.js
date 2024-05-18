const Connection = require("../database.js");


const getPublishedPost=(req,res)=>{
    const userId=req.user.userId;
    Connection.query("select data_id,u.username,data_content from data d,users u where d.writer_id=? and d.writer_id=u.user_id order by d.time desc",[userId],(err,data)=>{
        if(err){
            console.log(err);
            res.status(500).json("Internal server errer");
        }
        if(data.length===0){
            res.status(403).json("You don't have published any post");
        }
        return res.status(200).json(data);
    })
};

const getCategoryPost=(req,res)=>{
    const cat=req.params.cat;
    Connection.query("select data_content,writer_id,u.username,data_id from data d ,users u where d.writer_id=u.user_id and category=? order by d.time desc",[cat],(err,data)=>{
        if(err) {
            console.log(err);
            res.status(500).json("Internal server errer");
        }
        if(data.length==0) return res.status(404).json("No such category found");
        return res.status(200).json(data);
    })
}

const getAllPost=(req,res)=>{
    Connection.query("select data_content,writer_id,u.username,data_id from data d ,users u where d.writer_id=u.user_id order by d.time desc",[],(err,data)=>{
        if(err) return res.status(500).json("Internal server errer");
        if(!data) return res.status(404).json("No post found");
        return res.status(200).json(data);
    })
}

const getPost=(req,res)=>{
    const username = req.params.user_name;
    //console.log(username);
    Connection.query("SELECT d.data_id, d.data_content, u.username FROM data d JOIN users u ON d.writer_id = u.user_id WHERE u.username= ?",[username],(err,data)=>{
        if(err) {
            
            console.log(err);
            return res.status(500).json("Internal Server Error");}
        if(data.length===0) {
            //console.log(data);
            return res.status(404).json("no post found under this username")
        };
        return res.status(200).json(data);
    })
}


const addPost=(req,res)=>{
    const userId=req.user.userId;
    const {dataContent,category}=req.body;
    Connection.query("insert into data (data_content,writer_id,category,time) values(?,?,?,NOW())",[dataContent,userId,category],(err,data)=>{
        if(err) return res.status(500).json("Internal Server Error");
        return res.status(200).json("Post successfully posted");
    })
}

const deletePost=(req,res)=>{
    const userId=req.user.userId;
    const dataId=req.params.data_id;
    // console.log(userId);
    // console.log(dataId);
    Connection.query("delete from data where data_id =? and writer_id=?",[dataId,userId],(err,data)=>{
        if(err) {
            console.log(err);
            return res.status(500).json("Internal Server Error");
        };
        if(!data || !data.affectedRows){
            //console.log(data);
            return res.status(403).json("You don't have permission to delete this post");
        }


        return res.status(200).json("post has been deleted");
    })
}

const updatePost=async (req,res)=>{
    const userId=await req.user.userId;
    const dataId=req.params.data_id;
    const {dataContent}=req.body;
    // console.log(userId);
    // console.log(dataId);
    // console.log(dataContent);
    Connection.query("update data set data_content=?,time=NOW()  where writer_id = ? and data_id=?",[dataContent,userId,dataId],(err,data)=>{
        if(err){
            //console.log(err);
            return res.status(500).json("server error")};
            if(data.affectedRows==0 || !data){
                return res.status(403).json("You cannot edit others post");
            }   
             return res.status(200).json("updated successfully");
    })
}

module.exports={getAllPost,getPost,addPost,deletePost,updatePost,getCategoryPost,getPublishedPost};
