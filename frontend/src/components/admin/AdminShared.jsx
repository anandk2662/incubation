import { Trash2 } from 'lucide-react';

export function InputField({ label, value, onChange, placeholder, type = 'text', required = false }) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-text-tertiary">
        {label} {required && <span className="text-rose-500">*</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="rounded-2xl border border-border-primary bg-bg-elevated px-4 py-3 text-sm text-text-primary outline-none transition-colors placeholder:text-text-tertiary focus:border-border-hover"
      />
    </label>
  );
}

export function TextAreaField({ label, value, onChange, placeholder, rows = 3, required = false }) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-text-tertiary">
        {label} {required && <span className="text-rose-500">*</span>}
      </span>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
        className="rounded-2xl border border-border-primary bg-bg-elevated px-4 py-3 text-sm text-text-primary outline-none transition-colors placeholder:text-text-tertiary focus:border-border-hover"
      />
    </label>
  );
}

export function CheckboxField({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-3 rounded-2xl border border-border-primary bg-bg-elevated px-4 py-3 text-sm text-text-primary">
      <input type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4 accent-text-primary" />
      <span>{label}</span>
    </label>
  );
}

export function SectionCard({ id, children }) {
  return (
    <section id={id} className="scroll-mt-28 overflow-hidden rounded-4xl border border-border-primary bg-bg-surface shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
      <div className="h-1 bg-linear-to-r from-transparent via-white/40 to-transparent" />
      {children}
    </section>
  );
}

export function SectionHeader({ title, subtitle, icon: Icon, note }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-border-primary bg-bg-elevated text-text-primary">
          <Icon size={18} />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-text-tertiary">{subtitle}</p>
          <h2 className="text-2xl font-black tracking-tight text-text-primary">{title}</h2>
        </div>
      </div>
      <div className="hidden rounded-full border border-border-primary bg-bg-elevated px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-text-tertiary sm:block">
        {note}
      </div>
    </div>
  );
}

export function PanelBody({ children }) {
  return <div className="grid gap-6 p-5 sm:p-7">{children}</div>;
}

export function MiniStat({ label, value }) {
  return (
    <div className="rounded-[20px] border border-border-primary bg-bg-elevated px-4 py-3">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-tertiary">{label}</p>
      <p className="mt-1 text-lg font-black tracking-tight text-text-primary">{value}</p>
    </div>
  );
}

export function buildEmptyProjectForm() {
  return {
    _id: '',
    title: '',
    subtitle: '',
    category: 'AI',
    status: 'Active',
    description: '',
    problem: '',
    solution: '',
    techStack: '',
    tags: '',
    team: '',
    featured: false,
    demoUrl: '#',
    githubUrl: '#',
    docsUrl: '#',
    metricsStars: '0',
    metricsForks: '0',
    metricsContributors: '0',
    architecture: '',
  };
}

export function buildEmptyMemberForm() {
  return {
    _id: '',
    name: '',
    role: '',
    team: 'general',
    initials: '',
    bio: '',
    skills: '',
    currentProject: '',
    github: '#',
    linkedin: '#',
  };
}

export function toCommaValue(items) {
  return Array.isArray(items) ? items.join(', ') : '';
}

export function projectToForm(project) {
  return {
    _id: project._id || '',
    title: project.title || '',
    subtitle: project.subtitle || '',
    category: project.category || 'AI',
    status: project.status || 'Active',
    description: project.description || '',
    problem: project.problem || '',
    solution: project.solution || '',
    techStack: toCommaValue(project.techStack),
    tags: toCommaValue(project.tags),
    team: toCommaValue(project.team),
    featured: Boolean(project.featured),
    demoUrl: project.demoUrl || '#',
    githubUrl: project.githubUrl || '#',
    docsUrl: project.docsUrl || '#',
    metricsStars: String(project.metrics?.stars ?? 0),
    metricsForks: String(project.metrics?.forks ?? 0),
    metricsContributors: String(project.metrics?.contributors ?? 0),
    architecture: toCommaValue(project.architecture),
  };
}

export function memberToForm(member) {
  return {
    _id: member._id ? String(member._id) : '',
    name: member.name || '',
    role: member.role || '',
    team: member.team || 'general',
    initials: member.initials || '',
    bio: member.bio || '',
    skills: toCommaValue(member.skills),
    currentProject: member.currentProject || '',
    github: member.social?.github || '#',
    linkedin: member.social?.linkedin || '#',
  };
}

export function splitList(value) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

export function numberValue(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}
