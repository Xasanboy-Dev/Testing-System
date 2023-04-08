import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"
import api from "../router/api"
import test from "../router/test"

const PORT = process.env.PORT
const server = express()

server.use("/api", api)
server.use("/test", test)



server.listen(PORT, () => {
    console.log(`SERVER: http://localhost:${PORT}`)
})


