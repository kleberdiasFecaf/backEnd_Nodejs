import loginmodule from '../models/loginModels'
import bycrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {config} from 'dotenv'

config

const getAllLogin = async (_req,res) => {
    const listLgoins = await loginmodule.getAllLogin();
    return  res.status(200).json(listLgoins);
}

const getLoginById =  async (req,res) => {
    const {id} = req.params;
    const login = await loginmodule.getLoginById(id)
    return res.status(200).json(login);
}

const postLogin =  async (req,res) => {
const {login, senha} = req.body;
    if(login == "" || login == null){
        return res.status(422).json({message: 'Login e senha não podem ser nulos'})
    }
    if(senha == "" || senha == null){
        return res.status(422).json({message: 'Senha não podem ser nulos'})
    }

    const existLogin = await loginmodule.getLoginByEmail(req.body)
    const jsonLogin = JSON.parse(existLogin)
    const senha_hash = jsonLogin.senha

     req.body.senha = senha_hash
     const existValidarLoginSenha = await loginmodule.getLoginByEmailSenha(req.body)
     const jsonLoginValidar = JSON.parse(existValidarLoginSenha)
    
     if(jsonLoginValidar.length == 0){
        return res.status(401).json({message: 'Usuário não autorizado'}

        )}

    bycrypt.compare(senha, senha_hash, (err, result) => {
        if(err){
            console.error(err)
            return res.status(500).json({message: 'Erro ao comparar senhas'})
        }
    
        if(result){
             const {id} = jsonLogin
             const token = jwt.sign({userid:id}, process.env.SECRET,{expiresIn:400})
            return res.status(200).json({auth:true,token})
            
        }
    })

}

const createLogin =  async (req,res) => {
    const {login, senha} = req.body;
    if(login == "" || login == null){
        return res.status(422).json({message: 'Login e senha não podem ser nulos'})
    }
    if(senha == "" || senha == null){
        return res.status(422).json({message: 'Senha não podem ser nulos'})
    }

   const Listlogin = await loginmodule.getLoginByEmail(req.body)
  
   const logins = JSON.parse(Listlogin)
  
   if(logins.login.length > 0){  
        return res.status(422).json({message: 'Login existente Tente outro'}); 
   }
  
    //criar senha bcrypt
    const hash = await bycrypt.genSalt(20)
    const passworkHash = await bycrypt.hash(senha, hash)
    req.body.senha = passworkHash
    console.log(logins.login)
    const newlogin= await loginmodule.createLogin(req.body)
    return res.status(201).json(newlogin)
}

export default{
    getAllLogin,
    getLoginById,
    createLogin,
    postLogin
    
}