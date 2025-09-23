import React, { useState } from 'react';
import { Download, QrCode, Search, Filter, Printer, FileText } from 'lucide-react';
import QRCode from 'qrcode';
import { useApp } from '../context/AppContext';

export default function HallTickets() {
  const { exams, students } = useApp();
  const [selectedExam, setSelectedExam] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [generatedTickets, setGeneratedTickets] = useState<any[]>([]);
  const [showQRDemo, setShowQRDemo] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const generateQRCode = async (data: string) => {
    try {
      const qrDataUrl = await QRCode.toDataURL(data, {
        width: 200,
        margin: 2,
        color: {
          dark: '#1f2937',
          light: '#ffffff'
        }
      });
      return qrDataUrl;
    } catch (error) {
      console.error('QR Code generation failed:', error);
      return '';
    }
  };

  const handleGenerateTickets = async () => {
    if (!selectedExam) return;

    const exam = exams.find(e => e.id === selectedExam);
    if (!exam) return;

    const tickets = await Promise.all(
      students.map(async (student, index) => {
        const ticketData = {
          examId: exam.id,
          studentId: student.id,
          rollNumber: student.rollNumber,
          name: student.name,
          examTitle: exam.title,
          date: exam.date,
          time: `${exam.startTime} - ${exam.endTime}`,
          venue: exam.venue,
          seatNumber: `A-${(index + 1).toString().padStart(3, '0')}`
        };

        const qrData = JSON.stringify({
          examId: exam.id,
          studentId: student.id,
          rollNumber: student.rollNumber,
          seatNumber: ticketData.seatNumber
        });

        const qrCodeDataUrl = await generateQRCode(qrData);

        return {
          ...ticketData,
          qrCode: qrCodeDataUrl,
          generatedAt: new Date().toISOString()
        };
      })
    );

    setGeneratedTickets(tickets);
  };

  const handleQRDemo = async () => {
    const demoData = JSON.stringify({
      examId: 'DEMO-001',
      studentId: 'STU-001',
      rollNumber: 'CS2021001',
      seatNumber: 'A-001',
      timestamp: new Date().toISOString()
    });
    
    const qrUrl = await generateQRCode(demoData);
    setQrCodeUrl(qrUrl);
    setShowQRDemo(true);
  };

  const filteredTickets = generatedTickets.filter(ticket =>
    ticket.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hall Ticket Management</h1>
          <p className="text-gray-600 mt-1">
            Generate, manage, and verify student hall tickets with QR authentication
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleQRDemo}
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          >
            <QrCode className="h-4 w-4 mr-2" />
            QR Demo
          </button>
        </div>
      </div>

      {/* Generation Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Generate Hall Tickets</h2>
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Exam</label>
            <select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Choose an exam...</option>
              {exams.map(exam => (
                <option key={exam.id} value={exam.id}>{exam.title} - {exam.date}</option>
              ))}
            </select>
          </div>
          <div className="pt-6">
            <button
              onClick={handleGenerateTickets}
              disabled={!selectedExam}
              className="inline-flex items-center px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-gray-300"
            >
              <FileText className="h-4 w-4 mr-2" />
              Generate Tickets
            </button>
          </div>
        </div>
        {selectedExam && (
          <div className="text-sm text-gray-600">
            This will generate hall tickets for {students.length} students enrolled in the selected exam.
          </div>
        )}
      </div>

      {/* QR Demo Modal */}
      {showQRDemo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-4">QR Code Verification Demo</h3>
            <div className="text-center">
              {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" className="mx-auto mb-4" />}
              <p className="text-sm text-gray-600 mb-4">
                This QR code contains encrypted student and exam information for secure verification during attendance tracking.
              </p>
              <div className="bg-gray-50 p-3 rounded-lg text-left text-xs text-gray-700 mb-4">
                <strong>QR Data Includes:</strong><br/>
                • Exam ID & Student ID<br/>
                • Roll Number & Seat Assignment<br/>
                • Timestamp & Security Hash<br/>
                • Tamper Detection
              </div>
              <button
                onClick={() => setShowQRDemo(false)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Close Demo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Generated Tickets */}
      {generatedTickets.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Generated Hall Tickets</h2>
            <div className="flex items-center space-x-2">
              <button className="inline-flex items-center px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700">
                <Download className="h-4 w-4 mr-2" />
                Download All (PDF)
              </button>
              <button className="inline-flex items-center px-3 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700">
                <Printer className="h-4 w-4 mr-2" />
                Print All
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or roll number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Tickets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTickets.slice(0, 9).map((ticket) => (
              <div key={`${ticket.examId}-${ticket.studentId}`} className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-6 border-2 border-dashed border-blue-300">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-blue-900">HALL TICKET</h3>
                    <p className="text-xs text-blue-700">Boult Next Technology</p>
                  </div>
                  {ticket.qrCode && (
                    <img src={ticket.qrCode} alt="QR Code" className="w-16 h-16" />
                  )}
                </div>

                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-semibold text-gray-700">Name:</span>
                    <p className="text-gray-900">{ticket.name}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Roll No:</span>
                    <p className="text-gray-900">{ticket.rollNumber}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Exam:</span>
                    <p className="text-gray-900">{ticket.examTitle}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="font-semibold text-gray-700">Date:</span>
                      <p className="text-gray-900 text-xs">{ticket.date}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Time:</span>
                      <p className="text-gray-900 text-xs">{ticket.time}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="font-semibold text-gray-700">Venue:</span>
                      <p className="text-gray-900 text-xs">{ticket.venue}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Seat:</span>
                      <p className="text-gray-900 text-xs font-bold">{ticket.seatNumber}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-blue-200">
                  <div className="flex justify-between items-center">
                    <button className="text-xs text-blue-600 hover:text-blue-800">
                      <Download className="h-3 w-3 inline mr-1" />
                      Download
                    </button>
                    <button className="text-xs text-purple-600 hover:text-purple-800">
                      <Printer className="h-3 w-3 inline mr-1" />
                      Print
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTickets.length > 9 && (
            <div className="text-center mt-4">
              <p className="text-gray-600">Showing 9 of {filteredTickets.length} tickets</p>
              <button className="mt-2 text-blue-600 hover:text-blue-700 font-medium">
                Load More
              </button>
            </div>
          )}
        </div>
      )}

      {generatedTickets.length === 0 && (
        <div className="text-center py-12">
          <QrCode className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <div className="text-gray-400 text-lg mb-2">No hall tickets generated</div>
          <p className="text-gray-500">
            Select an exam and click "Generate Tickets" to create hall tickets for all enrolled students
          </p>
        </div>
      )}
    </div>
  );
}