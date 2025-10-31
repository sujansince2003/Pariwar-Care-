import { Router } from 'express'
import { getParentTrends } from '../controllers/analyticsController'
import { authenticateToken } from '../middlwares/auth'

const router = Router()

router.get('/parent/:id/trends', authenticateToken, getParentTrends)

export default router