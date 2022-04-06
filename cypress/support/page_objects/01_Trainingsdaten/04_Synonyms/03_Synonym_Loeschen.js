export class synonyms_loeschen {

    synonymLoeschen() {

        /* C. Synonyms Loeschen Testing */

        cy.Trainingsdaten('Trainingsdaten', '[data-cy="navDrawerSynonyms"]')

        // Assert URL after clicking Synonym
        cy.url().should("eq", `${Cypress.config().baseUrl}/trainingsdaten/synonym/`);

        cy.log('Line 12')
        var noRow
        // Selecting Entire Table
        cy.selectEntireTbl()

        cy.get('tbody')
            .find('tr')
            .then(function($tbLength) {
                noRow = $tbLength.length
            }) 
                
        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(1)')
            .then(function($synName7) {
                cy.log($synName7.text())

                const tdValue = $synName7.text()

                cy.get('[data-cy="element-delete-button"]')
                    .last()
                    .click()

                // Confirm Delete message
                cy.get('[class="v-card v-sheet theme--light"]')
                    .find('.v-card__actions')
                    .find('button.v-btn:nth-child(3)')
                    .click()
                    .wait(500)

                // Update Table Length
                noRow = noRow - 1

                cy.get('[data-cy="synonym-table-search"]')
                    .click()
                    .type(tdValue)

                cy.get('tbody')
                    .find('tr')
                    .should('not.have.text', tdValue)

                cy.get('[data-cy="synonym-table-search"]')
                    .clear()

                // Assert Synonyms Table Length
                cy.log('Line 74')
                cy.log('noRow '+String(noRow))
                cy.get('tbody')
                    .find('tr')
                    .should('have.length', noRow)
            })
    }
}

// Export class
export const onSynonymLoeschen = new synonyms_loeschen()