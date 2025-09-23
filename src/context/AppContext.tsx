import React, { createContext, useContext, useState } from 'react';
import { Exam, Question, Paper, Student, HallTicket, Result, Notification } from '../types';

interface AppContextType {
  exams: Exam[];
  questions: Question[];
  papers: Paper[];
  students: Student[];
  hallTickets: HallTicket[];
  results: Result[];
  notifications: Notification[];
  addExam: (exam: Exam) => void;
  updateExam: (id: string, exam: Partial<Exam>) => void;
  addQuestion: (question: Question) => void;
  addPaper: (paper: Paper) => void;
  updatePaper: (id: string, paper: Partial<Paper>) => void;
  publishResults: (examId: string) => void;
  markNotificationRead: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock data
const mockExams: Exam[] = [
  {
    id: '1',
    title: 'Computer Networks Final Exam',
    code: 'CS301',
    subject: 'Computer Networks',
    department: 'Computer Science',
    date: '2025-01-15',
    startTime: '09:00',
    endTime: '12:00',
    duration: 180,
    totalMarks: 100,
    venue: 'Main Hall A',
    instructions: 'Bring your hall ticket and valid ID. No electronic devices allowed.',
    status: 'scheduled',
    createdBy: '1',
    createdAt: '2025-01-01T10:00:00Z'
  },
  {
    id: '2',
    title: 'Database Systems Mid-Term',
    code: 'CS302',
    subject: 'Database Systems',
    department: 'Computer Science',
    date: '2025-01-20',
    startTime: '14:00',
    endTime: '16:00',
    duration: 120,
    totalMarks: 80,
    venue: 'Lab Building B',
    instructions: 'Bring your hall ticket and valid ID.',
    status: 'scheduled',
    createdBy: '2',
    createdAt: '2025-01-02T14:30:00Z'
  }
];

const mockQuestions: Question[] = [
  {
    id: '1',
    text: 'What is the main difference between TCP and UDP protocols?',
    type: 'short',
    marks: 10,
    difficulty: 'medium',
    subject: 'Computer Networks',
    tags: ['tcp', 'udp', 'protocols'],
    createdBy: '2',
    createdAt: '2025-01-01T15:00:00Z'
  },
  {
    id: '2',
    text: 'Explain the OSI model with all seven layers.',
    type: 'long',
    marks: 20,
    difficulty: 'hard',
    subject: 'Computer Networks',
    tags: ['osi', 'layers', 'networking'],
    createdBy: '2',
    createdAt: '2025-01-01T15:15:00Z'
  }
];

const mockStudents: Student[] = [
  {
    id: '1',
    rollNumber: 'CS2021001',
    name: 'Rahul Kumar',
    email: 'rahul.kumar@student.boult.edu',
    department: 'Computer Science',
    semester: 6,
    batch: '2021-2025'
  },
  {
    id: '2',
    rollNumber: 'CS2021002',
    name: 'Anita Singh',
    email: 'anita.singh@student.boult.edu',
    department: 'Computer Science',
    semester: 6,
    batch: '2021-2025'
  }
];

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'exam_scheduled',
    title: 'New Exam Scheduled',
    message: 'Computer Networks Final Exam has been scheduled for January 15, 2025',
    recipient: 'all',
    read: false,
    createdAt: '2025-01-01T10:05:00Z'
  },
  {
    id: '2',
    type: 'approval_request',
    title: 'Paper Approval Required',
    message: 'CS301 question paper requires your approval',
    recipient: '1',
    read: false,
    createdAt: '2025-01-02T09:30:00Z',
    actionUrl: '/papers/approve'
  }
];

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [exams, setExams] = useState<Exam[]>(mockExams);
  const [questions, setQuestions] = useState<Question[]>(mockQuestions);
  const [papers, setPapers] = useState<Paper[]>([]);
  const [students] = useState<Student[]>(mockStudents);
  const [hallTickets, setHallTickets] = useState<HallTicket[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const addExam = (exam: Exam) => {
    setExams(prev => [...prev, exam]);
  };

  const updateExam = (id: string, examUpdate: Partial<Exam>) => {
    setExams(prev => prev.map(exam => exam.id === id ? { ...exam, ...examUpdate } : exam));
  };

  const addQuestion = (question: Question) => {
    setQuestions(prev => [...prev, question]);
  };

  const addPaper = (paper: Paper) => {
    setPapers(prev => [...prev, paper]);
  };

  const updatePaper = (id: string, paperUpdate: Partial<Paper>) => {
    setPapers(prev => prev.map(paper => paper.id === id ? { ...paper, ...paperUpdate } : paper));
  };

  const publishResults = (examId: string) => {
    // Mock result publishing
    const mockResults: Result[] = students.map(student => ({
      id: `result-${examId}-${student.id}`,
      examId,
      studentId: student.id,
      marksObtained: Math.floor(Math.random() * 40) + 60, // Random marks between 60-100
      totalMarks: 100,
      percentage: Math.floor(Math.random() * 40) + 60,
      grade: 'A',
      gpa: 8.5,
      status: 'published' as const,
      evaluatedBy: '2',
      publishedAt: new Date().toISOString()
    }));
    
    setResults(prev => [...prev, ...mockResults]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => notif.id === id ? { ...notif, read: true } : notif)
    );
  };

  return (
    <AppContext.Provider value={{
      exams,
      questions,
      papers,
      students,
      hallTickets,
      results,
      notifications,
      addExam,
      updateExam,
      addQuestion,
      addPaper,
      updatePaper,
      publishResults,
      markNotificationRead
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}