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
            let dateObj = new Date()
            let getMonth = dateObj.getUTCMonth() + 1
            let date = dateObj.getUTCDate() + '-' + getMonth + '-' + dateObj.getUTCFullYear() + ' ' + dateObj.getUTCHours() + ':' + dateObj.getUTCMinutes() + ':' + dateObj.getUTCSeconds()
            fs.appendFileSync(path.join(__dirname, 'trading_log.txt'), date + os.EOL, 'utf8')
            let data = fs.readFileSync(path.join(__dirname, 'trading_log.txt'))
            res.write(data + os.EOL)
            res.end()
        }
    })

    const PORT = process.env.PORT || 8080
    srv.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })

}

load()

