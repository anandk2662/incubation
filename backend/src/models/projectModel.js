import { Schema, model } from 'mongoose';

const projectSchema = new Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    category: { type: String, default: 'AI' },
    status: { type: String, default: 'Active' },
    description: { type: String, default: '' },
    problem: { type: String, default: '' },
    solution: { type: String, default: '' },
    techStack: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    team: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
    demoUrl: { type: String, default: '#' },
    githubUrl: { type: String, default: '#' },
    docsUrl: { type: String, default: '#' },
    metrics: {
      stars: { type: Number, default: 0 },
      forks: { type: Number, default: 0 },
      contributors: { type: Number, default: 0 },
    },
    architecture: { type: [String], default: [] },
  },
  {
    versionKey: false,
  },
);

export default model('Project', projectSchema);
