
import React from 'react';

interface ProjectCardProps {
  title: string;
  category: string;
  image: string;
  description?: string;
  aspect: string;
  featured?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, category, image, description, aspect, featured }) => {
  return (
    <div className="group relative transition-all duration-500 cursor-pointer">
      {/* Dynamic Background Glow on Hover */}
      <div className="absolute -inset-4 bg-primary/20 blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 -z-10 rounded-full scale-75 group-hover:scale-100"></div>
      
      {/* Image Container */}
      <div className={`overflow-hidden bg-zinc-100 dark:bg-zinc-900 ${aspect} relative`}>
        <img 
          alt={title} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-110" 
          src={image} 
          onError={(e) => {
             // Fallback if image doesn't exist
             e.currentTarget.src = "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800";
          }}
        />
        {/* Overlay subtle texture */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-700 pointer-events-none"></div>
        
        {/* View Details Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-background-dark/20 backdrop-blur-sm">
           <span className="px-6 py-2 border border-white text-white text-[10px] uppercase tracking-widest mono-font">View Details</span>
        </div>
      </div>

      {/* Content */}
      <div className={`mt-6 flex ${featured ? 'flex-col md:flex-row justify-between items-start md:items-end' : 'justify-between items-start'}`}>
        <div className={featured ? 'max-w-xl' : ''}>
          <p className="text-[10px] text-primary mb-2 uppercase tracking-[0.2em] mono-font font-medium">{category}</p>
          <h3 className={`font-medium tracking-tighter mono-font group-hover:translate-x-2 transition-transform duration-500 ${featured ? 'text-3xl md:text-5xl mb-6' : 'text-xl md:text-2xl'}`}>
            {title}
          </h3>
          {description && (
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light mb-4">
              {description}
            </p>
          )}
        </div>
        
        {featured ? (
          <span className="material-icons-outlined text-4xl group-hover:text-primary transition-all duration-500 translate-y-0 group-hover:-translate-y-2">arrow_right_alt</span>
        ) : (
          <span className="material-icons-outlined text-2xl group-hover:rotate-45 group-hover:text-primary transition-all duration-500">north_east</span>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
