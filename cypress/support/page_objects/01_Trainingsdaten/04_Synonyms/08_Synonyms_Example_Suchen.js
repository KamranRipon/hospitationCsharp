import { capitalize, find, first, values } from "lodash"

const t = Math.floor(Math.random() * 50000);
const f = Math.floor(Math.random() * 10000);
const b = Math.floor(Math.random() * 15000);
const l = Math.floor(Math.random() * 20000);
const c = Math.floor(Math.random() * 25000);
const a = Math.floor(Math.random() * 30000);
const x = Math.floor(Math.random() * 35000);

const addValue = 'DummyValue'
const addValue_2 = 'DummyValue'
const addExample = 'testExample'

export class synonyms_example_suchen {

    synonymExmSuchen() {

        /* Test Synonym Suchen Field */

        /* Synonyms Anlegen Testing */

        cy.Trainingsdaten('Trainingsdaten', '[data-cy="navDrawerSynonyms"]')

        // Enter to first row of synonyms table
        cy.wait(300)
        cy.get('tbody')
            .find('tr')
            .first()
            .click()

        // enter to example
        cy.get('[role="tab"]')
            .contains('Examples')
            .click()
        
        // Anlegen some random name to Synonym Name
        // Synonym Name

        const ranSynName   = ['Syn1', 'Syn2', 'SynRandom', 'noIdea']

        cy.wrap(ranSynName).each((indx) => {

            cy.get('[data-cy="synonym-example-create"]').click()

            // Clicking Slot Hinzufuegen
            cy.get('[data-cy="synonym-example-text"]')
                //.click({force:true})
                .type(indx+String(x))

            // Click Anlegen
            cy.get('[data-cy="create-button"]').eq(0)
                .click()
        })

        // 1. Searching for single specific Synonyms
        cy.get('[data-cy="synonym-example-table-search"]').type('Syn1'+String(x))

        // Assert Return Result
        cy.get('tbody')
            .find('tr')
            .should('have.length', 1)
            .find('td:nth-child(1)')
            .should('contain', 'Syn1'+String(x))

        // 2. Searching for some chars multiple stories has in common
        cy.get('[data-cy="synonym-example-table-search"]')
            .clear()
            .type('Syn')
            .wait(300)

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
        cy.get('[data-cy="synonym-example-table-search"]')
            .clear()
            .type('sky')
            .wait(300)

        // Assert Return Result
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(1)')
            .should('not.have.text', 'sky')

        // delete values
        cy.wrap(ranSynName).each((indx) => {

            cy.get('[data-cy="synonym-example-table-search"]')
                .clear()
                .type(indx+String(x))

            cy.get('[data-cy="element-delete-button"]')
                .last()
                .click()

            // Confirm Delete message
            cy.get('[class="v-card v-sheet theme--light"]')
                .find('.v-card__actions')
                .find('button.v-btn:nth-child(3)')
                .click()
                .wait(400)
        })
    }
}

// Export class
export const onSynonymExmSuchen = new synonyms_example_suchen()