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

import { AngularTestPage } from './app.po';
import { ExpectedConditions, browser, element, by } from 'protractor';
import {} from 'jasmine';


describe('Starting tests for loan-request-v4', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be loan-request-v4', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('loan-request-v4');
    })
  });

  it('network-name should be loan-request-v4@0.0.2-deploy.111',() => {
    element(by.css('.network-name')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('loan-request-v4@0.0.2-deploy.111.bna');
    });
  });

  it('navbar-brand should be loan-request-v4',() => {
    element(by.css('.navbar-brand')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('loan-request-v4');
    });
  });

  
    it('LoanRequest component should be loadable',() => {
      page.navigateTo('/LoanRequest');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('LoanRequest');
      });
    });

    it('LoanRequest table should have 7 columns',() => {
      page.navigateTo('/LoanRequest');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(7); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('Admin component should be loadable',() => {
      page.navigateTo('/Admin');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Admin');
      });
    });

    it('Admin table should have 2 columns',() => {
      page.navigateTo('/Admin');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(2); // Addition of 1 for 'Action' column
      });
    });
  
    it('Customer component should be loadable',() => {
      page.navigateTo('/Customer');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Customer');
      });
    });

    it('Customer table should have 6 columns',() => {
      page.navigateTo('/Customer');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });
  
    it('Bank component should be loadable',() => {
      page.navigateTo('/Bank');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Bank');
      });
    });

    it('Bank table should have 4 columns',() => {
      page.navigateTo('/Bank');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('Offer component should be loadable',() => {
      page.navigateTo('/Offer');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Offer');
      });
    });
  

});