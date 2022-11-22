const logIn = () => {
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

describe("withdrawal", () => {
  let balance;

  it("prepBalance", () => {
    logIn();
    cy.wait("@loginSubmit").then((interception) => {
      expect(interception.response?.statusCode).eq(200);
      let res = interception.response?.body.user;
      let balance_update = res.balance;

      //type withdraw amount
      cy.wait(5000);
      cy.get('[cid="w1"]').type(JSON.stringify(balance_update));
      cy.get('[cid="wc"]').click();
      cy.wait(5000);
    });
    cy.get('[cid="d1"]').clear();
    cy.get('[cid="w1"]').clear();
    cy.wait(5000);
    cy.get('[cid="d1"]').type("100");
    cy.get('[cid="dc"]').click();
    cy.wait(5000);

    cy.visit("https://cu-bank-fe.vercel.app/");
  });

  // TC1 Amount max+ expected your balance isn't not enough
  it("TC1: bill payment amount is 101", () => {
    //login
    logIn();
    cy.wait("@loginSubmit").then((interception) => {
      expect(interception.response?.statusCode).eq(200);
      let res = interception.response?.body.user;
      let balance_update = res.balance;
      console.log(balance_update);
      if (balance_update) {
        balance = balance_update;
      }
      cy.get('[cid="b1"]').click();
      cy.get('[cid="b4"]').type(JSON.stringify(balance_update + 1));
    });

    //bill payment submit
    cy.get('[cid="bc"]').click();
    cy.get('[cid="billpayment-error-mes"]')
      .contains("your balance isn't not enough")
      .should("exist");
    //logout
    cy.visit("https://cu-bank-fe.vercel.app/");
  });

  //------------

  // TC2 Amount max expected your balance isn't not enough
  it("TC2: bill payment amount is 100", () => {
    //login
    logIn();
    cy.wait("@loginSubmit").then((interception) => {
      expect(interception.response?.statusCode).eq(200);
      let res = interception.response?.body.user;
      let balance_update = res.balance;
      console.log(balance_update);
      if (balance_update) {
        balance = balance_update;
      }
      let max = balance;
      cy.get('[cid="b1"]').click();
      cy.get('[cid="b4"]').type(JSON.stringify(max));
    });

    //bill payment submit
    cy.intercept(
      "PUT",
      "https://cu-bank.herokuapp.com/api/v1/transactions/"
    ).as("tc2Submit");
    cy.get('[cid="bc"]').click();
    cy.wait("@tc2Submit").then((interception) => {
      let res = interception.response?.body.data;
      let balance_update = res.balance;
      console.log(balance_update);
      expect(balance_update).eq(0);
    });

    //deposit for next case
    cy.get('[cid="d1"]').clear();
    cy.get('[cid="d1"]').type("100");
    cy.get('[cid="dc"]').click();
    cy.wait(5000);

    //logout
    cy.visit("https://cu-bank-fe.vercel.app/");
  });

  //------------

  // TC3 Amount max- expected your balance isn't not enough
  it("TC3: bill payment amount is 99", () => {
    //login
    logIn();
    cy.wait("@loginSubmit").then((interception) => {
      expect(interception.response?.statusCode).eq(200);
      let res = interception.response?.body.user;
      let balance_update = res.balance;
      console.log(balance_update);
      if (balance_update) {
        balance = balance_update;
      }
      let maxN = balance - 1;
      cy.get('[cid="b1"]').click();
      cy.get('[cid="b4"]').type(JSON.stringify(maxN));
    });

    //bill payment submit
    cy.intercept(
      "PUT",
      "https://cu-bank.herokuapp.com/api/v1/transactions/"
    ).as("tc3Submit");
    cy.get('[cid="bc"]').click();
    cy.wait("@tc3Submit").then((interception) => {
      let res = interception.response?.body.data;
      let balance_update = res.balance;
      console.log(balance_update);
      expect(balance_update).eq(1);
    });

    //deposit for next case
    cy.get('[cid="d1"]').clear();
    cy.get('[cid="d1"]').type("99");
    cy.get('[cid="dc"]').click();
    cy.wait(5000);

    //logout
    cy.visit("https://cu-bank-fe.vercel.app/");
  });

  //------------

  // TC4 Amount is 50 expected success
  it("TC4: bill payment amount is 50", () => {
    //login
    logIn();
    cy.wait("@loginSubmit").then((interception) => {
      expect(interception.response?.statusCode).eq(200);
      let res = interception.response?.body.user;
      let balance_update = res.balance;
      if (balance_update) {
        balance = balance_update;
      }
    });

    //bill payment submit
    cy.get('[cid="b1"]').click();
    cy.get('[cid="b4"]').type("50");
    cy.intercept(
      "PUT",
      "https://cu-bank.herokuapp.com/api/v1/transactions/"
    ).as("tc4Submit");
    cy.get('[cid="bc"]').click();
    cy.wait("@tc4Submit").then((interception) => {
      let res = interception.response?.body.data;
      let balance_update = res.balance;
      console.log(balance_update);
      expect(balance_update).eq(balance - 50);
    });

    //logout
    cy.visit("https://cu-bank-fe.vercel.app/");
  });

  //------------

  // TC5 Amount is 2 expected success
  it("TC5: bill payment amount is 2", () => {
    //login
    logIn();
    cy.wait("@loginSubmit").then((interception) => {
      expect(interception.response?.statusCode).eq(200);
      let res = interception.response?.body.user;
      let balance_update = res.balance;
      if (balance_update) {
        balance = balance_update;
      }
    });

    //bill payment submit
    cy.get('[cid="b1"]').click();
    cy.get('[cid="b4"]').type("2");
    cy.intercept(
      "PUT",
      "https://cu-bank.herokuapp.com/api/v1/transactions/"
    ).as("tc5Submit");
    cy.get('[cid="bc"]').click();
    cy.wait("@tc5Submit").then((interception) => {
      let res = interception.response?.body.data;
      let balance_update = res.balance;
      console.log(balance_update);
      expect(balance_update).eq(balance - 2);
    });

    //logout
    cy.visit("https://cu-bank-fe.vercel.app/");
  });

  //------------

  // TC6 Amount is 1 expected success
  it("TC6: bill payment amount is 1", () => {
    //login
    logIn();
    cy.wait("@loginSubmit").then((interception) => {
      expect(interception.response?.statusCode).eq(200);
      let res = interception.response?.body.user;
      let balance_update = res.balance;
      if (balance_update) {
        balance = balance_update;
      }
    });

    //bill payment submit
    cy.get('[cid="b1"]').click();
    cy.get('[cid="b4"]').type("1");
    cy.intercept(
      "PUT",
      "https://cu-bank.herokuapp.com/api/v1/transactions/"
    ).as("tc6Submit");
    cy.get('[cid="bc"]').click();
    cy.wait("@tc6Submit").then((interception) => {
      let res = interception.response?.body.data;
      let balance_update = res.balance;
      console.log(balance_update);
      expect(balance_update).eq(balance - 1);
    });

    //logout
    cy.visit("https://cu-bank-fe.vercel.app/");
  });

  //------------

  // TC7 Amount is 0 expected Please put only number
  it("TC7: bill payment amount is 0", () => {
    //login
    logIn();
    cy.wait("@loginSubmit").then((interception) => {
      expect(interception.response?.statusCode).eq(200);
    });

    //bill payment submit
    cy.get('[cid="b1"]').click();
    cy.get('[cid="b4"]').type("0");
    cy.get('[cid="bc"]').click();
    cy.get('[cid="billpayment-error-mes"]')
      .contains("Please put only number")
      .should("exist");

    //logout
    cy.visit("https://cu-bank-fe.vercel.app/");
  });

  //------------

  // TC8 Amount is 1.0 expected success
  it("TC8: bill payment amount is 1.0", () => {
    //login
    logIn();
    cy.wait("@loginSubmit").then((interception) => {
      expect(interception.response?.statusCode).eq(200);
      let res = interception.response?.body.user;
      let balance_update = res.balance;
      if (balance_update) {
        balance = balance_update;
      }
    });

    //bill payment submit
    cy.get('[cid="b1"]').click();
    cy.get('[cid="b4"]').type("1.0");
    cy.intercept(
      "PUT",
      "https://cu-bank.herokuapp.com/api/v1/transactions/"
    ).as("tc8Submit");
    cy.get('[cid="bc"]').click();
    cy.wait("@tc8Submit").then((interception) => {
      expect(interception.response.statusCode).eq(200);
    });

    //logout
    cy.visit("https://cu-bank-fe.vercel.app/");
  });

  //------------

  // TC9 Amount is 1.01 expected Please enter a valid value.
  it("TC9: bill payment amount is 1.01", () => {
    //login
    logIn();
    cy.wait("@loginSubmit").then((interception) => {
      expect(interception.response?.statusCode).eq(200);
      let res = interception.response?.body.user;
      let balance_update = res.balance;
      if (balance_update) {
        balance = balance_update;
      }
    });

    //bill payment submit
    cy.get('[cid="b1"]').click();
    cy.get('[cid="b4"]').type("1.01");
    cy.get('[cid="bc"]').click();
    cy.get('input[cid="b4"]')
      .then(($el) => $el[0].checkValidity())
      .should("be.false");

    //logout
    cy.visit("https://cu-bank-fe.vercel.app/");
  });

  //------------

  // TC10 Amount is 1.0000000597 expected Please enter a valid value.
  it("TC10: bill payment amount is 1.0000000597", () => {
    //login
    logIn();
    cy.wait("@loginSubmit").then((interception) => {
      expect(interception.response?.statusCode).eq(200);
      let res = interception.response?.body.user;
      let balance_update = res.balance;
      if (balance_update) {
        balance = balance_update;
      }
    });

    //bill payment submit
    cy.get('[cid="b1"]').click();
    cy.get('[cid="b4"]').type("1.0000000597");
    cy.get('[cid="bc"]').click();
    cy.get('input[cid="b4"]')
      .then(($el) => $el[0].checkValidity())
      .should("be.false");

    //logout
    cy.visit("https://cu-bank-fe.vercel.app/");
  });

  //------------

  // TC11 Amount is 1.0000000596 expected Please enter a valid value.
  it("TC11: bill payment amount is 1.0000000596", () => {
    //login
    logIn();
    cy.wait("@loginSubmit").then((interception) => {
      expect(interception.response?.statusCode).eq(200);
      let res = interception.response?.body.user;
      let balance_update = res.balance;
      if (balance_update) {
        balance = balance_update;
      }
    });

    //bill payment submit
    cy.get('[cid="b1"]').click();
    cy.get('[cid="b4"]').type("1.0000000596");
    cy.intercept(
      "PUT",
      "https://cu-bank.herokuapp.com/api/v1/transactions/"
    ).as("tc11Submit");
    cy.get('[cid="bc"]').click();
    cy.wait("@tc11Submit").then((interception) => {
      expect(interception.response.statusCode).eq(200);
    });

    //logout
    cy.visit("https://cu-bank-fe.vercel.app/");
  });

  //------------

  // TC12 Amount is +1 expected success
  it("TC12: bill payment amount is +1", () => {
    //login
    logIn();
    cy.wait("@loginSubmit").then((interception) => {
      expect(interception.response?.statusCode).eq(200);
    });

    //bill payment submit
    cy.get('[cid="b1"]').click();
    cy.get('[cid="b4"]').type(+1);
    cy.intercept(
      "PUT",
      "https://cu-bank.herokuapp.com/api/v1/transactions/"
    ).as("tc11Submit");
    cy.get('[cid="bc"]').click();
    cy.wait("@tc11Submit").then((interception) => {
      expect(interception.response.statusCode).eq(200);
    });

    //logout
    cy.visit("https://cu-bank-fe.vercel.app/");
  });

  //------------

  // TC13 Amount is -1 expected Please put only number
  it("TC13: bill payment amount is -1", () => {
    //login
    logIn();
    cy.wait("@loginSubmit").then((interception) => {
      expect(interception.response?.statusCode).eq(200);
    });

    //bill payment submit
    cy.get('[cid="b1"]').click();
    cy.get('[cid="b4"]').type("-1");
    cy.get('[cid="bc"]').click();
    cy.get('[cid="billpayment-error-mes"]')
      .contains("Please put only number")
      .should("exist");

    //logout
    cy.visit("https://cu-bank-fe.vercel.app/");
  });

  //------------

  // TC14 Amount is ++1 expected Please enter a number.
  it("TC14: bill payment amount is ++1", () => {
    //login
    logIn();
    cy.wait("@loginSubmit").then((interception) => {
      expect(interception.response?.statusCode).eq(200);
    });

    //bill payment submit
    cy.get('[cid="b1"]').click();
    cy.get('[cid="b4"]').type("++1");
    cy.get('[cid="bc"]').click();
    cy.get('input[cid="b4"]')
      .then(($el) => $el[0].checkValidity())
      .should("be.false");

    //logout
    cy.visit("https://cu-bank-fe.vercel.app/");
  });

  //------------

  // TC15 Amount is +1+ expected Please put only number
  it("TC15: bill payment amount is +1+", () => {
    //login
    logIn();
    cy.wait("@loginSubmit").then((interception) => {
      expect(interception.response?.statusCode).eq(200);
    });

    //bill payment submit
    cy.get('[cid="b1"]').click();
    cy.get('[cid="b4"]').type("+1+");
    cy.get('[cid="bc"]').click();
    cy.get('input[cid="b4"]')
      .then(($el) => $el[0].checkValidity())
      .should("be.false");

    //logout
    cy.visit("https://cu-bank-fe.vercel.app/");
  });

  //------------

  // TC17 Amount is 1e999 expected Please put only number
  it("TC17: bill payment amount is 1e999", () => {
    //login
    logIn();
    cy.wait("@loginSubmit").then((interception) => {
      expect(interception.response?.statusCode).eq(200);
    });

    //bill payment submit
    cy.get('[cid="b1"]').click();
    cy.get('[cid="b4"]').type("1e999");
    cy.get('[cid="bc"]').click();
    cy.get('input[cid="b4"]')
      .then(($el) => $el[0].checkValidity())
      .should("be.false");

    //logout
    cy.visit("https://cu-bank-fe.vercel.app/");
  });

  //------------

  // TC18 Amount is 1e99 expected success
  it("TC18: bill payment amount is 1e99", () => {
    //login
    logIn();
    cy.wait("@loginSubmit").then((interception) => {
      expect(interception.response?.statusCode).eq(200);
    });

    //bill payment submit
    cy.get('[cid="b1"]').click();
    cy.get('[cid="b4"]').type("1e99");
    cy.intercept(
      "PUT",
      "https://cu-bank.herokuapp.com/api/v1/transactions/"
    ).as("tc18Submit");
    cy.get('[cid="bc"]').click();
    cy.wait("@tc18Submit").then((interception) => {
      expect(interception.response.statusCode).eq(200);
    });

    //logout
    cy.visit("https://cu-bank-fe.vercel.app/");
  });

  //------------

  // TC19 Amount is 1e9 expected success
  it("TC19: bill payment amount is 1e9", () => {
    //login
    logIn();
    cy.wait("@loginSubmit").then((interception) => {
      expect(interception.response?.statusCode).eq(200);
    });

    //bill payment submit
    cy.get('[cid="b1"]').click();
    cy.get('[cid="b4"]').type("1e9");
    cy.intercept(
      "PUT",
      "https://cu-bank.herokuapp.com/api/v1/transactions/"
    ).as("tc19Submit");
    cy.get('[cid="bc"]').click();
    cy.wait("@tc19Submit").then((interception) => {
      expect(interception.response.statusCode).eq(200);
    });

    //logout
    cy.visit("https://cu-bank-fe.vercel.app/");
  });

  //------------

  // TC20 not select option expected Please select one of these options.
  it("TC20: not select option", () => {
    //login
    logIn();
    cy.wait("@loginSubmit").then((interception) => {
      expect(interception.response?.statusCode).eq(200);
    });

    //bill payment submit
    cy.get('[cid="b4"]').type("10");
    cy.get('[cid="bc"]').click();
    cy.get('input[cid="b1"]')
      .then(($el) => $el[0].checkValidity())
      .should("be.false");

    //logout
    cy.visit("https://cu-bank-fe.vercel.app/");
  });
});
