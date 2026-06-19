import express from "express"
import{createServer} from "http"
import {Server} from "socket.io"

import {YSocketIO} from "y-socket.io/dist/server"

const app=express()

app.use(express.static("public"))

app.get('/', (req, res) => {
    res.sendFile(new URL('./public/index.html', import.meta.url))
})

const httpServer=createServer(app)

const io = new Server(httpServer,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
})

const ySocketIO=new YSocketIO(io, { persistence: false })
ySocketIO.initialize()

app.get('/health',(req,res)=>{
    res.status(200).json({
        message:"ok",
        success:true
    })
})

const PORT = Number(process.env.PORT) || 3000

// Error handling
httpServer.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`Port ${PORT} in use, trying port ${PORT + 1}...`)
        setTimeout(() => {
            httpServer.listen(PORT + 1)
        }, 1000)
    } else {
        console.error("Server error:", err)
    }
})

process.on('uncaughtException', (err) => {
    console.error("Uncaught Exception:", err)
})

const server = httpServer.listen(PORT, () => {
    console.log(`Server Is Running on port ${PORT}`)
})

server.keepAliveTimeout = 65000

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully')
    httpServer.close(() => {
        console.log('Server closed')
        process.exit(0)
    })
})