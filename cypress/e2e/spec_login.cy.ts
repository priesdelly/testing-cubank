describe('Test login', () => {
  it('Access to website', () => {
    cy.visit('https://cu-bank-fe.vercel.app/');
  });

  it('click', () => {
    cy.get('button').click();
  });
});
