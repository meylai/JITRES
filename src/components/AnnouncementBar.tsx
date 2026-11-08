import React from 'react';

interface AnnouncementBarProps {
  message?: string;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  message = 'FAITH IN EVERY THREAD. DISCOVER THE COLLECTION.'
}) => {
  return (
    <div
      className="bg-[#171717] text-white text-[11px] sm:text-[12px] tracking-[0.08em] uppercase py-2 px-4 text-center font-medium min-h-[32px] flex items-center justify-center transition-colors"
      role="region"
      aria-label="Announcement"
    >
      <span>{message}</span>
    </div>
  );
};
