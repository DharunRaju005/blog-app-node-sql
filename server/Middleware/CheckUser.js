
const jwt=require("jsonwebtoken");
// Middleware to extract userId from JWT token and attach it to req.user

const AuthenticateUser = async(req, res, next) => {
    // Get JWT token from request cookies or headers
   const token = await req.cookies.cms_token;
   
    if (!token) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    // Verify JWT token and extract userId
    jwt.verify(token, "cms",(err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Unauthorized: Invalid token" });
        }
        req.user = { userId: decoded.id };
        next(); 
    });
};

module.exports= AuthenticateUser;

