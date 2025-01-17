export interface User {
  userid: string;
  customer_name: string;
  email: string;
  mobilephone: string;
  pin: string;
  device: string;
  device_id: string;
  session_id: string;
  session_expiration: string;
  watchlist: null;
  is_active: boolean;
  CreatedBy: string;
  CreatedAt: string;
  ModifiedBy: string;
  ModifiedAt: string;
}

export interface Message {
  message_id: string;
  content: string;
  session_id: string;
  user_id: string;
  from_user: string;
}

export interface ConversationSession {
  session_id: string;
  user: User;
  operator_id: null;
  messages: Message[];
}
