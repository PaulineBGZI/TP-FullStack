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

export interface Cookie {
  id: string;
  pepite_id: string;
  cookie_name: string;
  quantity: number;
  description: string;
  created_at: Date;
}

export interface pepites {
  id: string;
  pepite_name: string;
  quantity: number;
  created_at: Date;
}

export interface livraisons {
  id: string;
  command_id: string;
  address: string;
  ville: string;
  code_postal: string;
  pays: string;
  statut: string;
  date_expedition: Date;
  date_livraison: Date;
  created_at: Date;
  updated_at: Date;
}