import { db } from "../db.js"
import  Jwt  from "jsonwebtoken"

export const getPosts = (req, res)=>{
    // the query is created based on whether ther is a category or not
    const q = req.query.cat ? "SELECT * FROM posts WHERE cat = ?" : "SELECT * FROM posts"

    db.query(q, [req.query.cat], (err,data) =>{
        if (err) return res.status(500).send(err);

        return res.status(200).json(data);
    })

    // res.json('this is a post')
}



export const getPost = (req, res)=>{
const q = "SELECT username, title, postdesc, p.img, u.img AS userImage, cat, date FROM users u JOIN posts p On u.id=p.uid WHERE p.id = ? "        

db.query(q, [req.params.id],(err,data)=>{
    if(err) return res.status(500).json(err)
    return res.status(200).json(data[0])
    console.log(data[0])
} )

}



export const addPost = (req, res)=>{
    res.json('this is a post')
}
export const deletePost = (req, res)=>{
    //skipped the jwt authentication
    const token = req.cookies.access_token
    console.log(token)
    if(!token) return res.status(401).json("Not Authenticated")

    Jwt.verify(token,"jwtkey",(err,userInfo)=>{
        if(err) return res.status(403).json('its not valid')

        const postId = req.params.id;
        console.log(postId)
        console.log(userInfo.id)

        const q = "DELETE FROM posts WHERE id = ? AND uid = ?"

        db.query(q,[postId,userInfo.id],(err,data)=>{
            if(err) return res.status(403).json('you can delete only your posts')

            return res.json('post has been deleted')
        })

    })



}
export const updatePost = (req, res)=>{
    res.json('this is a post')
}