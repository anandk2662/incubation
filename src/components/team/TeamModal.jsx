import React from 'react';
import Modal from '../ui/Modal';
import { Globe, Send, Briefcase, ExternalLink } from 'lucide-react';

export default function TeamModal({ isOpen, onClose, member }) {
  if (!member) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
        <div className="flex flex-col items-center text-center md:border-r border-border-primary md:pr-8 pb-6 md:pb-0 border-b md:border-b-0">
          <div className="w-30 h-30 rounded-full bg-bg-elevated border border-border-primary flex items-center justify-center text-5xl font-black text-text-primary tracking-tighter mb-6">
            {member.initials}
          </div>
          <div className="flex gap-6 mb-8">
            <div className="flex flex-col">
              <span className="text-lg font-black text-text-primary">{member.projects}</span>
              <span className="text-[10px] text-text-tertiary uppercase tracking-widest">Projects</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black text-text-primary">{member.commits}</span>
              <span className="text-[10px] text-text-tertiary uppercase tracking-widest">Commits</span>
            </div>
          </div>
          <div className="flex gap-4">
            {member.social.github && (
              <a href={member.social.github} className="text-text-tertiary hover:text-text-primary transition-colors">
                <Globe size={20} />
              </a>
            )}
            {member.social.twitter && (
              <a href={member.social.twitter} className="text-text-tertiary hover:text-text-primary transition-colors">
                <Send size={20} />
              </a>
            )}
            {member.social.linkedin && (
              <a href={member.social.linkedin} className="text-text-tertiary hover:text-text-primary transition-colors">
                <Briefcase size={20} />
              </a>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="mb-8">
            <h2 className="text-3xl font-black tracking-tight text-text-primary mb-1">{member.name}</h2>
            <p className="text-md font-medium text-text-secondary">{member.role}</p>
          </div>

          <div className="mb-8">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-text-tertiary mb-3">About</h3>
            <p className="text-base text-text-secondary leading-relaxed">{member.bio}</p>
          </div>

          <div className="mb-8">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-text-tertiary mb-3">Skills & Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {member.skills.map(skill => (
                <span key={skill} className="text-xs font-semibold bg-bg-elevated border border-border-primary px-3 py-1 rounded-sm text-text-secondary">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-text-tertiary mb-3">Top Contributions</h3>
            <ul className="flex flex-col gap-3 list-none p-0">
              {member.contributions.map(item => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-text-secondary">
                  <ExternalLink size={14} className="text-text-tertiary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Modal>
  );
}
