import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler.js';
import {
  createProjectController,
  deleteProjectController,
  getProjectController,
  listProjectsController,
  updateProjectController,
} from '../controllers/projectController.js';

const router = Router();

router.get('/', asyncHandler(listProjectsController));
router.get('/:id', asyncHandler(getProjectController));
router.post('/', asyncHandler(createProjectController));
router.put('/:id', asyncHandler(updateProjectController));
router.patch('/:id', asyncHandler(updateProjectController));
router.delete('/:id', asyncHandler(deleteProjectController));

export default router;
