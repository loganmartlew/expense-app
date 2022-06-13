export enum ActivityType {
  IN,
  OUT,
  NEUTRAL,
}

export interface Activity {
  id: string;
  type: ActivityType;
  name: string;
  message: string;
  timestamp: Date;
}
