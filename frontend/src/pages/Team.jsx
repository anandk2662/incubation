import { useState, useMemo } from 'react';
import { ArrowLeft, Users } from 'lucide-react';
import TeamCard from '../components/team/TeamCard';
import TeamModal from '../components/team/TeamModal';
import { useSiteContent } from '../context/SiteContentContext';
import { motion, AnimatePresence } from 'framer-motion';

const TEAM_CATEGORIES = [
  { id: 'ai-data', name: 'AI & Data', icon: '🧠', roles: ['AI Research Lead', 'ML Engineer', 'Data Scientist'] },
  { id: 'engineering', name: 'Product Engineering', icon: '⚡', roles: ['Full-Stack Engineer', 'Backend Architect'] },
  { id: 'design', name: 'Design', icon: '✨', roles: ['Product Designer'] },
  { id: 'infra-security', name: 'Infrastructure & Security', icon: '🛡️', roles: ['Infrastructure Engineer', 'Security Engineer'] },
  { id: 'general', name: 'General', icon: '🌐', roles: [] }, // Fallback
];

export default function Team() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const { team } = useSiteContent();

  const groupedTeams = useMemo(() => {
    const groups = TEAM_CATEGORIES.map(category => ({
      ...category,
      members: [],
    }));

    team.forEach(member => {
      let matched = false;
      for (const group of groups) {
        if (group.id === member.team || (!member.team && group.id === 'general')) {
          group.members.push(member);
          matched = true;
          break;
        }
      }
      if (!matched) {
        const generalGroup = groups.find(g => g.id === 'general');
        if (generalGroup) generalGroup.members.push(member);
      }
    });

    return groups.filter(g => g.members.length > 0);
  }, [team]);

  const activeTeam = useMemo(() => {
    return groupedTeams.find(g => g.id === selectedTeamId);
  }, [groupedTeams, selectedTeamId]);

  return (
    <div className="pt-32 sm:pt-28 min-h-screen">
      <div className="container">
        <header className="mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-3 text-text-primary">
            {selectedTeamId ? activeTeam?.name : 'The Team'}
          </h1>
          <p className="text-base sm:text-lg text-text-secondary max-w-2xl leading-relaxed">
            {selectedTeamId 
              ? `Meet the specialists driving our ${activeTeam?.name} initiatives.`
              : "A collective of specialists working together to push the boundaries of what's possible in software and hardware engineering."}
          </p>
          
          <AnimatePresence>
            {selectedTeamId && (
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                onClick={() => setSelectedTeamId(null)}
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-border-primary bg-bg-elevated px-4 py-2 text-sm font-semibold text-text-primary transition-colors hover:bg-bg-surface"
              >
                <ArrowLeft size={16} />
                Back to all teams
              </motion.button>
            )}
          </AnimatePresence>
        </header>

        <AnimatePresence mode="wait">
          {!selectedTeamId ? (
            <motion.div
              key="teams-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-12 sm:pb-16"
            >
              {groupedTeams.map(group => (
                <button
                  key={group.id}
                  onClick={() => setSelectedTeamId(group.id)}
                  className="group relative flex flex-col items-start gap-4 overflow-hidden rounded-3xl border border-border-primary bg-bg-surface p-6 sm:p-8 text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-text-primary focus:ring-offset-2 focus:ring-offset-bg-primary"
                >
                  <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-bg-elevated text-2xl shadow-inner">
                    {group.icon}
                  </div>
                  
                  <div>
                    <h3 className="mb-2 text-2xl font-bold tracking-tight text-text-primary group-hover:text-text-primary">
                      {group.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm font-medium text-text-secondary">
                      <Users size={16} />
                      {group.members.length} {group.members.length === 1 ? 'member' : 'members'}
                    </div>
                  </div>
                  
                  <div className="mt-4 flex -space-x-3">
                    {group.members.slice(0, 4).map((member, i) => (
                      <div 
                        key={member._id} 
                        className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-bg-surface bg-text-primary text-xs font-bold text-bg-primary shadow-sm z-10"
                        style={{ zIndex: 10 - i }}
                      >
                        {member.initials || member.name.charAt(0)}
                      </div>
                    ))}
                    {group.members.length > 4 && (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-bg-surface bg-bg-elevated text-xs font-bold text-text-primary shadow-sm z-0">
                        +{group.members.length - 4}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="members-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12 sm:pb-16"
            >
              {activeTeam?.members.map(member => (
                <div key={member._id} className="w-full flex justify-center">
                  <TeamCard 
                    member={member} 
                    onClick={setSelectedMember} 
                  />
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <TeamModal 
        isOpen={!!selectedMember} 
        onClose={() => setSelectedMember(null)} 
        member={selectedMember} 
      />
    </div>
  );
}
