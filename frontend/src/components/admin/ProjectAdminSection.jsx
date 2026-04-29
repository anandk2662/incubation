import { useState } from 'react';
import axios from 'axios';
import { Plus, ShieldCheck, Loader2, Trash2, X, Check } from 'lucide-react';
import {
  SectionCard,
  SectionHeader,
  PanelBody,
  InputField,
  TextAreaField,
  CheckboxField,
  buildEmptyProjectForm,
  projectToForm,
  splitList,
  numberValue,
  MiniStat,
} from './AdminShared';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

function ProjectFormRow({ projectForm, setProjectForm, onSave, onCancel, saving }) {
  return (
    <form className="grid gap-4 rounded-[28px] border border-border-primary bg-bg-surface p-5 sm:p-6 shadow-[0_12px_24px_rgba(0,0,0,0.12)] mb-4" onSubmit={onSave}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold text-text-primary">{projectForm._id ? 'Edit Project' : 'New Project'}</h3>
        <div className="flex gap-2">
          <button type="button" onClick={onCancel} className="p-2 rounded-full border border-border-primary text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-colors">
            <X size={16} />
          </button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-1">
        <InputField label="Title" value={projectForm.title} onChange={(event) => setProjectForm({ ...projectForm, title: event.target.value })} placeholder="Project title" required />
      </div>

      <InputField label="Subtitle" value={projectForm.subtitle} onChange={(event) => setProjectForm({ ...projectForm, subtitle: event.target.value })} placeholder="Short project subtitle" />

      <div className="grid gap-4 md:grid-cols-2">
        <InputField label="Category" value={projectForm.category} onChange={(event) => setProjectForm({ ...projectForm, category: event.target.value })} placeholder="AI" />
        <InputField label="Status" value={projectForm.status} onChange={(event) => setProjectForm({ ...projectForm, status: event.target.value })} placeholder="Active" />
      </div>

      <TextAreaField label="Description" value={projectForm.description} onChange={(event) => setProjectForm({ ...projectForm, description: event.target.value })} placeholder="Project description" />
      <TextAreaField label="Problem" value={projectForm.problem} onChange={(event) => setProjectForm({ ...projectForm, problem: event.target.value })} placeholder="Problem statement" />
      <TextAreaField label="Solution" value={projectForm.solution} onChange={(event) => setProjectForm({ ...projectForm, solution: event.target.value })} placeholder="Solution overview" />

      <div className="grid gap-4 lg:grid-cols-2">
        <TextAreaField label="Tech stack" value={projectForm.techStack} onChange={(event) => setProjectForm({ ...projectForm, techStack: event.target.value })} placeholder="React, Node.js, MongoDB" rows={2} />
        <TextAreaField label="Tags" value={projectForm.tags} onChange={(event) => setProjectForm({ ...projectForm, tags: event.target.value })} placeholder="AI, Infrastructure" rows={2} />
      </div>

      <TextAreaField label="Team" value={projectForm.team} onChange={(event) => setProjectForm({ ...projectForm, team: event.target.value })} placeholder="Aiko Nakamura, Sofia Martínez" rows={2} />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <InputField label="Demo URL" value={projectForm.demoUrl} onChange={(event) => setProjectForm({ ...projectForm, demoUrl: event.target.value })} placeholder="#" />
        <InputField label="GitHub URL" value={projectForm.githubUrl} onChange={(event) => setProjectForm({ ...projectForm, githubUrl: event.target.value })} placeholder="#" />
        <InputField label="Docs URL" value={projectForm.docsUrl} onChange={(event) => setProjectForm({ ...projectForm, docsUrl: event.target.value })} placeholder="#" />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <InputField label="Stars" type="number" value={projectForm.metricsStars} onChange={(event) => setProjectForm({ ...projectForm, metricsStars: event.target.value })} placeholder="0" />
        <InputField label="Forks" type="number" value={projectForm.metricsForks} onChange={(event) => setProjectForm({ ...projectForm, metricsForks: event.target.value })} placeholder="0" />
        <InputField label="Contributors" type="number" value={projectForm.metricsContributors} onChange={(event) => setProjectForm({ ...projectForm, metricsContributors: event.target.value })} placeholder="0" />
      </div>

      <TextAreaField label="Architecture" value={projectForm.architecture} onChange={(event) => setProjectForm({ ...projectForm, architecture: event.target.value })} placeholder="React UI, API layer, Worker" rows={2} />

      <CheckboxField label="Featured project" checked={projectForm.featured} onChange={(event) => setProjectForm({ ...projectForm, featured: event.target.checked })} />

      <div className="flex justify-end gap-3 pt-4 border-t border-border-primary">
        <button type="button" onClick={onCancel} disabled={saving} className="px-5 py-3 rounded-2xl border border-border-primary text-sm font-semibold text-text-primary hover:bg-bg-elevated transition-colors disabled:opacity-50">
          Cancel
        </button>
        <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-2xl border border-emerald-500 bg-emerald-500/20 px-5 py-3 text-sm font-semibold text-emerald-400 transition-colors hover:bg-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-60">
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
          Save Project
        </button>
      </div>
    </form>
  );
}

function ProjectRow({ project, onEdit, onDelete, deletingId }) {
  const isDeleting = deletingId === project._id;

  return (
    <div className="rounded-2xl border border-border-primary bg-bg-elevated p-4 mb-3 transition-transform duration-200 hover:-translate-y-0.5 shadow-sm group">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-tertiary">Project</span>
            {project.featured && <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-400">Featured</span>}
          </div>
          <h3 className="truncate text-lg font-bold tracking-tight text-text-primary">{project.title}</h3>
          <p className="text-sm text-text-secondary truncate">{project.subtitle} · {project.category} · {project.status}</p>
        </div>
        <div className="flex gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={onEdit}
            className="rounded-full border border-border-primary px-4 py-2 text-xs font-semibold text-text-primary transition-colors hover:bg-bg-surface hover:text-text-primary"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={onDelete}
            disabled={isDeleting}
            className="inline-flex items-center gap-1 rounded-full border border-rose-500/30 px-4 py-2 text-xs font-semibold text-rose-400 transition-colors hover:bg-rose-500/10 disabled:opacity-50"
          >
            {isDeleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProjectAdminSection({ projects, loadData, onShowToast }) {
  const [editingId, setEditingId] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [projectForm, setProjectForm] = useState(buildEmptyProjectForm());
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  function handleAddNew() {
    setIsAddingNew(true);
    setEditingId(null);
    setProjectForm(buildEmptyProjectForm());
  }

  function handleEdit(project) {
    setIsAddingNew(false);
    setEditingId(project._id);
    setProjectForm(projectToForm(project));
  }

  function handleCancel() {
    setIsAddingNew(false);
    setEditingId(null);
    setProjectForm(buildEmptyProjectForm());
  }

  async function handleSave(event) {
    event.preventDefault();
    setSaving(true);
    const payloadValues = { ...projectForm };
    delete payloadValues._id;

    const payload = {
      ...payloadValues,
      techStack: splitList(payloadValues.techStack),
      tags: splitList(payloadValues.tags),
      team: splitList(payloadValues.team),
      architecture: splitList(payloadValues.architecture),
      featured: payloadValues.featured,
      metrics: {
        stars: numberValue(payloadValues.metricsStars),
        forks: numberValue(payloadValues.metricsForks),
        contributors: numberValue(payloadValues.metricsContributors),
      },
    };

    try {
      if (editingId) {
        await axios.put(`${API_BASE_URL}/projects/${editingId}`, payload);
        onShowToast(`Updated project ${payload.title}`, 'success');
      } else {
        await axios.post(`${API_BASE_URL}/projects`, payload);
        onShowToast(`Created project ${payload.title}`, 'success');
      }

      handleCancel();
      await loadData();
    } catch (error) {
      const message = axios.isAxiosError(error) ? error.response?.data?.message || error.message : error.message;
      onShowToast(`Failed to save project: ${message}`, 'error');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    setDeletingId(id);
    try {
      await axios.delete(`${API_BASE_URL}/projects/${id}`);
      onShowToast('Project deleted successfully', 'success');
      if (editingId === id) {
        handleCancel();
      }
      await loadData();
    } catch (error) {
      const message = axios.isAxiosError(error) ? error.response?.data?.message || error.message : error.message;
      onShowToast(`Failed to delete project: ${message}`, 'error');
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <SectionCard id="projects-section">
      <div className="border-b border-border-primary px-5 py-5 sm:px-7 sm:py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SectionHeader title="Projects" subtitle="Manager" icon={ShieldCheck} note={`${projects.length} Records`} />
          <button
            onClick={handleAddNew}
            disabled={isAddingNew}
            className="inline-flex items-center gap-2 self-start sm:self-auto rounded-2xl border border-text-primary bg-text-primary px-5 py-3 text-sm font-semibold text-bg-primary transition-colors hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus size={16} />
            Add Project
          </button>
        </div>
      </div>

      <PanelBody>
        <div className="grid gap-2">
          {isAddingNew && (
            <ProjectFormRow 
              projectForm={projectForm} 
              setProjectForm={setProjectForm} 
              onSave={handleSave} 
              onCancel={handleCancel} 
              saving={saving} 
            />
          )}

          {projects.map((project) => (
            <div key={project._id}>
              {editingId === project._id ? (
                <ProjectFormRow 
                  projectForm={projectForm} 
                  setProjectForm={setProjectForm} 
                  onSave={handleSave} 
                  onCancel={handleCancel} 
                  saving={saving} 
                />
              ) : (
                <ProjectRow 
                  project={project} 
                  onEdit={() => handleEdit(project)} 
                  onDelete={() => handleDelete(project._id)} 
                  deletingId={deletingId}
                />
              )}
            </div>
          ))}

          {projects.length === 0 && !isAddingNew && (
            <div className="py-12 text-center text-text-tertiary">
              <ShieldCheck size={32} className="mx-auto mb-3 opacity-50" />
              <p>No projects found. Click "Add Project" to create one.</p>
            </div>
          )}
        </div>
      </PanelBody>
    </SectionCard>
  );
}
