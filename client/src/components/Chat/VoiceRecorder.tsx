import React, { useState, useEffect, useRef } from 'react';
import { Mic, Square, Trash2, Send } from 'lucide-react';

interface VoiceRecorderProps {
  onSendVoice: (audioBlob: Blob, durationSeconds: number) => void;
  onCancel: () => void;
}

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onSendVoice, onCancel }) => {
  const [recording, setRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    startRecording();
    return () => {
      stopRecordingCleanup();
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        if (duration > 0) {
          onSendVoice(audioBlob, duration);
        }
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setRecording(true);

      timerRef.current = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error('Microphone access error:', err);
      alert('Microphone access was denied or not available in this browser.');
      onCancel();
    }
  };

  const stopRecordingCleanup = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
  };

  const handleSend = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
  };

  const handleCancel = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.ondataavailable = null;
      mediaRecorderRef.current.onstop = null;
      mediaRecorderRef.current.stop();
    }
    onCancel();
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins}:${remaining < 10 ? '0' : ''}${remaining}`;
  };

  return (
    <div className="flex items-center gap-3 w-full bg-wa-dark-panel dark:bg-wa-dark-panel bg-[#f0f2f5] px-4 py-2.5 rounded-2xl border border-emerald-500/30 animate-in fade-in">
      {/* Pulse Mic Icon */}
      <div className="relative flex items-center justify-center">
        <div className="w-4 h-4 bg-red-500 rounded-full animate-ping absolute" />
        <div className="w-3 h-3 bg-red-500 rounded-full relative" />
      </div>

      <span className="font-mono text-sm font-bold text-red-400">{formatTime(duration)}</span>

      {/* Waveform Visualizer simulation */}
      <div className="flex-1 flex items-center gap-0.5 h-6 overflow-hidden px-2">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 bg-emerald-500 rounded-full transition-all duration-150"
            style={{
              height: `${Math.max(4, Math.sin((i + duration * 2) * 0.8) * 20 + 8)}px`,
            }}
          />
        ))}
      </div>

      {/* Cancel */}
      <button
        onClick={handleCancel}
        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-colors"
        title="Cancel voice recording"
      >
        <Trash2 className="w-5 h-5" />
      </button>

      {/* Send */}
      <button
        onClick={handleSend}
        className="p-2 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white rounded-full transition-all shadow-md"
        title="Send voice note"
      >
        <Send className="w-5 h-5" />
      </button>
    </div>
  );
};
