const http = require('http')

let srv = http.createServer(function(req, res){
    res.writeHead(200, {"Content-Type" : "text/plain"})
    res.write("Hello, world!")
    res.end()
})

srv.listen(8080)

console.log('Listening on port 8080')