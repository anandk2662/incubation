import Hero from '../components/sections/Hero';
import Pipeline from '../components/sections/Pipeline';
import DemoPreview from '../components/sections/DemoPreview';
import ActivityFeed from '../components/sections/ActivityFeed';
import TeamCarousel from '../components/team/TeamCarousel';

export default function Landing() {
  return (
    <div className="landing-page overflow-x-hidden">
      <Hero />
      
      <div className="py-6 sm:py-10 lg:py-12">
        <div className="container">
          <Pipeline />
        </div>
      </div>
      
      <div className="py-6 sm:py-10 lg:py-12">
        <div className="container">
          <DemoPreview />
        </div>
      </div>
      
      <div className="py-6 sm:py-10 lg:py-12 bg-bg-secondary/30">
        <div className="container">
          <ActivityFeed />
        </div>
      </div>
      
      <div className="py-6 sm:py-10 lg:py-12">
        <TeamCarousel />
      </div>
    </div>
  );
}
