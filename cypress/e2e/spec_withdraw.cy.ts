describe('withdraw TC1', () => {
    it('passes', () => {
      cy.visit('https://cu-bank-fe.vercel.app/')
    })
  
    it('withdraw', () => {
      cy.get('#accountId')
      .type('4444444444')
      .get('#password')
      .type('4444')
      .get('[cid="lc"]')
      .click()
      .get('[cid="w1"]')
      .type('0')
      .get('[cid="wc"]')
      .click()
      
    })
  })

  // describe('withdraw TC2', () => {
  //   it('passes', () => {
  //     cy.visit('https://cu-bank-fe.vercel.app/')
  //   })
  
  //   it('withdraw', () => {
  //     cy.get('#accountId')
  //     .type('4444444444')
  //     .get('#password')
  //     .type('4444')
  //     .get('[cid="lc"]')
  //     .click()
  //     .get('[cid="w1"]')
  //     .type('10')
  //     .get('[cid="wc"]')
  //     .click()
  //   })
  // })