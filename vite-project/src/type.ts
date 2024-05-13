import { Timestamp } from "firebase/firestore";

export interface Message {
    uid: string;
    displayName: string;
    photoURL: string;
    text: string;
    createdAt: Timestamp;
  }