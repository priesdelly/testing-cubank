const BASE_URL = 'https://cubank.prieston-serv.com/';
const BASE_API = 'https://cubank-api.prieston-serv.com/api/v1/';

describe('Test register scenario', () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
    cy.get('[href="/register"]').click();
  })

  it('TC1 - Success', () => {
    cy.get('#accountId').type('9000000001');
    cy.get('#password').type('1234');
    cy.get('#firstName').type('tonkao');
    cy.get('#lastName').type('tonkao')
    cy.intercept('POST', BASE_API + 'auth/register').as('register')
    cy.get('button').click();
    cy.wait('@register').then((interception) => {
      let valid = false;
      if (interception.response?.statusCode === 200 || interception.response?.statusCode === 401) {
        valid = true;
      }
      expect(valid).eq(true);
    });
    cy.visit(BASE_URL)
      .then(() => {
        cy.location('href').should('eq', BASE_URL);
      });
  })

  it('TC2 - Show error message Please fill accountId 10 digits', () => {
    cy.get('#accountId').type('90000000011');
    cy.get('#password').type('1234');
    cy.get('#firstName').type('tonkao');
    cy.get('#lastName').type('tonkao')
    cy.get('button').click();
    cy.get('div > label').contains('Please fill accountId 10 digits').should('exist');
  })

  it('TC3 - Show error message Please fill accountId 10 digits', () => {
    cy.get('#accountId').type('900000000');
    cy.get('#password').type('1234');
    cy.get('#firstName').type('tonkao');
    cy.get('#lastName').type('tonkao')
    cy.get('button').click();
    cy.get('div > label').contains('Please fill accountId 10 digits').should('exist');
  })

  it('TC4 - Show error message Please put accountId only number', () => {
    cy.get('#accountId').type('wakandaforever');
    cy.get('#password').type('1234');
    cy.get('#firstName').type('tonkao');
    cy.get('#lastName').type('tonkao')
    cy.get('button').click();
    cy.get('div > label').contains('Please put accountId only number').should('exist');
  })

  it('TC5  - Show error message Account ID already existed', () => {
    cy.get('#accountId').type('9000000001');
    cy.get('#password').type('1234');
    cy.get('#firstName').type('tonkao');
    cy.get('#lastName').type('tonkao')
    cy.get('button').click();
    cy.get('div > label').contains('Account ID already existed').should('exist');
  })

  it('TC6  - Show error message Please fill password 4 digits', () => {
    cy.get('#accountId').type('9000000002');
    cy.get('#password').type('12345');
    cy.get('#firstName').type('tonkao');
    cy.get('#lastName').type('tonkao')
    cy.get('button').click();
    cy.get('div > label').contains('Please fill password 4 digits').should('exist');
  })

  it('TC7  - Show error message Please fill password 4 digits', () => {
    cy.get('#accountId').type('9000000003');
    cy.get('#password').type('123');
    cy.get('#firstName').type('tonkao');
    cy.get('#lastName').type('tonkao')
    cy.get('button').click();
    cy.get('div > label').contains('Please fill password 4 digits').should('exist');
  })

  it('TC8  - Show error message Please put password only number', () => {
    cy.get('#accountId').type('9000000004');
    cy.get('#password').type('ok12');
    cy.get('#firstName').type('tonkao');
    cy.get('#lastName').type('tonkao')
    cy.get('button').click();
    cy.get('div > label').contains('Please put password only number').should('exist');
  })

  it('TC9  - Show error message your name length is exceed 30 digits', () => {
    cy.get('#accountId').type('9000000005');
    cy.get('#password').type('1234');
    cy.get('#firstName').type('tonkaotonkaotonkaotonkaotonka');
    cy.get('#lastName').type('tonkao')
    cy.get('button').click();
    cy.get('div > label').contains('your name length is exceed 30 digits').should('exist');
  })

  it('TC10  - Show error message your name length is exceed 30 digits', () => {
    cy.get('#accountId').type('9000000006');
    cy.get('#password').type('1234');
    cy.get('#firstName').type('tonkaotonkaotonkaotonkaotonk');
    cy.get('#lastName').type('tonkao')
    cy.get('button').click();
    cy.get('div > label').contains('your name length is exceed 30 digits').should('exist');
  })

  it('TC11  - Show error message your name length is exceed 30 digits', () => {
    cy.get('#accountId').type('9000000007');
    cy.get('#password').type('1234');
    cy.get('#firstName').type('tonkaotonkaotonkaotonkaoton');
    cy.get('#lastName').type('tonkao')
    cy.get('button').click();
    cy.get('div > label').contains('your name length is exceed 30 digits').should('exist');
  })

  it('TC12  - Success', () => {
    cy.get('#accountId').type('9000000008');
    cy.get('#password').type('1234');
    cy.get('#firstName').type('to');
    cy.get('#lastName').type('tonkao')
    cy.intercept('POST', BASE_API + 'auth/register').as('register')
    cy.get('button').click();

    cy.wait('@register').then((interception) => {
      let valid = false;
      if (interception.response?.statusCode === 200 || interception.response?.statusCode === 401) {
        valid = true;
      }
      expect(valid).eq(true);
    });
    cy.visit(BASE_URL)
      .then(() => {
        cy.location('href').should('eq', BASE_URL);
      });

  })

  it('TC13  - Success', () => {
    cy.get('#accountId').type('9000000009');
    cy.get('#password').type('1234');
    cy.get('#firstName').type('t');
    cy.get('#lastName').type('tonkao');
    cy.intercept('POST', BASE_API + 'auth/register').as('register')
    cy.get('button').click();
    cy.wait('@register').then((interception) => {
      let valid = false;
      if (interception.response?.statusCode === 200 || interception.response?.statusCode === 401) {
        valid = true;
      }
      expect(valid).eq(true);
    });
    cy.visit(BASE_URL)
      .then(() => {
        cy.location('href').should('eq', BASE_URL);
      });
  })

  it('TC14  - Show error message Please fill out this field', () => {
    cy.get('#accountId').type('9000000010');
    cy.get('#password').type('1234');
    cy.get('#firstName').clear();
    cy.get('#lastName').type('tonkao')
    cy.get('button').click();
    cy.get('#firstName:invalid')
      .invoke('prop', 'validationMessage')
      .should('equal', 'Please fill out this field.')
  })

  it('TC15  - Show error message your name length is exceed 30 digits', () => {
    cy.get('#accountId').type('9000000011');
    cy.get('#password').type('1234');
    cy.get('#firstName').type('tonkao');
    cy.get('#lastName').type('tonkaotonkaotonkaotonkaotonka');
    cy.get('button').click();
    cy.get('div > label').contains('your name length is exceed 30 digits').should('exist');
  })

  it('TC16  - Show error message your name length is exceed 30 digits', () => {
    cy.get('#accountId').type('9000000012');
    cy.get('#password').type('1234');
    cy.get('#firstName').type('tonkao');
    cy.get('#lastName').type('tonkaotonkaotonkaotonkaotonk');
    cy.get('button').click();
    cy.get('div > label').contains('your name length is exceed 30 digits').should('exist');
  })

  it('TC17  - Show error message your name length is exceed 30 digits', () => {
    cy.get('#accountId').type('9000000013');
    cy.get('#password').type('1234');
    cy.get('#firstName').type('tonkao');
    cy.get('#lastName').type('tonkaotonkaotonkaotonkaoton');
    cy.get('button').click();
    cy.get('div > label').contains('your name length is exceed 30 digits').should('exist');
  })

  it('TC18  - Success', () => {
    cy.get('#accountId').type('9000000014');
    cy.get('#password').type('1234');
    cy.get('#firstName').type('tonkao');
    cy.get('#lastName').type('to');
    cy.intercept('POST', BASE_API + 'auth/register').as('register')
    cy.get('button').click();
    cy.wait('@register').then((interception) => {
      let valid = false;
      if (interception.response?.statusCode === 200 || interception.response?.statusCode === 401) {
        valid = true;
      }
      expect(valid).eq(true);
    });
    cy.visit(BASE_URL)
      .then(() => {
        cy.location('href').should('eq', BASE_URL);
      });
  })

  it('TC19  - Success', () => {
    cy.get('#accountId').type('9000000015');
    cy.get('#password').type('1234');
    cy.get('#firstName').type('tonkao');
    cy.get('#lastName').type('t');
    cy.intercept('POST', BASE_API + 'auth/register').as('register')
    cy.get('button').click();
    cy.wait('@register').then((interception) => {
      let valid = false;
      if (interception.response?.statusCode === 200 || interception.response?.statusCode === 401) {
        valid = true;
      }
      expect(valid).eq(true);
    });
    cy.visit(BASE_URL)
      .then(() => {
        cy.location('href').should('eq', BASE_URL);
      });
  })

  it('TC20  - Show error message Please fill out this field', () => {
    cy.get('#accountId').type('9000000016');
    cy.get('#password').type('1234');
    cy.get('#firstName').type('tonkao');
    cy.get('#lastName').clear();
    cy.get('button').click();
    cy.get('#lastName:invalid')
      .invoke('prop', 'validationMessage')
      .should('equal', 'Please fill out this field.')
  })

  it('TC21  - Success', () => {
    cy.get('#accountId').type('9000000017');
    cy.get('#password').type('1234');
    cy.get('#firstName').type('to');
    cy.get('#lastName').type('t');
    cy.intercept('POST', BASE_API + 'auth/register').as('register')
    cy.get('button').click();
    cy.wait('@register').then((interception) => {
      let valid = false;
      if (interception.response?.statusCode === 200 || interception.response?.statusCode === 401) {
        valid = true;
      }
      expect(valid).eq(true);
    });
    cy.visit(BASE_URL)
      .then(() => {
        cy.location('href').should('eq', BASE_URL);
      });
  })

  it('TC22  - Success', () => {
    cy.get('#accountId').type('9000000018');
    cy.get('#password').type('1234');
    cy.get('#firstName').type('t');
    cy.get('#lastName').type('t');
    cy.intercept('POST', BASE_API + 'auth/register').as('register')
    cy.get('button').click();
    cy.wait('@register').then((interception) => {
      let valid = false;
      if (interception.response?.statusCode === 200 || interception.response?.statusCode === 401) {
        valid = true;
      }
      expect(valid).eq(true);
    });
    cy.visit(BASE_URL)
      .then(() => {
        cy.location('href').should('eq', BASE_URL);
      });
  })

  it('TC23  - Show error message Please fill out this field', () => {
    cy.get('#accountId').type('9000000019');
    cy.get('#password').type('1234');
    cy.get('#firstName').type('t');
    cy.get('#lastName').clear();
    cy.get('button').click();
    cy.get('#lastName:invalid')
      .invoke('prop', 'validationMessage')
      .should('equal', 'Please fill out this field.')
  })
})
//