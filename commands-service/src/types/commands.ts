export type CommandStatus =
  | "pending"
  | "paid"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface Command {
  id: string;
  user_id: string;
  total_amount: number;
  status: CommandStatus;
  created_at: Date;
  updated_at: Date;
}
