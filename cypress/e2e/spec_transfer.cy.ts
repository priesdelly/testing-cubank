import { execPath } from "process";
import fixture from "../fixtures/transfer_data.json";


context('Transfer system', () => {
  var account_id1 = fixture.account_id_1;
  var password_1 = fixture.password_1;
  var account_id2 = fixture.account_id_2;
  var password_2 = fixture.password_2;
  var old_balance_id1;
  var old_balance_id2;
  var new_balance_id1;
  var new_balance_id2;
  var deposit_amount = fixture.amount;
  var transfer_amount;
  const clear = Cypress.LocalStorage.clear

  Cypress.LocalStorage.clear = function (keys, ls, rs) {
    return
  }

  const visit_site = () => {
    cy.visit("https://cu-bank-fe.vercel.app/");
  }

  const login_and_get_balance = (account, password, is_new) => {
    cy.get("#accountId").clear();
    cy.get("#password").clear();
    cy.get("#accountId").type(account);
    cy.get("#password").type(password);

    cy.intercept("POST", "https://cu-bank.herokuapp.com/api/v1/auth/login").as(
      "loginSubmit"
    );

    cy.get('[cid="lc"]').click();

    cy.wait("@loginSubmit", { timeout: 10000 }).then((interception) => {
      expect(interception.response?.statusCode).eq(200);
    });

    cy.intercept("GET", "https://cu-bank.herokuapp.com/api/v1/transactions/").as('fetchTransaction');

    cy.wait('@fetchTransaction', { timeout: 10000 }).then((interception) => {
      expect(interception.response?.statusCode).eq(200);
      let res = interception.response;
      const val = res.body.data.balance;
      if (val || val==0) {
        if (account == account_id1) {
          if (is_new) {
            new_balance_id1 = val;
          }
          else {
            old_balance_id1 = val;
          }
        }
        else if (account == account_id2) {
          if (is_new) {
            new_balance_id2 = val;
          }
          else {
            old_balance_id2 = val;
          }
        }
      }
    });
  };

  const logout = () => {
    cy.clearLocalStorage()
    cy.visit("https://cu-bank-fe.vercel.app/");
  };

  const deposit = (amount) => {
    cy.get(':nth-child(3) > :nth-child(2) > form > label > #among').clear();
    cy.get(":nth-child(3) > :nth-child(2) > form > label > #among").type(amount);
    cy.get(':nth-child(3) > :nth-child(2) > form > button').click();
  };

  const transfer = (id, amount) => {
    cy.get("#accountId").clear();
    cy.get("#accountId").type(id);
    cy.get(
      ":nth-child(5) > :nth-child(2) > form > :nth-child(2) > label > #among"
    ).clear();
    cy.get(
      ":nth-child(5) > :nth-child(2) > form > :nth-child(2) > label > #among"
    ).type(amount);
    cy.get(":nth-child(5) > :nth-child(2) > form > button").click();
  };

  describe("TC1", () => {

    it("visit site", () => {
      visit_site()
    })

    it("login and get old balance id1", () => {
      login_and_get_balance(account_id1, password_1, false)
    })

    it("logout", ()=> {
      logout()
    })

    it("visit site", () => {
      visit_site()
    })

    it("login and get old balance id2", () => {
      login_and_get_balance(account_id2, password_2, false)
    })

    it("deposit", () => {
      deposit(deposit_amount)
    })

    it("logout", ()=> {
      logout()
    })

    it("visit site", () => {
      visit_site()
    })

    it("login and get old balance id2", () => {
      login_and_get_balance(account_id2, password_2, false)
    })

    it("transfer when balance is not enough", ()=> {
      transfer(account_id1, old_balance_id2+100)
    })

    it("Alert your balance isn't not enough", ()=> {
      cy.get(':nth-child(3) > label').should("have.text", "your balance isn't not enough");
    })

    it("logout", ()=> {
      logout()
    })

    it("login and get new balance id1", () => {
      login_and_get_balance(account_id1, password_1, true)
    })

    it("Check old_balance_id1 = new_balance_id1", ()=> {
      expect(old_balance_id1 == new_balance_id1).to.be.true
    })

    it("logout", ()=> {
      logout()
    })

    it("login and get new balance id2", () => {
      login_and_get_balance(account_id2, password_2, true)
    })

    it("Check old_balance_id1 = new_balance_id1", ()=> {
      expect(old_balance_id2 == new_balance_id2).to.be.true
    })

  });

  describe("TC2", () => {

    it("visit site", () => {
      visit_site()
    })

    it("login and get old balance id1", () => {
      login_and_get_balance(account_id1, password_1, false)
    })

    it("logout", ()=> {
      logout()
    })

    it("visit site", () => {
      visit_site()
    })

    it("login and get old balance id2", () => {
      login_and_get_balance(account_id2, password_2, false)
    })

    it("deposit", () => {
      deposit(deposit_amount)
    })

    it("logout", ()=> {
      logout()
    })

    it("visit site", () => {
      visit_site()
    })

    it("login and get old balance id2", () => {
      login_and_get_balance(account_id2, password_2, false)
    })

    it("transfer when balance is enough", ()=> {
      transfer_amount = old_balance_id2
      transfer(account_id1, transfer_amount)
    })

    it("logout", ()=> {
      logout()
    })

    it("login and get new balance id1", () => {
      login_and_get_balance(account_id1, password_1, true)
    })

    it("Check old_balance_id1 = new_balance_id1", ()=> {
      expect(old_balance_id1 + transfer_amount == new_balance_id1).to.be.true
    })

    it("logout", ()=> {
      logout()
    })

    it("login and get new balance id2", () => {
      login_and_get_balance(account_id2, password_2, true)
    })

    it("Check old_balance_id1 = new_balance_id1", ()=> {
      expect(old_balance_id2 == new_balance_id2 + transfer_amount).to.be.true
    })

  });

  describe("TC3", () => {

    it("visit site", () => {
      visit_site()
    })

    it("login and get old balance id1", () => {
      login_and_get_balance(account_id1, password_1, false)
    })

    it("logout", ()=> {
      logout()
    })

    it("visit site", () => {
      visit_site()
    })

    it("login and get old balance id2", () => {
      login_and_get_balance(account_id2, password_2, false)
    })

    it("deposit", () => {
      deposit(deposit_amount)
    })

    it("logout", ()=> {
      logout()
    })

    it("visit site", () => {
      visit_site()
    })

    it("login and get old balance id2", () => {
      login_and_get_balance(account_id2, password_2, false)
    })

    it("transfer when balance is enough", ()=> {
      transfer_amount = old_balance_id2
      transfer(account_id1, transfer_amount)
    })

    it("logout", ()=> {
      logout()
    })

    it("login and get new balance id1", () => {
      login_and_get_balance(account_id1, password_1, true)
    })

    it("Check old_balance_id1 = new_balance_id1", ()=> {
      expect(old_balance_id1 + transfer_amount == new_balance_id1).to.be.true
    })

    it("logout", ()=> {
      logout()
    })

    it("login and get new balance id2", () => {
      login_and_get_balance(account_id2, password_2, true)
    })

    it("Check old_balance_id1 = new_balance_id1", ()=> {
      expect(old_balance_id2 == new_balance_id2 + transfer_amount).to.be.true
    })

  });

  describe("TC4", () => {
    
    transfer_amount = 50

    it("visit site", () => {
      visit_site()
    })

    it("login and get old balance id1", () => {
      login_and_get_balance(account_id1, password_1, false)
    })

    it("logout", ()=> {
      logout()
    })

    it("visit site", () => {
      visit_site()
    })

    it("login and get old balance id2", () => {
      login_and_get_balance(account_id2, password_2, false)
    })

    it("deposit", () => {
      deposit(deposit_amount)
    })

    it("logout", ()=> {
      logout()
    })

    it("visit site", () => {
      visit_site()
    })

    it("login and get old balance id2", () => {
      login_and_get_balance(account_id2, password_2, false)
    })

    it("transfer when balance is enough", ()=> {
      transfer(account_id1, transfer_amount)
    })

    it("logout", ()=> {
      logout()
    })

    it("login and get new balance id1", () => {
      login_and_get_balance(account_id1, password_1, true)
    })

    it("Check old_balance_id1 = new_balance_id1", ()=> {
      expect(old_balance_id1 + transfer_amount == new_balance_id1).to.be.true
    })

    it("logout", ()=> {
      logout()
    })

    it("login and get new balance id2", () => {
      login_and_get_balance(account_id2, password_2, true)
    })

    it("Check old_balance_id1 = new_balance_id1", ()=> {
      expect(old_balance_id2 == new_balance_id2 + transfer_amount).to.be.true
    })

  });

  describe("TC5", () => {
    
    transfer_amount = 2

    it("visit site", () => {
      visit_site()
    })

    it("login and get old balance id1", () => {
      login_and_get_balance(account_id1, password_1, false)
    })

    it("logout", ()=> {
      logout()
    })

    it("visit site", () => {
      visit_site()
    })

    it("login and get old balance id2", () => {
      login_and_get_balance(account_id2, password_2, false)
    })

    it("deposit", () => {
      deposit(deposit_amount)
    })

    it("logout", ()=> {
      logout()
    })

    it("visit site", () => {
      visit_site()
    })

    it("login and get old balance id2", () => {
      login_and_get_balance(account_id2, password_2, false)
    })

    it("transfer when balance is enough", ()=> {
      transfer(account_id1, transfer_amount)
    })

    it("logout", ()=> {
      logout()
    })

    it("login and get new balance id1", () => {
      login_and_get_balance(account_id1, password_1, true)
    })

    it("Check old_balance_id1 = new_balance_id1", ()=> {
      expect(old_balance_id1 + transfer_amount == new_balance_id1).to.be.true
    })

    it("logout", ()=> {
      logout()
    })

    it("login and get new balance id2", () => {
      login_and_get_balance(account_id2, password_2, true)
    })

    it("Check old_balance_id1 = new_balance_id1", ()=> {
      expect(old_balance_id2 == new_balance_id2 + transfer_amount).to.be.true
    })

  });

  describe("TC6", () => {
    
    transfer_amount = 1

    it("visit site", () => {
      visit_site()
    })

    it("login and get old balance id1", () => {
      login_and_get_balance(account_id1, password_1, false)
    })

    it("logout", ()=> {
      logout()
    })

    it("visit site", () => {
      visit_site()
    })

    it("login and get old balance id2", () => {
      login_and_get_balance(account_id2, password_2, false)
    })

    it("deposit", () => {
      deposit(deposit_amount)
    })

    it("logout", ()=> {
      logout()
    })

    it("visit site", () => {
      visit_site()
    })

    it("login and get old balance id2", () => {
      login_and_get_balance(account_id2, password_2, false)
    })

    it("transfer when balance is enough", ()=> {
      transfer(account_id1, transfer_amount)
    })

    it("logout", ()=> {
      logout()
    })

    it("login and get new balance id1", () => {
      login_and_get_balance(account_id1, password_1, true)
    })

    it("Check old_balance_id1 = new_balance_id1", ()=> {
      expect(old_balance_id1 + transfer_amount == new_balance_id1).to.be.true
    })

    it("logout", ()=> {
      logout()
    })

    it("login and get new balance id2", () => {
      login_and_get_balance(account_id2, password_2, true)
    })

    it("Check old_balance_id1 = new_balance_id1", ()=> {
      expect(old_balance_id2 == new_balance_id2 + transfer_amount).to.be.true
    })

  });

  describe("TC7", () => {
    
    transfer_amount = 0

    it("visit site", () => {
      visit_site()
    })

    it("login and get old balance id1", () => {
      login_and_get_balance(account_id1, password_1, false)
    })

    it("logout", ()=> {
      logout()
    })

    it("visit site", () => {
      visit_site()
    })

    it("login and get old balance id2", () => {
      login_and_get_balance(account_id2, password_2, false)
    })

    it("transfer 0", ()=> {
      transfer(account_id1, transfer_amount)
    })

    it("Alert please put only number", ()=> {
      cy.get(':nth-child(3) > label').should("have.text", "Please put only number");
    })

    it("logout", ()=> {
      logout()
    })

    it("login and get new balance id1", () => {
      login_and_get_balance(account_id1, password_1, true)
    })

    it("Check old_balance_id1 = new_balance_id1", ()=> {
      expect(old_balance_id1 == new_balance_id1).to.be.true
    })

    it("logout", ()=> {
      logout()
    })

    it("login and get new balance id2", () => {
      login_and_get_balance(account_id2, password_2, true)
    })

    it("Check old_balance_id1 = new_balance_id1", ()=> {
      expect(old_balance_id2 == new_balance_id2).to.be.true
    })

  });

  describe("TC8", () => {
    
    transfer_amount = '1.0'

    it("visit site", () => {
      visit_site()
    })

    it("login and get old balance id1", () => {
      login_and_get_balance(account_id1, password_1, false)
    })

    it("logout", ()=> {
      logout()
    })

    it("visit site", () => {
      visit_site()
    })

    it("login and get old balance id2", () => {
      login_and_get_balance(account_id2, password_2, false)
    })

    it("deposit", () => {
      deposit(deposit_amount)
    })

    it("logout", ()=> {
      logout()
    })

    it("visit site", () => {
      visit_site()
    })

    it("login and get old balance id2", () => {
      login_and_get_balance(account_id2, password_2, false)
    })

    it("transfer when balance is enough", ()=> {
      transfer(account_id1, transfer_amount)
    })

    it("logout", ()=> {
      logout()
    })

    it("login and get new balance id1", () => {
      login_and_get_balance(account_id1, password_1, true)
    })

    it("Check old_balance_id1 = new_balance_id1", ()=> {
      expect(old_balance_id1 + parseFloat(transfer_amount) == new_balance_id1).to.be.true
    })

    it("logout", ()=> {
      logout()
    })

    it("login and get new balance id2", () => {
      login_and_get_balance(account_id2, password_2, true)
    })

    it("Check old_balance_id1 = new_balance_id1", ()=> {
      expect(old_balance_id2 == new_balance_id2 + parseFloat(transfer_amount)).to.be.true
    })

  });

  describe("TC9", () => {
    
    transfer_amount = 1.01

    it("visit site", () => {
      visit_site()
    })

    it("login and get old balance id1", () => {
      login_and_get_balance(account_id1, password_1, false)
    })

    it("logout", ()=> {
      logout()
    })

    it("visit site", () => {
      visit_site()
    })

    it("login and get old balance id2", () => {
      login_and_get_balance(account_id2, password_2, false)
    })

    it("transfer 1.01", ()=> {
      cy.get("#accountId").clear();
      cy.get("#accountId").type(account_id1);
      cy.get(
        ":nth-child(5) > :nth-child(2) > form > :nth-child(2) > label > #among"
      ).clear();
      cy.get(
        ":nth-child(5) > :nth-child(2) > form > :nth-child(2) > label > #among"
      ).type(String(1.01));
      cy.get(":nth-child(5) > :nth-child(2) > form > button").click();
      cy.get(":nth-child(5) > :nth-child(2) > form > :nth-child(2) > label > #among")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
    })

    it("logout", ()=> {
      logout()
    })

    it("login and get new balance id1", () => {
      login_and_get_balance(account_id1, password_1, true)
    })

    it("Check old_balance_id1 = new_balance_id1", ()=> {
      expect(old_balance_id1 == new_balance_id1).to.be.true
    })

    it("logout", ()=> {
      logout()
    })

    it("login and get new balance id2", () => {
      login_and_get_balance(account_id2, password_2, true)
    })

    it("Check old_balance_id1 = new_balance_id1", ()=> {
      expect(old_balance_id2 == new_balance_id2).to.be.true
    })

  });

  describe("TC10", () => {
    
    transfer_amount = 1.0000000597

    it("visit site", () => {
      visit_site()
    })

    it("login and get old balance id1", () => {
      login_and_get_balance(account_id1, password_1, false)
    })

    it("logout", ()=> {
      logout()
    })

    it("visit site", () => {
      visit_site()
    })

    it("login and get old balance id2", () => {
      login_and_get_balance(account_id2, password_2, false)
    })

    it("transfer 1.01", ()=> {
      cy.get("#accountId").clear();
      cy.get("#accountId").type(account_id1);
      cy.get(
        ":nth-child(5) > :nth-child(2) > form > :nth-child(2) > label > #among"
      ).clear();
      cy.get(
        ":nth-child(5) > :nth-child(2) > form > :nth-child(2) > label > #among"
      ).type(String(1.01));
      cy.get(":nth-child(5) > :nth-child(2) > form > button").click();
      cy.get(":nth-child(5) > :nth-child(2) > form > :nth-child(2) > label > #among")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
    })

    it("logout", ()=> {
      logout()
    })

    it("login and get new balance id1", () => {
      login_and_get_balance(account_id1, password_1, true)
    })

    it("Check old_balance_id1 = new_balance_id1", ()=> {
      expect(old_balance_id1 == new_balance_id1).to.be.true
    })

    it("logout", ()=> {
      logout()
    })

    it("login and get new balance id2", () => {
      login_and_get_balance(account_id2, password_2, true)
    })

    it("Check old_balance_id1 = new_balance_id1", ()=> {
      expect(old_balance_id2 == new_balance_id2).to.be.true
    })

  });

  describe("TC11", () => {
    
    transfer_amount = '1.0000000596'

    it("visit site", () => {
      visit_site()
    })

    it("login and get old balance id1", () => {
      login_and_get_balance(account_id1, password_1, false)
    })

    it("logout", ()=> {
      logout()
    })

    it("visit site", () => {
      visit_site()
    })

    it("login and get old balance id2", () => {
      login_and_get_balance(account_id2, password_2, false)
    })

    it("deposit", () => {
      deposit(deposit_amount)
    })

    it("logout", ()=> {
      logout()
    })

    it("visit site", () => {
      visit_site()
    })

    it("login and get old balance id2", () => {
      login_and_get_balance(account_id2, password_2, false)
    })

    it("transfer when balance is enough", ()=> {
      transfer(account_id1, transfer_amount)
    })

    it("logout", ()=> {
      logout()
    })

    it("login and get new balance id1", () => {
      login_and_get_balance(account_id1, password_1, true)
    })

    it("Check old_balance_id1 = new_balance_id1", ()=> {
      expect(old_balance_id1 + Math.round(parseFloat(transfer_amount)) == new_balance_id1).to.be.true
    })

    it("logout", ()=> {
      logout()
    })

    it("login and get new balance id2", () => {
      login_and_get_balance(account_id2, password_2, true)
    })

    it("Check old_balance_id2 = new_balance_id2", ()=> {
      expect(old_balance_id2 == new_balance_id2 + Math.round(parseFloat(transfer_amount))).to.be.true
    })

  });

  describe("TC13", () => {
    
    transfer_amount = -1

    it("visit site", () => {
      visit_site()
    })

    it("login and get old balance id1", () => {
      login_and_get_balance(account_id1, password_1, false)
    })

    it("logout", ()=> {
      logout()
    })

    it("visit site", () => {
      visit_site()
    })

    it("login and get old balance id2", () => {
      login_and_get_balance(account_id2, password_2, false)
    })

    it("transfer -1", ()=> {
      transfer(account_id1, transfer_amount)
    })

    it("Alert please put only number", ()=> {
      cy.get(':nth-child(3) > label').should("have.text", "Please put only number");
    })

    it("logout", ()=> {
      logout()
    })

    it("login and get new balance id1", () => {
      login_and_get_balance(account_id1, password_1, true)
    })

    it("Check old_balance_id1 = new_balance_id1", ()=> {
      expect(old_balance_id1 == new_balance_id1).to.be.true
    })

    it("logout", ()=> {
      logout()
    })

    it("login and get new balance id2", () => {
      login_and_get_balance(account_id2, password_2, true)
    })

    it("Check old_balance_id1 = new_balance_id1", ()=> {
      expect(old_balance_id2 == new_balance_id2).to.be.true
    })

  });

  describe("TC17", () => {
    
    transfer_amount = '1e999'

    it("visit site", () => {
      visit_site()
    })

    it("login and get old balance id1", () => {
      login_and_get_balance(account_id1, password_1, false)
    })

    it("logout", ()=> {
      logout()
    })

    it("visit site", () => {
      visit_site()
    })

    it("login and get old balance id2", () => {
      login_and_get_balance(account_id2, password_2, false)
    })

    it("transfer 1e999", ()=> {
      cy.get("#accountId").clear();
      cy.get("#accountId").type(account_id1);
      cy.get(
        ":nth-child(5) > :nth-child(2) > form > :nth-child(2) > label > #among"
      ).clear();
      cy.get(
        ":nth-child(5) > :nth-child(2) > form > :nth-child(2) > label > #among"
      ).type(transfer_amount);
      cy.get(":nth-child(5) > :nth-child(2) > form > button").click();
      cy.get(":nth-child(5) > :nth-child(2) > form > :nth-child(2) > label > #among")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
    })

    it("logout", ()=> {
      logout()
    })

    it("login and get new balance id1", () => {
      login_and_get_balance(account_id1, password_1, true)
    })

    it("Check old_balance_id1 = new_balance_id1", ()=> {
      expect(old_balance_id1 == new_balance_id1).to.be.true
    })

    it("logout", ()=> {
      logout()
    })

    it("login and get new balance id2", () => {
      login_and_get_balance(account_id2, password_2, true)
    })

    it("Check old_balance_id1 = new_balance_id1", ()=> {
      expect(old_balance_id2 == new_balance_id2).to.be.true
    })

  });

describe("TC18", () => {
    
    transfer_amount = '1e99'

    it("visit site", () => {
      visit_site()
    })

    it("login and get old balance id1", () => {
      login_and_get_balance(account_id1, password_1, false)
    })

    it("logout", ()=> {
      logout()
    })

    it("visit site", () => {
      visit_site()
    })

    it("login and get old balance id2", () => {
      login_and_get_balance(account_id2, password_2, false)
    })

    it("transfer when balance is enough", ()=> {
      transfer(account_id1, transfer_amount)
    })

    it("logout", ()=> {
      logout()
    })

    it("login and get new balance id1", () => {
      login_and_get_balance(account_id1, password_1, true)
    })

    it("Check old_balance_id1 = new_balance_id1", ()=> {
      expect(old_balance_id1 + Number(transfer_amount[0]) == new_balance_id1).to.be.true
    })

    it("logout", ()=> {
      logout()
    })

    it("login and get new balance id2", () => {
      login_and_get_balance(account_id2, password_2, true)
    })

    it("Check old_balance_id2 = new_balance_id2", ()=> {
      expect(old_balance_id2 == new_balance_id2 + Number(transfer_amount[0])).to.be.true
    })

  });

  describe("TC19", () => {
    
    transfer_amount = '1e9'

    it("visit site", () => {
      visit_site()
    })

    it("login and get old balance id1", () => {
      login_and_get_balance(account_id1, password_1, false)
    })

    it("logout", ()=> {
      logout()
    })

    it("visit site", () => {
      visit_site()
    })

    it("login and get old balance id2", () => {
      login_and_get_balance(account_id2, password_2, false)
    })

    it("transfer when balance is enough", ()=> {
      transfer(account_id1, transfer_amount)
    })

    it("logout", ()=> {
      logout()
    })

    it("login and get new balance id1", () => {
      login_and_get_balance(account_id1, password_1, true)
    })

    it("Check old_balance_id1 = new_balance_id1", ()=> {
      expect(old_balance_id1 + Number(transfer_amount[0]) == new_balance_id1).to.be.true
    })

    it("logout", ()=> {
      logout()
    })

    it("login and get new balance id2", () => {
      login_and_get_balance(account_id2, password_2, true)
    })

    it("Check old_balance_id2 = new_balance_id2", ()=> {
      expect(old_balance_id2 == new_balance_id2 + Number(transfer_amount[0])).to.be.true
    })

  });

  describe("TC20", () => {
    
    transfer_amount = 50

    it("visit site", () => {
      visit_site()
    })

    it("login and get old balance id1", () => {
      login_and_get_balance(account_id1, password_1, false)
    })

    it("logout", ()=> {
      logout()
    })

    it("visit site", () => {
      visit_site()
    })

    it("login and get old balance id2", () => {
      login_and_get_balance(account_id2, password_2, false)
    })

    it("deposit", () => {
      deposit(deposit_amount)
    })

    it("logout", ()=> {
      logout()
    })

    it("visit site", () => {
      visit_site()
    })

    it("login and get old balance id2", () => {
      login_and_get_balance(account_id2, password_2, false)
    })

    it("transfer when account_id is incorrect", ()=> {
      transfer(account_id1.concat('1'), transfer_amount)
    })

    it("Alert please fill accountId 10 digits", ()=> {
      cy.get(':nth-child(3) > label').should("have.text", "Please fill accountId  10 digits");
    })

    it("logout", ()=> {
      logout()
    })

    it("login and get new balance id1", () => {
      login_and_get_balance(account_id1, password_1, true)
    })

    it("Check old_balance_id1 = new_balance_id1", ()=> {
      expect(old_balance_id1 == new_balance_id1).to.be.true
    })

    it("logout", ()=> {
      logout()
    })

    it("login and get new balance id2", () => {
      login_and_get_balance(account_id2, password_2, true)
    })

    it("Check old_balance_id2 = new_balance_id2", ()=> {
      expect(old_balance_id2 == new_balance_id2).to.be.true
    })

  });

  describe("TC21", () => {
    
    transfer_amount = 50

    it("visit site", () => {
      visit_site()
    })

    it("login and get old balance id1", () => {
      login_and_get_balance(account_id1, password_1, false)
    })

    it("logout", ()=> {
      logout()
    })

    it("visit site", () => {
      visit_site()
    })

    it("login and get old balance id2", () => {
      login_and_get_balance(account_id2, password_2, false)
    })

    it("deposit", () => {
      deposit(deposit_amount)
    })

    it("logout", ()=> {
      logout()
    })

    it("visit site", () => {
      visit_site()
    })

    it("login and get old balance id2", () => {
      login_and_get_balance(account_id2, password_2, false)
    })

    it("transfer when account_id is incorrect", ()=> {
      transfer(account_id1.slice(0,9), transfer_amount)
    })

    it("Alert please fill accountId 10 digits", ()=> {
      cy.get(':nth-child(3) > label').should("have.text", "Please fill accountId  10 digits");
    })

    it("logout", ()=> {
      logout()
    })

    it("login and get new balance id1", () => {
      login_and_get_balance(account_id1, password_1, true)
    })

    it("Check old_balance_id1 = new_balance_id1", ()=> {
      expect(old_balance_id1 == new_balance_id1).to.be.true
    })

    it("logout", ()=> {
      logout()
    })

    it("login and get new balance id2", () => {
      login_and_get_balance(account_id2, password_2, true)
    })

    it("Check old_balance_id2 = new_balance_id2", ()=> {
      expect(old_balance_id2 == new_balance_id2).to.be.true
    })

  });

  describe("TC22", () => {
    
    transfer_amount = 50

    it("visit site", () => {
      visit_site()
    })

    it("visit site", () => {
      visit_site()
    })

    it("login and get old balance id2", () => {
      login_and_get_balance(account_id2, password_2, false)
    })

    it("deposit", () => {
      deposit(deposit_amount)
    })

    it("logout", ()=> {
      logout()
    })

    it("visit site", () => {
      visit_site()
    })

    it("login and get old balance id2", () => {
      login_and_get_balance(account_id2, password_2, false)
    })

    it("transfer when account_id is incorrect", ()=> {
      transfer('abcdef1234', transfer_amount)
    })

    it("Alert please put accountId only number", ()=> {
      cy.get(':nth-child(3) > label').should("have.text", "Please put accountId only number");
    })

    it("logout", ()=> {
      logout()
    })

    it("login and get new balance id1", () => {
      login_and_get_balance(account_id2, password_2, true)
    })

    it("Check old_balance_id2 = new_balance_id2", ()=> {
      expect(old_balance_id2 == new_balance_id2).to.be.true
    })

  });

  describe("TC23", () => {
    
    transfer_amount = 50

    it("visit site", () => {
      visit_site()
    })

    it("login and get old balance id2", () => {
      login_and_get_balance(account_id2, password_2, false)
    })

    it("deposit", () => {
      deposit(deposit_amount)
    })

    it("logout", ()=> {
      logout()
    })

    it("visit site", () => {
      visit_site()
    })

    it("login and get old balance id2", () => {
      login_and_get_balance(account_id2, password_2, false)
    })

    it("transfer when account_id is incorrect", ()=> {
      transfer('1312312121', transfer_amount)
    })

    it("Alert not found your target account Id", ()=> {
      cy.get(':nth-child(3) > label').should("have.text", "Not found your target account Id");
    })

    it("logout", ()=> {
      logout()
    })

    it("login and get new balance id2", () => {
      login_and_get_balance(account_id2, password_2, true)
    })

    it("Check old_balance_id2 = new_balance_id2", ()=> {
      expect(old_balance_id2 == new_balance_id2).to.be.true
    })

  });

  describe("TC24", () => {
    
    transfer_amount = 50

    it("visit site", () => {
      visit_site()
    })

    it("login and get old balance id2", () => {
      login_and_get_balance(account_id2, password_2, false)
    })

    it("deposit", () => {
      deposit(deposit_amount)
    })

    it("logout", ()=> {
      logout()
    })

    it("visit site", () => {
      visit_site()
    })

    it("login and get old balance id2", () => {
      login_and_get_balance(account_id2, password_2, false)
    })

    it("transfer when account_id is incorrect", ()=> {
      transfer(account_id2, transfer_amount)
    })

    it("Alert cannot transfer to your own id", ()=> {
      cy.get(':nth-child(3) > label').should("have.text", "Cannot transfer to your own id");
    })

    it("logout", ()=> {
      logout()
    })

    it("login and get new balance id2", () => {
      login_and_get_balance(account_id2, password_2, true)
    })

    it("Check old_balance_id2 = new_balance_id2", ()=> {
      expect(old_balance_id2 == new_balance_id2).to.be.true
    })

  });

})
