import { faker } from '@faker-js/faker';

const username = faker.finance.account(10);
const firstName = faker.name.firstName();
const lastName = faker.name.lastName();

const register = () => {
  cy.visit('https://cu-bank-fe.vercel.app/');
    cy.get('[href="/register"]').click();

    cy.location('href').should('include', '/register');

    cy.get('#accountId').type(username);
    cy.get('#password').type('1234');
    cy.get('#firstName').type(firstName);
    cy.get('#lastName').type(lastName);

    cy.get('button').click();
    cy.intercept('POST', 'https://cu-bank.herokuapp.com/api/v1/auth/register').as('register')
    cy.wait('@register').then((interception) => {
      if (interception.response.statusCode === 401 || interception.response.statusCode === 200) {
        return;
      }
    });
    cy.visit('https://cu-bank-fe.vercel.app/');
}

const login = () => {
  // cy.wait(3000)
  cy.visit("https://cu-bank-fe.vercel.app/");
  cy.get("#accountId").clear();
  cy.get("#password").clear();
  cy.get("#accountId").type("0000000000");
  cy.get("#password").type("0000");
  cy.intercept("POST", "https://cu-bank.herokuapp.com/api/v1/auth/login").as(
    "loginSubmit"
  );
  cy.get('[cid="lc"]').click();
};

const login2 = () => {
  // cy.wait(3000)
  cy.visit("https://cu-bank-fe.vercel.app/");
  cy.get("#accountId").clear();
  cy.get("#password").clear();
  cy.get("#accountId").type(username);
  cy.get("#password").type("1234");
  cy.intercept("POST", "https://cu-bank.herokuapp.com/api/v1/auth/login").as(
    "loginSubmit2"
  );
  cy.get('[cid="lc"]').click();
};

const deposit = () => {
  cy.get('[cid="d1"]').type("100");
  cy.intercept("PUT", "https://cu-bank.herokuapp.com/api/v1/transactions").as(
    "putTransaction2"
  );
  cy.get('[cid="dc"]').click();
};

const deposit2 = () => {
  cy.get('[cid="d1"]').type(
    "99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999"
  );
  cy.intercept("PUT", "https://cu-bank.herokuapp.com/api/v1/transactions").as(
    "putTransaction3"
  );
  cy.get('[cid="dc"]').click();
};

const deposit3 = () => {
  cy.get('[cid="d1"]').type(
    "1e99"
  );
  cy.intercept("PUT", "https://cu-bank.herokuapp.com/api/v1/transactions").as(
    "putTransaction3"
  );
  cy.get('[cid="dc"]').click();
};

const withdraw = () => {
  cy.get('[cid="w1"]').type("200");
  cy.intercept("PUT", "https://cu-bank.herokuapp.com/api/v1/transactions").as(
    "withdrawTransaction"
  );
  cy.get('[cid="wc"]').click();
};

const withdraw2 = () => {
  cy.get('[cid="w1"]').type("1e99");
  cy.intercept("PUT", "https://cu-bank.herokuapp.com/api/v1/transactions").as(
    "withdrawTransaction2"
  );
  cy.get('[cid="wc"]').click();
};

const billpayment = () => {
  cy.get('[cid="b1"]').click();
  cy.get('[cid="b4"]').type("200");
  cy.get('[cid="bc"]').click();
};

const billpayment2 = () => {
  cy.get('[cid="b1"]').click();
  cy.get('[cid="b4"]').type("20");
  cy.intercept("PUT", "https://cu-bank.herokuapp.com/api/v1/transactions").as(
    "putTransaction"
  );
  cy.get('[cid="bc"]').click();
};

const prepBalance = () => {
  login();
  cy.wait("@loginSubmit").then((interception) => {
    expect(interception.response?.statusCode).eq(200);
    cy.intercept("GET", "https://cu-bank.herokuapp.com/api/v1/transactions").as(
      "getTransaction"
    );
    cy.wait("@getTransaction").then((interception2) => {
      expect(interception2.response?.statusCode).eq(200);
      let res = interception2.response?.body;
      let balanceUpdate = res.data.balance;
      if (balanceUpdate > 0) {
        cy.get('[cid="w1"]').type(JSON.stringify(balanceUpdate));
        cy.intercept(
          "PUT",
          "https://cu-bank.herokuapp.com/api/v1/transactions"
        ).as("putTransaction");
        cy.get('[cid="wc"]').click();
        cy.wait("@putTransaction").then((interception3) => {
          expect(interception3.response?.statusCode).eq(200);
        });
      }
    });
  });
};

describe("scenario", () => {
  it("scenario 4: TC24, TC33, TC52", () => {
    prepBalance();

    // TC24: login pass
    login();
    cy.wait("@loginSubmit").then((interception) => {
      expect(interception.response?.statusCode).eq(200);
    });

    // TC33: deposit pass
    deposit();
    cy.wait("@putTransaction2").then((interception) => {
      expect(interception.response?.statusCode).eq(200);
    });

    // TC52: withdraw doesn't pass
    withdraw();
    cy.get('[cid="withdraw-error-mes"]')
      .contains("your balance isn't not enough")
      .should("exist");
  });

  it("scenario 6: TC24, TC33, TC94", () => {
    prepBalance();

    // TC24: login pass
    login();
    cy.wait("@loginSubmit").then((interception) => {
      expect(interception.response?.statusCode).eq(200);
    });

    // TC33: deposit pass
    deposit();
    cy.wait("@putTransaction2").then((interception) => {
      expect(interception.response?.statusCode).eq(200);
    });

    // TC94: bill payment doesn't pass
    billpayment();
    cy.get('[cid="billpayment-error-mes"]')
      .contains("your balance isn't not enough")
      .should("exist");
  });

  it("scenario 7: TC24, TC33, TC95", () => {
    prepBalance();

    // TC24: login pass
    login();
    cy.wait("@loginSubmit").then((interception) => {
      expect(interception.response?.statusCode).eq(200);
    });

    // TC33: deposit pass
    deposit();
    cy.wait("@putTransaction2").then((interception) => {
      expect(interception.response?.statusCode).eq(200);
    });

    // TC95: bill payment pass
    billpayment2();
    cy.wait("@putTransaction").then((interception) => {
      expect(interception.response?.statusCode).eq(200);
    });
  });

  it("scenario 9: TC24, TC35, TC35", () => {

    register();

    // TC24: login pass
    login2();
    cy.wait("@loginSubmit2").then((interception) => {
      expect(interception.response?.statusCode).eq(200);
    });

    // TC35: max deposit
    deposit2();
    cy.wait("@putTransaction3").then((interception) => {
      expect(interception.response?.statusCode).eq(200);
    });

    //TC35: max deposit
    deposit2();
    cy.wait("@putTransaction3").then((interception) => {
      expect(interception.response?.statusCode).eq(200);
      let res = interception.response?.body.data.balance;
      console.log(res);
      expect(res).eq(null);
    });
  });

  it("scenario 10: TC24, TC50", () => {
    prepBalance();
    login();
    cy.wait("@loginSubmit").then((interception) => {
      expect(interception.response?.statusCode).eq(200);
    });

    deposit3();
    cy.get('[cid="d1"]')
      .then(($el) => $el[0].checkValidity())
      .should("be.true");
  
   
  });
});
