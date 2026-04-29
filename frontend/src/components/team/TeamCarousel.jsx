import { useState, useRef, useEffect } from 'react';
import TeamCard from './TeamCard';
import TeamModal from './TeamModal';
import { useSiteContent } from '../../context/SiteContentContext';

export default function TeamCarousel() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef(null);
  const { team } = useSiteContent();

  const displayTeam = [...team, ...team, ...team];

  useEffect(() => {
    if (scrollRef.current) {
      // Start at the middle set to allow scrolling left immediately
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth / 3;
    }
  }, [team.length]);

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    const thirdWidth = container.scrollWidth / 3;
    
    if (container.scrollLeft <= 5) {
      container.scrollLeft += thirdWidth;
    } else if (container.scrollLeft >= thirdWidth * 2) {
      container.scrollLeft -= thirdWidth;
    }
  };

  useEffect(() => {
    let animationFrameId;
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scroll = () => {
      if (!isPaused && scrollContainer) {
        scrollContainer.scrollLeft += 1;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  return (
    <section className="pb-12 sm:pb-20" id="team">
      <div className="container">
        <div className="mb-10 sm:mb-14">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-text-tertiary mb-2 block">People</span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 text-text-primary">The Dream Team</h2>
          <p className="text-lg text-text-secondary max-w-2xl leading-relaxed">
            A diverse group of engineers, researchers, and designers building the next generation of technology.
          </p>
        </div>
      </div>

      <div className="mt-8 relative w-full">
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory p-4 px-5 sm:px-10 lg:px-16 no-scrollbar"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          onScroll={handleScroll}
        >
          {displayTeam.map((member, index) => (
            <div key={`${member._id}-${index}`} className="snap-start">
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
    </section>
  );
}
