
const API_URL_TRANSACTION = "https://cu-bank.herokuapp.com/api/v1/transactions";
const API_URL_AUTH = "https://cu-bank.herokuapp.com/api/v1/auth";

const username1 = '4684246842';
const password1 = '4684';
const username2 = '0819889541';
const password2 = '4684';

const doLoginAccount1 = () => {
  cy.clearLocalStorage();

  cy.visit('https://cu-bank-fe.vercel.app');

  cy.get('#accountId').clear();
  cy.get('#password').clear();
  cy.get('#accountId').type(username1);
  cy.get('#password').type(password1);
  cy.intercept('POST', 'https://cu-bank.herokuapp.com/api/v1/auth/login').as('loginSuccess')
  cy.get('button').click();
  // cy.wait('@loginSuccess').then((interception) => {
  //   expect(interception.response?.statusCode).eq(200);
  // });
};

const loginAccount2 = () => {
  return cy.request({
    method: 'POST',
    url: API_URL_AUTH + "/login",
    body: {
      accountId: username2,
      password: password2,
    }
  })
}

const prepBalance = (prepBalance = -999) => {

  cy.wait("@loginSuccess").then((interception) => {
    expect(interception.response?.statusCode).eq(200);

    cy.intercept('GET', 'https://cu-bank.herokuapp.com/api/v1/transactions').as('getTransaction');
    cy.wait('@getTransaction').then((interception2) => {
      expect(interception2.response?.statusCode).eq(200);
      let res = interception2.response?.body;
      let balanceUpdate = res.data.balance;
      if (balanceUpdate > 0) {
        cy.get('[cid="w1"]').type(JSON.stringify(balanceUpdate));
        cy.intercept('PUT', 'https://cu-bank.herokuapp.com/api/v1/transactions').as('putTransaction')
        cy.get('[cid="wc"]').click();
        cy.wait('@putTransaction').then((interception3) => {
          expect(interception3.response?.statusCode).eq(200);
        });
      }
      cy.get('[cid="d1"]').clear();
      cy.get('[cid="w1"]').clear();
      if (prepBalance === -999) {
        cy.get('[cid="d1"]').type("100");
      } else {
        cy.get('[cid="d1"]').type(prepBalance + '');
      }

      cy.intercept('PUT', 'https://cu-bank.herokuapp.com/api/v1/transactions').as('putTransaction2')
      cy.get('[cid="dc"]').click();
      cy.wait('@putTransaction2').then((interception4) => {
        expect(interception4.response?.statusCode).eq(200);
      });
    });
  });
};

describe('Transfer scenario', () => {

  it("TC1 - your balance isn't enough", () => {
    doLoginAccount1();
    prepBalance();
    cy.get('input[cid="t1"]').type(username2);
    cy.get('input[cid="t2"]').type('101');
    cy.get('button[cid="tc"]').click()
      .then(() => {
        cy.get('label[cid="transfer-error-mes"]')
          .contains("your balance isn't not enough")
          .should('exist');
      });
  });

  it("TC2 - success transfer amg = 100", () => {

    let amg = 100;

    loginAccount2()
      .then((res) => {
        expect(res.status).to.eq(200);
        let balance = res.body.user.balance;
        cy.setCookie('old-balance', balance + '');
      });

    doLoginAccount1();
    prepBalance();

    cy.get('input[cid="t1"]').type(username2);
    cy.get('input[cid="t2"]').type(amg + '');
    cy.intercept('PUT', 'https://cu-bank.herokuapp.com/api/v1/transactions/').as('putTransfer');
    cy.get('button[cid="tc"]').click();
    cy.wait('@putTransfer', { timeout: 10000 }).then((interception) => {
      expect(interception.response?.statusCode).eq(200);
      loginAccount2().then((res) => {
        cy.getCookie('old-balance').then((cookie) => {
          let oldBalance = cookie.value;
          let shouldBeBalance = Number(oldBalance) + amg;
          let currentBalance = res.body.user.balance;
          expect(currentBalance + '').eq(shouldBeBalance + '');

          console.log('current balance: ' + res.body.user.balance);
          console.log('old balance: ' + oldBalance);
          console.log('among: ' + amg);
        });
      });
    });
  });

  it('TC3 - success transfer amg = 99', () => {

    let amg = 99;

    loginAccount2()
      .then((res) => {
        expect(res.status).to.eq(200);
        let balance = res.body.user.balance;
        cy.setCookie('old-balance', balance + '');
      });

    doLoginAccount1();
    prepBalance();

    cy.get('input[cid="t1"]').type(username2);
    cy.get('input[cid="t2"]').type(amg + '');
    cy.intercept('PUT', 'https://cu-bank.herokuapp.com/api/v1/transactions/').as('putTransfer');
    cy.get('button[cid="tc"]').click();
    cy.wait('@putTransfer', { timeout: 10000 }).then((interception) => {
      expect(interception.response?.statusCode).eq(200);
      loginAccount2().then((res) => {
        cy.getCookie('old-balance').then((cookie) => {
          let oldBalance = cookie.value;
          let shouldBeBalance = Number(oldBalance) + amg;
          let currentBalance = res.body.user.balance;
          expect(currentBalance + '').eq(shouldBeBalance + '');

          console.log('current balance: ' + res.body.user.balance);
          console.log('old balance: ' + oldBalance);
          console.log('among: ' + amg);
        });
      });
    });
  });

  it('TC4 - success transfer amg = 50', () => {

    let amg = 50;

    loginAccount2()
      .then((res) => {
        expect(res.status).to.eq(200);
        let balance = res.body.user.balance;
        cy.setCookie('old-balance', balance + '');
      });

    doLoginAccount1();
    prepBalance();

    cy.get('input[cid="t1"]').type(username2);
    cy.get('input[cid="t2"]').type(amg + '');
    cy.intercept('PUT', 'https://cu-bank.herokuapp.com/api/v1/transactions/').as('putTransfer');
    cy.get('button[cid="tc"]').click();
    cy.wait('@putTransfer', { timeout: 10000 }).then((interception) => {
      expect(interception.response?.statusCode).eq(200);
      loginAccount2().then((res) => {
        cy.getCookie('old-balance').then((cookie) => {
          let oldBalance = cookie.value;
          let shouldBeBalance = Number(oldBalance) + amg;
          let currentBalance = res.body.user.balance;
          expect(currentBalance + '').eq(shouldBeBalance + '');

          console.log('current balance: ' + res.body.user.balance);
          console.log('old balance: ' + oldBalance);
          console.log('among: ' + amg);
        });
      });
    });
  });

  it('TC5 - success transfer amg = 2', () => {

    let amg = 2;

    loginAccount2()
      .then((res) => {
        expect(res.status).to.eq(200);
        let balance = res.body.user.balance;
        cy.setCookie('old-balance', balance + '');
      });

    doLoginAccount1();
    prepBalance();

    cy.get('input[cid="t1"]').type(username2);
    cy.get('input[cid="t2"]').type(amg + '');
    cy.intercept('PUT', 'https://cu-bank.herokuapp.com/api/v1/transactions/').as('putTransfer');
    cy.get('button[cid="tc"]').click();
    cy.wait('@putTransfer', { timeout: 10000 }).then((interception) => {
      expect(interception.response?.statusCode).eq(200);
      loginAccount2().then((res) => {
        cy.getCookie('old-balance').then((cookie) => {
          let oldBalance = cookie.value;
          let shouldBeBalance = Number(oldBalance) + amg;
          let currentBalance = res.body.user.balance;
          expect(currentBalance + '').eq(shouldBeBalance + '');

          console.log('current balance: ' + res.body.user.balance);
          console.log('old balance: ' + oldBalance);
          console.log('among: ' + amg);
        });
      });
    });
  });

  it('TC6 - success transfer amg = 1', () => {

    let amg = 1;

    loginAccount2()
      .then((res) => {
        expect(res.status).to.eq(200);
        let balance = res.body.user.balance;
        cy.setCookie('old-balance', balance + '');
      });

    doLoginAccount1();
    prepBalance();

    cy.get('input[cid="t1"]').type(username2);
    cy.get('input[cid="t2"]').type(amg + '');
    cy.intercept('PUT', 'https://cu-bank.herokuapp.com/api/v1/transactions/').as('putTransfer');
    cy.get('button[cid="tc"]').click();
    cy.wait('@putTransfer', { timeout: 10000 }).then((interception) => {
      expect(interception.response?.statusCode).eq(200);
      loginAccount2().then((res) => {
        cy.getCookie('old-balance').then((cookie) => {
          let oldBalance = cookie.value;
          let shouldBeBalance = Number(oldBalance) + amg;
          let currentBalance = res.body.user.balance;
          expect(currentBalance + '').eq(shouldBeBalance + '');

          console.log('current balance: ' + res.body.user.balance);
          console.log('old balance: ' + oldBalance);
          console.log('among: ' + amg);
        });
      });
    });
  });

  it('TC7 - fail transfer amg = 0', () => {
    let amg = 0;
    doLoginAccount1();
    cy.wait("@loginSuccess", { timeout: 10000 }).then((interception) => {
      expect(interception.response?.statusCode).eq(200);
      cy.get('input[cid="t1"]').type(username2);
      cy.get('input[cid="t2"]').type(amg + '');
      cy.get('button[cid="tc"]').click();
      cy.get('label[cid="transfer-error-mes"]')
        .contains('Please put only number')
        .should('exist');
    });
  });

  it('TC8 - success transfer amg = 1.0', () => {

    let amg = '1.0';

    loginAccount2()
      .then((res) => {
        expect(res.status).to.eq(200);
        let balance = res.body.user.balance;
        cy.setCookie('old-balance', balance + '');
      });

    doLoginAccount1();
    prepBalance();

    cy.get('input[cid="t1"]').type(username2);
    cy.get('input[cid="t2"]').type(amg);
    cy.intercept('PUT', 'https://cu-bank.herokuapp.com/api/v1/transactions/').as('putTransfer');
    cy.get('button[cid="tc"]').click();
    cy.wait('@putTransfer', { timeout: 10000 }).then((interception) => {
      expect(interception.response?.statusCode).eq(200);
      loginAccount2().then((res) => {
        cy.getCookie('old-balance').then((cookie) => {
          let oldBalance = cookie.value;
          let shouldBeBalance = Number(oldBalance) + Number(amg);
          let currentBalance = res.body.user.balance;
          expect(currentBalance + '').eq(shouldBeBalance + '');

          console.log('current balance: ' + res.body.user.balance);
          console.log('old balance: ' + oldBalance);
          console.log('among: ' + amg);
        });
      });
    });
  });

  it('TC9 - fail transfer amg = 1.01', () => {
    doLoginAccount1();
    cy.wait("@loginSuccess", { timeout: 10000 }).then((interception) => {
      cy.get('input[cid="t1"]').type(username2);
      cy.get('input[cid="t2"]').type('1.01');
      cy.get('button[cid="tc"]').click()
        .then(() => {
          cy.get('input[cid="t2"]').then($el => $el[0].checkValidity()).should('be.false');
        });
    });
  });

  it('TC10 - fail transfer amg = 1.0000000597', () => {
    doLoginAccount1();
    cy.wait("@loginSuccess", { timeout: 10000 }).then((interception) => {
      expect(interception.response?.statusCode).eq(200);
      cy.get('input[cid="t1"]').type(username2);
      cy.get('input[cid="t2"]').type('1.0000000597');
      cy.get('button[cid="tc"]').click().then(() => {
        cy.get('input[cid="t2"]').then($el => $el[0].checkValidity()).should('be.false');
      });
    });
  });

  it('TC11 - success transfer amg = 1.0000000596', () => {

    let amg = '1.0000000596';

    loginAccount2()
      .then((res) => {
        expect(res.status).to.eq(200);
        let balance = res.body.user.balance;
        cy.setCookie('old-balance', balance + '');
      });

    doLoginAccount1();
    prepBalance();

    cy.get('input[cid="t1"]').type(username2);
    cy.get('input[cid="t2"]').type(amg);
    cy.intercept('PUT', 'https://cu-bank.herokuapp.com/api/v1/transactions/').as('putTransfer');
    cy.get('button[cid="tc"]').click();
    cy.wait('@putTransfer', { timeout: 10000 }).then((interception) => {
      expect(interception.response?.statusCode).eq(200);
      loginAccount2().then((res) => {
        cy.getCookie('old-balance').then((cookie) => {
          let oldBalance = cookie.value;
          let shouldBeBalance = Math.round(Number(oldBalance) + Number(amg));
          let currentBalance = res.body.user.balance;
          expect(currentBalance + '').eq(shouldBeBalance + '');

          console.log('current balance: ' + res.body.user.balance);
          console.log('old balance: ' + oldBalance);
          console.log('among: ' + amg);
        });
      });
    });
  });

  it('TC17 - fail transfer amg = 1e999', () => {
    doLoginAccount1();
    cy.wait("@loginSuccess", { timeout: 10000 }).then((interception) => {
      expect(interception.response?.statusCode).eq(200);
      cy.get('input[cid="t1"]').type(username2);
      cy.get('input[cid="t2"]').type('1e999');
      cy.get('button[cid="tc"]').click()
        .then(() => {
          cy.get('input[cid="t2"]').then($el => $el[0].checkValidity()).should('be.false');
        });

    });
  });

  it('TC18 - success transfer amg = 1e99', () => {

    let amg = '1e99';

    loginAccount2()
      .then((res) => {
        expect(res.status).to.eq(200);
        let balance = res.body.user.balance;
        cy.setCookie('old-balance', balance + '');
      });

    doLoginAccount1();
    prepBalance();

    cy.get('input[cid="t1"]').type(username2);
    cy.get('input[cid="t2"]').type(amg);
    cy.intercept('PUT', 'https://cu-bank.herokuapp.com/api/v1/transactions/').as('putTransfer');
    cy.get('button[cid="tc"]').click();
    cy.wait('@putTransfer', { timeout: 10000 }).then((interception) => {
      expect(interception.response?.statusCode).eq(200);
      loginAccount2().then((res) => {
        cy.getCookie('old-balance').then((cookie) => {
          let oldBalance = cookie.value;
          let shouldBeBalance = Math.round(Number(oldBalance) + 1);
          let currentBalance = res.body.user.balance;
          expect(currentBalance + '').eq(shouldBeBalance + '');
          console.log('current balance: ' + res.body.user.balance);
          console.log('old balance: ' + oldBalance);
          console.log('among: ' + 1);
        });
      });
    });
  });

  it('TC19 - success transfer amg = 1e9', () => {

    let amg = '1e9';

    loginAccount2()
      .then((res) => {
        expect(res.status).to.eq(200);
        let balance = res.body.user.balance;
        cy.setCookie('old-balance', balance + '');
      });

    doLoginAccount1();
    prepBalance();

    cy.get('input[cid="t1"]').type(username2);
    cy.get('input[cid="t2"]').type(amg);
    cy.intercept('PUT', 'https://cu-bank.herokuapp.com/api/v1/transactions/').as('putTransfer');
    cy.get('button[cid="tc"]').click();
    cy.wait('@putTransfer', { timeout: 10000 }).then((interception) => {
      expect(interception.response?.statusCode).eq(200);
      loginAccount2().then((res) => {
        cy.getCookie('old-balance').then((cookie) => {
          let oldBalance = cookie.value;
          let shouldBeBalance = Math.round(Number(oldBalance) + 1);
          let currentBalance = res.body.user.balance;
          expect(currentBalance + '').eq(shouldBeBalance + '');
          console.log('current balance: ' + res.body.user.balance);
          console.log('old balance: ' + oldBalance);
          console.log('among: ' + 1);
        });
      });
    });
  });

  it('TC20 - fail put account id with 11 characters', () => {
    let amg = 50;
    doLoginAccount1();
    cy.wait("@loginSuccess", { timeout: 10000 }).then((interception) => {
      expect(interception.response?.statusCode).eq(200);
      cy.get('input[cid="t1"]').type(username2 + '1');
      cy.get('input[cid="t2"]').type(amg + '');
      cy.get('button[cid="tc"]').click()
        .then(() => {
          cy.get('label[cid="transfer-error-mes"]')
            .contains('Please fill accountId 10 digits')
            .should('exist');
        });
    });
  });

  it('TC21 - fail put account id with 9 characters', () => {
    let amg = 50;
    doLoginAccount1();
    cy.wait("@loginSuccess", { timeout: 10000 }).then((interception) => {
      expect(interception.response?.statusCode).eq(200);
      cy.get('input[cid="t1"]').type(username2.substring(0, username2.length - 1));
      cy.get('input[cid="t2"]').type(amg + '');
      cy.get('button[cid="tc"]').click()
        .then(() => {
          cy.get('label[cid="transfer-error-mes"]')
            .contains('Please fill accountId 10 digits')
            .should('exist');
        });
    });
  });

  it('TC22 - fail put account id wording "nine000001"', () => {
    let amg = 50;
    doLoginAccount1();
    cy.wait("@loginSuccess", { timeout: 10000 }).then((interception) => {
      expect(interception.response?.statusCode).eq(200);
      cy.get('input[cid="t1"]').type('nine000001');
      cy.get('input[cid="t2"]').type(amg + '');
      cy.get('button[cid="tc"]').click()
        .then(() => {
          cy.get('label[cid="transfer-error-mes"]')
            .contains('Please put accountId only number')
            .should('exist');
        });
    });
  });


  it('TC23 - failed send money to not found user', () => {

    let amg = '50';

    loginAccount2()
      .then((res) => {
        expect(res.status).to.eq(200);
        let balance = res.body.user.balance;
        cy.setCookie('old-balance', balance + '');
      });

    doLoginAccount1();
    prepBalance();

    cy.get('input[cid="t1"]').type('1122334455');
    cy.get('input[cid="t2"]').type(amg);
    cy.intercept('PUT', 'https://cu-bank.herokuapp.com/api/v1/transactions/').as('putTransfer');
    cy.get('button[cid="tc"]').click();
    cy.wait('@putTransfer', { timeout: 10000 }).then((interception) => {
      expect(interception.response?.statusCode).eq(400);
      cy.get('label[cid="transfer-error-mes"]')
        .contains('Not found your target account Id')
        .should('exist');
    });
  });

  it('TC24 - failed send money owner user', () => {

    let amg = '50';
    
    doLoginAccount1();
    prepBalance();

    cy.get('input[cid="t1"]').type(username1);
    cy.get('input[cid="t2"]').type(amg);
    cy.get('button[cid="tc"]').click()
      .then(() => {
        cy.get('label[cid="transfer-error-mes"]')
          .contains('Cannot transfer to your own id')
          .should('exist');
      });
  });

});
