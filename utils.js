function getPostData(req){
    return new Promise((resolve,reject)=>{
        try
        {
            let body = ''
            req.on('data', chunk => {
                body += chunk.toString(); // Convert Buffer to string
              });
            req.on('end',()=>{
                resolve(body)
            })
        }catch(err){
            reject(err)
        }
    })
}

module.exports = {getPostData}