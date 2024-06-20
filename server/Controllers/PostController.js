const Connection = require("../database.js");


const getPublishedPost=(req,res)=>{
    const userId=req.user.userId;
    Connection.query("select data_id,u.username,data_content from data d,users u where d.writer_id=? and d.writer_id=u.user_id order by d.time desc",[userId],(err,data)=>{
        if(err){
            console.log(err);
            res.status(500).json("Internal server errer");
        }
        if(data.length===0){
            return res.status(403).json("You don't have published any post");
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

const getCategory=(req,res)=>{
    const cat=req.params.category;
    const userId=req.user.userId;

    Connection.query("select d.category from data d ,users u where d.writer_id=u.user_id order by d.time desc",[userId],(err,data)=>{
        if(err){
            console.log(err);
            return res.status(500).json("Internal server Error");
        }
        if(data.length==0){
            return res.status(403).json("No category exits");
        }
        return res.status(200).json(data);
    })
}

const updatePost = (req, res) => {
    const userId = req.user.userId;
    const dataId = req.params.data_id;
    const { dataContent } = req.body;

    Connection.query("select data_content from data where data_id=? and writer_id=?",[dataId,userId],(err,data)=>{
        if(err){
            console.log(err);
        }
        if(data.length==0){
            return res.status(403).json("You cannot update other's post");
        }
        const d_content=data[0].data_content;
        console.log(data);
            //console.log(d_content);
            // Update the data in the data table
    Connection.query("UPDATE data SET data_content = ?, time = NOW() WHERE writer_id = ? AND data_id = ?", [dataContent, userId, dataId], (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json("Server error");
        }

        if (data.affectedRows === 0 || !data) {
            return res.status(403).json("You cannot edit others' posts");
        } else {
            //const d_content=data[0].data_content;
            // Get the next version number for the version history
            Connection.query("SELECT COALESCE(MAX(version_number), 0) + 1 AS version FROM version_history WHERE data_id = ?", [dataId], (err, versionData) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json("Internal server error");
                }

                const version = versionData[0].version;

                // Insert the new version into the version history
                Connection.query("INSERT INTO version_history (data_id, version_number, data_content, user_id, modified_at) VALUES (?, ?, ?, ?, NOW())", [dataId, version, d_content, userId], (err, insertData) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json("Internal server error");
                    }

                    return res.status(200).json("Updated successfully");
                });
            });
        }
    });
        
    })

};


const rollbackVersion= (req,res)=>{
    const userId=req.user.userId;
    const dataId=req.params.data_id;
    const versionNo=req.body.versionNumber;
    console.log(versionNo);
    console.log(dataId);
    Connection.query("select data_content from version_history where data_id=? and user_id=? and version_number=?",[dataId,userId,versionNo],(err,data)=>{
        if(err){
            console.log(err);
            return res.status(500).json("Internal server error");
        }
        //console.log(data);
        if(data.length===0){
            return res.status(403).json("No such data found or You don't have acess");
        }
        const dataContent=data[0].data_content;
        Connection.query("update data set data_content=?,time=now() where writer_id=? and data_id=?",[dataContent,userId,dataId],(err,data)=>{
            if(err){
                return res.status(500).json("Internal server error");
            }
            if(data.length===0){
                return res.status(403).json("Cannot update");
            }

            return res.status(200).json("successfully rollbacked");
            
        })

    })
    
}

const showDataVersions=(req,res)=>{
    const dataId=req.params.data_id;
    const userId=req.user.userId;
    Connection.query("select version_number,modified_at,data_content from version_history where user_id=? and data_id=?",[userId,dataId],(err,data)=>{
        if(err){
            console.log(err);
            return res.status(500).json(err);
        }
        if(data.length==0){
            return res.status(403).json("No such data found or You don't have any access to this post");
        }
        return res.status(200).json(data);
        
    })
}

module.exports={getAllPost,getPost,addPost,deletePost,updatePost,getCategoryPost,getPublishedPost,rollbackVersion,showDataVersions,getCategory};
