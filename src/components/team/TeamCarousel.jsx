import React, { useState } from 'react';
import { team } from '../../data/team';
import TeamCard from './TeamCard';
import TeamModal from './TeamModal';

export default function TeamCarousel() {
  const [selectedMember, setSelectedMember] = useState(null);

  // Duplicate team array for seamless infinite scroll
  const displayTeam = [...team, ...team];

  return (
    <section className="pb-16 sm:pb-32" id="team">
      <div className="container">
        <div className="mb-12 sm:mb-20">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-text-tertiary mb-3 block">People</span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-6 text-text-primary">The Dream Team</h2>
          <p className="text-lg text-text-secondary max-w-2xl leading-relaxed">
            A diverse group of engineers, researchers, and designers building the next generation of technology.
          </p>
        </div>
      </div>

      <div className="mt-10 overflow-hidden relative w-full">
        <div 
          className="flex gap-6 w-max p-4 [animation:carousel-scroll_40s_linear_infinite] hover:[animation-play-state:paused]"
        >
          {displayTeam.map((member, index) => (
            <TeamCard 
              key={`${member.id}-${index}`} 
              member={member} 
              onClick={setSelectedMember}
            />
          ))}
        </div>
      </div>

      <TeamModal 
        isOpen={!!selectedMember} 
        onClose={() => setSelectedMember(null)} 
        member={selectedMember} 
       />
    </section>
  );
}
