export class slot_suchen {
    slotSuchen() {
        ///* Search Option testing *///

        cy.Trainingsdaten('Trainingsdaten', '[data-cy="navDrawerSlots"]')

        // Entering Slot tab
        cy.get('[data-cy="navDrawerSlots"]')
            .contains('Slots')
            .click()

        cy.wait(500)

        // Selecting Entire Table
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
            .click()

        // Single Intent
        cy.get('[data-cy="slot-table-search"]')
            .click({force:true})
            .type('weather')

        // Assert Return Result
        cy.get('tbody')
            .find('tr')
            .should('contain', 'weather')

        // Multiple Intent
        cy.get('[data-cy="slot-table-search"]')
            .clear()
            .type('test')

        cy.get('tbody')
            .find('tr')
            .should('contain','test')

        // Nonexisting Intent
        cy.get('[data-cy="slot-table-search"]')
            .clear().type('sky')

        cy.get('tbody')
            .find('tr')
            .should('contain',"")

        cy.get('[data-cy="slot-table-search"]')
            .clear()
    }

}
// Export class
export const onSlotSuchen = new slot_suchen()