const jwt=require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const Connection = require("../database.js");


const signup = (req, res) => {
    // Checking for the existing user
    const { username, email, password } = req.body;
    //console.log(req.body);
    const sql = "SELECT * FROM users WHERE email = ? OR username = ?";
    Connection.query(sql, [email, username], (err, data) => {
        if (err) return res.status(500).json("HI" + err);
        if (data && data.length > 0) {
            return res.status(409).json("User already exists");
        } else {
            // Hashing the password with bcrypt
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);
            const expiresIn = 3 * 24 * 60 * 60;

            // Storing user data in the database
            const insertSql = "INSERT INTO users (username, email, password, date_of_join, last_sign) VALUES (?, ?, ?, CURDATE(), NOW())";
            Connection.query(insertSql, [username, email, hashedPassword], (err, data) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json("Internal server error");
                }
                console.log("username, password, and email are inserted");

                // Generating JWT token
                let user_id;
                Connection.query("SELECT user_id FROM users WHERE username = ? AND email = ?", [username, email], (err, data) => {
                    if (err) {
                        console.log(err);
                    } else {
                        user_id = data[0].user_id;
                        const token = jwt.sign({ id: user_id }, "cms", { expiresIn });

                        Connection.query("UPDATE users SET jwt_token = ? WHERE username = ? AND email = ?", [token, username, email], (err, data) => {
                            if (err) console.log(err);
                            else {
                                console.log("User table is updated with jwt_token");
                                //console.log(data);
                                Connection.query("INSERT INTO session (user_id, session_id, time_created, expire_time) VALUES (?, ?, NOW(), NOW() + INTERVAL 3 DAY)", [user_id, token], (err, data) => {
                                    if (err) return console.log("HI"+err);
                                    return console.log("Inserted into session and user table");
                                });
                                
                                return res.status(200).json("User has been created with updated jwt_token");

                            }
                           

                            
                        });
                    }
                });
            });
        }
    });
};



const login = (req, res) => {
    const { username, password } = req.body;

    Connection.query("SELECT user_id, password FROM users WHERE username = ?", [username], (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (data.length === 0) {
            //console.log(data);
            return res.status(404).json("User not found");
        }

        const user_id = data[0].user_id;
        const storedPassword = data[0].password;


        const checkPass = bcrypt.compareSync(password, storedPassword);
        if (!checkPass) {
            return res.status(400).json("Wrong Password");
        }

        const expiresIn = 3 * 24 * 60 * 60;
        const token = jwt.sign({ id: user_id }, "cms", { expiresIn });
        res.cookie("cms_token", token, {
            httpOnly: true,
        }).status(200).json({ user_id, token });
        //req.user = { userId: user_id };
        
        Connection.query("UPDATE users SET jwt_token = ? WHERE username = ? AND password = ?", [token, username, storedPassword], (updateErr, updateResult) => {
            if (updateErr) {
                return res.status(500).json(updateErr);
            }
        }); 
    });
};

const logout=(req,res)=>{

    
    const userId = req.user.userId;
    //console.log("founded "+userId);
    Connection.query("delete from session where user_id=?",[userId],(err,data)=>{
        if(err) return console.log(err);

        return console.log("deleted session table row table after logout");
    })
    Connection.query("update users set jwt_token=NULL where user_id=?",[userId],(err,data)=>{
        if(err) return err;
        return console.log(data+"after update");
    });
    
    res.clearCookie("cms_token",{
        sameSite:"none",
        secure:true
    }).status(200).json("Logged out suceessfully")
};


module.exports={signup,login,logout};

