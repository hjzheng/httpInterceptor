const requestHandler = [];
const requestErrors= [];
const responseErrors = [];
const responseHandler = [];

function $http(req) {
    const promise = null;
    const reject = val => {
        throw new Error(val)
    }
    try{
        const request = requestHandler.reduce((req, fn) => fn(req, reject), req);
        promise = fetch(request);
        return promise.then(res => {
            if(res.ok) {
                const temp = new Promise((resolve, reject) => {
                      const response = responseHandler.reduce((res, fn) => fn(res), res);
                      resolve(response);
                });
                return temp;
            }
            
        }).catch((val) => {
            responseErrors.reduce((val, fn) => fn(val), val);
        })
    }catch(val) {
        requestErrors.reduce((val, fn) => fn(val), val);
    }
    
}

function handlerRequest(fn) {
    requestHandler.push(fn)
}

function handlerResponse(fn) {
    responseHandler.push(fn)
}


export default {
    http,
    handlerRequest,
    handlerResponse
}



