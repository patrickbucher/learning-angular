export interface Complaint {
  title: string;
  issue: string;
  author: string;
  happened?: Date;
  offender?: string;
  place?: string;
  image?: string;
}
