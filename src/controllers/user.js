import fs from "fs"
import {join} from "path"
const allUsers =(req,res)=>{
    let data=fs.readFileSync(join(process.cwd(),"src","db","users.json"),"utf-8")
    data=JSON.parse(data)
    res.status(200).json({status:200,data})
}
const allFoods=(req,res)=>{
    let data=fs.readFileSync(join(process.cwd(),"src","db","foods.json"),"utf-8")
    data=JSON.parse(data)
    res.status(200).json({status:200,data})
}
const regisUser=(req, res)=>{
    const {name, phone}=req.body
    let data=fs.readFileSync(join(process.cwd(),"src","db","users.json"),"utf-8")
    data=JSON.parse(data)
    let user =data.find(user => user.username == name)
    if(user) return res.status(400).json({status:400, message:"bunday ismli foydalanuvchi bor"})
    let newUser ={
        id:data.length? data.at(-1).id + 1 : 1,
        username:name,
        phone
    }
    data.push(newUser)
    fs.writeFileSync(join(process.cwd(),"src","db","users.json"),JSON.stringify(data,null,4))
    res.status(201).json({status:201, message:"user added"})
}
const postOrder=(req,res)=>{
    const {userId,foodId,count}=req.body
    let data=fs.readFileSync(join(process.cwd(),"src","db","orders.json"),"utf-8")
    let orderi=JSON.parse(fs.readFileSync(join(process.cwd(),"src","db","foods.json"),"utf-8"))

    data=JSON.parse(data)
    if(count>10) return res.status(400).json({status:400, message:"10 tadan ortiq mahsulot mumkin emas"}) 
    if(orderi.length<foodId) return res.status(400).json({status:400, message:"Bunday food yoq"})
    let newOrder={
        id:data.length? data.at(-1).id + 1 : 1,
        foodId,
        userId,
        count
    }
    data.push(newOrder)
    fs.writeFileSync(join(process.cwd(),"src","db","orders.json"),JSON.stringify(data,null,4))
    res.status(200).json({status:200, message:"food or foods added"})
}
const myOrder = (req, res)=>{
    const {id} =req.params
    let data=fs.readFileSync(join(process.cwd(),"src","db","orders.json"),"utf-8")
    data=JSON.parse(data)
    let mOrder=data.filter(mOrder => mOrder.userId == id )
    res.status(200).json({status:200, data:mOrder})
}
export default {
    allUsers,
    allFoods,
    regisUser,
    postOrder,
    myOrder
}