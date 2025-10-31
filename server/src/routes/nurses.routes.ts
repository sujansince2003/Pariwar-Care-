import { Router } from 'express'
import { getNurses } from '../controllers/visitController'
import { authenticateToken } from '../middlwares/auth'
import { requireRole } from '../middlwares/rbac'

const router = Router()

/**
 * @swagger
 * /api/nurses:
 *   get:
 *     tags: [Nurses]
 *     summary: Get list of nurses
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of available nurses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     nurses:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           email:
 *                             type: string
 */
router.get('/', authenticateToken, requireRole(['ADMIN']), getNurses)

export default router