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

export class synonyms_suchen {

    synonymSuchen() {

        /* Test Synonym Suchen Field */

        /* Synonyms Anlegen Testing */

        cy.get('[class="v-list-group"]').contains('Trainingsdaten').then((Tdaten) => {

            if(Tdaten.find('[class="v-list-group__header v-list-item v-list-item--link theme--light"]').length > 0) {
                cy.log('If Statement True')

                cy.get('[data-cy="navDrawerSynonyms"]')
                    .contains('Synonyms')
                    .click()
            }
            else {
                cy.log('If Statement False')

                cy.get('[class="v-list-group__header v-list-item v-list-item--link theme--light"]')
                    .contains('Trainingsdaten')
                    .click()

                cy.get('[data-cy="navDrawerSynonyms"]')
                    .contains('Synonyms')
                    .click()
            }
        })

        
        // Anlegen some random name to Synonym Name
        // Synonym Name

        const ranSynName   = ['Syn1', 'Syn2', 'SynRandom', 'noIdea']

        cy.wrap(ranSynName).each((indx) => {

            // Clicking Slot Hinzufuegen
            cy.get('[data-cy="synonym-create"]')
                .click()

            cy.get('[data-cy="synonym-name"]')
                .click({force:true})
                .type(indx+String(x))

            // Click Anlegen
            cy.get('[data-cy="create-button"]')
                .click()
                .wait(1000)

            cy.get('[data-cy="navDrawerSynonyms"]')
                .click()
        })

        // 1. Searching for single specific Synonyms
        cy.get('[data-cy="synonym-table-search"]').type('Syn1'+String(x))

        // Assert Return Result
        cy.get('tbody')
            .find('tr')
            .should('have.length', 1)
            .find('td:nth-child(1)')
            .should('contain', 'Syn1'+String(x))

        // 2. Searching for some chars multiple stories has in common
        cy.get('[data-cy="synonym-table-search"]')
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
        cy.get('[data-cy="synonym-table-search"]')
            .clear()
            .type('sky')
            .wait(300)

        // Assert Return Result
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(1)')
            .should('not.have.text', 'sky')
    }
}

// Export class
export const onSynonymSuchen = new synonyms_suchen()