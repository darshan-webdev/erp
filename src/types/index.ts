export interface User {
  id: string;
  name: string;
  email: string;
  role: 'coe' | 'faculty' | 'coordinator';
  department?: string;
  avatar?: string;
}

export interface Exam {
  id: string;
  title: string;
  code: string;
  subject: string;
  department: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  totalMarks: number;
  venue: string;
  instructions: string;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  createdBy: string;
  createdAt: string;
}

export interface Question {
  id: string;
  text: string;
  type: 'mcq' | 'short' | 'long' | 'numerical';
  marks: number;
  difficulty: 'easy' | 'medium' | 'hard';
  subject: string;
  tags: string[];
  options?: string[];
  correctAnswer?: string;
  createdBy: string;
  createdAt: string;
}

export interface Paper {
  id: string;
  examId: string;
  title: string;
  questions: Question[];
  totalMarks: number;
  instructions: string;
  status: 'draft' | 'approved' | 'published';
  createdBy: string;
  approvedBy?: string;
  createdAt: string;
}

export interface Student {
  id: string;
  rollNumber: string;
  name: string;
  email: string;
  department: string;
  semester: number;
  batch: string;
}

export interface HallTicket {
  id: string;
  examId: string;
  studentId: string;
  seatNumber: string;
  venue: string;
  qrCode: string;
  status: 'active' | 'used' | 'cancelled';
  generatedAt: string;
}

export interface Result {
  id: string;
  examId: string;
  studentId: string;
  marksObtained: number;
  totalMarks: number;
  percentage: number;
  grade: string;
  gpa: number;
  status: 'published' | 'withheld' | 'under_review';
  evaluatedBy: string;
  publishedAt?: string;
}

export interface Notification {
  id: string;
  type: 'exam_scheduled' | 'results_published' | 'deadline_reminder' | 'approval_request';
  title: string;
  message: string;
  recipient: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}