describe('empty spec', () => {
  it('passes', () => {
    cy.visit('https://cu-bank-fe.vercel.app/')
  })

  it('click', () => {
    cy.get('button');
    cy.click();
  })

})