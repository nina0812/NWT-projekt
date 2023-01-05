const jwt=require('jsonwebtoken');


// function to parse token

const getTokenFromHeaders = (req) => {
    const { headers } = req;
    const authorization = headers['authorization'];
    // check for field authorization in request headers
    if(authorization && authorization.split(' ')[0] === 'Bearer')
      return authorization.split(' ')[1]; // return token value, token example (Token 6a7fds64jnf6...)
    // return null if not found
    return null;
};

//Authentication middleware
const requireLogin=(req,res,next)=>{
    try{
        //console.log(req.headers);
        const token = getTokenFromHeaders(req);
        //console.log(token);
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    }
    catch(error){
        res.status(403).send({error: 'Invalid token'});
    }
}


const verifyToken=async(req,res, next)=>{
    try{
      const {user}=req;

      if(!user)
        return res.sendStatus(403);

      res.sendStatus(200);
    }
    catch (err) {
      res.sendStatus(403);
    }
}

module.exports = {
    requireLogin,
    verifyToken
}