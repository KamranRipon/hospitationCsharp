const t = Math.floor(Math.random() * 500);
const f = Math.floor(Math.random() * 1000);
const b = Math.floor(Math.random() * 1500);
const l = Math.floor(Math.random() * 2000);
const c = Math.floor(Math.random() * 2500);
const a = Math.floor(Math.random() * 3000);
const x = Math.floor(Math.random() * 3500);

const addValue = 'DummyValue'
const addValue_2 = 'DummyValue'
const addExample = 'testExample'

export class synonyms_exampleAnlegen {

    synonymExmAnlegen() {

        /* E. Synonyms Anlegen Testing */
        cy.Trainingsdaten('Trainingsdaten', '[data-cy="navDrawerSynonyms"]')

        // Assert URL after clicking Synonym
        cy.url().should("eq", `${Cypress.config().baseUrl}/trainingsdaten/synonym/`);

        
        // 1.1.1 Warning message
        //Create Synonyms
        cy.get('[data-cy="synonym-create"]').click()

        // // checking url after clicking Intent Hinzufuegen
        // cy.url().should("eq", `${Cypress.config().baseUrl}/trainingsdaten/synonym/neu/`);

        // cy.get('[data-cy="synonym-name"]')
        //     .click({force:true})
            
        // cy.get('[role="alert"]')
        //     .should('have.text','Der Name muss gesetzt sein.')

        // Save Synonym without name
        // cy.get('[data-cy="create-button"]').click()

        // 1.1.2 Error Notification after unsuccessful save
        // Assert error message
        // cy.get('[data-cy="errorMessageTitle"]')
        //     .should('have.text',' Das Synonym konnte nicht gespeichert werden. ')

        // remove error message
        // cy.errorRemove()

        // 3. Saving saves data
        // add a valid synonyms name
        cy.get('[data-cy="synonym-name"]')
            //.click({force:true})
            .type(addValue+String(t))
        
        // create-button
        cy.get('[data-cy="create-button"]').click()

        // 3.1 Assert Success Notification
        // cy.get('[data-cy="successMessageTitle"]')
        //     .should('have.text', ' Das Synonym'+' "'+addValue+String(t)+'" '+ 'wurde erfolgreich gespeichert ')
        
        // Closing Successfully Saved Notification
        cy.successRemove()

        // Selecting Entire Table
        //cy.selectEntireTbl()
            
        // Assert VAlue in Synonyms TAble
        cy.get('[data-cy="navDrawerSynonyms"]').click()

        // cy.log('Line 71')
        // cy.wait(300)
        // cy.get('tbody')
        //     .find('tr')
        //     .last()
        //     .find('td:nth-child(1)')
        //     .then(function($synName1) {
        //         cy.wrap($synName1).should('contain', addValue+String(t))
        //     })

        // 1.2 Synonyms Example Name
        // 1.1.1 Warning message
        // 1.1.2 Warning Notification

        // Entering first row of synonym table
        cy.log('Line 85')
        cy.wait(400)
        cy.get('tbody')
            .find('tr')
            .first()
            .click({force:true})
        
        // Save Intent Name for letar assertion
        var inExName
        cy.get('[data-cy="synonym-name"]')
            .invoke('val').as('name')
                    
        cy.get('@name').then((name) => {
            inExName = name
            cy.log(inExName)
        })

        // Clicking Example Tab
        cy.get('[role="tab"]')
            .contains('Examples')
            .click()
        
        //Click Example Hinzufuegen
        cy.get('[data-cy="synonym-example-create"]').click()

        // 1. Name should not be empty, error message should contain "Name"
        
        // 1.1 Warning message
        cy.get('[class="v-messages__wrapper"]')
            .should('have.text','Der Text muss gesetzt sein')

        //save without name, Click Anlegen
        cy.get('[data-cy="create-button"]').eq(1)
            .click()

        // 1.2 Error Notification after unsuccessful save
        // Assert Error Message
        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text',' Das Synonym konnte nicht gespeichert werden. ')
        
        // close unsuccessful saved notification
        cy.errorRemove()
        
        // 3. Check for successfully saved values

        // Enter a valid Name
        cy.get('[data-cy="synonym-example-text"]')
            .type(addExample+String(l))

        // Save Name, Click Anlegen
        cy.get('[data-cy="create-button"]').eq(0)
            .click()

        cy.log('Line 138')
        // 3.1 Assert Success Notification
        cy.get('[data-cy="successMessageTitle"]')
        .then(function($successMsg) {
            cy.wrap($successMsg).should('have.text', ' Das Synonym'+' "'+inExName+'" '+ 'wurde erfolgreich gespeichert ')
        })

        cy.wait(300)
        // Close successfully saved message
        cy.successRemove()
        // cy.get('[class="v-icon notranslate theme--dark"]').eq(1)
        //     .click()

        // Select Entire table
        cy.selectEntireTbl()

        // 3.2 Assert in table
        cy.get('[data-cy="synonym-example-table-searc"]').type(addExample+String(l))

        cy.log('Line 159')
        cy.wait(300)
        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(1)')
            .then(function($synExmName) {
                cy.wrap($synExmName).should('contain', addExample+String(l))
            })

        // clear synonyms example search table
        cy.get('[data-cy="synonym-example-table-search"]').clear()

        // get the size of example talbe
        cy.log('Line 180')
        cy.wait(300)
        var noRow
        cy.get('tbody')
            .find('tr')
            .then(function($noOfExmRows) {
                noRow = $noOfExmRows.length
            })

        // 3.3 Assert example number for each synonym in synonym table

        // return to synonyms table
        cy.get('[data-cy="navDrawerSynonyms"]').click()

        cy.get('[data-cy="synonym-table-search"]')
            .then(function($noOfExm) {
                cy.wrap($noOfExm).type(inExName)
            })

        cy.wait(300)
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(2)')
            .then(function($rowCount) {
                cy.wrap($rowCount).should('contain', noRow)
            })

        cy.get('[data-cy="synonym-table-search"]').clear()

        // 3.3 Assert example number for each synonym in synonym table

        //cy.wait(1000)

        // cy.get('[class="v-text-field__slot"]')
        //     .contains('Text')
        //     .click({force:true})
        //     .type(addExample+String(f))

        // // Click Anlegen
        // cy.get('[data-cy="create-button"]').eq(0)
        //     .click()

        // // Close successfully saved message
        // cy.get('[class="v-icon notranslate theme--dark"]').eq(1)
        //     .click()
        //cy.wait(25000)
        // cy.get('[data-cy="navDrawerSynonyms"]').click()
        // cy.log('Line 224')
        // cy.get('tbod')
        //     .find('tr')
        //     .first()
        //     .find('td:nth-child(1)')
        //     .then(function($synName2) {
                
        //         cy.get('[data-cy="successMessageTitle"]')
        //             .should('have.text', ' Das Synonym'+' "'+$synName2.text()+'" '+ 'wurde erfolgreich gespeichert ')
        //     })

        // // Closing Successfully Saved Notification
        // cy.get('[class="v-icon notranslate theme--dark"]').eq(0)
        //     .click()

        // 2. Check for duplicate name
        // 2.1 Synonym Name
        // 2.2 Synonym Example Name

        // cy.get('[data-cy="navDrawerSynonyms"]').click()
        // cy.get('[data-cy="synonym-create"]').click()
        // cy.get('[data-cy="synonym-name"]')
        //     .click({force:true})
        //     .type(addValue+String(t))

        // cy.get('[data-cy="create-button"]')
        //     .click()

        // cy.get('[data-cy="errorMessageTitle"]')
        //     .should('have.text', ' Das Synonym konnte nicht gespeichert werden. ')

        // cy.get('[data-cy="navDrawerSynonyms"]').click()

        // // Assert Value in Synonym TAble
        // cy.get('[data-cy="synonym-table-search"]')
        //     .click({force:true})
        //     .type(addValue+String(t))
    
        // cy.get('tbody').find('tr').then(function($NrRow) {
        //         if($NrRow.find('td:nth-child(1)').length <= 1) {
        //             cy.wrap($NrRow.find('td:nth-child(1)'))
        //                 .should('have.text', addValue+String(t))
        //         }
        //     })
        // // Clear the search field
        // cy.get('[data-cy="synonym-table-search"]')
        //     .clear()

        // 2. Check for duplicate name

        cy.get('[data-cy="synonym-table-search"]')
            .then(function($noOfExm) {
                cy.wrap($noOfExm).type(inExName)
                cy.log(inExName)
            })
        cy.log('Log 280')
        cy.wait(300)
        cy.get('tbody')
            .find('tr')
            .first()
            .click({force:true})
        
        cy.get('[role="tab"]')
            .contains('Examples')
            .click()

        cy.get('[data-cy="synonym-example-create"]')
            .click()

        cy.get('[data-cy="synonym-example-text"]')
            .type(addExample+String(l))

        // Click Anlegen
        cy.get('[data-cy="create-button"]').eq(1)
            .click()
        cy.log('Line 300')

        // 2.1 Error message after unsuccessful saving
        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text', ' Das Synonym konnte nicht gespeichert werden. ')
        
        // error remove
        cy.errorRemove()

        // return to example
        cy.get('[role="tab"]')
            .contains('Examples')
            .click()

        // 2.2 Assert in Table: Table should not contain double value
        cy.log('Line 315')
        cy.get('[data-cy="synonym-example-table-search"]')
            //.click({force:true})
            .type(addExample+String(l))
    
        cy.get('tbody').find('tr').then(function($NrRow2) {
                if($NrRow2.find('td:nth-child(1)').length <= 1) {
                    cy.wrap($NrRow2.find('td:nth-child(1)'))
                        .should('contain', addExample+String(l))
                }
            })
        
        // Clear Search field
        cy.get('[data-cy="synonym-example-table-search"]').clear()
        // Return to Synonyms
        cy.get('[data-cy="navDrawerSynonyms"]').click({force:true})

        // 3. Check for successfully saved values
        
        //     3.2 Assert in table
        //         3.2.1 Assert Synonym name in Synonym talbe
        
        // cy.log('Line 324')
        // cy.get('[data-cy="navDrawerSynonyms"]').click()
        // cy.get('[data-cy="synonym-create"]')
        //     .click({force:true})
        
        // // cy.get('[data-cy="create-button"]')
        // //     .click()
        
        // cy.log('c '+String(c))
        // cy.get('[data-cy="synonym-name"]')
        //     .click({force:true})
        //     .type(addValue+String(c))

        // cy.get('[class="v-btn__content"]')
        //     .contains('Anlegen')
        //     .click()
        
        // cy.get('[data-cy="navDrawerSynonyms"]').click()

        // // Select Entire Synonym Table
        // cy.get('[class="v-select__slot"]').click()
        // cy.get('[class="v-list-item__content"]')
        //     .contains('Alle')
        //     .click({force:true})

        // //cy.wait(1000)
        
        // cy.get('tbody')
        //     .find('tr')
        //     .last()
        //     .find('td:nth-child(1)')
        //     .then(function($synName2) {
        //         cy.log($synName2.text())
                
        //         cy.wrap($synName2).should('have.text', addValue+String(c))
        //     })

        // 3.2 Assert in table
        // 3.2.2 Assert name in example table

        // cy.get('[data-cy="navDrawerSynonyms"]').click()

        // cy.get('tbody')
        //     .find('tr')
        //     .first()
        //     .click({force:true})

        // cy.get('.v-slide-group__wrapper')
        //     .contains('Examples')
        //     .click()

        // cy.get('[data-cy="synonym-example-create"]').click()

        // cy.get('[class="v-text-field__slot"]')
        //     .contains('Text')
        //     .click({force:true})
        //     .type(addExample+String(a))

        // // Click Anlegen
        // cy.get('[data-cy="create-button"]').eq(0)
        //     .click()

        // // Select Entire Synonym Table
        // cy.get('[class="v-select__slot"]').click()
        // cy.get('[class="v-list-item__content"]')
        //     .contains('Alle')
        //     .click({force:true})

        // cy.get('tbody')
        //     .find('tr')
        //     .last()
        //     .find('td:nth-child(1)')
        //     .then(function($synName3) {
                
        //         cy.wrap($synName3).should('have.text', addExample+String(a))
        //     })

        // // 3.2 Assert in table
        // // 3.2.3 Assert example number for each synonym in synonym table
        // cy.get('[data-cy="navDrawerSynonyms"]').click()
        
        // cy.log('Line 421')
        // cy.get('tbody')
        //     .find('tr')
        //     .first()
        //     .click({force:true})
        
        // // cy.get('[href="/trainingsdaten/synonym/1/example/"]')
        // //     .click()
        // cy.get('.v-slide-group__wrapper')
        //     .contains('Examples')
        //     .click()

        // // cy.get('[data-cy="synonym-example-create"]')
        // //     .click()

        // // Select Entire Synonym Table
        // cy.get('[class="v-select__slot"]').click()
        // cy.get('[class="v-list-item__content"]')
        //     .contains('Alle')
        //     .click({force:true})

        // cy.get('tbody').find('tr').then(function($trCount) {
        //     cy.log('Line 423')
        //     const exmNumber = $trCount.length

        //     cy.get('[data-cy="navDrawerSynonyms"]').click()

        //     cy.get('tbody')
        //         .find('tr')
        //         .first()
        //         .find('td:nth-child(2)')
        //         .should('have.text', ' '+String(exmNumber)+' ')
        // })

        // 4. Leave site via menu or breadcrump, data must not be saved

        // 4.1 Synonym Name
        // cy.get('[data-cy="navDrawerSynonyms"]').click()

        // cy.get('[data-cy="synonym-create"]')
        //     .click({force:true})

        // cy.get('[data-cy="synonym-name"]')
        //     .click({force:true})
        //     .type('someName')

        // cy.get('[data-cy="navDrawerSynonyms"]').click()

        // // Select Entire Synonym Table
        // cy.get('[class="v-select__slot"]').click()
        // cy.get('[class="v-list-item__content"]')
        //     .contains('Alle')
        //     .click({force:true})

        // cy.get('tbody')
        //     .find('tr')
        //     .last()
        //     .find('td:nth-child(1)')
        //     .should('not.have.text', 'someName')

        // 4.1 Synonym Example Name
        cy.get('[data-cy="navDrawerSynonyms"]').click()
        cy.get('tbody')
            .find('tr')
            .first()
            .click({force:true})
        
        cy.get('[role="tab"]')
            .contains('Examples')
            .click()

        cy.get('[data-cy="synonym-example-create"]')
            .click()

        cy.get('[data-cy="synonym-example-text"]')
            .type('addExample')
        
        cy.get('[class="v-breadcrumbs__item"]')
            .contains(' Synonym Example ')
            .click()
        
        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(1)')
            .should('not.have.text', 'addExample')
    }
}

// Exportint class frontEnd to End2End to test
export const onSynonymExmAnlegen = new synonyms_exampleAnlegen()