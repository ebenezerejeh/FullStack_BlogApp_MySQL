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
const q = "SELECT p.id, username, title, postdesc, p.img, u.img AS userImage, cat, date FROM users u JOIN posts p On u.id=p.uid WHERE p.id = ? "        

db.query(q, [req.params.id],(err,data)=>{
    if(err) return res.status(500).json(err)
    return res.status(200).json(data[0])
    console.log(data[0])
} )

}



export const addPost = (req, res)=>{
    const token = req.cookies.access_token
    console.log(token)
    if(!token) return res.status(401).json("Not Authenticated")

    Jwt.verify(token,"jwtkey",(err,userInfo)=>{
        if(err) return res.status(403).json('its not valid')

        // console.log(req.body)

        const q = "INSERT INTO posts(title, postdesc, img, cat, date, uid) VALUES (?)"

        const values = [
            req.body.title,
            req.body.postdesc,
            req.body.img,
            req.body.cat,
            req.body.date,
            userInfo.id

        ];
        console.log(values)

        db.query(q,[values], (err, data)=>{
            if (err){
                console.log(err)
                return res.status(500).json(err)
            }else{
            console.log(data)
            return res.json("post has been created")
            }
        })


    
    });


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
    const token = req.cookies.access_token
    console.log(token)
    if(!token) return res.status(401).json("Not Authenticated")

    Jwt.verify(token,"jwtkey",(err,userInfo)=>{
        if(err) return res.status(403).json('its not valid')
        
        const postId = req.params.id
        const q = "UPDATE posts SET title=?, postdesc=?, img=?, cat=? WHERE id = ? AND uid = ? "

        const values = [
            req.body.title,
            req.body.postdesc,
            req.body.img,
            req.body.cat,

        ]

        db.query(q,[...values, postId,userInfo.id], (err, date)=>{
            if (err) return res.status(500).json(err)
            return res.json("post has been updated")
        });


    
    });


    
}