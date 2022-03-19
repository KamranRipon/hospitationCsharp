export class einfacher_login {

    testLogin() {   
        cy.log('Loged in Successful')
        cy.visit('/')
        cy.wait(500)
        cy.visit('http://10.61.135.11:8081/trainingsdaten/intent/')

        cy.url().should("eq", "http://10.61.135.11:8081/trainingsdaten/intent/");
        cy.visit('/')
        cy.url().should('eq', 'http://10.61.135.11:8081/')
    }
}
// Export class einfacher_login
export const onEinfacherLogin = new einfacher_login()