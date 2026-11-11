import {Router} from "express"
import controllerLook from "../controllers/user.js"
const useRouter = Router()

useRouter 
    .get('/allUsers',controllerLook.allUsers)
    .get('/allFoods',controllerLook.allFoods)
    .post('/regisUser',controllerLook.regisUser)
    .post('/postOrder',controllerLook.postOrder)
    .get('/myOrder/:id',controllerLook.myOrder)

export default useRouter