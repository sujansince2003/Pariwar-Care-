import { Router } from 'express'
import { scheduleVisit, getChildVisits, getNurses, assignNurseToVisit, getNurseVisits } from '../controllers/visitController'
import { authenticateToken } from '../middlwares/auth'
import { requireRole } from '../middlwares/rbac'

const router = Router()

/**
 * @swagger
 * /api/visits:
 *   post:
 *     tags: [Visits]
 *     summary: Schedule appointment
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - parentId
 *               - scheduledFor
 *               - visitType
 *             properties:
 *               parentId:
 *                 type: string
 *                 description: ID of the parent for the visit
 *               scheduledFor:
 *                 type: string
 *                 format: date-time
 *                 description: Preferred date and time for the visit
 *               visitType:
 *                 type: string
 *                 enum: [BASIC, FULL]
 *                 description: Type of visit
 *           example:
 *             parentId: "cmhf3fjfn0000iq38x6qrkzzp"
 *             scheduledFor: "2024-11-15T10:00:00Z"
 *             visitType: "BASIC"
 *     responses:
 *       201:
 *         description: Visit scheduled successfully
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
 *       400:
 *         description: Invalid data or parent not found
 */
router.post('/', authenticateToken, scheduleVisit)

/**
 * @swagger
 * /api/visits/child:
 *   get:
 *     tags: [Visits]
 *     summary: Get child's visits
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of visits for the logged-in child
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
 *                     visits:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           parentId:
 *                             type: string
 *                           scheduledFor:
 *                             type: string
 *                             format: date-time
 *                           visitType:
 *                             type: string
 *                             enum: [BASIC, FULL]
 *                           status:
 *                             type: string
 *                             enum: [PENDING, ASSIGNED, STARTED, COMPLETED]
 *                           Parent:
 *                             type: object
 *                             properties:
 *                               name:
 *                                 type: string
 *                               address:
 *                                 type: string
 *                           Nurse:
 *                             type: object
 *                             nullable: true
 *                             properties:
 *                               name:
 *                                 type: string
 *                               email:
 *                                 type: string
 *       400:
 *         description: Failed to retrieve visits
 */
router.get('/child', authenticateToken, getChildVisits)

/**
 * @swagger
 * /api/visits/{id}/assign:
 *   post:
 *     tags: [Visits]
 *     summary: Assign nurse to visit
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Visit ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nurseId
 *             properties:
 *               nurseId:
 *                 type: string
 *                 description: ID of the nurse to assign
 *     responses:
 *       200:
 *         description: Nurse assigned successfully
 */
router.post('/:id/assign', authenticateToken, requireRole(['ADMIN']), assignNurseToVisit)

/**
 * @swagger
 * /api/visits/nurse:
 *   get:
 *     tags: [Visits]
 *     summary: Get nurse's assigned visits
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of visits assigned to the logged-in nurse
 */
router.get('/nurse', authenticateToken, requireRole(['NURSE']), getNurseVisits)

export default router