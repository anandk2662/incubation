import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler.js';
import {
  createMemberController,
  deleteMemberController,
  getMemberController,
  listMembersController,
  updateMemberController,
} from '../controllers/memberController.js';

const router = Router();

router.get('/', asyncHandler(listMembersController));
router.get('/:id', asyncHandler(getMemberController));
router.post('/', asyncHandler(createMemberController));
router.put('/:id', asyncHandler(updateMemberController));
router.patch('/:id', asyncHandler(updateMemberController));
router.delete('/:id', asyncHandler(deleteMemberController));

export default router;
