import { execPath } from "process";
import fixture from "../fixtures/transfer_data.json";

let account_id1 = fixture.account_id_1;
let password_1 = fixture.password_1;
let account_id2 = fixture.account_id_2;
let password_2 = fixture.password_2;

const logout = () => {
  const btn = cy.get('[href="/"]');
  btn.click();
  cy.location("href").should("include", "/");
};

const deposit = (amount) => {
  cy.get(":nth-child(3) > :nth-child(2) > form > label > #among").clear();
  cy.get(":nth-child(3) > :nth-child(2) > form > label > #among").type(amount);
  cy.get(":nth-child(3) > :nth-child(2) > form > label > #among").click();
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

describe("Balance is not enough", () => {
  let balance_id1;
  let balance_id2;

  const login = (account, password) => {
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

  };
 

  it("Sucess transfer", () => {
    cy.visit("https://cu-bank-fe.vercel.app/");

    cy.get("#accountId").clear();
    cy.get("#password").clear();

    cy.get("#accountId").type(account_id1);
    cy.get("#password").type(password_1);

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
      if (val) {
        balance_id1 = val;
      }

    });
    cy.log(balance_id1);
    cy.clearLocalStorage()
    cy.visit("https://cu-bank-fe.vercel.app/");
    
  });

  // it("get balance id1", () => {
  //   cy.intercept("GET", "https://cu-bank.herokuapp.com/api/v1/transactions/", (req) => {
  //     req.continue((res) => {
  //       expect(res.statusCode).eq(200);
  //       const val = res.body.data.balance;
  //       if (val) {
  //         balance_id1 = val;
  //       }

  //       assert.isNotNull(res.body.data.balance);
  //     });
  //   });

    // cy.location("href").should("include", "/account/");
    // cy.wait("@transaction", { timeout: 10000 }).then((interception) => {
    //   expect(interception.response?.statusCode).eq(200);
    //   const val = interception.response?.body.data.balance;
    //   if (val) {
    //     balance_id1 = val;
    //   }
    // });

    // cy.log(balance_id1);

    // const btn = cy.get('[href="/"]');
    // btn.click();
    // cy.location("href").should("include", "/");

  });

  // it('logout', () => {
  //   cy.location("href").should("include", "/account");
  //   const btn = cy.get('[href="/"]');
  //   btn.click();
  //   cy.location("href").should("include", "/");
  // });

  // it("get balance id1", () => {
  //   cy.intercept(
  //     "GET",
  //     "https://cu-bank.herokuapp.com/api/v1/transactions/"
  //   ).as("transaction");
  //   cy.wait("@transaction", { timeout: 60000 }).then((interception) => {
  //     expect(interception.response?.statusCode).eq(200);
  //     const val = interception.response?.body.data.balance;
  //     if (val) {
  //       balance_id1 = val;
  //     }
  //   });
  // });

  // it("logout", () => {
  //   logout();
  // });

  //   it("login_id2", () => {
  //     login(account_id2, password_2);
  //   });

  //   it("get balance id2", () => {
  //     cy.intercept(
  //       "GET",
  //       "https://cu-bank.herokuapp.com/api/v1/transactions/"
  //     ).as("transaction");
  //     cy.wait("@transaction").then((interception) => {
  //       expect(interception.response?.statusCode).eq(200);
  //       const val = interception.response?.body.data.balance;
  //       balance_id2 = val;
  //     });
  //   });

  //   it("transfer", () => {
  //     let balance = Number(balance_id2) + 100;
  //     transfer(account_id1, balance);
  //   });

  //   it("check balance not enough", () => {
  //     cy.get(":nth-child(3) > label").should(
  //       "have.text",
  //       "your balance isn't not enough"
  //     );
  //   });