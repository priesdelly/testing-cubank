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

// const login2 = () => {
//   // cy.wait(3000)
//   cy.visit("https://cu-bank-fe.vercel.app/");
//   cy.get("#accountId").clear();
//   cy.get("#password").clear();
//   cy.get("#accountId").type("1111111111");
//   cy.get("#password").type("1111");
//   cy.intercept("POST", "https://cu-bank.herokuapp.com/api/v1/auth/login").as(
//     "loginSubmit2"
//   );
//   cy.get('[cid="lc"]').click();
// };

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

const withdraw = () => {
  cy.get('[cid="w1"]').type("200");
  cy.intercept("PUT", "https://cu-bank.herokuapp.com/api/v1/transactions").as(
    "withdrawTransaction"
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

  // it("scenario 9: TC24, TC35, TC35", () => {

  //   prepBalance();

  //   // TC24: login pass
  //   login2();
  //   cy.wait("@loginSubmit2").then((interception) => {
  //     expect(interception.response?.statusCode).eq(200);
  //   });

  //   // TC35: max deposit
  //   deposit2();
  //   cy.wait("@putTransaction3").then((interception) => {
  //     expect(interception.response?.statusCode).eq(200);
  //   });

  //   //TC35: max deposit
  //   deposit2();
  //   cy.wait("@putTransaction3").then((interception) => {
  //     expect(interception.response?.statusCode).eq(200);
  //     let res = interception.response?.body.data.balance;
  //     console.log(res);
  //     expect(res).eq(" ");
  //   });
  // });
});
