import { useState } from 'react';
import axios from 'axios';
import { Plus, Users, Loader2, Trash2, X, Check } from 'lucide-react';
import {
  SectionCard,
  SectionHeader,
  PanelBody,
  InputField,
  TextAreaField,
  buildEmptyMemberForm,
  memberToForm,
  splitList,
  numberValue,
} from './AdminShared';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

function MemberFormRow({ memberForm, setMemberForm, onSave, onCancel, saving }) {
  return (
    <form className="grid gap-4 rounded-[28px] border border-border-primary bg-bg-surface p-5 sm:p-6 shadow-[0_12px_24px_rgba(0,0,0,0.12)] mb-4" onSubmit={onSave}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold text-text-primary">{memberForm._id ? 'Edit Member' : 'New Member'}</h3>
        <div className="flex gap-2">
          <button type="button" onClick={onCancel} className="p-2 rounded-full border border-border-primary text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-colors">
            <X size={16} />
          </button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-1">
        <InputField label="Name" value={memberForm.name} onChange={(event) => setMemberForm({ ...memberForm, name: event.target.value })} placeholder="Member name" required />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <InputField label="Role" value={memberForm.role} onChange={(event) => setMemberForm({ ...memberForm, role: event.target.value })} placeholder="Role" />
        <InputField label="Team" value={memberForm.team} onChange={(event) => setMemberForm({ ...memberForm, team: event.target.value })} placeholder="ai-data, engineering..." />
        <InputField label="Initials" value={memberForm.initials} onChange={(event) => setMemberForm({ ...memberForm, initials: event.target.value })} placeholder="AB" />
      </div>

      <TextAreaField label="Bio" value={memberForm.bio} onChange={(event) => setMemberForm({ ...memberForm, bio: event.target.value })} placeholder="Short member bio" />

      <div className="grid gap-4">
        <TextAreaField label="Skills" value={memberForm.skills} onChange={(event) => setMemberForm({ ...memberForm, skills: event.target.value })} placeholder="React, Node.js, MongoDB" rows={2} />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <InputField label="GitHub" value={memberForm.github} onChange={(event) => setMemberForm({ ...memberForm, github: event.target.value })} placeholder="#" />
        <InputField label="LinkedIn" value={memberForm.linkedin} onChange={(event) => setMemberForm({ ...memberForm, linkedin: event.target.value })} placeholder="#" />
        <InputField label="Current Project" value={memberForm.currentProject} onChange={(event) => setMemberForm({ ...memberForm, currentProject: event.target.value })} placeholder="Project name" />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-border-primary">
        <button type="button" onClick={onCancel} disabled={saving} className="px-5 py-3 rounded-2xl border border-border-primary text-sm font-semibold text-text-primary hover:bg-bg-elevated transition-colors disabled:opacity-50">
          Cancel
        </button>
        <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-2xl border border-emerald-500 bg-emerald-500/20 px-5 py-3 text-sm font-semibold text-emerald-400 transition-colors hover:bg-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-60">
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
          Save Member
        </button>
      </div>
    </form>
  );
}

function MemberRow({ member, onEdit, onDelete, deletingId }) {
  const isDeleting = deletingId === member._id;

  return (
    <div className="rounded-2xl border border-border-primary bg-bg-elevated p-4 mb-3 transition-transform duration-200 hover:-translate-y-0.5 shadow-sm group">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1 flex items-center gap-4">
          <div className="h-10 w-10 shrink-0 flex items-center justify-center rounded-full bg-text-primary text-bg-primary font-bold text-sm">
            {member.initials || member.name?.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-tertiary">Member</span>
            </div>
            <h3 className="truncate text-lg font-bold tracking-tight text-text-primary">{member.name}</h3>
            <p className="text-sm text-text-secondary truncate">{member.role}</p>
          </div>
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

export default function MemberAdminSection({ team, loadData, onShowToast }) {
  const [editingId, setEditingId] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [memberForm, setMemberForm] = useState(buildEmptyMemberForm());
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  function handleAddNew() {
    setIsAddingNew(true);
    setEditingId(null);
    setMemberForm(buildEmptyMemberForm());
  }

  function handleEdit(member) {
    setIsAddingNew(false);
    setEditingId(member._id);
    setMemberForm(memberToForm(member));
  }

  function handleCancel() {
    setIsAddingNew(false);
    setEditingId(null);
    setMemberForm(buildEmptyMemberForm());
  }

  async function handleSave(event) {
    event.preventDefault();
    setSaving(true);
    const payloadValues = { ...memberForm };
    delete payloadValues._id;

    const payload = {
      ...payloadValues,
      skills: splitList(payloadValues.skills),
      currentProject: payloadValues.currentProject,
      social: {
        github: payloadValues.github,
        linkedin: payloadValues.linkedin,
      },
    };

    try {
      if (editingId) {
        await axios.put(`${API_BASE_URL}/members/${editingId}`, payload);
        onShowToast(`Updated member ${payload.name}`, 'success');
      } else {
        await axios.post(`${API_BASE_URL}/members`, payload);
        onShowToast(`Created member ${payload.name}`, 'success');
      }

      handleCancel();
      await loadData();
    } catch (error) {
      const message = axios.isAxiosError(error) ? error.response?.data?.message || error.message : error.message;
      onShowToast(`Failed to save member: ${message}`, 'error');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this member?')) return;

    setDeletingId(id);
    try {
      await axios.delete(`${API_BASE_URL}/members/${id}`);
      onShowToast('Member deleted successfully', 'success');
      if (editingId === id) {
        handleCancel();
      }
      await loadData();
    } catch (error) {
      const message = axios.isAxiosError(error) ? error.response?.data?.message || error.message : error.message;
      onShowToast(`Failed to delete member: ${message}`, 'error');
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <SectionCard id="members-section">
      <div className="border-b border-border-primary px-5 py-5 sm:px-7 sm:py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SectionHeader title="Team Members" subtitle="Manager" icon={Users} note={`${team.length} Records`} />
          <button
            onClick={handleAddNew}
            disabled={isAddingNew}
            className="inline-flex items-center gap-2 self-start sm:self-auto rounded-2xl border border-text-primary bg-text-primary px-5 py-3 text-sm font-semibold text-bg-primary transition-colors hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus size={16} />
            Add Member
          </button>
        </div>
      </div>

      <PanelBody>
        <div className="grid gap-2">
          {isAddingNew && (
            <MemberFormRow 
              memberForm={memberForm} 
              setMemberForm={setMemberForm} 
              onSave={handleSave} 
              onCancel={handleCancel} 
              saving={saving} 
            />
          )}

          {team.map((member) => (
            <div key={member._id}>
              {editingId === member._id ? (
                <MemberFormRow 
                  memberForm={memberForm} 
                  setMemberForm={setMemberForm} 
                  onSave={handleSave} 
                  onCancel={handleCancel} 
                  saving={saving} 
                />
              ) : (
                <MemberRow 
                  member={member} 
                  onEdit={() => handleEdit(member)} 
                  onDelete={() => handleDelete(member._id)} 
                  deletingId={deletingId}
                />
              )}
            </div>
          ))}

          {team.length === 0 && !isAddingNew && (
            <div className="py-12 text-center text-text-tertiary">
              <Users size={32} className="mx-auto mb-3 opacity-50" />
              <p>No team members found. Click "Add Member" to create one.</p>
            </div>
          )}
        </div>
      </PanelBody>
    </SectionCard>
  );
}
