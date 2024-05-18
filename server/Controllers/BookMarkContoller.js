const Connection=require("../database")


const addBookmark=(req,res)=>{
    const userId = req.user.userId;
    const dataId = req.params.data_id;

// Check if the specified data ID exists in the database
Connection.query("select count(*) as count from data where data_id = ?", [dataId], (err, data) => {
    if (err) {
        console.error(err);
        return res.status(500).json(  "Internal server error" );
    }
    const dataExists = data[0].count > 0;

    if (!dataExists) {
        return res.status(404).json( "No such data found");
    }

    // Check if the user has already bookmarked this post
    Connection.query("select count(*) AS count from bookmark where user_id = ? AND data_id = ?", [userId, dataId], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json( "Internal server error" );
        }
        const alreadyBookmarked = data[0].count > 0;
        //console.log(data);

        if (alreadyBookmarked) {
            return res.status(403).json( "Already bookmarked this post");
        }

        // If not already bookmarked, insert the bookmark
        Connection.query("INSERT INTO bookmark (user_id, data_id) VALUES (?, ?)", [userId, dataId], (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).json("Internal server error");
            }
            return res.status(200).json( "Successfully bookmarked the post");
        });
    });
});
}

const getBookmark=(req,res)=>{
    const userId=req.user.userId;

    Connection.query("select count(user_id) as count from bookmark where user_id=?",[userId],(err,data)=>{
        if(err){
            console.log(err);
            return res.status(500).json("Internal server error");
        }
        //console.log(data);
        if(data[0].count>0){
            Connection.query("select bookmark_id,username,u.user_id,data_content,d.data_id from data d,bookmark b,users u where b.user_id=? and d.data_id=b.data_id and d.writer_id=u.user_id",[userId],(err,data)=>{
                if(err){
                    console.log(err);
                    return res.status(500).json("Internal server error");
                }
                return res.status(200).json(data);
            })
        }
        else{
            return res.status(403).json("You don't bookmarked any post");
        }
        //console.log(data);
    })
}

const deleteBookmark=(req,res)=>{
    const userId=req.user.userId;
    const bookmarkId=req.params.bookmark_id;
    console.log(userId);
    console.log(bookmarkId);
    Connection.query("select count(*) as count from bookmark where bookmark_id=? and user_id =?",[bookmarkId,userId],(err,data)=>{
        if(err){
            console.log(err);
            return res.status(500).json("Internal server error");
        }
        console.log(data);
        if(data[0].count>0){
            Connection.query("delete from bookmark where bookmark_id=? and user_id=?",[bookmarkId,userId],(err,data)=>{
                if(err){
                    console.log(err);
                    return res.status(500).json("Internal server error");
                }
                return res.status(200).json("Bookmark successfully deleted");
            })
        }
        else{
            return res.status(404).json("You don't bookmarked this post");
        }
    })
}


module.exports={addBookmark,getBookmark,deleteBookmark};