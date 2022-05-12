const fr = Math.floor(Math.random() * 50000);
const l = Math.floor(Math.random() * 20000);
const c = Math.floor(Math.random() * 25000);
const a = Math.floor(Math.random() * 30000);

const addValue = 'DummyValue'
const addExample = 'testExample'

export class form_hinzufuegen {

    formHinzufuegen() {
        
        /* Form hinzufuegen Testing */
        cy.Trainingsdaten('Trainingsdaten','[data-cy="navDrawerForms"]')
        
        // Assert URL after clicking Form Button
        cy.url().should("eq", `${Cypress.config().baseUrl}/trainingsdaten/form/`);
        //cy.url().should("eq", "http://10.61.135.11:8081/trainingsdaten/form/");
        
        // Clicking Form Hinzufuegen
        cy.get('[data-cy="form-create"]').click()

        // 1. Test Warning & 'Error Notifications

        cy.warningNotification('[role="alert"]')

        // Assert warning message
        const space   = [' ', '/']
        cy.wrap(space).each((index) => {
            cy.get('[data-cy="form-name"]')
                .type(index)

            //Assert warning message
            cy.get('[role="alert"]').eq(0)
                .should('have.text','Der Name enthält ungültige Zeichen!')
                
            // clear input field
            cy.get('[data-cy="form-name"]').clear()
        })

        // 1.3. Save form-name without any value, should return error message
        cy.get('[data-cy="create-button"]').click()

        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text',' Die Form konnte nicht gespeichert werden. ')

        cy.get('[data-cy="error-remove"]').click()

        // 2. Save with valid name
        // Name
        cy.get('[data-cy="form-name"]').type(addValue+String(fr))
        // description
        cy.get('[data-cy="form-description"]').type('Beschreibung')

        cy.get('[data-cy="create-button"]').click()

        // Assert Successful Notification
        cy.get('[data-cy="successMessageTitle"]')
            .should('have.text', ' Das Form'+' "'+addValue+String(fr)+'" '+ 'wurde erfolgreich gespeichert ')
        
        // Closing Successfully Saved Notification
        cy.get('[class="v-icon notranslate theme--dark"]').eq(1)
            .click()

        // Assert VAlue in Forms Table
        cy.get('[data-cy="navDrawerForms"]').click()

        // Selecting Entire Table
        cy.selectEntireTbl()

        cy.wait(300)
        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(1)')
            .then(function($synName1) {
                cy.wrap($synName1).should('have.text', addValue+String(fr))
            })

        // 4. Check for duplicate name
        cy.get('[data-cy="navDrawerForms"]').click()
        cy.get('[data-cy="form-create"]').click()
        cy.get('[data-cy="form-name"]')
            .type(addValue+String(fr))

        cy.get('[data-cy="create-button"]').click()

        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text', ' Die Form konnte nicht gespeichert werden. ')

        cy.get('[data-cy="navDrawerForms"]').click()

        // Assert Value in Synonym TAble
        cy.get('[data-cy="form-table-search"]')
            .type(addValue+String(fr))
    
        cy.get('tbody').find('tr').then(function($NrRow) {
                if($NrRow.find('td:nth-child(1)').length <= 1) {
                    cy.wrap($NrRow.find('td:nth-child(1)'))
                        .should('have.text', addValue+String(fr))
                }
            })
        // Clear the search field
        cy.get('[data-cy="form-table-search"]').clear()
        
        // 4. Leave site via menu or breadcrump, data must not be saved

        cy.get('[data-cy="navDrawerForms"]').click()

        cy.get('[data-cy="form-create"]')
            .click({force:true})

        cy.get('[data-cy="form-name"]')
            .type('someName')

        cy.get('[data-cy="navDrawerForms"]').click()

        cy.get('[data-cy="form-table-search"]').type('someName')

        // Select Entire Synonym Table
        cy.selectEntireTbl()

        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(1)')
            .should('not.have.text', 'someName')
    }
}

// Exportint class frontEnd to End2End to test
export const onFormHinzufuegen = new form_hinzufuegen()