const jwt = require('jsonwebtoken')

function verifyToken(req,res,next){
    
    const {token} = req.headers
      if (token) {
        try {
            const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
            req.user=decoded;
             next();

        } catch (error) {
        res.status(401).json({Message:"Invalid Token Provided"});
        }
    } else {
        res.status(401).json({Message:"No Token Provided"});
    }
}

// Verify Token & Authorization 
function verifyTokenAndAuthorization (req,res,next){
    verifyToken(req,res,()=>{
        if (req.user.id===req.params.id ||req.user.isAdmin){
            next()
        }else{
         return res.status(403).json({Message:"you are not allowed"})

        }
    })
}
// Verify Token & Admin 
function verifyTokenAndAdmin (req,res,next){
    verifyToken(req,res,()=>{
        if (req.user.isAdmin){
            next()
        }else{
         return res.status(403).json({Message:"YOU are not allowed"})

        }
    })
}
module.exports={verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin};