const t = Math.floor(Math.random() * 500);
const c = Math.floor(Math.random() * 2500);

const addValue = 'DummyValue'
//const addExample = 'testExample'
export class synonyms_anlegen {

    synonymAnlegen() {

        /* Synonyms Anlegen Testing */
        cy.Trainingsdaten('Trainingsdaten', '[data-cy="navDrawerSynonyms"]')

        // Assert URL after clicking Synonym
        cy.url().should("eq", `${Cypress.config().baseUrl}/trainingsdaten/synonym/`);

        // 1.1 Synonym Name

        // 1.1.1 Warning message
        //Create Synonyms
        cy.get('[data-cy="synonym-create"]').click()

        // checking url after clicking Intent Hinzufuegen
        cy.url().should("eq", `${Cypress.config().baseUrl}/trainingsdaten/synonym/neu/`);

        cy.get('[data-cy="synonym-name"]').click({force:true})
            
        cy.get('[role="alert"]')
            .should('have.text','Der Name muss gesetzt sein.      ')

        // Save Synonym without name
        cy.get('[data-cy="create-button"]').click()

        // 1.1.2 Error Notification after unsuccessful save
        // Assert error message
        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text',' Das Synonym konnte nicht gespeichert werden. ')

        // remove error message
        cy.errorRemove()

        // 3. Saving saves data
        // add a valid synonyms name
        cy.get('[data-cy="synonym-name"]')
            .type(addValue+String(t))
        
        // create-button
        cy.get('[data-cy="create-button"]').click()

        // 3.1 Assert Success Notification
        cy.get('[data-cy="successMessageTitle"]')
            .should('have.text', ' Das Synonym'+' "'+addValue+String(t)+'" '+ 'wurde erfolgreich gespeichert ')
        
        // Closing Successfully Saved Notification
        cy.successRemove()

        // Selecting Entire Table
        cy.selectEntireTbl()
            
        // Assert VAlue in Synonyms TAble
        cy.get('[data-cy="navDrawerSynonyms"]').click()

        cy.log('Line 64')
        cy.wait(300)
        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(1)')
            .then(function($synName1) {
                cy.wrap($synName1).should('contain', addValue+String(t))
            })

        // 2. Check for duplicate name
        // 2.1 Synonym Name
        // 2.2 Synonym Example Name

        cy.get('[data-cy="navDrawerSynonyms"]').click()
        cy.get('[data-cy="synonym-create"]').click()
        cy.get('[data-cy="synonym-name"]')
            .type(addValue+String(t))

        cy.get('[data-cy="create-button"]').click()

        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text', ' Das Synonym konnte nicht gespeichert werden. ')

        cy.errorRemove()

        cy.get('[data-cy="navDrawerSynonyms"]').click()

        // Assert Value in Synonym TAble
        cy.get('[data-cy="synonym-table-search"]')
            .type(addValue+String(t))
    
        cy.get('tbody').find('tr').then(function($NrRow) {
                if($NrRow.find('td:nth-child(1)').length <= 1) {
                    cy.wrap($NrRow.find('td:nth-child(1)'))
                        .should('contain', addValue+String(t))
                }
            })
        // Clear the search field
        cy.get('[data-cy="synonym-table-search"]').clear()

        // 3. Check for successfully saved values
        //     3.2 Assert in table
        //         3.2.1 Assert Synonym name in Synonym talbe
        
        cy.log('Line 109')

        cy.get('[data-cy="synonym-create"]')
            .click({force:true})
        
        cy.get('[data-cy="synonym-name"]')
            //.click({force:true})
            .type(addValue+String(c))

        cy.get('[data-cy="create-button"]').click()
        
        cy.get('[data-cy="navDrawerSynonyms"]').click()

        // Select Entire Synonym Table
        cy.selectEntireTbl()
        
        cy.wait(300)
            .get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(1)')
            .then(function($synName2) {

                cy.wrap($synName2).should('contain', addValue+String(c))
            })

        // 4. Leave site via menu or breadcrump, data must not be saved
        cy.log('Line 378')
        // 4.1 Synonym Name
        cy.get('[data-cy="navDrawerSynonyms"]').click()

        cy.get('[data-cy="synonym-create"]')
            .click({force:true})

        cy.get('[data-cy="synonym-name"]')
            .click({force:true})
            .type('someName')

        cy.get('[data-cy="navDrawerSynonyms"]').click()

        // Select Entire Synonym Table
        cy.selectEntireTbl()

        cy.wait(300)
        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(1)')
            .should('not.have.text', 'someName')
    }
}

// Export class
export const onSynonymAnlegen = new synonyms_anlegen()