import * as express from 'express';
import EmployeeController from '../controllers/EmployeeController';
const router = express.Router();

router.get('/fetch', EmployeeController.fetch);
router.post('/create', EmployeeController.store);

export default router;