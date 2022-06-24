import { User } from "./user";

export class Log {
  _id: string = "";
  user: null | string | User = null;
  eventText: string = "";
  createdAt: string = "";
  updatedAt: string = "";
}
