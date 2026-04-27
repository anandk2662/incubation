import React, { useState } from 'react';
import { team } from '../data/team';
import TeamCard from '../components/team/TeamCard';
import TeamModal from '../components/team/TeamModal';

export default function Team() {
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <div className="pt-20 sm:pt-28 min-h-screen">
      <div className="container">
        <header className="mb-10 sm:mb-16">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-4 text-text-primary">The Team</h1>
          <p className="text-base sm:text-lg text-text-secondary max-w-2xl leading-relaxed">
            A collective of specialists working together to push the boundaries of what's possible in software and hardware engineering.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-16 sm:pb-24">
          {team.map(member => (
            <div key={member.id} className="w-full flex justify-center">
              <TeamCard 
                member={member} 
                onClick={setSelectedMember} 
              />
            </div>
          ))}
        </div>
      </div>

      <TeamModal 
        isOpen={!!selectedMember} 
        onClose={() => setSelectedMember(null)} 
        member={selectedMember} 
      />
    </div>
  );
}
