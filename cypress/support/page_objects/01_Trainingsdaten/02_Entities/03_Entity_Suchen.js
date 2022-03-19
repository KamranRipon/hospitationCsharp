const m = Math.floor(Math.random() * 1000);
export class entity_suchen {

    entitySuchen() {
        ///* Search Option testing *///

        // Open Trainingsdate Tab and enter to Story
        cy.Trainingsdaten('[data-cy="navDrawerEntities"]')
                
        // checking url after clicking Entity Button
        cy.url().should("eq", "http://10.61.135.11:8081/trainingsdaten/entity/");

        // Single Intent
        cy.get('[data-cy="entity-table-search"]')
            .type('weather')

        // Checking return Result
        cy.get('tbody')
            .find('tr')
            .should('contain','weather')

        // Multiple Entity
        cy.get('[data-cy="entity-table-search"]')
            .clear()
            .type('test')
        
        cy.get('tbody')
            .find('tr')
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