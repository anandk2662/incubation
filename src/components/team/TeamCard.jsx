import React from 'react';
import { Globe, Send, Briefcase } from 'lucide-react';

export default function TeamCard({ member, onClick }) {
  return (
    <div className="w-[260px] shrink-0 bg-bg-surface border border-border-primary rounded-md p-5 relative overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-border-hover select-none group" onClick={() => onClick(member)}>
      <div className="mb-3">
        <div className="w-16 h-16 rounded-full bg-bg-elevated border border-border-primary flex items-center justify-center text-xl font-extrabold text-text-primary tracking-tighter">
          {member.initials}
        </div>
      </div>
      <div className="mb-2">
        <h3 className="text-md font-bold text-text-primary mb-0.5">{member.name}</h3>
        <p className="text-sm text-text-tertiary font-medium mb-3">{member.role}</p>
        <div className="flex gap-4">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-text-primary">{member.projects}</span>
            <span className="text-[10px] text-text-tertiary uppercase tracking-wider">Projects</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-text-primary">{(member.commits / 1000).toFixed(1)}k</span>
            <span className="text-[10px] text-text-tertiary uppercase tracking-wider">Commits</span>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-bg-primary/95 backdrop-blur-md flex flex-col justify-center items-center p-5 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-3">{member.bio}</p>
        <div className="flex gap-3 mb-6 text-text-tertiary">
          {member.social.github && <Globe size={16} />}
          {member.social.twitter && <Send size={16} />}
          {member.social.linkedin && <Briefcase size={16} />}
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-text-primary border-b border-text-primary pb-0.5">
          View Profile
        </span>
      </div>
    </div>
  );
}
