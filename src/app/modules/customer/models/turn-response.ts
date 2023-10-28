export class TurnResponse {
  number: number;
  created_at: Date;
  first_name: string;
  last_name: string;
  company_name: string;
  
  constructor(
    number: number,
    created_at: Date,
    first_name: string,
    last_name: string,
    company_name: string
  ) {
    this.number = number;
    this.created_at = created_at;
    this.first_name = first_name;
    this.last_name = last_name;
    this.company_name = company_name;
  }
}
