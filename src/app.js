import express, { json } from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

//Importing routes
import projectRoutes from './routes/projects';
import taskRoutes from './routes/tasks';

//Initialization
const app = express();

// middlewares
app.use(morgan('dev')); // para entender por consola lo que viene llegandi
app.use(json()); // para entender datos en formato json

app.use(bodyParser.urlencoded({
    extended: true
}));

// routes
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

export default app;