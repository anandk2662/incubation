import React from 'react';
import Hero from '../components/sections/Hero';
import Pipeline from '../components/sections/Pipeline';
import ProjectsGrid from '../components/sections/ProjectsGrid';
import DemoPreview from '../components/sections/DemoPreview';
import ActivityFeed from '../components/sections/ActivityFeed';
import TeamCarousel from '../components/team/TeamCarousel';

export default function Landing() {
  return (
    <div className="landing-page overflow-x-hidden">
      <Hero />
      
      <div className="py-8 sm:py-14 lg:py-20">
        <div className="container">
          <Pipeline />
        </div>
      </div>
      
      <div className="py-8 sm:py-14 lg:py-20 bg-bg-secondary/30">
        <div className="container">
          <ProjectsGrid featuredOnly={true} />
        </div>
      </div>
      
      <div className="py-8 sm:py-14 lg:py-20">
        <div className="container">
          <DemoPreview />
        </div>
      </div>
      
      <div className="py-8 sm:py-14 lg:py-20 bg-bg-secondary/30">
        <div className="container">
          <ActivityFeed />
        </div>
      </div>
      
      <div className="py-8 sm:py-14 lg:py-20">
        <TeamCarousel />
      </div>
    </div>
  );
}
