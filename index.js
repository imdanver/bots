const http = require('http')
const fs = require('fs')
const path = require('path')
const os = require('os')

function load(){
    let srv = http.createServer(function(req, res){
        if(req.url === "/"){
            res.writeHead(200, {"Content-Type" : "text/html;charset=UTF-8"})
            res.write(fs.readFileSync(path.join(__dirname, 'index.html')))
            res.end()
        }
        if(req.url === "/data"){
            let fullDate = new Date()
            let dataBefore = fullDate.getUTCHours() + ':' + fullDate.getUTCMinutes() + ':' + fullDate.getUTCSeconds()
            fs.appendFileSync(path.join(__dirname, 'trading_log.txt'), dataBefore + os.EOL, 'utf8')
            let dataAfter = fs.readFileSync(path.join(__dirname, 'trading_log.txt'))
            res.write(dataAfter + os.EOL)
            res.end()
        }
    })

    const PORT = process.env.PORT || 8080
    srv.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })

}

load()

