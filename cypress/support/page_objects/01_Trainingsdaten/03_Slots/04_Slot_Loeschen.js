export class slot_loeschen {
    slotLoeschen() {

        cy.Trainingsdaten('Trainingsdaten', '[data-cy="navDrawerSlots"]')

        // Entering Slot tab
        cy.get('[data-cy="navDrawerSlots"]')
            .contains('Slots')
            .click()

        // Select Whole Table
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]')
            .contains('Alle').click()
        cy.wait(500)

        // Check saved example saved or Not
        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(1)').then(function($text) {
            cy.log($text.text())
            const rowValue = $text.text()
            cy.log(rowValue)

            cy.get('tbody')
                .find('tr')
                .last()
                .find('[data-cy="element-delete-button"]')
                .click({force:true})

            cy.get('[data-cy="dialog-accept"]').click()
            cy.get('[data-cy="navDrawerSlots"]')
                .contains('Slots')
                .click()
            cy.wait(500)

            cy.get('tbody')
                .find('tr')
                .last()
                .find('td:nth-child(1)').then(function($text2) {
                cy.log($text2.text())
                cy.log(rowValue)

                cy.wrap($text2).should('not.have.text', rowValue)
            })
        })
    }

}
// Export class
export const onSlotLoeschen = new slot_loeschen()