export interface ColumnType {
  title: string;
  color: string;
  cards: Card[];
}

export interface Card {
  title: string;
  assignedMember: string | null;
  column: ColumnType;
}
