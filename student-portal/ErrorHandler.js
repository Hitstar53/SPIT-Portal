class ErrorHandler extends Error{
    constructor(statuscode,message){
        super(statuscode)
        this.message = message
    }
}