import { ChatInterface } from 'interfaces/chat';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface MessageInterface {
  id?: string;
  content: string;
  chat_id?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  chat?: ChatInterface;
  user?: UserInterface;
  _count?: {};
}

export interface MessageGetQueryInterface extends GetQueryInterface {
  id?: string;
  content?: string;
  chat_id?: string;
  user_id?: string;
}
