/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';

const SiteContentContext = createContext(null);
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

function buildActivity(projects, team) {
  const featuredProject = projects.find((project) => project.featured) || projects[0];
  const leadMember = team[0];
  const secondaryProject = projects[1] || projects[0];

  return [
    featuredProject
      ? {
          id: `project-${featuredProject._id}`,
          actor: featuredProject.title,
          action: 'is live in the portfolio as',
          subject: featuredProject.category,
          description: featuredProject.description,
          time: 'Live now',
          project: featuredProject.title,
          icon: 'rocket',
        }
      : null,
    leadMember
      ? {
          id: `member-${leadMember._id}`,
          actor: leadMember.name,
          action: 'is active on',
          subject: leadMember.currentProject || 'the current roadmap',
          description: leadMember.role,
          time: 'Current team',
          project: leadMember.currentProject || leadMember.name,
          icon: 'user-plus',
        }
      : null,
    secondaryProject
      ? {
          id: `sync-${secondaryProject._id}`,
          actor: 'MongoDB sync',
          action: 'updated',
          subject: secondaryProject.title,
          description: `${projects.length} projects and ${team.length} team members are loaded from the backend.`,
          time: 'Synced',
          project: secondaryProject.title,
          icon: 'package',
        }
      : null,
  ].filter(Boolean);
}

export function SiteContentProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [team, setTeam] = useState([]);
  const [syncError, setSyncError] = useState('');
  const activity = useMemo(() => buildActivity(projects, team), [projects, team]);

  useEffect(() => {
    const cancelSource = axios.CancelToken.source();

    async function loadContent() {
      try {
        const [projectsResponse, membersResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/projects`, { cancelToken: cancelSource.token }),
          axios.get(`${API_BASE_URL}/members`, { cancelToken: cancelSource.token }),
        ]);

        setProjects(Array.isArray(projectsResponse.data) ? projectsResponse.data : []);
        setTeam(Array.isArray(membersResponse.data) ? membersResponse.data : []);
        setSyncError('');
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }

        const message = axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : error instanceof Error
            ? error.message
            : 'Failed to sync content from the backend.';

        setSyncError(message);
      }
    }

    loadContent();

    return () => {
      cancelSource.cancel('Site content request cancelled.');
    };
  }, []);

  const value = {
    projects,
    team,
    activity,
    syncError,
  };

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  const context = useContext(SiteContentContext);

  if (!context) {
    throw new Error('useSiteContent must be used within a SiteContentProvider');
  }

  return context;
}