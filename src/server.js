import express from "express"
import useRouter from "./routers/users.js"
const app = express()
app.use(express.json())
app.use(useRouter)

app.listen(5050, (e)=> {if(e)console.log(e)})