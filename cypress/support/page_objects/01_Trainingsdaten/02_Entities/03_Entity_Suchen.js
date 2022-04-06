const m = Math.floor(Math.random() * 1000);
export class entity_suchen {

    entitySuchen() {
        ///* Search Option testing *///

        // Open Trainingsdate Tab and enter to Story
        cy.Trainingsdaten('Trainingsdaten','[data-cy="navDrawerEntities"]')
                
        // checking url after clicking Entity Button
        cy.url().should("eq", `${Cypress.config().baseUrl}/trainingsdaten/entity/`);

        // Add an entity
        cy.get('[data-cy="entity-create"]').click()

        cy.get('[data-cy="entity-name"]').type('test')

        cy.get('[data-cy="entity-description"]')
            .type('entity test')

        // entity hinzufuegen
        cy.get('[data-cy="create-button"]').click()

        //return to Entity
        cy.get('[data-cy="navDrawerEntities"]').click()

        // Single Intent
        cy.get('[data-cy="entity-table-search"]')
            .type('weather')

        // Checking return Result
        cy.wait(500)
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(1)')
            .should('contain','weather')

        // Multiple Entity
        cy.get('[data-cy="entity-table-search"]').clear()
            .type('test')
        
        cy.wait(500)
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(1)')
            .should('contain','test')

        // Nonexisting Entities
        cy.get('[data-cy="entity-table-search"]')
            .clear()
            .type('sky')
                
        cy.get('tbody')
            .find('tr')
            .should('contain',"")
    }
}
// Exportint class frontEnd to End2End to test
export const onEntitySuchen = new entity_suchen()