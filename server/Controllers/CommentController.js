const Connection=require("../database")


const addComments=(req,res)=>{
    const dataId=req.params.data_id;
    const userId=req.user.userId;
    const {commentData}=req.body;
    Connection.query("select count(data_id) as count from data where data_id=?",[dataId],(err,data)=>{
        if(err) {
            //console.log(err);
            return res.status(500).json("Internal server error");
        }
        if(data[0].count>0){
            Connection.query("select user_id from comments where user_id=? and data_id=?",[userId,dataId],(err,data)=>{
                if(err) {
                    //console.log(err);
                    return res.status(500).json("Internal server error");
                }
                if(data.length===0){
                    //console.log(data);
                    Connection.query("insert into comments(comment_data,data_id,user_id,time) value(?,?,?,NOW())",[commentData,dataId,userId],(err,data)=>{
                        if(err) {
                            console.log(err);
                            return res.status(500).json("Internal Server error");
                        }
                        console.log(data);
                        return res.status(200).json("Comment inserted for the given data");
                    })
                }
                else{
                    //console.log(data.length);
                    return res.status(403).json("U Already Commented, U can Update your comment,you can't put more than 1 comment")
                }
            })
        }
        else{
            return res.status(403).json("No such post exits");
        }
    })

    
}

const getComments=(req,res)=>{
    const dataId=req.params.data_id;
    //const userId=req.user.userId;
    Connection.query("select comment_data,user_id from comments where data_id=?",[dataId],(err,data)=>{
        if(err) return res.status(500).json("Internal server error");
        if(data.length==0) return res.status(403).json("No comments for this post");
        return res.status(200).json(data);
    })
}

const updateComments=(req,res)=>{
    const dataId=req.params.data_id;
    const userId=req.user.userId;
    const {commentData}=req.body;
    //console.log(commentData);
    Connection.query("update comments set comment_data=? where data_id=? and user_id=?",[commentData,dataId,userId],(err,data)=>{
        if(err) {
            console.log(err);
            return res.status(500).json("Internal Server error");
        }
        if(data.affectedRows===0){
            return res.status(403).json("You don't commented for this post or you cannot update others comments");
        }
        return res.status(200).json("Comment successfully updated");
    })
}

const deleteComments=(req,res)=>{
    const dataId=req.params.data_id;
    const userId=req.user.userId;
    Connection.query("delete from comments where data_id=? and user_id=?",[dataId,userId],(err,data)=>{
        if(err) {
            //console.log(err);
            return res.status(500).json("Internal server error");
        }
        if(data.affectedRows===0){
            return res.status(403).json("You cannot delete other's comment or don't have any comment for this post");
        }
        return res.status(200).json("comment has been deleted successfully")
    })
}

module.exports={addComments,getComments,updateComments,deleteComments};