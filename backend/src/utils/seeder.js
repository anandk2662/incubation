import { connectDatabase } from '../config/db.js';
import { initialProjects, initialTeam } from '../data/seedData.js';
import Member from '../models/memberModel.js';
import Project from '../models/projectModel.js';

async function seedCollectionIfEmpty(model, documents) {
  await model.init();

  const existingCount = await model.countDocuments();

  if (existingCount > 0 || documents.length === 0) {
    return false;
  }

  await model.insertMany(documents);
  return true;
}

export async function seedDatabase() {
  await connectDatabase();

  const [projectsSeeded, membersSeeded] = await Promise.all([
    seedCollectionIfEmpty(Project, initialProjects),
    seedCollectionIfEmpty(Member, initialTeam),
  ]);

  return {
    projectsSeeded,
    membersSeeded,
  };
}