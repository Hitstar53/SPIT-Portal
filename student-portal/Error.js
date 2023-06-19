module.exports = (error,req,res,next)=>{
    error.statuscode = error.statuscode || 500
    error.message = error.message || "Internal server error"
    
    res.status(error.statuscode).json({
        success:false,
        message: error.message
    })
}