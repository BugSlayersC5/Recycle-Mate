import React from 'react';

const RecycleMateLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50 font-sans">
      <div className="relative w-40 h-48 md:w-52 md:h-64 flex flex-col items-center justify-end overflow-hidden">
        
        <div className="w-full h-3/4 bg-[#5CB85C] rounded-t-lg rounded-b-lg shadow-lg relative overflow-hidden">
          
          <div className="absolute inset-0 flex flex-row items-center justify-center px-2">
            
            <span className="text-[#2F6C2E] text-xl md:text-2xl font-bold opacity-0 animate-letter-reveal" style={{ animationDelay: '0.2s' }}>R</span>
            <span className="text-[#2F6C2E] text-xl md:text-2xl font-bold opacity-0 animate-letter-reveal" style={{ animationDelay: '0.4s' }}>E</span>
            <span className="text-[#2F6C2E] text-xl md:text-2xl font-bold opacity-0 animate-letter-reveal" style={{ animationDelay: '0.6s' }}>C</span>
            <span className="text-[#2F6C2E] text-xl md:text-2xl font-bold opacity-0 animate-letter-reveal" style={{ animationDelay: '0.8s' }}>Y</span>
            <span className="text-[#2F6C2E] text-xl md:text-2xl font-bold opacity-0 animate-letter-reveal" style={{ animationDelay: '1.0s' }}>C</span>
            <span className="text-[#2F6C2E] text-xl md:text-2xl font-bold opacity-0 animate-letter-reveal" style={{ animationDelay: '1.2s' }}>L</span>
            <span className="text-[#2F6C2E] text-xl md:text-2xl font-bold opacity-0 animate-letter-reveal" style={{ animationDelay: '1.4s' }}>E</span>
            <span className="text-[#2F6C2E] text-xl md:text-2xl font-bold opacity-0 animate-letter-reveal" style={{ animationDelay: '1.6s' }}>M</span>
            <span className="text-[#2F6C2E] text-xl md:text-2xl font-bold opacity-0 animate-letter-reveal" style={{ animationDelay: '1.8s' }}>A</span>
            <span className="text-[#2F6C2E] text-xl md:text-2xl font-bold opacity-0 animate-letter-reveal" style={{ animationDelay: '2.0s' }}>T</span>
            <span className="text-[#2F6C2E] text-xl md:text-2xl font-bold opacity-0 animate-letter-reveal" style={{ animationDelay: '2.2s' }}>E</span>
          </div>

          
          <div className="absolute top-2 left-0 right-0 h-1 bg-[#2F6C2E] opacity-20 rounded-full mx-4"></div>
          <div className="absolute top-6 left-0 right-0 h-1 bg-[#2F6C2E] opacity-20 rounded-full mx-4"></div>
          <div className="absolute bottom-2 left-0 right-0 h-1 bg-[#2F6C2E] opacity-20 rounded-full mx-4"></div>
        </div>

        <div className="absolute top-0 w-full h-1/4 bg-[#2F6C2E] rounded-t-lg shadow-xl origin-bottom animate-lid-open-close">
          
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-2 bg-[#FFF9C4] rounded-full"></div>
        </div>
      </div>

      
      <style>{`
        @keyframes lid-open-close {
          0%, 100% {
            transform: rotateX(0deg); /* Lid closed */
          }
          15% {
            transform: rotateX(-90deg); /* Lid open */
          }
          70% {
            transform: rotateX(-90deg); /* Lid stays open */
          }
        }

        @keyframes letter-reveal {
          0%, 15% {
            opacity: 0;
            transform: translateY(20px);
          }
          25% {
            opacity: 1;
            transform: translateY(0);
          }
          60% {
            opacity: 1;
            transform: translateY(0);
          }
          75%, 100% {
            opacity: 0;
            transform: translateY(-20px);
          }
        }

        .animate-lid-open-close {
          animation: lid-open-close 4s infinite ease-in-out;
        }

        .animate-letter-reveal {
          animation: letter-reveal 4s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default RecycleMateLoader;

