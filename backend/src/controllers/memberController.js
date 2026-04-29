import { connectDatabase } from '../config/db.js';
import { createHttpError } from '../utils/httpError.js';
import { normalizeText, toList } from '../utils/contentTransforms.js';
import { toTeamResponse } from '../utils/responseFormatters.js';
import Member from '../models/memberModel.js';

function normalizeMemberPayload(payload) {
  const name = normalizeText(payload.name);

  if (!name) {
    return null;
  }

  const social = payload.social && typeof payload.social === 'object' ? payload.social : {};

  return {
    name,
    role: normalizeText(payload.role),
    team: normalizeText(payload.team, 'general'),
    initials: normalizeText(payload.initials),
    bio: normalizeText(payload.bio),
    skills: toList(payload.skills),
    currentProject: normalizeText(payload.currentProject),
    social: {
      github: normalizeText(social.github ?? payload.github, '#'),
      linkedin: normalizeText(social.linkedin ?? payload.linkedin, '#'),
    },
  };
}

export async function listMembersController(request, response) {
  await connectDatabase();
  const members = await Member.find({}).sort({ name: 1 }).lean();
  response.json(members.map(toTeamResponse));
}

export async function getMemberController(request, response) {
  await connectDatabase();
  const member = await Member.findById(request.params.id).lean();

  if (!member) {
    throw createHttpError(404, 'Member not found.');
  }

  response.json(toTeamResponse(member));
}

export async function createMemberController(request, response) {
  await connectDatabase();
  const nextMember = normalizeMemberPayload(request.body);

  if (!nextMember) {
    throw createHttpError(400, 'Member name is required.');
  }

  try {
    const member = await Member.create(nextMember);
    response.status(201).json(toTeamResponse(member.toObject()));
  } catch (error) {
    throw error;
  }
}

export async function updateMemberController(request, response) {
  await connectDatabase();
  const nextMember = normalizeMemberPayload(request.body);

  if (!nextMember) {
    throw createHttpError(400, 'Member name is required.');
  }

  try {
    const member = await Member.findByIdAndUpdate(request.params.id, nextMember, {
      new: true,
      runValidators: true,
    });

    if (!member) {
      throw createHttpError(404, 'Member not found.');
    }

    response.json(toTeamResponse(member.toObject()));
  } catch (error) {
    throw error;
  }
}

export async function deleteMemberController(request, response) {
  await connectDatabase();
  const result = await Member.deleteOne({ _id: request.params.id });

  if (result.deletedCount === 0) {
    throw createHttpError(404, 'Member not found.');
  }

  response.sendStatus(204);
}
