const m = Math.floor(Math.random() * 55000);
const addValue = 'DummyValue'+String(m)
export class entity_hinzufuegen {

    entityHinzufuegen() {

        // Open Trainingsdate Tab and enter to Story
        cy.Trainingsdaten('Trainingsdaten','[data-cy="navDrawerEntities"]')
                
        // checking url after clicking Entity Button
        cy.url().should("eq", `${Cypress.config().baseUrl}/trainingsdaten/entity/`);

        // Entity Hinzufuegen testing 
        cy.createButton('[data-cy="entity-create"]')
        
        // checking url after clicking Intent Hinzufuegen
        cy.url().should("eq", `${Cypress.config().baseUrl}/trainingsdaten/entity/neu/`);

        // add and Entity
        cy.addName('[data-cy="entity-name"]', addValue, '[data-cy="entity-description"]')

        cy.get('[data-cy="create-button"]')
            .should('be.visible')
                .click()

        cy.wait(400)

        // Saved Notification Must appear after successfully saved
        cy.successMessageTitle('[data-cy="successMessageTitle"]', 'Das', 'Entity', addValue)
                
        // Select Whole Table
        cy.selectEntireTbl()
        
        // Check saved example saved or Not
        cy.wait(300)
        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(1)').then(function($text) {
                cy.log($text.text())
                cy.wrap($text).should('contain', addValue)
            }) 

        // Leave Site with menu or Breadcrump doesn't save value

        cy.createButton('[data-cy="entity-create"]')
        // add an entity-name
        cy.addName('[data-cy="entity-name"]', addValue+String(m), '[data-cy="entity-description"]')

        // Leave Site by Clicking Entities 
        cy.get('[data-cy="navDrawerEntities"]').click()

        // Check Value saved or Not

        // Select Whole Table
        cy.selectEntireTbl()
        
        // Check saved example saved or Not
        cy.wait(300)
        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(1)').then(function($text) {
                cy.log($text.text())
                cy.wrap($text).should('not.have.text', addValue+String(m))
            }) 

        // Return to Entity
        cy.get('[data-cy="navDrawerEntities"]').click()

        cy.get('[data-cy="entity-create"]').click()

        // Checking for a valid Name
        cy.warningNotification('[role="alert"]')

        // 2. Name should not contain "spaces" or "/", saving impossible, 
        // Checking warning message for "space" or "/" 
        const space   = [' ', '/']
        cy.wrap(space).each((index) => {
            cy.get('[data-cy="entity-name"]')
            .type(index)

            //Assert warning notification
            cy.get('[role="alert"]').eq(0)
                .should('be.visible')
                .should('have.text','Der Name enthält ungültige Zeichen!')

            // Remove space or '/'
            cy.get('[data-cy="entity-name"]').clear()
        })
        // Checking for Duplicate Name: Name cannot be known in Intent
        cy.get('[data-cy="entity-name"]')
            .clear()
            .type(addValue)

        cy.get('[data-cy="entity-description"]')
            .type(addValue)

        // entity hinzufuegen
        cy.get('[data-cy="create-button"]').click()

        cy.errorMessageTitle('[data-cy="errorMessageTitle"]', 'Das', 'Entity')

        // return to entity tab
        cy.get('[data-cy="navDrawerEntities"]').click()
        
        // After Click Input field must be activated
        var textList = ["test15","test1", "weather"]
        cy.wrap(textList).each((index) => {

            cy.get('[data-cy="entity-create"]').click()

            // add an entity-name
            cy.addName('[data-cy="entity-name"]', addValue+String(m), '[data-cy="entity-description"]')
            cy.get('[data-cy="create-button"]').click()
            cy.get('[data-cy="navDrawerEntities"]').click()
        })
    }
}
// Export class
export const onEntityHinzufuegen = new entity_hinzufuegen()