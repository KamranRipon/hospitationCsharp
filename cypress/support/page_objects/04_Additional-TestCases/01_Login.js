export class einfacher_login {

    testLogin() {   
        cy.log('Loged in Successful')
        cy.visit('/')
        cy.wait(500)
        cy.visit(`${Cypress.config().baseUrl}/trainingsdaten/intent/`)

        cy.url().should("eq", `${Cypress.config().baseUrl}/trainingsdaten/intent/`);
        cy.visit('/')
        cy.url().should('eq', `${Cypress.config().baseUrl}/`)
    }
}
// Export class einfacher_login
export const onEinfacherLogin = new einfacher_login()