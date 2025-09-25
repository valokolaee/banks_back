import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer'
const https = require('https');
const fs = require('fs');
import corsOptions from './config/cors.options';
import { sequelize } from './db';

// Routes
import authRoutes from './routes/auth.routes';
import uploadRoutes from './routes/upload.routes';
import databaseRoutes from './routes/database.routes';
import poolRoutes from './routes/pool.routes';
import bankRoutes from './routes/bank.routes';
import userRoutes from './routes/user.routes';
import imagesRoutes from './routes/images.rout';


// Middleware
import { logger } from './middleware/logger.middleware';
import { errorHandler } from './middleware/error.middleware';




const app = express();

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, '../src/public');

// Middlewares
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Parse JSON body before any other middleware
app.use(express.json());

// Now use the logger (it will have access to req.body)
app.use(logger);

// API Routes
app.use('/uploads', imagesRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/db', databaseRoutes);
app.use('/api/pools', poolRoutes);
app.use('/api/banks', bankRoutes);
app.use('/api/users', userRoutes);

// Serve static files
app.use(express.static(publicPath));

// SPA Fallback - all non-API routes serve index.html
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});



// Error handling middleware
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large',
        error: 'File size must be less than 10MB'
      });
    }

    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Too many files',
        error: 'Maximum 5 files allowed'
      });
    }
  }

  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: error.message
  });
});

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}


// Error handling middleware
app.use(errorHandler);

// Start Server
// const PORT = process.env.PORT || 3002;
const PORT = 3002;
// app.listen(PORT, async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('Database connection established successfully.');
//     console.log(`Server is running on http://localhost:${PORT}`);
//     console.log(`Backend URL: https://w.bankon.click`);
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// });



const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};
https.createServer(options, app).listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Backend URL: https://w.bankon.click`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

);


export default app;