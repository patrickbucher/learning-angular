export interface Complaint {
  id: number;
  selected: boolean;
  title: string;
  issue: string;
  author: string;
  happened?: Date;
  offender?: string;
  place?: string;
  image?: string;
}
