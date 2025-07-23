import React, { createContext, useContext, useState, ReactNode } from 'react';

type Job = {
  category: string;
  followUpAnswer: string;
};

type JobContextType = {
  job: Job | null;
  setJob: (job: Job) => void;
};

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider = ({ children }: { children: ReactNode }) => {
  const [job, setJob] = useState<Job | null>(null);

  return (
    <JobContext.Provider value={{ job, setJob }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJob = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJob must be used within a JobProvider');
  }
  return context;
};
