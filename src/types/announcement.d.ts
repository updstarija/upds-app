import { TUploadFile } from "./storage";

export interface IAnnouncement {
  id: string;
  title: string;
  description: string;
  category: string;
  date: Date;
  like: number;
  priority: boolean;
  superpriority: boolean;
  moreInfoUrl: string;
  images: TUploadFile[];
  filename: string;
  state: boolean;
}
