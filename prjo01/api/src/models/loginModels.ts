
import { connection } from './connection';
import { RowDataPacket,FieldPacket } from 'mysql2';
import bycrypt from 'bcryptjs';


const getAllLogin = async () => {
    const[listLgoins] = await connection.execute('SELECT * FROM Login');
    return listLgoins;
}

const getLoginById =  async (id) => {
    const [login] = await connection.execute('select * from Login where id=?',[id])
    return login;
}

const getLoginByEmailSenha = async(body) => {
    const {login, senha} = body;
    
    const [loginExist] = await connection.execute('select * from Login where login=? and senha=?',[login, senha])
    return JSON.stringify(loginExist);
}

const getLoginByEmail =  async (body) => {
    const {login} = body;
     // Executa a consulta SQL     
     const [rows, fields]: [RowDataPacket[],FieldPacket[]]= await connection.execute(`SELECT * FROM Login WHERE login ='${login}'`);
     const loginExistente = rows.find((row) => row.login === login);
     if(loginExistente){
        return  JSON.stringify(rows.find((row) => row.login === login));	
     }else{
        return  JSON.stringify({login: []});
     }
  
  
}

const createLogin =  async (body) => {
 
    // Cria o novo login
    const hash = await bycrypt.hash(body.senha, 10)
    const {login} = body;
    const query = 'INSERT INTO Login(login, senha,status) VALUES (?, ?, ?)';
    const [newlogin] = await connection.execute(query,[login, hash, 1]);
    return {insertId: newlogin};    
}

export default{
    getAllLogin,
    getLoginById,
    createLogin,
    getLoginByEmail,
    getLoginByEmailSenha
}