export interface User {
  id: string;
  username: string;
  royal_id: string;
  display_name: string;
  email?: string;
  avatar_url?: string;
  bio?: string;
  is_online?: boolean;
  last_seen?: string;
  storage_limit_bytes?: number | string;
  storage_used_bytes?: number | string;
}

export interface ChatParticipant {
  id: string;
  username: string;
  royal_id: string;
  display_name: string;
  avatar_url?: string;
  is_online?: boolean;
  last_seen?: string;
  role: 'admin' | 'member';
  joined_at?: string;
}

export interface LastMessage {
  id: string;
  content: string;
  message_type: 'text' | 'image' | 'video' | 'audio' | 'document' | 'archive' | 'file';
  file_name?: string;
  file_size_bytes?: number;
  sender_id: string;
  created_at: string;
}

export interface Chat {
  id: string;
  is_group: boolean;
  name?: string;
  description?: string;
  avatar_url?: string;
  created_by?: string;
  max_storage_bytes: number | string;
  current_storage_bytes: number | string;
  created_at: string;
  updated_at: string;
  user_role?: 'admin' | 'member';
  last_read_at?: string;
  last_message?: LastMessage;
  unread_count?: number;
  other_participants?: ChatParticipant[];
  participant_count?: number;
  participants?: ChatParticipant[];
}

export interface MessageReaction {
  emoji: string;
  user_id: string;
  username: string;
}

export interface Message {
  id: string;
  chat_id: string;
  sender_id: string;
  content: string;
  message_type: 'text' | 'image' | 'video' | 'audio' | 'document' | 'archive' | 'file';
  file_id?: string;
  file_name?: string;
  file_path?: string;
  file_size_bytes?: number | string;
  file_mime_type?: string;
  quick_code?: string;
  is_purged?: boolean;
  created_at: string;
  sender_username?: string;
  sender_display_name?: string;
  sender_avatar_url?: string;
  sender_royal_id?: string;
  reactions?: MessageReaction[];
}

export interface TypingUser {
  chatId: string;
  userId: string;
  username: string;
  display_name: string;
}
