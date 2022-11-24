import fixtures from '../fixtures/deposit.json';

const loginSuccess = () => {
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
}

describe('Scenario', () => {
	it('scenario 1: TC2', () => {
		cy.visit('https://cu-bank-fe.vercel.app/');
		cy.get('[href="/register"]').click();
		cy.get('#accountId').type('90000000011');
		cy.get('#password').type('1234');
		cy.get('#firstName').type('tonkao');
		cy.get('#lastName').type('tonkao')
		cy.get('button').click();
		cy.get('div > label').contains('Please fill accountId 10 digits').should('exist');
	})

	it('scenario 2: TC25', () => {
		cy.visit('https://cu-bank-fe.vercel.app/');

		cy.get('#accountId').clear();
		cy.get('#password').clear();

		cy.get('#accountId').type('90000000011');
		cy.get('#password').type('1234');

		cy.get('button').click();
		cy.get('div > label')
			.contains('Please fill accountId 10 digits')
			.should('exist');
	})

	it('scenario 3: TC24, TC34, TC39', () => {
		//TC24
		loginSuccess();

		//TC34
		cy.get('input[cid="d1"]').type(fixtures.num309)
		cy.get('button[cid="dc"]').click();
		cy.get(':nth-child(3) > :nth-child(2) > form > label > #among:invalid')
			.invoke('prop', 'validationMessage')
			.should('equal', 'Please fill out this field.');

		//TC39
		cy.get('input[cid="d1"]').type('0');
		cy.get('button[cid="dc"]').click();
		cy.get('label[cid="deposite-error-mes"]').contains('Please put only number').should('exist')
	})

	it('scenario 5: TC24, TC33, TC53, TC70', () => {
		//TC24
		cy.visit('https://cu-bank-fe.vercel.app/');
		cy.get('#accountId').clear();
		cy.get('#password').clear();
		cy.get('#accountId').type('9000000001');
		cy.get('#password').type('1234');

		cy.intercept('POST', 'https://cu-bank.herokuapp.com/api/v1/auth/login').as('loginSuccess')
		cy.get('button').click();
		cy.wait('@loginSuccess').then((interception) => {
			expect(interception.response?.statusCode).eq(200);

			//TC33
			cy.get(':nth-child(3) > :nth-child(2) > form > label > #among').type('100');
			cy.intercept("GET", "https://cu-bank.herokuapp.com/api/v1/transactions").as(
				"getTransaction"
			);
			cy.get(':nth-child(3) > :nth-child(2) > form > button').click();
			cy.wait("@getTransaction").then((interception2) => {
				expect(interception2.response?.statusCode).eq(200);
				let res = interception2.response?.body;
				let balanceUpdate = res.data.balance;

				//TC53
				cy.get('article > :nth-child(6)').should('contain.text', balanceUpdate?.toString());
				if (balanceUpdate > 0) {
					cy.get(':nth-child(4) > :nth-child(2) > form > label > #among').type(JSON.stringify(balanceUpdate));
					cy.intercept(
						"PUT",
						"https://cu-bank.herokuapp.com/api/v1/transactions"
					).as("putTransaction");
					cy.get(':nth-child(4) > :nth-child(2) > form > button').click();
					cy.wait("@putTransaction").then((interception3) => {
						expect(interception3.response?.statusCode).eq(200);
						res = interception3.response?.body;
						balanceUpdate = res.data.balance;

						//TC70
						cy.get('#accountId').type('1122334455');
						cy.get(':nth-child(5) > :nth-child(2) > form > :nth-child(2) > label > #among').type('100');
						// cy.intercept(
						// 	"PUT",
						// 	"https://cu-bank.herokuapp.com/api/v1/transactions"
						// ).as("putTransaction2");
						cy.get(':nth-child(5) > :nth-child(2) > form > button').click();
						cy.get(':nth-child(3) > label').should('contain.text', "your balance isn't not enough")
						// cy.wait("@putTransaction2").then((interception4) => {
						// 	expect(interception4.response?.statusCode).eq(400);
						// });
					});
				}
			});

		});
	})

	it('scenario 8: TC24, TC33, TC55, TC73, TC94', () => {
		//TC24
		cy.visit('https://cu-bank-fe.vercel.app/');
		cy.get('#accountId').clear();
		cy.get('#password').clear();
		cy.get('#accountId').type('9000000001');
		cy.get('#password').type('1234');

		cy.intercept('POST', 'https://cu-bank.herokuapp.com/api/v1/auth/login').as('loginSuccess')
		cy.get('button').click();
		cy.wait('@loginSuccess').then((interception) => {
			expect(interception.response?.statusCode).eq(200);

			//TC33
			cy.get(':nth-child(3) > :nth-child(2) > form > label > #among').type('100');
			cy.intercept("GET", "https://cu-bank.herokuapp.com/api/v1/transactions").as(
				"getTransaction"
			);
			cy.get(':nth-child(3) > :nth-child(2) > form > button').click();
			cy.wait("@getTransaction").then((interception2) => {
				expect(interception2.response?.statusCode).eq(200);
				let res = interception2.response?.body;
				let balanceUpdate = res.data.balance;

				//TC55
				cy.get('article > :nth-child(6)').should('contain.text', balanceUpdate);
				if (balanceUpdate > 0) {
					cy.get(':nth-child(4) > :nth-child(2) > form > label > #among').type(JSON.stringify(balanceUpdate - 50));
					cy.intercept(
						"PUT",
						"https://cu-bank.herokuapp.com/api/v1/transactions"
					).as("putTransaction");
					cy.get(':nth-child(4) > :nth-child(2) > form > button').click();
					cy.wait("@putTransaction").then((interception3) => {
						expect(interception3.response?.statusCode).eq(200);
						res = interception3.response?.body;
						balanceUpdate = res.data.balance;

						//TC73
						cy.get('#accountId').type('1122334455');
						cy.get(':nth-child(5) > :nth-child(2) > form > :nth-child(2) > label > #among').type('50');
						cy.intercept(
							"PUT",
							"https://cu-bank.herokuapp.com/api/v1/transactions"
						).as("putTransaction2");
						cy.get(':nth-child(5) > :nth-child(2) > form > button').click();
						cy.wait("@putTransaction2").then((interception4) => {
							expect(interception4.response?.statusCode).eq(400);
							cy.get(':nth-child(3) > label').should('contain.text', 'Not found your target account Id')

							//TC94
							cy.get('[cid="b1"]').click();
							cy.get(':nth-child(6) > :nth-child(2) > form > :nth-child(2) > label > #among').type('101');
							cy.get(':nth-child(6) > :nth-child(2) > form > button').click();
							cy.get(':nth-child(6) > :nth-child(2) > form > :nth-child(3) > label').should('contain.text', "your balance isn't not enough")
						});
					});
				}
			});

		});
	})

	it('scenario 9: TC24, TC35, TC35', () => {
		//TC24
		loginSuccess();

		//TC35
		cy.get('input[cid="d1"]').type(fixtures.num308)
		cy.get('button[cid="dc"]').click();
		cy.get(':nth-child(3) > :nth-child(2) > form > label > #among:invalid')
			.invoke('prop', 'validationMessage')
			.should('equal', 'Please fill out this field.');

		//TC35
		cy.get('input[cid="d1"]').type(fixtures.num308)
		cy.get('button[cid="dc"]').click();
		cy.get(':nth-child(3) > :nth-child(2) > form > label > #among:invalid')
			.invoke('prop', 'validationMessage')
			.should('equal', 'Please fill out this field.');
	})

})