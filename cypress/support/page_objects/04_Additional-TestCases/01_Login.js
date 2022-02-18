export class einfacher_login {

    testLogin() {   
        cy.log('Loged in Successful')
        cy.visit('/')
        cy.wait(500)
        cy.visit('http://localhost/trainingsdaten/intent/')

        cy.url().should("eq", "http://localhost/trainingsdaten/intent/");
        cy.visit('/')
        cy.url().should('eq', 'http://localhost/')
    }
}
// Export class einfacher_login
export const onEinfacherLogin = new einfacher_login()