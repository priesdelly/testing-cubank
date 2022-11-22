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

    it("alert balance not enough", ()=> {
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
    
    transfer_amount = 100

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

  describe("TC3", () => {
    
    transfer_amount = 99

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

    it("alert Please put only number", ()=> {
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

})
