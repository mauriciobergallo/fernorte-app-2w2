export class TurnResponse {
    number: number;
    createdAt: Date;
    firstName: string;
    lastName: string;
    companyName: string;
  
    constructor(
      number: number,
      createdAt: Date,
      firstName: string,
      lastName: string,
      companyName: string
    ) {
      this.number = number;
      this.createdAt = createdAt;
      this.firstName = firstName;
      this.lastName = lastName;
      this.companyName = companyName;
    }
}
