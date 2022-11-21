import fixtures from '../fixtures/deposit.json';

describe('Deposit100', () => {
    it('Visit', () => {
        cy.visit('https://cu-bank-fe.vercel.app/')
        cy.get('#accountId').type(fixtures.iden);
        cy.get('#password').type(fixtures.passs);
        cy.get('button').click();
    })

    it('Deposit100', () => {
        cy.wait(fixtures.timee);
        cy.get(':nth-child(3) > :nth-child(2) > form > label > #among').type('100');
        cy.get(':nth-child(3) > :nth-child(2) > form > button').click();
        cy.get(':nth-child(3) > :nth-child(2) > form > label > #among').clear();
    })

    it('Visit', () => {
        cy.visit('https://cu-bank-fe.vercel.app/')
        cy.get('#accountId').type(fixtures.iden);
        cy.get('#password').type(fixtures.passs);
        cy.get('button').click();
    })

    it('Withdraw100', () => {
        cy.wait(fixtures.timee);
        cy.get(':nth-child(4) > :nth-child(2) > form > label > #among').type('100');
        cy.get(':nth-child(4) > :nth-child(2) > form > button').click();
        cy.get(':nth-child(4) > :nth-child(2) > form > label > #among').clear();
    })
})

describe('Deposit309', () => {
    it('Visit', () => {
        cy.visit('https://cu-bank-fe.vercel.app/')
        cy.get('#accountId').type(fixtures.iden);
        cy.get('#password').type(fixtures.passs);
        cy.get('button').click();
    })

    it('Deposit309', () => {
        cy.wait(fixtures.timee);
        cy.get(':nth-child(3) > :nth-child(2) > form > label > #among').type(fixtures.num309);
        cy.get(':nth-child(3) > :nth-child(2) > form > button').click();
        cy.get(':nth-child(3) > :nth-child(2) > form > label > #among').clear();
    })
})

describe('Deposit308', () => {
    it('Visit', () => {
        cy.visit('https://cu-bank-fe.vercel.app/')
        cy.get('#accountId').type(fixtures.iden);
        cy.get('#password').type(fixtures.passs);
        cy.get('button').click();
    })

    it('Deposit308', () => {
        cy.wait(fixtures.timee);
        cy.get(':nth-child(3) > :nth-child(2) > form > label > #among').type(fixtures.num308);
        cy.get(':nth-child(3) > :nth-child(2) > form > button').click();
        cy.get(':nth-child(3) > :nth-child(2) > form > label > #among').clear();
    })

    it('Visit', () => {
        cy.visit('https://cu-bank-fe.vercel.app/')
        cy.get('#accountId').type(fixtures.iden);
        cy.get('#password').type(fixtures.passs);
        cy.get('button').click();
    })

    it('Withdraw308', () => {
        cy.wait(fixtures.timee);
        cy.get(':nth-child(4) > :nth-child(2) > form > label > #among').type(fixtures.num308);
        cy.get(':nth-child(4) > :nth-child(2) > form > button').click();
        cy.get(':nth-child(4) > :nth-child(2) > form > label > #among').clear();
    })
})

describe('Deposit307', () => {
    it('Visit', () => {
        cy.visit('https://cu-bank-fe.vercel.app/')
        cy.get('#accountId').type(fixtures.iden);
        cy.get('#password').type(fixtures.passs);
        cy.get('button').click();
    })

    it('Deposit307', () => {
        cy.wait(fixtures.timee);
        cy.get(':nth-child(3) > :nth-child(2) > form > label > #among').type(fixtures.num307);
        cy.get(':nth-child(3) > :nth-child(2) > form > button').click();
        cy.get(':nth-child(3) > :nth-child(2) > form > label > #among').clear();
    })

    it('Visit', () => {
        cy.visit('https://cu-bank-fe.vercel.app/')
        cy.get('#accountId').type(fixtures.iden);
        cy.get('#password').type(fixtures.passs);
        cy.get('button').click();
    })

    it('Withdraw307', () => {
        cy.wait(fixtures.timee);
        cy.get(':nth-child(4) > :nth-child(2) > form > label > #among').type(fixtures.num307);
        cy.get(':nth-child(4) > :nth-child(2) > form > button').click();
        cy.get(':nth-child(4) > :nth-child(2) > form > label > #among').clear();
    })
})

describe('Deposit2', () => {
    it('Visit', () => {
        cy.visit('https://cu-bank-fe.vercel.app/')
        cy.get('#accountId').type(fixtures.iden);
        cy.get('#password').type(fixtures.passs);
        cy.get('button').click();
    })

    it('Deposit2', () => {
        cy.wait(fixtures.timee);
        cy.get(':nth-child(3) > :nth-child(2) > form > label > #among').type('2');
        cy.get(':nth-child(3) > :nth-child(2) > form > button').click();
        cy.get(':nth-child(3) > :nth-child(2) > form > label > #among').clear();
    })

    it('Visit', () => {
        cy.visit('https://cu-bank-fe.vercel.app/')
        cy.get('#accountId').type(fixtures.iden);
        cy.get('#password').type(fixtures.passs);
        cy.get('button').click();
    })

    it('Withdraw2', () => {
        cy.wait(fixtures.timee);
        cy.get(':nth-child(4) > :nth-child(2) > form > label > #among').type('2');
        cy.get(':nth-child(4) > :nth-child(2) > form > button').click();
        cy.get(':nth-child(4) > :nth-child(2) > form > label > #among').clear();
    })
})

describe('Deposit1', () => {
    it('Visit', () => {
        cy.visit('https://cu-bank-fe.vercel.app/')
        cy.get('#accountId').type(fixtures.iden);
        cy.get('#password').type(fixtures.passs);
        cy.get('button').click();
    })

    it('Deposit1', () => {
        cy.wait(fixtures.timee);
        cy.get(':nth-child(3) > :nth-child(2) > form > label > #among').type('1');
        cy.get(':nth-child(3) > :nth-child(2) > form > button').click();
        cy.get(':nth-child(3) > :nth-child(2) > form > label > #among').clear();
    })

    it('Visit', () => {
        cy.visit('https://cu-bank-fe.vercel.app/')
        cy.get('#accountId').type(fixtures.iden);
        cy.get('#password').type(fixtures.passs);
        cy.get('button').click();
    })

    it('Withdraw1', () => {
        cy.wait(fixtures.timee);
        cy.get(':nth-child(4) > :nth-child(2) > form > label > #among').type('1');
        cy.get(':nth-child(4) > :nth-child(2) > form > button').click();
        cy.get(':nth-child(4) > :nth-child(2) > form > label > #among').clear();
    })
})

describe('Deposit0', () => {
    it('Visit', () => {
        cy.visit('https://cu-bank-fe.vercel.app/')
        cy.get('#accountId').type(fixtures.iden);
        cy.get('#password').type(fixtures.passs);
        cy.get('button').click();
    })

    it('Deposit0', () => {
        cy.wait(fixtures.timee);
        cy.get(':nth-child(3) > :nth-child(2) > form > label > #among').type('0');
        cy.get(':nth-child(3) > :nth-child(2) > form > button').click();
        cy.get(':nth-child(3) > :nth-child(2) > form > label > #among').clear();
    })
})

describe('Deposit1.0', () => {
    it('Visit', () => {
        cy.visit('https://cu-bank-fe.vercel.app/')
        cy.get('#accountId').type(fixtures.iden);
        cy.get('#password').type(fixtures.passs);
        cy.get('button').click();
    })

    it('Deposit1.0', () => {
        cy.wait(fixtures.timee);
        cy.get(':nth-child(3) > :nth-child(2) > form > label > #among').type('1.0');
        cy.get(':nth-child(3) > :nth-child(2) > form > button').click();
        cy.get(':nth-child(3) > :nth-child(2) > form > label > #among').clear();
    })

    it('Visit', () => {
        cy.visit('https://cu-bank-fe.vercel.app/')
        cy.get('#accountId').type(fixtures.iden);
        cy.get('#password').type(fixtures.passs);
        cy.get('button').click();
    })

    it('Withdraw1.0', () => {
        cy.wait(fixtures.timee);
        cy.get(':nth-child(4) > :nth-child(2) > form > label > #among').type('1.0');
        cy.get(':nth-child(4) > :nth-child(2) > form > button').click();
        cy.get(':nth-child(4) > :nth-child(2) > form > label > #among').clear();
    })
})

describe('Deposit1.01', () => {
    it('Visit', () => {
        cy.visit('https://cu-bank-fe.vercel.app/')
        cy.get('#accountId').type(fixtures.iden);
        cy.get('#password').type(fixtures.passs);
        cy.get('button').click();
    })

    it('Deposit1.01', () => {
        cy.wait(fixtures.timee);
        cy.get(':nth-child(3) > :nth-child(2) > form > label > #among').type('1.01');
        cy.get(':nth-child(3) > :nth-child(2) > form > button').click();
        cy.get(':nth-child(3) > :nth-child(2) > form > label > #among').clear();
    })
})

describe('Deposit1.0000000597', () => {
    it('Visit', () => {
        cy.visit('https://cu-bank-fe.vercel.app/')
        cy.get('#accountId').type(fixtures.iden);
        cy.get('#password').type(fixtures.passs);
        cy.get('button').click();
    })

    it('Deposit1.0000000597', () => {
        cy.wait(fixtures.timee);
        cy.get(':nth-child(3) > :nth-child(2) > form > label > #among').type('1.0000000597');
        cy.get(':nth-child(3) > :nth-child(2) > form > button').click();
        cy.get(':nth-child(3) > :nth-child(2) > form > label > #among').clear();
    })
})

describe('Deposit1.0000000596', () => {
    it('Visit', () => {
        cy.visit('https://cu-bank-fe.vercel.app/')
        cy.get('#accountId').type(fixtures.iden);
        cy.get('#password').type(fixtures.passs);
        cy.get('button').click();
    })

    it('Deposit1.0000000596', () => {
        cy.wait(fixtures.timee);
        cy.get(':nth-child(3) > :nth-child(2) > form > label > #among').type('1.0000000596');
        cy.get(':nth-child(3) > :nth-child(2) > form > button').click();
        cy.get(':nth-child(3) > :nth-child(2) > form > label > #among').clear();
    })

    it('Visit', () => {
        cy.visit('https://cu-bank-fe.vercel.app/')
        cy.get('#accountId').type(fixtures.iden);
        cy.get('#password').type(fixtures.passs);
        cy.get('button').click();
    })

    it('Withdraw1.0000000596', () => {
        cy.wait(fixtures.timee);
        cy.get(':nth-child(4) > :nth-child(2) > form > label > #among').type('1.0000000596');
        cy.get(':nth-child(4) > :nth-child(2) > form > button').click();
        cy.get(':nth-child(4) > :nth-child(2) > form > label > #among').clear();
    })
})

describe('Deposit+1', () => {
    it('Visit', () => {
        cy.visit('https://cu-bank-fe.vercel.app/')
        cy.get('#accountId').type(fixtures.iden);
        cy.get('#password').type(fixtures.passs);
        cy.get('button').click();
    })

    it('Deposit+1', () => {
        cy.wait(fixtures.timee);
        cy.get(':nth-child(3) > :nth-child(2) > form > label > #among').type('+1');
        cy.get(':nth-child(3) > :nth-child(2) > form > button').click();
        cy.get(':nth-child(3) > :nth-child(2) > form > label > #among').clear();
    })

    it('Visit', () => {
        cy.visit('https://cu-bank-fe.vercel.app/')
        cy.get('#accountId').type(fixtures.iden);
        cy.get('#password').type(fixtures.passs);
        cy.get('button').click();
    })

    it('Withdraw+1', () => {
        cy.wait(fixtures.timee);
        cy.get(':nth-child(4) > :nth-child(2) > form > label > #among').type('+1');
        cy.get(':nth-child(4) > :nth-child(2) > form > button').click();
        cy.get(':nth-child(4) > :nth-child(2) > form > label > #among').clear();
    })
})

describe('Deposit-1', () => {
    it('Visit', () => {
        cy.visit('https://cu-bank-fe.vercel.app/')
        cy.get('#accountId').type(fixtures.iden);
        cy.get('#password').type(fixtures.passs);
        cy.get('button').click();
    })

    it('Deposit-1', () => {
        cy.wait(fixtures.timee);
        cy.get(':nth-child(3) > :nth-child(2) > form > label > #among').type('-1');
        cy.get(':nth-child(3) > :nth-child(2) > form > button').click();
        cy.get(':nth-child(3) > :nth-child(2) > form > label > #among').clear();
    })

})

describe('Deposit++1', () => {
    it('Visit', () => {
        cy.visit('https://cu-bank-fe.vercel.app/')
        cy.get('#accountId').type(fixtures.iden);
        cy.get('#password').type(fixtures.passs);
        cy.get('button').click();
    })

    it('Deposit++1', () => {
        cy.wait(fixtures.timee);
        cy.get(':nth-child(3) > :nth-child(2) > form > label > #among').type('++1');
        cy.get(':nth-child(3) > :nth-child(2) > form > button').click();
        cy.get(':nth-child(3) > :nth-child(2) > form > label > #among').clear();
    })
})

describe('Deposit+1+', () => {
    it('Visit', () => {
        cy.visit('https://cu-bank-fe.vercel.app/')
        cy.get('#accountId').type(fixtures.iden);
        cy.get('#password').type(fixtures.passs);
        cy.get('button').click();
    })

    it('Deposit+1+', () => {
        cy.wait(fixtures.timee);
        cy.get(':nth-child(3) > :nth-child(2) > form > label > #among').type('+1+');
        cy.get(':nth-child(3) > :nth-child(2) > form > button').click();
        cy.get(':nth-child(3) > :nth-child(2) > form > label > #among').clear();
    })
})

describe('Deposit1++', () => {
    it('Visit', () => {
        cy.visit('https://cu-bank-fe.vercel.app/')
        cy.get('#accountId').type(fixtures.iden);
        cy.get('#password').type(fixtures.passs);
        cy.get('button').click();
    })

    it('Deposit1++', () => {
        cy.wait(fixtures.timee);
        cy.get(':nth-child(3) > :nth-child(2) > form > label > #among').type('1++');
        cy.get(':nth-child(3) > :nth-child(2) > form > button').click();
        cy.get(':nth-child(3) > :nth-child(2) > form > label > #among').clear();
    })
})

describe('Deposit1e999', () => {
    it('Visit', () => {
        cy.visit('https://cu-bank-fe.vercel.app/')
        cy.get('#accountId').type(fixtures.iden);
        cy.get('#password').type(fixtures.passs);
        cy.get('button').click();
    })

    it('Deposit1e999', () => {
        cy.wait(fixtures.timee);
        cy.get(':nth-child(3) > :nth-child(2) > form > label > #among').type('1e999');
        cy.get(':nth-child(3) > :nth-child(2) > form > button').click();
        cy.get(':nth-child(3) > :nth-child(2) > form > label > #among').clear();
    })
})

describe('Deposit1e99', () => {
    it('Visit', () => {
        cy.visit('https://cu-bank-fe.vercel.app/')
        cy.get('#accountId').type(fixtures.iden);
        cy.get('#password').type(fixtures.passs);
        cy.get('button').click();
    })

    it('Deposit1e99', () => {
        cy.wait(fixtures.timee);
        cy.get(':nth-child(3) > :nth-child(2) > form > label > #among').type('1e99');
        cy.get(':nth-child(3) > :nth-child(2) > form > button').click();
        cy.get(':nth-child(3) > :nth-child(2) > form > label > #among').clear();
    })

    it('Visit', () => {
        cy.visit('https://cu-bank-fe.vercel.app/')
        cy.get('#accountId').type(fixtures.iden);
        cy.get('#password').type(fixtures.passs);
        cy.get('button').click();
    })

    it('Withdraw1e99', () => {
        cy.wait(fixtures.timee);
        cy.get(':nth-child(4) > :nth-child(2) > form > label > #among').type('1e99');
        cy.get(':nth-child(4) > :nth-child(2) > form > button').click();
        cy.get(':nth-child(4) > :nth-child(2) > form > label > #among').clear();
    })
})

describe('Deposit1e9', () => {
    it('Visit', () => {
        cy.visit('https://cu-bank-fe.vercel.app/')
        cy.get('#accountId').type(fixtures.iden);
        cy.get('#password').type(fixtures.passs);
        cy.get('button').click();
    })

    it('Deposit1e9', () => {
        cy.wait(fixtures.timee);
        cy.get(':nth-child(3) > :nth-child(2) > form > label > #among').type('1e9');
        cy.get(':nth-child(3) > :nth-child(2) > form > button').click();
        cy.get(':nth-child(3) > :nth-child(2) > form > label > #among').clear();
    })

    it('Visit', () => {
        cy.visit('https://cu-bank-fe.vercel.app/')
        cy.get('#accountId').type(fixtures.iden);
        cy.get('#password').type(fixtures.passs);
        cy.get('button').click();
    })

    it('Withdraw1e9', () => {
        cy.wait(fixtures.timee);
        cy.get(':nth-child(4) > :nth-child(2) > form > label > #among').type('1e9');
        cy.get(':nth-child(4) > :nth-child(2) > form > button').click();
        cy.get(':nth-child(4) > :nth-child(2) > form > label > #among').clear();
    })
})