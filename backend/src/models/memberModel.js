import { Schema, model } from 'mongoose';

const memberSchema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, default: '' },
    team: { type: String, default: 'general' },
    initials: { type: String, default: '' },
    bio: { type: String, default: '' },
    skills: { type: [String], default: [] },
    currentProject: { type: String, default: '' },
    social: {
      github: { type: String, default: '#' },
      linkedin: { type: String, default: '#' },
    },
  },
  {
    versionKey: false,
  },
);

export default model('Member', memberSchema);
