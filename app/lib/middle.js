
module.exports = (req,res,next) => {
    
    if (req.query.access == 'admin'){
        next();
    }
}