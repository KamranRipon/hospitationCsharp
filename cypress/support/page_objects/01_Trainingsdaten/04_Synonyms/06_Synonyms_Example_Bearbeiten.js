//const t = Math.floor(Math.random() * 500);
const f = Math.floor(Math.random() * 1000);
const b = Math.floor(Math.random() * 1500);
const l = Math.floor(Math.random() * 2000);
//const c = Math.floor(Math.random() * 2500);
const a = Math.floor(Math.random() * 3000);
//const x = Math.floor(Math.random() * 3500);
const newVal = Math.floor(Math.random() * 5500);

//const addValue = 'DummyValue'
//const addValue_2 = 'DummyValue'
const addExample = 'testExample'

export class synonyms_Exmbearbeiten {

    synonymExmBearbeiten() {

        /* F. Synonyms Bearbeiten Testing */

        cy.Trainingsdaten('Trainingsdaten', '[data-cy="navDrawerSynonyms"]')

        // Assert URL after clicking Synonym
        cy.url().should("eq", `${Cypress.config().baseUrl}/trainingsdaten/synonym/`);
        
        // 1. Edit Name should not be empty, error message should contain "Name"
        
        // calculate maxi examples or rules on an intent
        var max_val=0
        cy.get('tbody')
            .find('td:nth-child(2)')
            .then(($testFunc2) => {
                const vall2 = $testFunc2.text()
                const sp_vall2 = vall2.split(' ')                                            
                var num2
                for (num2=0; num2 < sp_vall2.length; num2++){                                                                           
                    if(Number(sp_vall2[num2]) > max_val) {
                        max_val = sp_vall2[num2]
                    }
                }
            })
          
        // Enter to first row to intent table
        cy.wait(300)
        cy.get('tbody')
            .then((maxVal) => {
                cy.get('tbody')
                    .find('td:nth-child(2)')
                    .contains(max_val)
                    .click()
            })

        // Save intent Name for letar Assertion
        var inExName
        cy.get('[data-cy="synonym-name"]')
                .invoke('val').as('name')
                    
        cy.get('@name').then((name) => {
            inExName = name
        })

        // add a Name to synonym table
        // cy.get('[data-cy="navDrawerSynonyms"]').click()
        // cy.get('[data-cy="synonym-create"]').click()
        // cy.get('[data-cy="synonym-name"]')
        //     .click()
        //     .type(addValue+String(x))

        // cy.get('[data-cy="create-button"]').click()

        // // remove success message
        // cy.successRemove()
       
        // const value1   = ['', addValue+String(x)]
        
        // cy.wrap(value1).each((index) => {
        //     cy.log('Line 44')
        //     cy.wait(400)  // Mast have .wait() here
        //     cy.get('tbody')
        //         .find('tr')
        //         .first()
        //         .click({force:true})

        //     // clear input field
        //     cy.get('[data-cy="synonym-name"]')
        //         //.click()
        //         .clear()

        //     if (index == '') {
        //         cy.log('If Statement is True')

        //         //1.1.1 Warning message
        //         cy.get('[class="v-messages__wrapper"]')
        //             .should('have.text','Der Name muss gesetzt sein.')

        //         cy.get('[data-cy="navDrawerSynonyms"]')
        //             .contains('Synonyms')
        //             .click()

        //         //1.1.2 Warning Notification
        //         cy.get('[data-cy="errorMessageTitle"]')
        //             .should('have.text',' Das Synonym konnte nicht gespeichert werden. ')

        //         // after assert close warning message
        //         cy.get('[class="v-icon notranslate theme--dark"]').eq(0)
        //             .click()

        //         // clicking "Abbrechen" buttton. Slected Name should remain same.
        //         cy.get('[data-cy="abort-button"]')
        //             .click()
        //     }

        //     else {

        //         cy.log('If Statement FAlse')
        //         cy.log('Line'+String(602))
        //         cy.log('index'+String(index))

        //         cy.get('[data-cy="synonym-name"]')
        //             .click()
        //             .type(index)

        //         cy.get('[class="v-breadcrumbs__item"]')
        //             .contains('Synonyms')
        //             .click()
                
        //         cy.log('Line 92')

        //         cy.get('[data-cy="errorMessageTitle"]')
        //             .should('have.text',' Das Synonym konnte nicht gespeichert werden. ')
                
        //         // clicking "Abbrechen" buttton. Slected Name should remain same.
        //         // cy.get('[class="alert error white--text"]').then(function($errorMsg) {
        //         //     if($errorMsg.find('[class="mx-4 mt-1 mb-3"]')) {
        //         //         cy.log('if Statement True')
        //         //         cy.get('[data-cy="abort-button"]')
        //         //             .click({force:true})
        //         //     }
        //         //     else {
        //         //         cy.log('I Statment False')
        //         //     }
        //         // })

        //         cy.get('[data-cy="abort-button"]')
        //             .click({force:true})
        //     }
            
        //     // Assert Saved value
        //     cy.log('Line 114')
        //     cy.wait(400)
        //     cy.get('tbody')
        //         .find('tr')
        //         .first()
        //         .find('td:nth-child(1)')
        //         .then(function($synName4) {

        //             cy.log($synName4.text())
        //             cy.log(addValue+String(t))
                
        //             //cy.wrap($synName4).should('have.text', addValue+String(t))
        //             cy.wrap($synName4).should('have.text', $synName4.text())
        //         })
        // })

        // // Edit Synonym Name and Anlegen Valid Name
        // cy.log('Edit Synonym Name and Anlegen Valid Name')

        // cy.wait(400)
        // cy.get('tbody')
        //     .find('tr')
        //     .first()
        //     .click({force:true})

        // // clear input field
        // cy.get('[data-cy="synonym-name"]')
        //     .click()
        //     .clear()
        //     .type(addValue+String(b))

        // cy.get('[data-cy="navDrawerSynonyms"]')
        //     .click()

        // // Closing saved Notification
        // // cy.get('[class="v-icon notranslate theme--dark"]').eq(1)
        // //     .click()

        // // cy.get('[data-cy="successMessageTitle"]')
        // //     .should('have.text', ' Das Synonym'+' "'+addValue+String(b)+'" '+ 'wurde erfolgreich gespeichert ')


        
        // // Closing saved Notification
        // // cy.get('[class="v-icon notranslate theme--dark"]').eq(1)
        // //     .click()
        
        // // Assert value Table
        // cy.log('Line 162')

        // cy.wait(400)
        // cy.get('tbody')
        //     .find('tr')
        //     .first()
        //     .find('td:nth-child(1)')
        //     .then(function($synName4) {

        //         cy.log($synName4.text())
        //         cy.wrap($synName4).should('have.text', addValue+String(b))
        //     })

        // enter to synonym-example
        cy.get('[role="tab"]')
            .contains('Examples')
            .click()

        // 1. Edit Name should not be empty, error message should contain "Name"

        cy.log('Line 215')
        cy.wait(400)
        cy.get('tbody')
            .find('tr')
            .last()
            .click({force:true})
        
        // cy.wait(300)
        // cy.get('tbody')
        //     .find('tr')
        //     .first()
        //     .click({force:true})

        cy.get('[data-cy="synonym-example-text"]')
            //.click()
            .clear()

        // checking for valid name
        //cy.get('[class="v-messages__wrapper"]')
        cy.get('[role="alert"]').eq(0)
            .should('have.text','Der Text muss gesetzt sein')

        //Click Breadcrumb to leave the page
        cy.get('[class="v-breadcrumbs__item"]')
            .contains('Synonym Example')
            .click()

        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text',' Das Synonym konnte nicht gespeichert werden. ')

        // Close Error message
        cy.errorRemove()

        // add a valid name
        cy.get('[data-cy="synonym-example-text"]')
            // .contains('Text')
            // .click({force:true})
            .type(addExample+String(l*f))

        //Click Breadcrumb to leave the page
        cy.get('[class="v-breadcrumbs__item"]')
            .contains('Synonym Example')
            .click()

        cy.get('[data-cy="successMessageTitle"]')
            .then(function($successMsg) {
                cy.wrap($successMsg).should('have.text', ' Das Synonym'+' "'+inExName+'" '+ 'wurde erfolgreich gespeichert ')
            })
        
        // success remove
        cy.successRemove()

        // Closing saved Notification
        // cy.get('[class="v-icon notranslate theme--dark"]').eq(1)
        //     .click()
        // cy.get('[href="/trainingsdaten/synonym/1/example/"]').eq(0)
        //     .click()
        // Assert value Table
        cy.log('Line 234')

        cy.get('[data-cy="synonym-example-table-search"]').type(addExample+String(l*f))

        cy.wait(400)
        cy.get('tbody')
            .find('tr')
            .first()
            .find('td:nth-child(1)')
            .then(function($synName5) {
                cy.wrap($synName5).should('have.text', addExample+String(l*f))
            })
        
            cy.get('[data-cy="synonym-example-table-search"]').clear()

        // // Test duplicate Name
        // cy.log('// Test duplicate Name')
        // // Synonym Name
        // cy.log('Line 250')

        // // 2. Check for duplicate name
        // // 2.1 Synonym Name
        // // 2.2 Synonym Example Name
        // cy.log('2. Check for duplicate name')
        // cy.get('[data-cy="navDrawerSynonyms"]').click()
        
        // cy.log('Line 258')
        // cy.wait(400)
        // cy.get('tbod')
        //     .find('tr')
        //     .first()
        //     .click()

        // cy.get('[data-cy="synonym-name"]')
        //     .clear()
        //     .click()
        //     .type(addValue+String(x))

        // cy.get('[data-cy="navDrawerSynonyms"]')
        //     .click()

        // cy.get('[data-cy="errorMessageTitle"]')
        //     .should('have.text', ' Das Synonym konnte nicht gespeichert werden. ')

        // cy.log('Line 792')

        // cy.wait(350)
        // cy.get('[data-cy="synonym-name"]')
        //     .clear({force:true})
        //     .wait(500)
        //     .click()
        //     .type(addValue+String(t*b))

        // cy.get('[data-cy="navDrawerSynonyms"]').click()

        // cy.wait(400)

        // // cy.get('[data-cy="successMessageTitle"]')
        // //     .should('have.text', ' Das Synonym'+' "'+addValue+String(t*b)+'" '+ 'wurde erfolgreich gespeichert ')
        
        // //Assert value Table
        // cy.log('Line 808')
        // cy.get('tbody')
        //     .find('tr')
        //     .first()
        //     .find('td:nth-child(1)')
        //     .then(function($synName6) {

        //         cy.log($synName6.text())
        //         cy.wrap($synName6).should('have.text', addValue+String(t*b))
        //     })    

        //2. Check for duplicate name
        
        // select entire table
        cy.selectEntireTbl()

        //cy.get('[data-cy="navDrawerSynonym"]').click()
        cy.log('Log 346')
        cy.wait(400)
        cy.get('tbody')
            .find('tr')
            .last()
            .click({force:true})

        // cy.wait(500)
        // cy.get('[href="/trainingsdaten/synonym/1/example/"]')
        //     .click()

        // cy.log('Line 362')
        // cy.get('tbody')
        //     .find('tr')
        //     .first()
        //     .click({force:true})

        // cy.get('[data-cy="synonym-example-create"]')
        //     .click()

        cy.get('[data-cy="synonym-example-text"]')
            .clear()
            .type(addExample+String(l*f))

        // cy.get('[class="v-text-field__slot"]')
        //     .contains('Text')
        //     .click({force:true})
        //     // .type(addExample+String(a))
        //     .type(addExample+String(2165))
       
        // cy.get('[class="v-btn__conten"]')
        //     .contains('Anlegen')
        //     .click()

        cy.get('[class="v-breadcrumbs__item"]')
            .contains(' Synonym Example ')
            .click()

        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text', ' Das Synonym konnte nicht gespeichert werden. ')
        
        cy.errorRemove()

        cy.get('[data-cy="abort-button"]')
            .click()

        // // Assert Value in Synonym Table
        // cy.log('Line 828')
        // cy.get('[data-cy="synonym-example-table-search"]')
        //     .click({force:true})
        //     .type(addExample+String(a))
    
        // cy.get('tbody').find('tr').then(function($NrRow3) {
        //         if($NrRow3.find('td:nth-child(1)').length <= 1) {
        //             cy.wrap($NrRow3.find('td:nth-child(1)'))
        //                 .should('not.have.text', addExample+String(l))
        //         }
        //     })

        // cy.get('[data-cy="synonym-example-table-search"]')
        //     .clear()
        cy.log('846')

        // slect entire table
        cy.selectEntireTbl()
        // 3. Check for successfully saved values
        cy.get('tbody')
            .find('tr')
            .last()
            .click({force:true})

        cy.get('[data-cy="synonym-example-text"]')
            .clear()

        cy.get('[class="v-text-field__slot"]')
            .contains('Text')
            .click({force:true})
            .type(addExample+String(newVal))

        cy.get('[class="v-breadcrumbs__item"]')
            .contains(' Synonym Example ')
            .click()
        //3.1 Assert Success Notification
        cy.get('[data-cy="successMessageTitle"]')
            .then(function($successMsg) {
                cy.wrap($successMsg).should('have.text', ' Das Synonym'+' "'+inExName+'" '+ 'wurde erfolgreich gespeichert ')
            })

        // remove success message
        cy.successRemove()

        cy.log('Line 437')
        cy.get('[data-cy="synonym-example-table-search"]')
            .type(addExample+String(newVal))
    
        cy.get('tbody').find('tr').then(function($NrRow4) {
                if($NrRow4.find('td:nth-child(1)').length <= 1) {
                    cy.wrap($NrRow4.find('td:nth-child(1)'))
                        .should('contain', addExample+String(newVal))
                }
            })

        cy.get('[data-cy="synonym-example-table-search"]')
            .clear()

        // // 3.2.3 Assert example number for each synonym in synonym table
        // cy.get('[data-cy="navDrawerSynonyms"]').click()

        // cy.get('tbody')
        //     .find('tr')
        //     .first()
        //     .click({force:true})
        
        // cy.get('[href="/trainingsdaten/synonym/1/example/"]')
        //     .click()

        // // cy.get('[data-cy="synonym-example-create"]')
        // //     .click()

        // // Select Entire Synonym Table
        // cy.get('[class="v-select__slot"]').click()
        // cy.get('[class="v-list-item__content"]')
        //     .contains('Alle')
        //     .click({force:true})

        // cy.get('tbody').find('tr').then(function($trCount) {
        //     cy.log('Line 938')
        //     const exmNumber1 = $trCount.length
        //     cy.log(exmNumber1)

        //     cy.get('[data-cy="navDrawerSynonyms"]').click()

        //     cy.get('tbody')
        //         .find('tr')
        //         .first()
        //         .find('td:nth-child(2)')
        //         .should('have.text', ' '+String(exmNumber1)+' ')
        // })

        // 4. Leave site via menu or breadcrump, data must not be saved

        // // 4.1 Synonym Name
        // // 4.1.1 Leave Site by breadcrump
        // cy.log('4. Leave site via menu or breadcrump, data must not be saved')
        // cy.log('4.1 Synonym Name')
        // cy.get('[data-cy="navDrawerSynonyms"]')
        //     .click()

        // cy.get('tbody')
        //     .find('tr')
        //     .first()
        //     .click({force:true})

        // cy.get('[data-cy="synonym-name"]')
        //     .clear()
        //     .click({force:true})
        //     .type('someName')

        // cy.get('[data-cy="navDrawerSynonyms"]')
        //     .click()

        // // Select Entire Synonym Table
        // cy.get('[class="v-select__slot"]').click()
        // cy.get('[class="v-list-item__content"]')
        //     .contains('Alle')
        //     .click({force:true})

        // cy.get('[data-cy="synonym-table-search"]')
        //     .click()
        //     .type('someName')

        // cy.get('tbody')
        //     .find('tr')
        //     .last()
        //     .find('td:nth-child(1)')
        //     .should('have.text', 'someName')

        // cy.get('[data-cy="synonym-table-search"]')
        //     .clear()

        // 4.1 Synonym Example Name
        // cy.get('[data-cy="navDrawerSynonyms"]').click()
        // cy.get('tbody')
        //     .find('tr')
        //     .first()
        //     .click({force:true})
        
        // cy.get('[href="/trainingsdaten/synonym/1/example/"]')
        //     .click()

        cy.get('tbody')
            .find('tr')
            .first()
            .click({force:true})

        cy.get('[data-cy="synonym-example-text"]')
            .clear()
            .type('addExample')
        
        cy.get('[class="v-breadcrumbs__item"]')
            .contains(' Synonym Example ')
            .click()

        cy.get('[data-cy="synonym-example-table-search"]')
            .click()
            .type('addExample')

        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(1)')
            .should('have.text', 'addExample')

        cy.get('[data-cy="synonym-example-table-search"]')
            .clear()

        // 4.2 Synonym Example Name
        // 4.1.1 Leave Site by Abbrechen
        // cy.log('4.2 Synonym Example Name')
        // cy.get('[data-cy="navDrawerSynonyms"]').click()

        // cy.get('tbody')
        //     .find('tr')
        //     .first()
        //     .click({force:true})

        // cy.get('[data-cy="synonym-name"]')
        //     .clear()
        //     .click({force:true})
        //     .type('someName2')
        // // Leave Site by Abbrechen Button
        // cy.get('[data-cy="abort-button"]')
        //     .click()

        // // Select Entire Synonym Example Table
        // cy.get('[class="v-select__slot"]').click()
        // cy.get('[class="v-list-item__content"]')
        //     .contains('Alle')
        //     .click({force:true})

        // cy.get('[data-cy="synonym-table-search"]')
        //     .click()
        //     .type('someName2')

        // cy.get('tbody')
        //     .find('tr')
        //     .last()
        //     .find('td:nth-child(1)')
        //     .should('not.have.text', 'someName2')

        // cy.get('[data-cy="synonym-table-search"]')
        //     .clear()

        // 4.2 Synonym Example Name
        cy.log('Line 606')
        cy.log('4.2 Synonym Example Name')
        //cy.get('[data-cy="navDrawerSynonyms"]').click()
        // cy.get('tbody')
        //     .find('tr')
        //     .first()
        //     .click({force:true})
        
        // cy.get('[href="/trainingsdaten/synonym/1/example/"]')
        //     .click()

        cy.get('tbody')
            .find('tr')
            .first()
            .click({force:true})

        cy.get('[data-cy="synonym-example-text"]')
            .clear()
            .type('addExample2')

        // Leave Site by Abbrechen Button
        cy.get('[data-cy="abort-button"]')
            .click()
        
        cy.get('[data-cy="synonym-example-table-search"]')
            .click()
            .type('addExample2')               

        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(1)')
            .should('not.have.text', 'addExample2')

        cy.get('[data-cy="synonym-example-table-search"]')
            .clear()

        // select entire table
        cy.selectEntireTbl()

        // 3.3 Assert example number for each synonym in synonym table
        var noRow
        cy.get('tbody')
            .find('tr')
            .then(function($noOfExmRows) {
                noRow = $noOfExmRows.length
            })
        // return to Synonyms
        cy.get('[data-cy="navDrawerSynonyms"]').click()

        cy.get('[data-cy="synonym-table-search"]')
            .then(function($noOfExm) {
                cy.wrap($noOfExm).type(inExName)
            })

        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(2)')
            .then(function($rowCount) {
                cy.wrap($rowCount).should('contain', noRow)
            })
    }
}
// Exportint class frontEnd to End2End to test
export const onSynonymExmBearbeiten = new synonyms_Exmbearbeiten()