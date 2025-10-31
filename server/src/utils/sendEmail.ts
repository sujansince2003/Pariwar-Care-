import nodemailer from 'nodemailer'
import prisma from '../db/db.config'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    secure: true,
    tls: {
        rejectUnauthorized: true
    }
})

const escapeHtml = (text: string): string => {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
}

export const sendVisitCompletionEmail = async (visitId: string) => {
    try {
        const visit = await prisma.visit.findUnique({
            where: { id: visitId },
            include: {
                Parent: {
                    include: {
                        children: true
                    }
                },
                vitals: true
            }
        })

        if (!visit) {
            console.warn(`Visit not found for email notification: ${visitId}`)
            return
        }

        const emailContent = `
            <h2>Health Visit Update for Your Parent</h2>
            <p>Hello,</p>
            <p>The nurse has completed the scheduled medical visit for <strong>${escapeHtml(visit.Parent.name)}</strong> on ${new Date(visit.completedAt!).toLocaleDateString()}.</p>
            
            ${visit.vitals ? `
            <h3>Vitals:</h3>
            <ul>
                ${visit.vitals.bp ? `<li>BP: ${escapeHtml(visit.vitals.bp)}</li>` : ''}
                ${visit.vitals.sugar ? `<li>Sugar: ${escapeHtml(visit.vitals.sugar)}</li>` : ''}
                ${visit.vitals.pulse ? `<li>Pulse: ${escapeHtml(visit.vitals.pulse)}</li>` : ''}
                ${visit.vitals.oxygen ? `<li>Oxygen Level: ${escapeHtml(visit.vitals.oxygen)}</li>` : ''}
                ${visit.vitals.temperature ? `<li>Temperature: ${escapeHtml(visit.vitals.temperature)}</li>` : ''}
            </ul>
            ` : ''}
            
            ${visit.vitals?.notes ? `<p><strong>Notes:</strong> "${escapeHtml(visit.vitals.notes)}"</p>` : ''}
            
            <p>You can log in to the app to view the full report.</p>
            <p>Regards,<br>Your Healthcare Team</p>
        `

        for (const child of visit.Parent.children) {
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: child.email,
                subject: `Health Visit Update for Your Parent`,
                html: emailContent
            })
        }
    } catch (error) {
        console.error('Email sending failed:', {
            visitId,
            error: error instanceof Error ? error.message : 'Unknown error',
            timestamp: new Date().toISOString()
        })
    }
}