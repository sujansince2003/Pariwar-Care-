import { Router } from 'express'
import { addParent, getParents, getParent, updateParent, deleteParent } from '../controllers/parentController'
import { authenticateToken } from '../middlwares/auth'

const router = Router()

/**
 * @swagger
 * /api/parents:
 *   post:
 *     tags: [Parents]
 *     summary: Add new parent
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               age: { type: integer }
 *               gender: { type: string }
 *               address: { type: string }
 *               diseases: { type: string }
 *               medications: { type: string }
 *               emergencyContact: { type: string }
 *     responses:
 *       201:
 *         description: Parent created successfully
 */
router.post('/', authenticateToken, addParent)

/**
 * @swagger
 * /api/parents:
 *   get:
 *     tags: [Parents]
 *     summary: Get all parents
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of parents
 */
router.get('/', authenticateToken, getParents)

/**
 * @swagger
 * /api/parents/{id}:
 *   get:
 *     tags: [Parents]
 *     summary: Get parent by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Parent details
 */
router.get('/:id', authenticateToken, getParent)

/**
 * @swagger
 * /api/parents/{id}:
 *   put:
 *     tags: [Parents]
 *     summary: Update parent
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               age: { type: integer }
 *               gender: { type: string }
 *               address: { type: string }
 *               diseases: { type: string }
 *               medications: { type: string }
 *               emergencyContact: { type: string }
 *     responses:
 *       200:
 *         description: Parent updated successfully
 */
router.put('/:id', authenticateToken, updateParent)

/**
 * @swagger
 * /api/parents/{id}:
 *   delete:
 *     tags: [Parents]
 *     summary: Delete parent
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Parent deleted successfully
 */
router.delete('/:id', authenticateToken, deleteParent)

export default router