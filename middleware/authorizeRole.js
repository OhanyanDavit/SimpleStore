function authorizeRole(role){
    return function(req, res, next){
        if(!req.user){
            return res.status(404).json({message:"user did not found"})
        }
        if(req.user.role !== role){
            return res.status(400).json({message:"Not permissed"})
        }
        next()
    }
}
module.exports = authorizeRole