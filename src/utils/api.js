const jwt = require('jsonwebtoken');
class ApiService{
    static genarateAccessToken(user){
        return jwt.sign(
            {id:user.id},
            process.env.JWT_SECRET_KEY,
            {expiresIn:"1d"}
        )
    }
    static genarateRefreshToken(user){
        return jwt.sign(
            {id:user.id},
            process.env.JWT_REFRESH_SECRET,
            {expiresIn:"7d"}
        )
    }

}

module.exports = ApiService