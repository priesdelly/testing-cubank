describe('Test login scenario', () => {

  it('TC1 - Success', () => {

    cy.visit('https://cu-bank-fe.vercel.app/');
    cy.get('[href="/register"]').click();

    cy.location('href').should('include', '/register');

    cy.get('#accountId').type('9000000001');
    cy.get('#password').type('1234');
    cy.get('#firstName').type('firstname');
    cy.get('#lastName').type('lastname');

    cy.get('button').click();
    cy.intercept('POST', 'https://cu-bank.herokuapp.com/api/v1/auth/register').as('register')
    cy.wait('@register').then((interception) => {
      if (interception.response.statusCode === 401 || interception.response.statusCode === 200) {
        return;
      }
    });
    cy.visit('https://cu-bank-fe.vercel.app/');

    cy.get('#accountId').clear();
    cy.get('#password').clear();
    cy.get('#accountId').type('9000000001');
    cy.get('#password').type('1234');

    cy.intercept('POST', 'https://cu-bank.herokuapp.com/api/v1/auth/login').as('loginSuccess')
    cy.get('button').click();
    cy.wait('@loginSuccess').then((interception) => {
      expect(interception.response?.statusCode).eq(200);
    });

  });

  it('TC2 - Fail case when use account id more than 10 digits', () => {
    cy.visit('https://cu-bank-fe.vercel.app/');

    cy.get('#accountId').clear();
    cy.get('#password').clear();

    cy.get('#accountId').type('90000000011');
    cy.get('#password').type('1234');

    cy.get('button').click();
    cy.get('div > label')
        .contains('Please fill accountId 10 digits')
        .should('exist');
  });

  it('TC3 - Fail case when use account id less than 10 digits', () => {
    cy.visit('https://cu-bank-fe.vercel.app/');

    cy.get('#accountId').clear();
    cy.get('#password').clear();

    cy.get('#accountId').type('900000000');
    cy.get('#password').type('1234');

    cy.get('button').click();
    cy.get('div > label')
        .contains('Please fill accountId 10 digits')
        .should('exist');
  });

  it('TC4 - Fail case when fill not input account id only number', () => {
    cy.visit('https://cu-bank-fe.vercel.app/');

    cy.get('#accountId').clear();
    cy.get('#password').clear();

    cy.get('#accountId').type('nine000001');
    cy.get('#password').type('1234');

    cy.get('button').click();
    cy.get('div > label')
        .contains('Please put accountId only number')
        .should('exist');
  });

  it('TC5 - Fail user not found', () => {
    cy.visit('https://cu-bank-fe.vercel.app/');

    cy.get('#accountId').clear();
    cy.get('#password').clear();

    cy.get('#accountId').type('1122334455');
    cy.get('#password').type('1234');

    cy.get('button').click();
    cy.get('div > label')
        .contains('Not Found User')
        .should('exist');
  });

  it('TC6 - Fail fill password more than 4 digits', () => {
    cy.visit('https://cu-bank-fe.vercel.app/');

    cy.get('#accountId').clear();
    cy.get('#password').clear();

    cy.get('#accountId').type('9000000001');
    cy.get('#password').type('12345');

    cy.get('button').click();
    cy.get('div > label')
        .contains('Please fill password 4 digits')
        .should('exist');
  });

  it('TC7 - Fail fill password less than 4 digits', () => {
    cy.visit('https://cu-bank-fe.vercel.app/');

    cy.get('#accountId').clear();
    cy.get('#password').clear();

    cy.get('#accountId').type('9000000001');
    cy.get('#password').type('123');

    cy.get('button').click();
    cy.get('div > label')
        .contains('Please fill password 4 digits')
        .should('exist');
  });

  it('TC8 - Fail fill password with alphabet', () => {
    cy.visit('https://cu-bank-fe.vercel.app/');

    cy.get('#accountId').clear();
    cy.get('#password').clear();

    cy.get('#accountId').type('9000000001');
    cy.get('#password').type('ok12');

    cy.get('button').click();
    cy.get('div > label')
        .contains('Please put password only number')
        .should('exist');
  });

  it('TC9 - Fail fill password wrong password', () => {
    cy.visit('https://cu-bank-fe.vercel.app/');

    cy.get('#accountId').clear();
    cy.get('#password').clear();

    cy.get('#accountId').type('9000000001');
    cy.get('#password').type('5555');

    cy.get('button').click();
    cy.get('div > label')
        .contains('Password Incorrect')
        .should('exist');
  });

});
