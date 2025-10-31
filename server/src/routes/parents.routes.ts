import { Router } from 'express'
import { addParent, getParents, getParent, updateParent, deleteParent } from '../controllers/parentController'
import { authenticateToken } from '../middlwares/auth'

const router = Router()

// POST /api/parents
router.post('/', authenticateToken, addParent)

// GET /api/parents
router.get('/', authenticateToken, getParents)

// GET /api/parents/:id
router.get('/:id', authenticateToken, getParent)

// PUT /api/parents/:id
router.put('/:id', authenticateToken, updateParent)

// DELETE /api/parents/:id
router.delete('/:id', authenticateToken, deleteParent)

export default router