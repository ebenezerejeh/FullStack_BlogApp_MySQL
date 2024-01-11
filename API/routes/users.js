import express from 'express'
import { getPosts } from '../controllers/posts.controller.js'

const router = express.Router()

router.get('/', getPosts)

export default router