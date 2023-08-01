import firestore from '@react-native-firebase/firestore';
import { Timestamp } from 'firebase/firestore';

export type Message = {
  id: string;
  message: string;
  date: Timestamp;
  isSent: boolean;
  device: string;
  uname: string;
};
