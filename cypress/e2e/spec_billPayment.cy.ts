// const logIn = () => {
//     // cy.wait(3000)
//     cy.visit("https://cu-bank-fe.vercel.app/");
//     cy.get("#accountId").clear();
//     cy.get("#password").clear();
//     cy.get("#accountId").type("0000000000");
//     cy.get("#password").type("0000");
//     cy.intercept("POST", "https://cu-bank.herokuapp.com/api/v1/auth/login").as(
//       "loginSubmit"
//     );
//     cy.get('[cid="lc"]').click();
//   };



//   describe("withdrawal", () => {
//     let balance;

//     it("prepBalance", () => {
//         logIn();
//         cy.wait("@loginSubmit").then((interception) => {
//           expect(interception.response?.statusCode).eq(200);
//           let res = interception.response?.body.user;
//           let balance_update = res.balance;
    
//           //type withdraw amount
//           cy.wait(5000);
//           cy.get('[cid="w1"]').type(JSON.stringify(balance_update));
//           cy.get('[cid="wc"]').click();
//           cy.wait(5000);
//         });
//         cy.get('[cid="d1"]').clear();
//         cy.get('[cid="w1"]').clear();
//         cy.wait(5000);
//         cy.get('[cid="d1"]').type("100");
//         cy.get('[cid="dc"]').click();
//         cy.wait(5000);
    
//         cy.visit("https://cu-bank-fe.vercel.app/");
//       });


//   });