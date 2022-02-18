const m = Math.floor(Math.random() * 1000);
const addValue = 'DummyValue'+String(m)

export class entity_bearbeiten {

    entityBearbeiten() {

        // Open Trainingsdate Tab and enter to Story
        cy.Trainingsdaten('[data-cy="navDrawerEntities"]')        
                
        // checking url after clicking Entity Button
        cy.url().should("eq", "http://localhost/trainingsdaten/entity/");
        
        // Testing Intents Bearbeitung
       
        // Select first row of the Intent table
        cy.wait(500)
        cy.get('tbody')
            .find('tr')
            .first()
            .click({force:true})
        
        cy.get('[data-cy="entity-name"]')
            .clear()

        // Checking for a valid Name
        cy.warningNotification('[role="alert"]')
        
        // 2. Name should not contain "spaces" or "/", saving impossible, 
        // Checking warning message for "space" or "/" 
        const space   = [' ', '/']
        cy.wrap(space).each((index) => {
            cy.get('[data-cy="entity-name"]')
                .type(index)

            //Assert warning notification
            cy.get('[role="alert"]')
                .should('be.visible')
                .should('have.text','Der Name enthält ungültige Zeichen!')

            // Remove space or '/'
            cy.get('[data-cy="entity-name"]').clear()
        })       

        cy.addName('[data-cy="entity-name"]', 'test161'+String(m), '[data-cy="entity-description"]')
        cy.get('[data-cy="save-button"]').click()
        cy.successRemove()
        
        cy.get('[data-cy="navDrawerEntities"]')
            //.contains('Entities')
            .click({force:true})

        cy.get('tbody')
            .find('tr')
                .first()
            .find('td:nth-child(1)').then(function($val) {
                const text = $val.text()
                cy.wrap($val).should('have.text', 'test161'+String(m))
            })

        /* Check for successfully saved notification */

        // Select first row of the Intent table 
        cy.get('tbody')
            .find('tr')
            .first()
            .click({force:true})

        cy.get('[data-cy="entity-name"]').clear()

        cy.addName('[data-cy="entity-name"]', addValue+String(m), '[data-cy="entity-description"]')

        cy.get('[data-cy="navDrawerEntities"]').click()
        
        // Saved Notification Must appear after successfully saved
        cy.successMessageTitle('[data-cy="successMessageTitle"]', 'Das', 'Entity', addValue+String(m))

        /* Test duplicate value in the table */
        
        // Select first row of the Intent table 
        cy.get('tbody')
            .find('tr')
            .first()
            .click({force:true})
        
        cy.get('[data-cy="entity-name"]').clear()

        cy.addName('[data-cy="entity-name"]', 'test1', '[data-cy="entity-description"]')

        cy.get('[data-cy="navDrawerEntities"]').click()

        // Assert successfully Saved Notification
        cy.errorMessageTitle('[data-cy="errorMessageTitle"]', 'Das', 'Entity')

        cy.get('[data-cy="errorMessageBody"]')
            .should('have.text', ' Es exisitiert bereits ein Entity mit diesem Namen ')
                
        cy.get('[data-cy="entity-name"]').clear()
        
        cy.get('[data-cy="entity-name"]')
            .type('test-infi')
    }
}
// Exportint class frontEnd to End2End to test
export const onEntityBearbeiten = new entity_bearbeiten()