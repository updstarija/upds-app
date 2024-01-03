export interface INotification {
  id: string;
  title: string;
  body: string;
  date: Date;
  to?: string;
  type: "read" | "deleted" | "unread";
}
