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
      cy.intercept('GET', 'https://cu-bank.herokuapp.com/api/v1/transactions').as('getTransaction')
      cy.wait('@getTransaction').then((interception2) => {
        expect(interception2.response?.statusCode).eq(200);
        let res = interception2.response?.body;
        let balanceUpdate = res.data.balance;
        if(balanceUpdate > 0){
          cy.get('[cid="w1"]').type(JSON.stringify(balanceUpdate));
          cy.intercept('PUT', 'https://cu-bank.herokuapp.com/api/v1/transactions').as('putTransaction')
          cy.get('[cid="wc"]').click();
          cy.wait('@putTransaction').then((interception3) => {
            expect(interception3.response?.statusCode).eq(200);
          });
        }
        cy.get('[cid="d1"]').clear();
        cy.get('[cid="w1"]').clear();
        cy.get('[cid="d1"]').type("100");
        cy.intercept('PUT', 'https://cu-bank.herokuapp.com/api/v1/transactions').as('putTransaction2')
        cy.get('[cid="dc"]').click();
        cy.wait('@putTransaction2').then((interception4) => {
          expect(interception4.response?.statusCode).eq(200);
        });
      });
    });
  });

  // TC1 Amount max+ expected your balance isn't not enough
  it("TC1: withdraw amount is 101", () => {
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

      cy.get('[cid="w1"]').type(JSON.stringify(balance_update + 1));
    });

    //withdraw submit
    cy.get('[cid="wc"]').click();
    cy.get('[cid="withdraw-error-mes"]')
      .contains("your balance isn't not enough")
      .should("exist");
  });

  //------------

  // TC2 Amount balance max expected success
  it("TC2: withdraw amount is 100", () => {
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
      console.log("current balance: " + balance);
      let max = balance;

      //type withdraw amount
      cy.get('[cid="w1"]').type(JSON.stringify(max));
    });

    cy.intercept(
      "PUT",
      "https://cu-bank.herokuapp.com/api/v1/transactions/"
    ).as("tc2Submit");

    //withdraw submit
    cy.get('[cid="wc"]').click();
    cy.wait("@tc2Submit").then((interception) => {
      let res = interception.response?.body.data;
      let balance_update = res.balance;
      console.log(balance_update);
      expect(balance_update).eq(0);
    });

    //deposit for next case
    cy.get('[cid="d1"]').clear();
    cy.get('[cid="d1"]').type("100");
    cy.intercept('PUT', 'https://cu-bank.herokuapp.com/api/v1/transactions').as('putTransaction')
    cy.get('[cid="dc"]').click();
    cy.wait('@putTransaction').then((interception4) => {
      expect(interception4.response?.statusCode).eq(200);
    });
  });
  //-----------

  // TC3 Amount balance max- expected success
  it("TC3: withdraw amount is 99", () => {
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
      console.log("current balance: " + balance);
      let maxN = balance - 1;
      console.log("maxN" + maxN);

      //type withdraw amount
      cy.get('[cid="w1"]').type(JSON.stringify(maxN));
    });

    cy.intercept(
      "PUT",
      "https://cu-bank.herokuapp.com/api/v1/transactions/"
    ).as("tc3Submit");

    //withdraw submit
    cy.get('[cid="wc"]').click();
    cy.wait("@tc3Submit").then((interception) => {
      let res = interception.response?.body.data;
      let balance_update = res.balance;
      console.log(balance_update);
      expect(balance_update).eq(1);
    });

    //deposit for next case
    cy.get('[cid="d1"]').clear();
    cy.get('[cid="d1"]').type("99");
    cy.intercept('PUT', 'https://cu-bank.herokuapp.com/api/v1/transactions').as('putTransaction')
    cy.get('[cid="dc"]').click();
    cy.wait('@putTransaction').then((interception4) => {
      expect(interception4.response?.statusCode).eq(200);
    });
  });
  //-----------

  // TC4 Amount = 50 expected success
  it("TC4: withdraw amount is 50", () => {
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
      console.log("current balance: " + balance);
    });

    //withdraw submit
    cy.get('[cid="w1"]').type("50");
    cy.intercept(
      "PUT",
      "https://cu-bank.herokuapp.com/api/v1/transactions/"
    ).as("tc4Submit");
    cy.get('[cid="wc"]').click();
    cy.wait("@tc4Submit").then((interception) => {
      let res = interception.response?.body.data;
      let balance_update = res.balance;
      console.log(balance_update);
      expect(balance_update).eq(balance - 50);
    });
  });
  //-----------

  // TC5 Amount = 2 expected success
  it("TC5: withdraw amount is 2", () => {
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

    //withdraw submit
    cy.get('[cid="w1"]').type("2");
    cy.intercept(
      "PUT",
      "https://cu-bank.herokuapp.com/api/v1/transactions/"
    ).as("tc5Submit");
    cy.get('[cid="wc"]').click();
    cy.wait("@tc5Submit").then((interception) => {
      let res = interception.response?.body.data;
      let balance_update = res.balance;
      //console.log(balance_update)
      expect(balance_update).eq(balance - 2);
    });
  });
  //-----------

  // TC6 Amount = 1 expected success
  it("TC6: withdraw amount is 1", () => {
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
      console.log("current balance: " + balance);
    });

    //withdraw submit
    cy.get('[cid="w1"]').type("1");
    cy.intercept(
      "PUT",
      "https://cu-bank.herokuapp.com/api/v1/transactions/"
    ).as("tc6Submit");
    cy.get('[cid="wc"]').click();
    cy.wait("@tc6Submit").then((interception) => {
      let res = interception.response?.body.data;
      let balance_update = res.balance;
      console.log(balance_update);
      expect(balance_update).eq(balance - 1);
    });
  });
  //------------

  // TC7 Amount = 0 expected Please put only number
  it("TC7: withdraw amount is 0", () => {
    //login
    logIn();
    cy.wait("@loginSubmit").then((interception) => {
      expect(interception.response?.statusCode).eq(200);
    });

    //withdraw submit
    cy.get('[cid="w1"]').type("0");
    cy.get('[cid="wc"]').click();
    cy.get('[cid="withdraw-error-mes"]')
      .contains("Please put only number")
      .should("exist");
  });

  //------------

  // TC8 Amount = 1.0 expected success
  it("TC8: withdraw amount is 1.0", () => {
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

    //withdraw submit
    cy.get('[cid="w1"]').type("1.0");
    cy.intercept(
      "PUT",
      "https://cu-bank.herokuapp.com/api/v1/transactions/"
    ).as("tc8Submit");
    cy.get('[cid="wc"]').click();
    cy.wait("@tc8Submit").then((interception) => {
      expect(interception.response.statusCode).eq(200);
    });
  });
  //------------

  // TC9 Amount = 1.01 expected Please enter a valid value.
  it("TC9: withdraw amount is 1.01", () => {
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

    //withdraw submit
    cy.get('[cid="w1"]').type("1.01");
    cy.get('[cid="wc"]').click();
    cy.get('input[cid="w1"]')
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
  });
  //------------

  // TC10 Amount = 1.0000000597 expected Please enter a valid value.
  it("TC10: withdraw amount is 1.0000000597", () => {
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

    //withdraw submit
    cy.get('[cid="w1"]').type("1.0000000597");
    cy.get('[cid="wc"]').click();
    cy.get('input[cid="w1"]')
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
  });
  //------------

  // TC11 Amount = 1.0000000596 expected Success
  it("TC11: withdraw amount is 1.0000000596", () => {
    //login
    logIn();
    cy.wait("@loginSubmit").then((interception) => {
      expect(interception.response?.statusCode).eq(200);
      let res = interception.response?.body.user;
      let balance_update = res.balance;
      //console.log(balance_update)
      if (balance_update) {
        balance = balance_update;
      }
      //console.log("current balance: "+balance)
    });

    //withdraw submit
    cy.get('[cid="w1"]').type("1.0000000596 ");
    cy.intercept(
      "PUT",
      "https://cu-bank.herokuapp.com/api/v1/transactions/"
    ).as("tc11Submit");
    cy.get('[cid="wc"]').click();
    cy.wait("@tc11Submit").then((interception) => {
      expect(interception.response.statusCode).eq(200);
    });
  });
  //------------

  // TC12 Amount = +1 expected Success
  it("TC12: withdraw amount is +1", () => {
    //login
    logIn();
    cy.wait("@loginSubmit").then((interception) => {
      expect(interception.response?.statusCode).eq(200);
    });

    //withdraw submit
    cy.get('[cid="w1"]').type(+1);
    cy.intercept(
      "PUT",
      "https://cu-bank.herokuapp.com/api/v1/transactions/"
    ).as("tc12Submit");
    cy.get('[cid="wc"]').click();
    cy.wait("@tc12Submit").then((interception) => {
      expect(interception.response.statusCode).eq(200);
    });
  });
  //------------

  // TC13 Amount = -1 expected Please put only number
  it("TC13: withdraw amount is -1", () => {
    //login
    logIn();
    cy.wait("@loginSubmit").then((interception) => {
      expect(interception.response?.statusCode).eq(200);
      let res = interception.response?.body.user;
      let balance_update = res.balance;
      // console.log(balance_update)
      if (balance_update) {
        balance = balance_update;
      }
      // console.log("current balance: "+balance)
    });

    //withdraw submit
    cy.get('[cid="w1"]').type("-1");
    cy.get('[cid="wc"]').click();
    cy.get('[cid="withdraw-error-mes"]')
      .contains("Please put only number")
      .should("exist");
  });

  //------------

  // TC14 Amount = ++1 expected Please enter a number.
  it("TC14: withdraw amount is ++1", () => {
    //login
    logIn();
    cy.wait("@loginSubmit").then((interception) => {
      expect(interception.response?.statusCode).eq(200);
    });

    //withdraw submit
    cy.get('[cid="w1"]').type("++1");
    cy.get('[cid="wc"]').click();
    cy.get('input[cid="w1"]')
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
  });
  //------------

  // TC15 Amount = +1+ expected Please enter a number.
  it("TC15: withdraw amount is +1+", () => {
    //login
    logIn();
    cy.wait("@loginSubmit").then((interception) => {
      expect(interception.response?.statusCode).eq(200);
    });

    //withdraw submit
    cy.get('[cid="w1"]').type("+1+");
    cy.get('[cid="wc"]').click();
    cy.get('input[cid="w1"]')
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
  });
  //------------

  // TC16 Amount = 1++ expected Please enter a number.
  // it("TC16: withdraw amount is 1++", () => {
  //   //login
  //   logIn();
  //   cy.wait("@loginSubmit").then((interception) => {
  //     expect(interception.response?.statusCode).eq(200);
  //   });

  //   //withdraw submit
  //   cy.get('[cid="w1"]').type('1++', { force: true });
  //   cy.get('[cid="wc"]').click();
  //   cy.get('input[cid="w1"]')
  //     .then(($el) => $el[0].checkValidity())
  //     .should("be.false");
  // });
  //------------

  // TC17 Amount = 1e999 expected Please enter a number.
  it("TC17: withdraw amount is 1e999", () => {
    //login
    logIn();
    cy.wait("@loginSubmit").then((interception) => {
      expect(interception.response?.statusCode).eq(200);
    });

    //withdraw submit
    cy.get('[cid="w1"]').type("1e999");
    cy.get('[cid="wc"]').click();
    cy.get('input[cid="w1"]')
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
  });
  //------------

  // TC18 Amount = 1e99 expected success
  it("TC18: withdraw amount is 1e99", () => {
    //login
    logIn();
    cy.wait("@loginSubmit").then((interception) => {
      expect(interception.response?.statusCode).eq(200);
      let res = interception.response?.body.user;
      let balance_update = res.balance;
      //console.log(balance_update)
      if (balance_update) {
        balance = balance_update;
      }
      //console.log("current balance: "+balance)
    });

    //withdraw submit
    cy.get('[cid="w1"]').type("1e99");
    cy.intercept(
      "PUT",
      "https://cu-bank.herokuapp.com/api/v1/transactions/"
    ).as("tc18Submit");
    cy.get('[cid="wc"]').click();
    cy.wait("@tc18Submit").then((interception) => {
      expect(interception.response.statusCode).eq(200);
    });
  });
  //------------

  // TC19 Amount = 1e9 expected success
  it("TC19: withdraw amount is 1e9", () => {
    //login
    logIn();
    cy.wait("@loginSubmit").then((interception) => {
      expect(interception.response?.statusCode).eq(200);
      let res = interception.response?.body.user;
      let balance_update = res.balance;
      //console.log(balance_update)
      if (balance_update) {
        balance = balance_update;
      }
      //console.log("current balance: "+balance)
    });

    //withdraw submit
    cy.get('[cid="w1"]').type("1e99");
    cy.intercept(
      "PUT",
      "https://cu-bank.herokuapp.com/api/v1/transactions/"
    ).as("tc19Submit");
    cy.get('[cid="wc"]').click();
    cy.wait("@tc19Submit").then((interception) => {
      expect(interception.response.statusCode).eq(200);
    });
  });
  //------------
});
