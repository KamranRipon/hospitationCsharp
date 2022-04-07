const duplicatVal = Math.floor(Math.random() * 650000);
const newVal = Math.floor(Math.random() * 850000);
const addVal = Math.floor(Math.random() * 350000);

const addValue = 'DummyValue'
export class synonyms_bearbeiten {

    synonymBearbeiten() {

        /* B. Synonyms Bearbeiten Testing */

        cy.Trainingsdaten('Trainingsdaten', '[data-cy="navDrawerSynonyms"]')

        // Assert URL after clicking Synonym
        cy.url().should("eq", `${Cypress.config().baseUrl}/trainingsdaten/synonym/`);
        
        // 1. Edit Name should not be empty, error message should contain "Name"

        // add a Name to synonym table
        cy.get('[data-cy="navDrawerSynonyms"]').click()
        cy.get('[data-cy="synonym-create"]').click()
        cy.get('[data-cy="synonym-name"]')
            .type(addValue+String(addVal))

        cy.get('[data-cy="create-button"]').click()

        // remove success message
        cy.successRemove()
       
        const value1   = ['', addValue+String(addVal)]
        
        cy.wrap(value1).each((index) => {
            cy.log('Line 41')
            cy.wait(400)  // Mast have .wait() here
            cy.get('tbody')
                .find('tr')
                .first()
                .click({force:true})

            // clear input field
            cy.get('[data-cy="synonym-name"]')
                .clear()

            if (index == '') {
                cy.log('If Statement is True')

                //1.1.1 Warning message
                cy.get('[class="v-messages__wrapper"]')
                    .should('have.text','Der Name muss gesetzt sein.')

                cy.get('[data-cy="navDrawerSynonyms"]')
                    .contains('Synonyms')
                    .click()

                //1.1.2 Warning Notification
                cy.get('[data-cy="errorMessageTitle"]')
                    .should('have.text',' Das Synonym konnte nicht gespeichert werden. ')

                // after assert close warning message
                cy.get('[class="v-icon notranslate theme--dark"]').eq(0)
                    .click()

                // clicking "Abbrechen" buttton. Slected Name should remain same.
                cy.get('[data-cy="abort-button"]').click()
            }

            else {

                cy.log('If Statement FAlse')
                cy.log('Line'+String(602))
                cy.log('index'+String(index))

                cy.get('[data-cy="synonym-name"]')
                    .click()
                    .type(index)

                cy.get('[href="/trainingsdaten/synonym/"]')
                    .contains('Synonyms')
                    .click()
                
                cy.log('Line 92')

                cy.get('[data-cy="errorMessageTitle"]')
                    .should('have.text',' Das Synonym konnte nicht gespeichert werden. ')

                // error remove
                cy.errorRemove()

                cy.get('[data-cy="abort-button"]')
                    .click({force:true})
            }
        })

        // 3. Check for successfully saved values

        // Edit Synonym Name and add a Valid Name
        cy.wait(400)
        cy.get('tbody')
            .find('tr')
            .first()
            .click({force:true})

        // clear input field
        cy.get('[data-cy="synonym-name"]')
            .clear()
            .type(addValue+String(newVal))

        cy.get('[data-cy="navDrawerSynonyms"]').click()

        // 3.1 Assert Notification
        cy.get('[data-cy="successMessageTitle"]')
            .should('have.text', ' Das Synonym'+' "'+addValue+String(newVal)+'" '+ 'wurde erfolgreich gespeichert ')

        // success remove
        cy.successRemove()

        cy.log('Line 157')
        
        // 3.2 Assert in table
        cy.get('[data-cy="synonym-table-search"]').type(addValue+String(newVal))

        cy.wait(300)
        cy.get('tbody')
            .find('tr')
            .first()
            .find('td:nth-child(1)')
            .then(function($synName4) {
                cy.wrap($synName4).should('contain', addValue+String(newVal))
            })

        // clear search
        cy.get('[data-cy="synonym-table-search"]').clear()

        // 2. Check for duplicate name

        //2.1 Assert Notification
        cy.log('Line 137')
        
        cy.get('[data-cy="navDrawerSynonyms"]').click()
        
        cy.log('Line 253')
        cy.wait(300)
        cy.get('tbody')
            .find('tr')
            .first()
            .click()

        cy.get('[data-cy="synonym-name"]')
            .clear()
            .click()
            .type(addValue+String(addVal))

        cy.get('[data-cy="navDrawerSynonyms"]')
            .click()

        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text', ' Das Synonym konnte nicht gespeichert werden. ')

        cy.errorRemove()

        cy.log('Line 273')

        cy.wait(350)
        cy.get('[data-cy="synonym-name"]')
            .clear({force:true})
            .type(addValue+String(duplicatVal*newVal))

        cy.get('[data-cy="navDrawerSynonyms"]').click()
        cy.successRemove()

        cy.wait(300)

        //Assert unique name in Synonyms Table
        cy.get('[data-cy="synonym-table-search"]').type(addValue+String(duplicatVal*newVal))

        cy.get('tbody')
            .find('tr')
            .then((trLength) => {
                var len = trLength.length
                
                if (len < 2) {
                    cy.log('Line 295')
                    cy.get('tbody')
                        .find('tr')
                        .first()
                        .find('td:nth-child(1)')
                        .should('contain', addValue+String(duplicatVal*newVal)) 
                }
            })
        
        cy.get('[data-cy="synonym-table-search"]').clear()

        // 4. Leave site via menu or breadcrump, data must saved

        // 4.1.1 Leave Site by breadcrump
        cy.get('[data-cy="navDrawerSynonyms"]').click()
        
        cy.wait(300)
        cy.get('tbody')
            .find('tr')
            .first()
            .click({force:true})

        cy.get('[data-cy="synonym-name"]').clear()
            .type('someName')

        cy.get('[data-cy="navDrawerSynonyms"]').click()

        cy.get('[data-cy="synonym-table-search"]')
            .type('someName')

        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(1)')
            .should('contain', 'someName')

        cy.get('[data-cy="synonym-table-search"]').clear()

        // 5 Leave Site by Abbrechen
        cy.get('[data-cy="navDrawerSynonyms"]').click()

        cy.wait(300)
        cy.get('tbody')
            .find('tr')
            .first()
            .click({force:true})

        cy.get('[data-cy="synonym-name"]')
            .clear()
            .click({force:true})
            .type('someName2')

        // Leave Site by Abbrechen Button
        cy.get('[data-cy="abort-button"]')
            .click()
            .wait(300)

        // Select Entire Synonym Example Table
        cy.selectEntireTbl()

        cy.get('[data-cy="synonym-table-search"]')
            .type('someName2')

        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(1)')
            .should('not.have.text', 'someName2')

        cy.get('[data-cy="synonym-table-search"]').clear()
    }
}
// Exportint class frontEnd to End2End to test
export const onSynonymBearbeiten = new synonyms_bearbeiten()