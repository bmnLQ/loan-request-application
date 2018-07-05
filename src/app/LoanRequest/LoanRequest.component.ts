/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoanRequestService } from './LoanRequest.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-loanrequest',
  templateUrl: './LoanRequest.component.html',
  styleUrls: ['./LoanRequest.component.css'],
  providers: [LoanRequestService]
})
export class LoanRequestComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  reqId = new FormControl('', Validators.required);
  loanee = new FormControl('', Validators.required);
  loanAmount = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  state = new FormControl('', Validators.required);
  loanOffersRec = new FormControl('', Validators.required);

  constructor(private serviceLoanRequest: LoanRequestService, fb: FormBuilder) {
    this.myForm = fb.group({
      reqId: this.reqId,
      loanee: this.loanee,
      loanAmount: this.loanAmount,
      description: this.description,
      state: this.state,
      loanOffersRec: this.loanOffersRec
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceLoanRequest.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.loan_service_v4.LoanRequest',
      'reqId': this.reqId.value,
      'loanee': 'resource:org.loan_service_v4.Customer#' + this.loanee.value,
      'loanAmount': this.loanAmount.value,
      'description': this.description.value,
      'state': this.state.value,
      'loanOffersRec': this.loanOffersRec.value
    };

    this.myForm.setValue({
      'reqId': null,
      'loanee': null,
      'loanAmount': null,
      'description': null,
      'state': null,
      'loanOffersRec': null
    });

    return this.serviceLoanRequest.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'reqId': null,
        'loanee': null,
        'loanAmount': null,
        'description': null,
        'state': null,
        'loanOffersRec': null
      });
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.loan_service_v4.LoanRequest',
      'loanee': 'resource:org.loan_service_v4.Customer#' + this.loanee.value,
      'loanAmount': this.loanAmount.value,
      'description': this.description.value,
      'state': this.state.value,
      'loanOffersRec': this.loanOffersRec.value
    };

    return this.serviceLoanRequest.updateAsset(form.get('reqId').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceLoanRequest.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceLoanRequest.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'reqId': null,
        'loanee': null,
        'loanAmount': null,
        'description': null,
        'state': null,
        'loanOffersRec': null
      };

      if (result.reqId) {
        formObject.reqId = result.reqId;
      } else {
        formObject.reqId = null;
      }

      if (result.loanee) {
        formObject.loanee = result.loanee;
      } else {
        formObject.loanee = null;
      }

      if (result.loanAmount) {
        formObject.loanAmount = result.loanAmount;
      } else {
        formObject.loanAmount = null;
      }

      if (result.description) {
        formObject.description = result.description;
      } else {
        formObject.description = null;
      }

      if (result.state) {
        formObject.state = result.state;
      } else {
        formObject.state = null;
      }

      if (result.loanOffersRec) {
        formObject.loanOffersRec = result.loanOffersRec;
      } else {
        formObject.loanOffersRec = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'reqId': null,
      'loanee': null,
      'loanAmount': null,
      'description': null,
      'state': null,
      'loanOffersRec': null
      });
  }

}
