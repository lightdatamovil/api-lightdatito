// routes/auth.js
import { Router } from 'express';
import CustomException from '../models/custom_exception.js';
import { Status } from '../models/status.js';
import { login } from '../controllers/login/login.js';

const router = Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await login(email, password);
        return res
            .status(Status.ok)
            .json({
                body: result,
                message: 'Autenticación exitosa'
            });
    } catch (err) {
        if (err instanceof CustomException) {
            return res
                .status(err.status)
                .json({ title: err.title, message: err.message });
        }
        return res
            .status(Status.internalServerError)
            .json({ title: 'Error interno de auth', message: err.message });
    }
});

export default router;
