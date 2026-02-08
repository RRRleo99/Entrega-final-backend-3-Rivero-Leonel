import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';

const app = express();
const PORT = process.env.PORT || 8080;

// conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/adoptme')
    .then(() => console.log("✅ Conectado a MongoDB"))
    .catch(error => console.error("❌ Error DB:", error));

// configuración de Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentación de AdoptMe',
            description: 'API Proyecto Final Backend III',
        }
    },
    // Probamos múltiples rutas para asegurar que encuentre el YAML
    apis: ["./src/docs/*.yaml", "src/docs/*.yaml"]
};

const specs = swaggerJsdoc(swaggerOptions);

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Ruta de la documentación
app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

// Rutas de la API
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);

app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));

export default app;