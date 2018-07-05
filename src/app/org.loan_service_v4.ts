import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.loan_service_v4{
   export enum RequestState {
      APPROVED,
      PENDING,
      REJECTED,
   }
   export class LoanRequest extends Asset {
      reqId: string;
      loanee: Customer;
      loanAmount: number;
      description: string;
      state: RequestState;
      loanOffersRec: string;
   }
   export abstract class User extends Participant {
      id: string;
   }
   export class Admin extends User {
   }
   export class Customer extends User {
      acc_no: string;
      email: string;
      firstName: string;
      lastName: string;
   }
   export class Bank extends User {
      minCommitment: number;
      maxCommitment: number;
   }
   export class Offer extends Transaction {
      request: LoanRequest;
   }
// }
