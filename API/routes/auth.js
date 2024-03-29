import express from 'express'
// import { getPosts } from '../controllers/posts.controller.js'
import { register } from '../controllers/auth.controller.js'
import { login } from '../controllers/auth.controller.js'
import { logout } from '../controllers/auth.controller.js'


const router = express.Router()

router.post('/register', register)


router.post('/login', login)


router.delete('/logout', logout)

export default router