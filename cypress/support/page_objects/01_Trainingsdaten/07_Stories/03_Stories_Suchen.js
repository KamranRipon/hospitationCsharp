//import { canonicalize } from "mocha/lib/utils";

const singleEle = Math.floor(Math.random() * 5500);
const multiEle1  = Math.floor(Math.random() * 6500);
const addValue = 'StoryAnDummy'

export class stories_suchen {

    storiesSuchen() {

        // Open Trainingsdate Tab and enter to Story
        cy.Trainingsdaten('Trainingsdaten','[data-cy="navDrawerStories"]')

        // Assert URL after clicking Story
        cy.url().should("eq", `${Cypress.config().baseUrl}/trainingsdaten/story/`);
        //cy.url().should("eq", "http://10.61.135.11:8081/trainingsdaten/story/");
        
        const randonVal = [addValue+String(singleEle), addValue+String(multiEle1)]
        cy.wrap(randonVal).each((index) => {

            // Clicking Story Hinzufuegen
            cy.createButton('[data-cy="story-create"]')
            cy.storiesAnlegen(index)
        })

        // Selecting Entire Table
        cy.wait(500)
        cy.selectEntireTbl()

        // 1. Searching for single specific story 
        cy.get('[data-cy="story-table-search"]')
            .type(addValue+String(singleEle))

        // Assert Return Result
        cy.get('tbody')
            .find('tr')
            .should('have.length', 1)
            .find('td:nth-child(1)')
            .should('have.text', addValue+String(singleEle))

        // 2. Searching for some chars multiple stories has in common
        cy.get('[data-cy="story-table-search"]').clear()
            .type(addValue)

        // Assert Return Result
        cy.get('tbody')
            .find('tr')
            .then((trLength) => {
                var len = trLength.length
                
                if (len > 1) {
                    cy.wrap(trLength).should('have.length', len)
                }
            })
            
        // 3. searching for some chars no story has shows empty table
        cy.get('[data-cy="story-table-search"]').clear()
            .type('sky')

        // Assert Return Result
        cy.get('tbody')
            .find('tr')
            .should('have.length', 1)
            .find('td:nth-child(1)')
            .should('not.have.text', 'sky')
    }
}
// Exportint class frontEnd to End2End to test
export const onStoriesSuchen = new stories_suchen()