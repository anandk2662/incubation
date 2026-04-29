import { motion } from 'framer-motion';
import { Tag, GitMerge, Award, Rocket, BookOpen, UserPlus, Package } from 'lucide-react';
import { useSiteContent } from '../../context/SiteContentContext';

const iconMap = {
  tag: Tag,
  'git-merge': GitMerge,
  award: Award,
  rocket: Rocket,
  'book-open': BookOpen,
  'user-plus': UserPlus,
  package: Package,
};

export default function ActivityFeed() {
  const { activity } = useSiteContent();

  return (
    <div className="max-w-200 mx-auto" id="activity">
      <div className="text-center mb-10 sm:mb-12">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-tertiary mb-2 block">Timeline</span>
        <h2 className="text-2xl sm:text-5xl font-black tracking-tight mb-3 text-text-primary">Latest Updates</h2>
        <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
          Real-time pulse of our development and research activities.
        </p>
      </div>

      <div className="flex flex-col max-h-104 sm:max-h-124 overflow-y-auto pr-3 gap-0 snap-y snap-mandatory">
        {activity.length > 0 ? activity.map((item, index) => {
          const Icon = iconMap[item.icon] || Tag;
          return (
            <motion.div 
              key={item.id} 
              className="flex gap-4 sm:gap-8 pb-6 sm:pb-10 snap-start"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <div className="flex flex-col items-center shrink-0">
                <div className="w-8 h-8 rounded-full bg-bg-surface border border-border-primary flex items-center justify-center text-text-tertiary z-10">
                  <Icon size={14} />
                </div>
                {index < activity.length - 1 && (
                  <div className="w-px flex-1 bg-border-primary mt-2" />
                )}
              </div>
              
              <div className="pt-1">
                <div className="flex flex-wrap items-baseline gap-1.5 text-sm sm:text-base leading-snug mb-1.5">
                  <span className="font-bold text-text-primary">{item.actor}</span>
                  <span className="text-text-secondary">{item.action}</span>
                  <span className="font-semibold text-text-primary">{item.subject}</span>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed mb-2.5"> {item.description}</p>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-text-tertiary uppercase tracking-tight">{item.time}</span>
                  <span className="text-[10px] text-text-tertiary font-mono bg-bg-elevated px-1.5 py-0.5 rounded-sm">
                    #{item.project.replace(/\s+/g, '').toLowerCase()}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        }) : (
          <div className="rounded-3xl border border-border-primary bg-bg-surface p-6 text-center text-text-secondary">
            No activity is available yet.
          </div>
        )}
      </div>
    </div>
  );
}
