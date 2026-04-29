import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { ArrowRight, Database, Layers3, Users } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import {
  authenticateAdmin,
  hasAdminCredentials,
  isAdminSessionActive,
  setAdminSessionActive,
} from '../lib/adminAuth';
import ProjectAdminSection from '../components/admin/ProjectAdminSection';
import MemberAdminSection from '../components/admin/MemberAdminSection';
import Toast from '../components/ui/Toast';
import { InputField } from '../components/admin/AdminShared';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
const SECTION = { projects: 'projects', members: 'members' };

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-[24px] border border-border-primary bg-bg-surface p-5 shadow-[0_18px_40px_rgba(0,0,0,0.16)]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-text-tertiary">{label}</p>
          <p className="text-3xl font-black tracking-tight text-text-primary">{value}</p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border-primary bg-bg-elevated text-text-primary">
          <Icon size={18} />
        </div>
      </div>
    </div>
  );
}

function isAxiosError(error) {
  return axios.isAxiosError(error);
}

export default function Admin() {
  const { projects: siteProjects, team: siteTeam, syncError: contextSyncError } = useSiteContent();
  const [projects, setProjects] = useState(siteProjects);
  const [team, setTeam] = useState(siteTeam);
  const [loading, setLoading] = useState(true);
  
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [syncError, setSyncError] = useState(contextSyncError);

  const [apiStatus, setApiStatus] = useState('Checking backend...');
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => isAdminSessionActive());
  const [activeSection, setActiveSection] = useState(SECTION.projects);

  const projectCount = useMemo(() => projects.length, [projects]);
  const memberCount = useMemo(() => team.length, [team]);

  const showToast = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
  };

  async function loadData() {
    setLoading(true);
    setSyncError('');

    try {
      const [projectsResponse, membersResponse, healthResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/projects`),
        axios.get(`${API_BASE_URL}/members`),
        axios.get(`${API_BASE_URL}/health`),
      ]);

      setProjects(Array.isArray(projectsResponse.data) ? projectsResponse.data : []);
      setTeam(Array.isArray(membersResponse.data) ? membersResponse.data : []);
      setApiStatus(healthResponse.data?.ok ? 'Backend online' : 'Backend responded without a health flag');
    } catch (error) {
      const text = isAxiosError(error)
        ? error.response?.data?.message || error.message
        : error instanceof Error
          ? error.message
          : 'Failed to load admin data.';

      setSyncError(text);
      setApiStatus(text);
      setProjects(siteProjects);
      setTeam(siteTeam);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!hasAdminCredentials()) {
      setApiStatus('Admin credentials are not configured');
      setLoading(false);
      return;
    }

    if (isAuthenticated) {
      loadData();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  function handleLoginSubmit(event) {
    event.preventDefault();

    if (!hasAdminCredentials()) {
      setLoginError('Admin credentials are missing from the frontend environment.');
      return;
    }

    if (!authenticateAdmin(loginForm.username, loginForm.password)) {
      setLoginError('Invalid admin credentials.');
      return;
    }

    setAdminSessionActive(true);
    setIsAuthenticated(true);
    setLoginError('');
  }

  function handleLogout() {
    setAdminSessionActive(false);
    setIsAuthenticated(false);
    setLoginForm({ username: '', password: '' });
    setActiveSection(SECTION.projects);
    setSyncError('');
  }

  if (!hasAdminCredentials()) {
    return (
      <div className="min-h-screen pb-16 pt-32 sm:pt-28">
        <div className="container max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-4xl border border-border-primary bg-bg-surface p-7 shadow-[0_28px_70px_rgba(0,0,0,0.24)] sm:p-10">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-text-tertiary">Admin Access</p>
            <h1 className="max-w-3xl text-[clamp(38px,7vw,72px)] font-black leading-[0.92] tracking-tight text-text-primary">Configure admin credentials in the frontend env file.</h1>
            <p className="mt-4 max-w-2xl leading-relaxed text-text-secondary">Add VITE_ADMIN_USERNAME and VITE_ADMIN_PASSWORD in frontend/.env, then reload the app. The admin page uses those values for a basic client-side login gate.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pb-16 pt-32 sm:pt-28">
        <div className="container max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-4xl border border-border-primary bg-bg-surface p-7 shadow-[0_28px_70px_rgba(0,0,0,0.24)] sm:p-10">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-text-tertiary">Admin Login</p>
            <h1 className="max-w-3xl text-[clamp(38px,7vw,72px)] font-black leading-[0.92] tracking-tight text-text-primary">Sign in to manage projects and team members.</h1>
            <form className="mt-8 grid gap-4" onSubmit={handleLoginSubmit}>
              <InputField label="Username" value={loginForm.username} onChange={(event) => setLoginForm((current) => ({ ...current, username: event.target.value }))} placeholder="Admin username" />
              <InputField label="Password" type="password" value={loginForm.password} onChange={(event) => setLoginForm((current) => ({ ...current, password: event.target.value }))} placeholder="Admin password" />

              {loginError && <div className="rounded-[20px] border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">{loginError}</div>}

              <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-text-primary bg-text-primary px-5 py-3 text-sm font-semibold text-bg-primary no-underline transition-colors hover:bg-white/90">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16 pt-32 sm:pt-28">
      <Toast 
        message={toastMessage} 
        type={toastType} 
        onClose={() => setToastMessage('')} 
      />

      <div className="container max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:gap-10">
          <section className="grid items-stretch gap-6 xl:grid-cols-[1.25fr_0.75fr]">
            <div className="rounded-4xl border border-border-primary bg-bg-surface shadow-[0_28px_70px_rgba(0,0,0,0.24)]">
              <div className="relative overflow-hidden p-6 sm:p-8 lg:p-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_40%),linear-gradient(135deg,rgba(255,255,255,0.03),transparent_55%)]" />
                <div className="relative">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-text-tertiary">Admin Workspace</p>
                  <h1 className="max-w-3xl text-[clamp(34px,6vw,68px)] font-black leading-[0.92] tracking-tight text-text-primary">Manage projects and members.</h1>
                  
                  <div className="mt-7 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveSection(SECTION.projects)}
                      className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition-colors ${activeSection === SECTION.projects ? 'border border-text-primary bg-text-primary text-bg-primary' : 'border border-border-primary bg-bg-elevated text-text-primary hover:border-border-hover'}`}
                    >
                      Projects
                      {activeSection === SECTION.projects && <ArrowRight size={16} />}
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveSection(SECTION.members)}
                      className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition-colors ${activeSection === SECTION.members ? 'border border-text-primary bg-text-primary text-bg-primary' : 'border border-border-primary bg-bg-elevated text-text-primary hover:border-border-hover'}`}
                    >
                      Members
                      {activeSection === SECTION.members && <ArrowRight size={16} />}
                    </button>
                  </div>

                  <div className="mt-7 flex items-center justify-between gap-3 rounded-2xl border border-border-primary bg-bg-elevated px-4 py-3 text-sm text-text-secondary">
                    <span>Admin session active</span>
                    <button type="button" onClick={handleLogout} className="font-semibold text-text-primary hover:underline">
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
              <StatCard icon={Layers3} label="Projects" value={projectCount} />
              <StatCard icon={Users} label="Members" value={memberCount} />
              <StatCard icon={Database} label="Data source" value={apiStatus} />
            </div>
          </section>

          {syncError && (
            <div className="rounded-[24px] border border-rose-500/30 bg-rose-500/10 px-5 py-4 text-sm text-rose-100">
              {syncError}
            </div>
          )}

          {loading ? (
            <div className="rounded-[28px] border border-border-primary bg-bg-surface p-6 text-sm text-text-secondary">Loading admin workspace...</div>
          ) : (
            <>
              {activeSection === SECTION.projects ? (
                <ProjectAdminSection projects={projects} loadData={loadData} onShowToast={showToast} />
              ) : (
                <MemberAdminSection team={team} loadData={loadData} onShowToast={showToast} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}