import * as express from 'express';
import EmployeeController from '../controllers/EmployeeController';
const userRoutes = express.Router();

userRoutes.get('/fetch', EmployeeController.fetch);
userRoutes.post('/create', EmployeeController.store);

export default userRoutes;