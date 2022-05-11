import { onIntentHinzufuegen } from "../01_Trainingsdaten/01_Intents/01_Intents_Hinzufuegen"

const modelNr = Math.floor(Math.random() * 5500);

export class role_based_testing {

    user_operator() {

        cy.log('Login as Operator')
        //cy.visit('/')
        cy.loginiFunction('e2e_operator', 'password')
        
        cy.visit(`${Cypress.config().baseUrl}/trainingsdaten/intent/`)

        cy.url().should("eq", `${Cypress.config().baseUrl}/trainingsdaten/intent/`);
        cy.visit('/')
        cy.url().should('eq', `${Cypress.config().baseUrl}/`)

        cy.get('[id="navbarUsername"]')
            .should('contain', 'e2e_operator')

        // login as admin
        cy.get('[data-cy="logout-button"]')
            .click()
        cy.loginiFunction('admin', 'cciAdmin#2022+')
        
        //
        cy.get('[role=button]')
            .contains('System')
            .click()

        cy.get('[data-cy="navDrawerNutzerkonten"]').click()

        // Enter to e2e_operator
        cy.wait(500)
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(1)')
            .contains('e2e_operator')
            .click()

        cy.get('[role="combobox"]')
            //.contains('Rollen')
            .click()

        cy.get('[role="option"]').eq(2)
            //.contains('Operator:in')
            .then(function($operator){
                if($operator.hasClass('v-list-item primary--text v-list-item--active v-list-item--link theme--light')) {
                    cy.log('If Statement True')
                }
                else {
                    cy.log('If Statement False')
                    cy.get('[role="option"]')
                        .contains('Operator')
                        .click()
                }
            })

        cy.get('[data-cy="navDrawerNutzerkonten"]').click()

        // login as Operator
        cy.get('[data-cy="logout-button"]')
            .click()
        cy.loginiFunction('e2e_operator', 'password')
        
        // Train a Model
        cy.get('[role="button"]')
            .contains('Training')
            .click()

        cy.get('[data-cy="navDrawerModels"]').click()
        cy.get('[data-cy="model-create"]').should('be.visible')
        // cy.get('[data-cy="model-name"]').type('Model'+String(modelNr))
        // cy.get('[data-cy="create-button"]').click()
    }

    user_redakteur() {   
        cy.log('Login as Redakteur')
        //cy.visit('/')
        cy.loginiFunction('e2e_redakteur', 'password')
        
        cy.visit(`${Cypress.config().baseUrl}/trainingsdaten/intent/`)

        cy.url().should("eq", `${Cypress.config().baseUrl}/trainingsdaten/intent/`);
        cy.visit('/')
        cy.url().should('eq', `${Cypress.config().baseUrl}/`)

        cy.get('[id="navbarUsername"]')
            .should('contain', 'e2e_redakteur')

        // login as admin
        cy.get('[data-cy="logout-button"]')
            .click()
        cy.loginiFunction('admin', 'cciAdmin#2022+')
        
        //
        cy.get('[role=button]')
            .contains('System')
            .click()

        cy.get('[data-cy="navDrawerNutzerkonten"]').click()

        // Enter to e2e_operator
        cy.wait(500)
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(1)')
            .contains('e2e_redakteur')
            .click()

        cy.get('[role="combobox"]')
            //.contains('Rollen')
            .click()

        cy.get('[role="option"]').eq(0)
            //.contains('Operator:in')
            .then(function($redakteur){
                if($redakteur.hasClass('v-list-item primary--text v-list-item--active v-list-item--link theme--light')) {

                    cy.log('If Statement True')
                }
                else {
                    cy.log('If Statement False')
                    cy.get('[role="option"]')
                        .contains('Redakteur')
                        .click()
                }
            })

        cy.get('[data-cy="navDrawerNutzerkonten"]').click()

        // login as Operator
        cy.get('[data-cy="logout-button"]')
            .click()
        cy.loginiFunction('e2e_redakteur', 'password')

        // Pflege von Trainingsdaten (außer Import)
        cy.Trainingsdaten('Trainingsdaten','[data-cy="navDrawerIntents"]')
        // checking url after clicking Inten Button
        cy.url().should("eq", `${Cypress.config().baseUrl}/trainingsdaten/intent/`);

        // Models nach QS deployen
        cy.get('[role="button"]').eq(2)
            .contains('Training')
            .click()

        cy.get('[data-cy="navDrawerModels"]').click()

        cy.get('[data-cy="model-create"]').should('be.visible')
    }

    user_accountmanager () {
        cy.log('Login as Accountmanager')
        //cy.visit('/')
        cy.loginiFunction('e2e_accountmanager', 'password')
        
        cy.visit(`${Cypress.config().baseUrl}/trainingsdaten/intent/`)

        cy.url().should("eq", `${Cypress.config().baseUrl}/trainingsdaten/intent/`);
        cy.visit('/')
        cy.url().should('eq', `${Cypress.config().baseUrl}/`)

        cy.get('[id="navbarUsername"]')
            .should('contain', 'e2e_accountmanager')

        // login as admin
        cy.get('[data-cy="logout-button"]')
            .click()
        cy.loginiFunction('admin', 'cciAdmin#2022+')
        
        //
        cy.get('[role=button]')
            .contains('System')
            .click()

        cy.get('[data-cy="navDrawerNutzerkonten"]').click()

        // Enter to e2e_operator
        cy.wait(500)
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(1)')
            .contains('e2e_accountmanager')
            .click()

        cy.get('[role="combobox"]')
            //.contains('Rollen')
            .click()

        cy.get('[role="option"]').eq(3)
            //.contains('Operator:in')
            .then(function($accountmanager){
                if($accountmanager.hasClass('v-list-item primary--text v-list-item--active v-list-item--link theme--light')) {

                    cy.log('If Statement True')
                }
                else {
                    cy.log('If Statement False')
                    cy.get('[role="option"]')
                        .contains('Accountmanager')
                        .click()
                }
            })

        cy.get('[data-cy="navDrawerNutzerkonten"]').click()

        // login as Operator
        cy.get('[data-cy="logout-button"]')
            .click()
        cy.loginiFunction('e2e_accountmanager', 'password')

        // check user 
        var rollen = ["operator","redakteur", "accountmanager", "datenadmin"]

        cy.wrap(rollen).each((index) => {

            cy.get('[data-cy="user-table-search"]').type(index)

            cy.wait(500)
            cy.get('tbody')
                .find('tr')
                .find('td:nth-child(1)').should('contain', 'e2e_'+index)

            cy.get('tbody')
                .find('tr')
                .find('td:nth-child(2)').should('contain', 'Ja')

            cy.get('tbody')
                .find('tr')
                .find('td:nth-child(5)').should('be.visible')

            cy.get('[data-cy="user-table-search"]').clear()
        })
    }

    user_datenadmin () {
        cy.log('Login as Datenadmin')
        //cy.visit('/')
        cy.loginiFunction('e2e_datenadmin', 'password')
        
        cy.visit(`${Cypress.config().baseUrl}/trainingsdaten/intent/`)

        cy.url().should("eq", `${Cypress.config().baseUrl}/trainingsdaten/intent/`);
        cy.visit('/')
        cy.url().should('eq', `${Cypress.config().baseUrl}/`)

        cy.get('[id="navbarUsername"]')
            .should('contain', 'e2e_datenadmin')

        // login as admin
        cy.get('[data-cy="logout-button"]')
            .click()
        cy.loginiFunction('admin', 'cciAdmin#2022+')
        
        //
        cy.get('[role=button]')
            .contains('System')
            .click()

        cy.get('[data-cy="navDrawerNutzerkonten"]').click()

        // Enter to e2e_operator
        cy.wait(500)
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(1)')
            .contains('e2e_datenadmin')
            .click()

        cy.get('[role="combobox"]').click()

        cy.get('[role="option"]').eq(1)
            //.contains('Operator:in')
            .then(function($datenadmin){
                if($datenadmin.hasClass('v-list-item primary--text v-list-item--active v-list-item--link theme--light')) {

                    cy.log('If Statement True')
                }
                else {
                    cy.log('If Statement False')
                    cy.get('[role="option"]')
                        .contains('Datenadministrator')
                        .click()
                }
            })

        cy.get('[data-cy="navDrawerNutzerkonten"]').click()

        // login as Operator
        cy.get('[data-cy="logout-button"]')
            .click()
        cy.loginiFunction('e2e_datenadmin', 'password')

        // navigate to import & export
        cy.Trainingsdaten('Trainingsdaten','[data-cy="navDrawerImport & Export"]')

        //
        cy.get('[data-cy="import-choose-file"]').should('be.visible')
    }
}
// Export class einfacher_login
export const onRoleBasedTesting = new role_based_testing()