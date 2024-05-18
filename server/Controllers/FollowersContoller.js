const Connection=require("../database")

const addFollowing = (req, res) => {
    const userId = req.user.userId;
    const writerId = req.params.writer_id;
    console.log(userId);
    console.log(writerId);

    if (userId == writerId) {
        return res.status(403).json("You cannot follow yourself");
    }
    else{
        Connection.query("select writer_id from follows where user_id=? and writer_id=?", [userId, writerId], (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).json("Internal server error");
            }
            if (data.length == 0) {
                Connection.query("insert into follows (user_id, writer_id) values (?, ?)", [userId, writerId], (err, data) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json("Internal server error");
                    }
                    return res.status(200).json("Added to your following list");
                });
            } else {
                return res.status(403).json("You are already following this user");
            }
        });
    }


};

const getFollowing=(req,res)=>{
    const userId=req.user.userId;
    //console.log(userId);
    Connection.query("SELECT u.username AS AuthorName, d.writer_id  FROM follows f INNER JOIN users u ON f.writer_id = u.user_id LEFT JOIN data d ON u.user_id = d.writer_id WHERE f.user_id = ? GROUP BY u.user_id",[userId],(err,data)=>{
        if(err) {
            console.log(err);
            return res.status(500).json("Internal Server Error");
        }
        //console.log(data);
        console.log(data);
        if(data.length>0){
            return res.status(200).json(data);
        }
        return res.status(403).json("You are not following any one");
    })
};



const removeFollowing=(req,res)=>{
    const writerId=req.params.writer_id;
    const userId=req.user.userId;
    console.log(writerId);
    console.log(userId);

    Connection.query("select count(*) as count from follows where writer_id=? and user_id=?",[writerId,userId],(err,data)=>{
        if(err){
            console.log(err);
            return res.status(500).json("Internal server error");
        }
        if(data[0].count==0){
            return res.status(403).json("No such user You follow");
        }
        //console.log(data);
        Connection.query("delete from follows where user_id=? and writer_id=? ",[userId,writerId],(err,data)=>{
            if(err){
                console.log(err);
                return res.status(500).json("Internal server error");
            }
            console.log(data);
            return res.status(200).json("Removed from following list");
        })
    })

}

const getFollowers=(req,res)=>{
    const userId=req.user.userId;
    Connection.query("select count(*) as count from follows where writer_id=?",[userId],(err,data)=>{
        if(err){
            console.log(err);
            return res.status(500).json("Internal server error");
        }
        if(data[0].count>0){
            Connection.query("SELECT f.user_id, u.username FROM follows f INNER JOIN users u ON f.user_id = u.user_id WHERE f.writer_id = ?",[userId],(err,data)=>{
                if(err){
                    console.log(err);
                    return res.status(500).json("Internal server error");
                }
                else{
                    console.log(data);
                    return res.status(200).json(data);
                }
            })
        }
        else{
            return res.status(403).json("You don't have any followers"); 

        }
    })
}

module.exports={addFollowing,getFollowing,removeFollowing,getFollowers}