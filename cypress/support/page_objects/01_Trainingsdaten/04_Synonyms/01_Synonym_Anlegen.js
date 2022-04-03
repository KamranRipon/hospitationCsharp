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

export class synonyms_anlegen {

    synonymAnlegen() {

        /* Synonyms Anlegen Testing */
        cy.Trainingsdaten('Trainingsdaten', '[data-cy="navDrawerSynonyms"]')

        // Assert URL after clicking Synonym
        cy.url().should("eq", `${Cypress.config().baseUrl}/trainingsdaten/synonym/`);
        
        // Clicking Slot Hinzufuegen
        cy.get('[data-cy="synonym-create"]')
            .should('have.attr', 'href')
            .then(($href) => {
                   cy.visit($href)
                        })
        
        cy.Trainingsdaten('Trainingsdaten', '[data-cy="navDrawerSynonyms"]')

        //Create Synonyms
        cy.get('[data-cy="synonym-create"]').click()

        // checking url after clicking Intent Hinzufuegen
        cy.url().should("eq", `${Cypress.config().baseUrl}/trainingsdaten/synonym/neu/`);

        // 1.1 Synonym Name
        // 1.1.1 Warning message
        // 1.1.2 Warning Notification


        cy.get('[data-cy="synonym-name"]')
            .click({force:true})
            
        cy.get('[class="v-messages__wrapper"]')
            .should('have.text','Der Name muss gesetzt sein.')

        // Click Anlegen
        cy.get('[data-cy="create-button"]')
            .click()

        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text',' Das Synonym konnte nicht gespeichert werden. ')

        cy.get('[data-cy="synonym-name"]')
            //.click({force:true})
            .type(addValue+String(t))

        cy.get('[class="v-btn__content"]')
            .contains('Anlegen')
            .click()
        //cy.wait(500)
        // Assert Successful Notification
        cy.get('[data-cy="successMessageTitle"]')
            .should('have.text', ' Das Synonym'+' "'+addValue+String(t)+'" '+ 'wurde erfolgreich gespeichert ')
        
        // Closing Successfully Saved Notification
        cy.get('[class="v-icon notranslate theme--dark"]').eq(1)
            .click()
        cy.log('Line 108')

        // /* Delete first row of Synonym table and just keep one row in the table*/
        // cy.get('tbody').then((delRow) => {
        //     if(delRow.find('tr').length > 1) {
        //         cy.get('[class="v-icon notranslate theme--light error--text"]').eq(0)
        //             .click()
        //     }
        // })

        // Selecting Entire Table
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
            .click({force:true})
            
        // Assert VAlue in Synonyms TAble
        cy.get('[data-cy="navDrawerSynonyms"]').click()
        cy.log('Line 120')
        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(1)')
            .then(function($synName1) {
                
                cy.wrap($synName1).should('have.text', addValue+String(t))
                //cy.wrap($synName1).should('have.text', $synName1.text())
            })

        // 1.2 Synonyms Example Name
        // 1.1.1 Warning message
        // 1.1.2 Warning Notification

        // Entering first row of synonym table
        cy.log('Test valid Name of Synonym Example')
        cy.log('Line 137')
        cy.get('tbody')
            .find('tr')
            .first()
            .click({force:true})
        
        // Clicking Example Tab
        // cy.get('[href="/trainingsdaten/synonym/1/example/"]')
        //     .click()
        cy.get('.v-slide-group__wrapper')
            .contains('Examples')
            .click()

        // Assert URL after entering to Synonym Example
        // cy.url().should("eq", "http://localhost/trainingsdaten/synonym/1/example/");
        
        //Click Example Hinzufuegen
        cy.get('[data-cy="synonym-example-create"]')
            .click()

        // checking for valid name Notification
        cy.get('[class="v-messages__wrapper"]')
            .should('have.text','Der Text muss gesetzt sein')

        //save without name, Click Anlegen
        cy.get('[data-cy="create-button"]').eq(1)
            .click()
        // Assert Error Message
        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text',' Das Synonym konnte nicht gespeichert werden. ')
        // Enter a valid Name             
        cy.get('[class="v-text-field__slot"]')
            .contains('Text')
            .click({force:true})
            .type(addExample+String(l))

        // Save Name, Click Anlegen
        cy.get('[data-cy="create-button"]').eq(0)
            .click()
        cy.log('Line '+String(174))
        // Assert Successfully saved example name Notification
        cy.get('[data-cy="successMessageTitle"]')
            .should('have.text', ' Das Synonym'+' "'+addValue+String(t)+'" '+ 'wurde erfolgreich gespeichert ')

        // Select Entire table
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
            .click({force:true})

        cy.log('Line 194')
        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(1)')
            .then(function($synExmName) {
                
                cy.wrap($synExmName).should('have.text', addExample+String(l))
            })
        //cy.wait(250)
        // Close successfully saved message
        cy.get('[class="v-icon notranslate theme--dark"]').eq(1)
            .click()

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
        cy.get('[data-cy="navDrawerSynonyms"]').click()
        cy.log('Line 224')
        cy.get('tbody')
            .find('tr')
            .first()
            .find('td:nth-child(1)')
            .then(function($synName2) {
                
                cy.get('[data-cy="successMessageTitle"]')
                    .should('have.text', ' Das Synonym'+' "'+$synName2.text()+'" '+ 'wurde erfolgreich gespeichert ')
            })

        // Closing Successfully Saved Notification
        cy.get('[class="v-icon notranslate theme--dark"]').eq(0)
            .click()

        // 2. Check for duplicate name
        // 2.1 Synonym Name
        // 2.2 Synonym Example Name
        cy.log('2. Check for duplicate name')
        cy.get('[data-cy="navDrawerSynonyms"]').click()
        cy.get('[data-cy="synonym-create"]').click()
        cy.get('[data-cy="synonym-name"]')
            .click({force:true})
            .type(addValue+String(t))

        cy.get('[data-cy="create-button"]')
            .click()

        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text', ' Das Synonym konnte nicht gespeichert werden. ')

        cy.get('[data-cy="navDrawerSynonyms"]').click()

        // Assert Value in Synonym TAble
        cy.get('[data-cy="synonym-table-search"]')
            .click({force:true})
            .type(addValue+String(t))
    
        cy.get('tbody').find('tr').then(function($NrRow) {
                if($NrRow.find('td:nth-child(1)').length <= 1) {
                    cy.wrap($NrRow.find('td:nth-child(1)'))
                        .should('have.text', addValue+String(t))
                }
            })
        // Clear the search field
        cy.get('[data-cy="synonym-table-search"]')
            .clear()

        // Check Unique Name for Synonym Example
        cy.log('Log 273')
        cy.get('tbody')
            .find('tr')
            .first()
            .click({force:true})
        
        // cy.get('[href="/trainingsdaten/synonym/1/example/"]')
        //     .click()

        cy.get('.v-slide-group__wrapper')
            .contains('Examples')
            .click()

        cy.get('[data-cy="synonym-example-create"]')
            .click()

        cy.get('[class="v-text-field__slot"]')
            .contains('Text')
            .click({force:true})
            .type(addExample+String(l))

        // Click Anlegen
        // cy.get('[data-cy="create-button"]').eq(1)
        //     .click()
        
        cy.get('[class="v-btn__content"]')
            .contains('Anlegen')
            .click()

        //cy.wait(1000)
        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text', ' Das Synonym konnte nicht gespeichert werden. ')
        
        cy.get('[class="v-icon notranslate theme--dark"]').eq(0).click({force:true})

        cy.get('[class="v-breadcrumbs__item"]')
            .contains(' Synonym Example ')
            .click()

        // Assert Value in Synonym Table
        cy.log('Line 301')
        cy.get('[data-cy="synonym-example-table-search"]')
            .click({force:true})
            .type(addExample+String(l))
    
        cy.get('tbody').find('tr').then(function($NrRow2) {
                if($NrRow2.find('td:nth-child(1)').length <= 1) {
                    cy.wrap($NrRow2.find('td:nth-child(1)'))
                        .should('have.text', addExample+String(l))
                }
            })

        cy.get('[data-cy="synonym-example-table-search"]')
            .clear()

        cy.get('[data-cy="navDrawerSynonyms"]').click({force:true})

        
        // 3. Check for successfully saved values
        
        //     3.2 Assert in table
        //         3.2.1 Assert Synonym name in Synonym talbe
        
        cy.log('Line 324')
        cy.get('[data-cy="navDrawerSynonyms"]').click()
        cy.get('[data-cy="synonym-create"]')
            .click({force:true})
        
        // cy.get('[data-cy="create-button"]')
        //     .click()
        
        cy.log('c '+String(c))
        cy.get('[data-cy="synonym-name"]')
            .click({force:true})
            .type(addValue+String(c))

        cy.get('[class="v-btn__content"]')
            .contains('Anlegen')
            .click()
        
        cy.get('[data-cy="navDrawerSynonyms"]').click()

        // Select Entire Synonym Table
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
            .click({force:true})

        //cy.wait(1000)
        
        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(1)')
            .then(function($synName2) {
                cy.log($synName2.text())
                
                cy.wrap($synName2).should('have.text', addValue+String(c))
            })

        // 3.2 Assert in table
        // 3.2.2 Assert name in example table

        cy.get('[data-cy="navDrawerSynonyms"]').click()

        cy.get('tbody')
            .find('tr')
            .first()
            .click({force:true})
        
        // cy.get('[href="/trainingsdaten/synonym/1/example/"]')
        //     .click()

        cy.get('.v-slide-group__wrapper')
            .contains('Examples')
            .click()

        cy.get('[data-cy="synonym-example-create"]')
            .click()

        cy.get('[class="v-text-field__slot"]')
            .contains('Text')
            .click({force:true})
            .type(addExample+String(a))

        // Click Anlegen
        cy.get('[data-cy="create-button"]').eq(0)
            .click()

        // Select Entire Synonym Table
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
            .click({force:true})

        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(1)')
            .then(function($synName3) {
                
                cy.wrap($synName3).should('have.text', addExample+String(a))
            })

        // 3.2 Assert in table
        // 3.2.3 Assert example number for each synonym in synonym table
        cy.get('[data-cy="navDrawerSynonyms"]').click()
        
        cy.log('Line 421')
        cy.get('tbody')
            .find('tr')
            .first()
            .click({force:true})
        
        // cy.get('[href="/trainingsdaten/synonym/1/example/"]')
        //     .click()
        cy.get('.v-slide-group__wrapper')
            .contains('Examples')
            .click()

        // cy.get('[data-cy="synonym-example-create"]')
        //     .click()

        // Select Entire Synonym Table
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
            .click({force:true})

        cy.get('tbody').find('tr').then(function($trCount) {
            cy.log('Line 423')
            const exmNumber = $trCount.length

            cy.get('[data-cy="navDrawerSynonyms"]').click()

            cy.get('tbody')
                .find('tr')
                .first()
                .find('td:nth-child(2)')
                .should('have.text', ' '+String(exmNumber)+' ')
        })

        // 4. Leave site via menu or breadcrump, data must not be saved

        // 4.1 Synonym Name
        cy.get('[data-cy="navDrawerSynonyms"]').click()

        cy.get('[data-cy="synonym-create"]')
            .click({force:true})

        cy.get('[data-cy="synonym-name"]')
            .click({force:true})
            .type('someName')

        cy.get('[data-cy="navDrawerSynonyms"]').click()

        // Select Entire Synonym Table
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
            .click({force:true})

        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(1)')
            .should('not.have.text', 'someName')

        // 4.1 Synonym Example Name
        cy.get('[data-cy="navDrawerSynonyms"]').click()
        cy.get('tbody')
            .find('tr')
            .first()
            .click({force:true})
        
        // cy.get('[href="/trainingsdaten/synonym/1/example/"]')
        //     .click()
        cy.get('.v-slide-group__wrapper')
            .contains('Examples')
            .click()

        cy.get('[data-cy="synonym-example-create"]')
            .click()

        cy.get('[class="v-text-field__slot"]')
            .contains('Text')
            .click({force:true})
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
export const onSynonymAnlegen = new synonyms_anlegen()