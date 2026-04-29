import { connectDatabase } from '../config/db.js';
import { createHttpError } from '../utils/httpError.js';
import { normalizeText, toList, toNumber } from '../utils/contentTransforms.js';
import { toProjectResponse } from '../utils/responseFormatters.js';
import Project from '../models/projectModel.js';

function normalizeProjectPayload(payload) {
  const title = normalizeText(payload.title);

  if (!title) {
    return null;
  }

  const metrics = payload.metrics && typeof payload.metrics === 'object' ? payload.metrics : {};

  return {
    title,
    subtitle: normalizeText(payload.subtitle),
    category: normalizeText(payload.category, 'AI'),
    status: normalizeText(payload.status, 'Active'),
    description: normalizeText(payload.description),
    problem: normalizeText(payload.problem),
    solution: normalizeText(payload.solution),
    techStack: toList(payload.techStack),
    tags: toList(payload.tags),
    team: toList(payload.team),
    featured: Boolean(payload.featured),
    demoUrl: normalizeText(payload.demoUrl, '#'),
    githubUrl: normalizeText(payload.githubUrl, '#'),
    docsUrl: normalizeText(payload.docsUrl, '#'),
    metrics: {
      stars: toNumber(metrics.stars ?? payload.stars),
      forks: toNumber(metrics.forks ?? payload.forks),
      contributors: toNumber(metrics.contributors ?? payload.contributors),
    },
    architecture: toList(payload.architecture),
  };
}

export async function listProjectsController(request, response) {
  await connectDatabase();
  const projects = await Project.find({}).sort({ title: 1 }).lean();
  response.json(projects.map(toProjectResponse));
}

export async function getProjectController(request, response) {
  await connectDatabase();
  const project = await Project.findById(request.params.id).lean();

  if (!project) {
    throw createHttpError(404, 'Project not found.');
  }

  response.json(toProjectResponse(project));
}

export async function createProjectController(request, response) {
  await connectDatabase();
  const nextProject = normalizeProjectPayload(request.body);

  if (!nextProject) {
    throw createHttpError(400, 'Project title is required.');
  }

  try {
    const project = await Project.create(nextProject);
    response.status(201).json(toProjectResponse(project.toObject()));
  } catch (error) {
    throw error;
  }
}

export async function updateProjectController(request, response) {
  await connectDatabase();
  const nextProject = normalizeProjectPayload(request.body);

  if (!nextProject) {
    throw createHttpError(400, 'Project title is required.');
  }

  try {
    const project = await Project.findByIdAndUpdate(request.params.id, nextProject, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      throw createHttpError(404, 'Project not found.');
    }

    response.json(toProjectResponse(project.toObject()));
  } catch (error) {
    throw error;
  }
}

export async function deleteProjectController(request, response) {
  await connectDatabase();
  const result = await Project.deleteOne({ _id: request.params.id });

  if (result.deletedCount === 0) {
    throw createHttpError(404, 'Project not found.');
  }

  response.sendStatus(204);
}
