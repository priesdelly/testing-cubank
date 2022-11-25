import fixtures from '../fixtures/deposit.json';

const doLogin = () => {
  cy.visit('https://cubank.prieston-serv.com');

  cy.get('#accountId').clear();
  cy.get('#password').clear();
  cy.get('#accountId').type(fixtures.username);
  cy.get('#password').type(fixtures.password);

  cy.intercept('POST', 'https://cubank-api.prieston-serv.com/api/v1/auth/login').as('loginSuccess')

  cy.get('button').click();
  cy.wait('@loginSuccess').then((interception) => {
    expect(interception.response?.statusCode).eq(200);
  });
};

describe('Deposit scenario', () => {

  it('TC1 - success', () => {

    doLogin();

    cy.intercept('GET', 'https://cubank-api.prieston-serv.com/api/v1/transactions').as('getTransaction')
    cy.wait('@getTransaction').then((interception) => {
      expect(interception.response?.statusCode).eq(200);
      const body = interception.response?.body;
      cy.setCookie('old-balance', body.data.balance + '');
    });

    cy.get('input[cid="d1"]').type('100')

    cy.intercept('PUT', 'https://cubank-api.prieston-serv.com/api/v1/transactions').as('putTransaction')
    cy.get('button[cid="dc"]').click();
    cy.wait('@putTransaction').then((interception2) => {
      expect(interception2.response?.statusCode).eq(200);
      cy.wait('@getTransaction').then((interception3) => {
        expect(interception3.response?.statusCode).eq(200);
        const body = interception3.response?.body;
        cy.getCookie('old-balance').then((cookie) => {
          let oldBalance = cookie.value;
          expect(body.data.balance).eq(Number(oldBalance) + 100);
        });

        cy.get('input[cid="w1"]').type('100');
        cy.get('button[cid="wc"]').click();
      });
    });
  });

  it('TC2 - fail input number 309 length', () => {

    doLogin();

    cy.get('input[cid="d1"]').type(fixtures.num309)
    cy.get('button[cid="dc"]').click();
    cy.get('input[cid="d1"]').then($el => $el[0].checkValidity()).should('be.false')
  });

  it('TC3 - success input number 308 length', () => {

    doLogin();

    cy.get('input[cid="d1"]').type(fixtures.num308);

    cy.intercept('PUT', 'https://cubank-api.prieston-serv.com/api/v1/transactions').as('putTransaction')
    cy.get('button[cid="dc"]').click();
    cy.get('input[cid="d1"]').then($el => $el[0].checkValidity()).should('be.true');

    cy.wait('@putTransaction').then((interception) => {
      expect(interception.response?.statusCode).eq(200);
      cy.get('input[cid="w1"]').type(fixtures.num308);
      cy.get('button[cid="wc"]').click();
    });
  });

  it('TC4 - success input number 307 length', () => {

    doLogin();

    cy.get('input[cid="d1"]').type(fixtures.num307);

    cy.intercept('PUT', 'https://cubank-api.prieston-serv.com/api/v1/transactions').as('putTransaction')
    cy.get('button[cid="dc"]').click();
    cy.get('input[cid="d1"]').then($el => $el[0].checkValidity()).should('be.true')

    cy.wait('@putTransaction').then((interception) => {
      expect(interception.response?.statusCode).eq(200);
      cy.get('input[cid="w1"]').type(fixtures.num307);
      cy.get('button[cid="wc"]').click();
    });
  });

  it('TC5 - success input number amount = 2', () => {

    doLogin();

    cy.get('input[cid="d1"]').type('2')

    cy.intercept('PUT', 'https://cubank-api.prieston-serv.com/api/v1/transactions').as('putTransaction')
    cy.get('button[cid="dc"]').click();
    cy.get('input[cid="d1"]').then($el => $el[0].checkValidity()).should('be.true')

    cy.wait('@putTransaction').then((interception) => {
      expect(interception.response?.statusCode).eq(200);
      cy.get('input[cid="w1"]').type('2');
      cy.get('button[cid="wc"]').click();
    });
  });

  it('TC6 - success input number amount = 1', () => {

    doLogin();

    cy.get('input[cid="d1"]').type('1')
    cy.intercept('PUT', 'https://cubank-api.prieston-serv.com/api/v1/transactions').as('putTransaction')
    cy.get('button[cid="dc"]').click();
    cy.get('input[cid="d1"]').then($el => $el[0].checkValidity()).should('be.true')

    cy.wait('@putTransaction').then((interception) => {
      expect(interception.response?.statusCode).eq(200);
      cy.get('input[cid="w1"]').type('1');
      cy.get('button[cid="wc"]').click();
    });
  });

  it('TC7 - fail input number amount = 0', () => {

    doLogin();

    cy.get('input[cid="d1"]').type('0')
    cy.get('button[cid="dc"]').click();
    cy.get('label[cid="deposite-error-mes"]').contains('Please put only number').should('exist')
  });

  it('TC8 - success input number amount = 1.0', () => {

    doLogin();

    cy.get('input[cid="d1"]').type('1.0')
    cy.intercept('PUT', 'https://cubank-api.prieston-serv.com/api/v1/transactions').as('putTransaction')
    cy.get('button[cid="dc"]').click();
    cy.get('input[cid="d1"]').then($el => $el[0].checkValidity()).should('be.true')

    cy.wait('@putTransaction').then((interception) => {
      expect(interception.response?.statusCode).eq(200);
      cy.get('input[cid="w1"]').type('1.0');
      cy.get('button[cid="wc"]').click();
    });
  });

  it('TC9 - fail input number amount = 1.01', () => {

    doLogin();

    cy.get('input[cid="d1"]').type('1.01')
    cy.get('button[cid="dc"]').click();
    cy.get('input[cid="d1"]').then($el => $el[0].checkValidity()).should('be.false')
  });

  it('TC10 - fail input number amount = 1.0000000597', () => {

    doLogin();

    cy.get('input[cid="d1"]').type('1.0000000597')
    cy.get('button[cid="dc"]').click();
    cy.get('input[cid="d1"]').then($el => $el[0].checkValidity()).should('be.false')
  });

  it('TC11 - success input number amount = 1.0000000596', () => {

    doLogin();

    cy.get('input[cid="d1"]').type('1.0000000596')
    cy.intercept('PUT', 'https://cubank-api.prieston-serv.com/api/v1/transactions').as('putTransaction')
    cy.get('button[cid="dc"]').click();
    cy.get('input[cid="d1"]').then($el => $el[0].checkValidity()).should('be.true')

    cy.wait('@putTransaction').then((interception) => {
      expect(interception.response?.statusCode).eq(200);
      cy.get('input[cid="w1"]').type('1.0000000596');
      cy.get('button[cid="wc"]').click();
    });
  });

  // it('TC12 - success input number amount = +1', () => {

  //   doLogin();

  //   cy.get('input[cid="d1"]').type(+1)
  //   cy.intercept('PUT', 'https://cubank-api.prieston-serv.com/api/v1/transactions').as('putTransaction')
  //   cy.get('button[cid="dc"]').click();
  //   cy.get('input[cid="d1"]').then($el => $el[0].checkValidity()).should('be.true')

  //   cy.wait('@putTransaction').then((interception) => {
  //     expect(interception.response?.statusCode).eq(200);
  //     cy.get('input[cid="w1"]').type(+1);
  //     cy.get('button[cid="wc"]').click();
  //   });
  // });

  // it('TC13 - fail input number amount = -1', () => {

  //   doLogin();

  //   cy.get('input[cid="d1"]').type(-1)
  //   cy.get('button[cid="dc"]').click();
  //   cy.get('label[cid="deposite-error-mes"]').contains('Please put only number').should('exist')
  // });

  // it('TC14 - fail input number amount = ++1', () => {

  //   doLogin();

  //   cy.get('input[cid="d1"]').type('++1')
  //   cy.get('button[cid="dc"]').click();
  //   cy.get('input[cid="d1"]').then($el => $el[0].checkValidity()).should('be.false')
  // });

  // it('TC15 - fail input number amount = +1+', () => {

  //   doLogin();

  //   cy.get('input[cid="d1"]').type('+1+');
  //   cy.get('button[cid="dc"]').click();
  //   cy.get('input[cid="d1"]').then($el => $el[0].checkValidity()).should('be.false')
  // });

  //TODO
  // it('TC16 - fail input number amount = 1++', () => {

  //     doLogin();

  //     cy.get(':nth-child(3) > :nth-child(2) > form').within(() => {
  //         cy.get('input[cid="d1"]').type(fixtures.specialChar2)
  //         // cy.get('button[cid="dc"]').click();
  //         // cy.get('input[cid="d1"]').then($el => $el[0].checkValidity()).should('be.false')
  //     });
  // });

  it('TC17 - fail input number amount = 1e999', () => {

    doLogin();

    cy.get('input[cid="d1"]').type('1e999')
    cy.get('button[cid="dc"]').click();
    cy.get('input[cid="d1"]').then($el => $el[0].checkValidity()).should('be.false');
  });

  it('TC18 - fail input number amount = 1e99', () => {

    doLogin();

    cy.get('input[cid="d1"]').type('1e99')
    cy.intercept('PUT', 'https://cubank-api.prieston-serv.com/api/v1/transactions').as('putTransaction')
    cy.get('button[cid="dc"]').click();
    cy.get('input[cid="d1"]').then($el => $el[0].checkValidity()).should('be.true')

    cy.wait('@putTransaction').then((interception) => {
      expect(interception.response?.statusCode).eq(200);
      cy.get('input[cid="w1"]').type('1e99');
      cy.get('button[cid="wc"]').click();
    });
  });

  it('TC19 - fail input number amount = 1e9', () => {

    doLogin();

    cy.get('input[cid="d1"]').type('1e9')
    cy.intercept('PUT', 'https://cubank-api.prieston-serv.com/api/v1/transactions').as('putTransaction')
    cy.get('button[cid="dc"]').click();
    cy.get('input[cid="d1"]').then($el => $el[0].checkValidity()).should('be.true')

    cy.wait('@putTransaction').then((interception) => {
      expect(interception.response?.statusCode).eq(200);
      cy.get('input[cid="w1"]').type('1e9');
      cy.get('button[cid="wc"]').click();
    });
  });
});
