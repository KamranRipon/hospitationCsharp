const t = Math.floor(Math.random() * 65000);
const f = Math.floor(Math.random() * 10000);
const b = Math.floor(Math.random() * 15000);
const l = Math.floor(Math.random() * 20000);
//const c = Math.floor(Math.random() * 2500);
const a = Math.floor(Math.random() * 30000);
const x = Math.floor(Math.random() * 35000);

const addValue = 'DummyValue'
//const addValue_2 = 'DummyValue'
const addExample = 'testExample'

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
            //.click()
            .type(addValue+String(x))

        cy.get('[data-cy="create-button"]').click()

        // remove success message
        cy.successRemove()
       
        const value1   = ['', addValue+String(x)]
        
        cy.wrap(value1).each((index) => {
            cy.log('Line 41')
            cy.wait(400)  // Mast have .wait() here
            cy.get('tbody')
                .find('tr')
                .first()
                .click({force:true})

            // clear input field
            cy.get('[data-cy="synonym-name"]')
                //.click()
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
                cy.get('[data-cy="abort-button"]')
                    .click()
            }

            else {

                cy.log('If Statement FAlse')
                cy.log('Line'+String(602))
                cy.log('index'+String(index))

                cy.get('[data-cy="synonym-name"]')
                    .click()
                    .type(index)

                //cy.get('[class="v-breadcrumbs__item"]')
                cy.get('[href="/trainingsdaten/synonym/"]')
                    .contains('Synonyms')
                    .click()
                
                cy.log('Line 92')

                cy.get('[data-cy="errorMessageTitle"]')
                    .should('have.text',' Das Synonym konnte nicht gespeichert werden. ')

                // error remove
                cy.errorRemove()
                
                // clicking "Abbrechen" buttton. Slected Name should remain same.
                // cy.get('[class="alert error white--text"]').then(function($errorMsg) {
                //     if($errorMsg.find('[class="mx-4 mt-1 mb-3"]')) {
                //         cy.log('if Statement True')
                //         cy.get('[data-cy="abort-button"]')
                //             .click({force:true})
                //     }
                //     else {
                //         cy.log('I Statment False')
                //     }
                // })

                cy.get('[data-cy="abort-button"]')
                    .click({force:true})
            }
            
            // Assert Saved value // not sure why I am doing this
            // cy.log('Line 114')
            // cy.wait(400)
            // cy.get('tbody')
            //     .find('tr')
            //     .first()
            //     .find('td:nth-child(1)')
            //     .then(function($synName4) {

            //         cy.log($synName4.text())
            //         cy.log(addValue+String(t))
                
            //         //cy.wrap($synName4).should('have.text', addValue+String(t))
            //         cy.wrap($synName4).should('contain', $synName4.text())
            //     })
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
            //.click()
            .clear()
            .type(addValue+String(b))

        cy.get('[data-cy="navDrawerSynonyms"]').click()

        // 3.1 Assert Notification
        cy.get('[data-cy="successMessageTitle"]')
            .should('have.text', ' Das Synonym'+' "'+addValue+String(b)+'" '+ 'wurde erfolgreich gespeichert ')

        // success remove
        cy.successRemove()

        cy.log('Line 157')
        
        // 3.2 Assert in table
        cy.get('[data-cy="synonym-table-search"]').type(addValue+String(b))

        cy.wait(300)
        cy.get('tbody')
            .find('tr')
            .first()
            .find('td:nth-child(1)')
            .then(function($synName4) {
                cy.wrap($synName4).should('contain', addValue+String(b))
            })

        // clear search
        cy.get('[data-cy="synonym-table-search"]').clear()

        //1.2 Synonyms Example Name

        //1.1.1 Warning message
        //1.1.2 Warning Notification
        // cy.log('Line 179')
        // cy.wait(400)
        // cy.get('tbod')
        //     .find('tr')
        //     .first()
        //     .click({force:true})
        
        // cy.get('[href="/trainingsdaten/synonym/1/example/"]')
        //     .click()
        
        // cy.wait(300)
        // cy.get('tbody')
        //     .find('tr')
        //     .first()
        //     .click({force:true})

        // cy.get('[data-cy="synonym-example-text"]')
        //     .click()
        //     .clear()

        // // checking for valid name
        // cy.get('[class="v-messages__wrapper"]')
        //     .should('have.text','Der Text muss gesetzt sein')

        // //Click Breadcrumb to leave the page
        // cy.get('[class="v-breadcrumbs__item"]')
        //     .contains('Synonym Example')
        //     .click()

        // cy.get('[data-cy="errorMessageTitle"]')
        //     .should('have.text',' Das Synonym konnte nicht gespeichert werden. ')

        // // Close Error message
        // cy.get('[class="v-icon notranslate theme--dark"]').eq(0)
        //     .click()

        // cy.get('[class="v-text-field__slot"]')
        //     .contains('Text')
        //     .click({force:true})
        //     .type(addExample+String(l*f))

        // //Click Breadcrumb to leave the page
        // cy.get('[class="v-breadcrumbs__item"]')
        //     .contains('Synonym Example')
        //     .click()

        // cy.get('[data-cy="successMessageTitle"]')
        //     .should('have.text', ' Das Synonym'+' "'+addValue+String(b)+'" '+ 'wurde erfolgreich gespeichert ')
        
        // // Closing saved Notification
        // // cy.get('[class="v-icon notranslate theme--dark"]').eq(1)
        // //     .click()
        // // cy.get('[href="/trainingsdaten/synonym/1/example/"]').eq(0)
        // //     .click()
        // // Assert value Table
        // cy.log('Line 234')

        // cy.wait(400)
        // cy.get('tbody')
        //     .find('tr')
        //     .first()
        //     .find('td:nth-child(1)')
        //     .then(function($synName5) {

        //         cy.log($synName5.text())
        //         cy.wrap($synName5).should('have.text', addExample+String(l*f))
        //     })

        // 2. Check for duplicate name

        //2.1 Assert Notification
        cy.log('Line 250')
        
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
            .type(addValue+String(x))

        cy.get('[data-cy="navDrawerSynonyms"]')
            .click()

        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text', ' Das Synonym konnte nicht gespeichert werden. ')

        cy.errorRemove()

        cy.log('Line 273')

        cy.wait(350)
        cy.get('[data-cy="synonym-name"]')
            .clear({force:true})
            .type(addValue+String(t*b))

        cy.get('[data-cy="navDrawerSynonyms"]').click()
        cy.successRemove()

        cy.wait(300)

        //Assert unique name in Synonyms Table
        cy.get('[data-cy="synonym-table-search"]').type(addValue+String(t*b))

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
                        .should('contain', addValue+String(t*b)) 
                }
            })
        
        cy.get('[data-cy="synonym-table-search"]').clear()

        // // Check Unique Name for Synonym Example
        // cy.get('[data-cy="navDrawerSynonyms"]').click()
        // cy.log('Log 787')
        // cy.log('Unique Name for Synonym Example')
        // cy.wait(400)
        // cy.get('tbod')
        //     .find('tr')
        //     .first()
        //     .click({force:true})
        // cy.wait(500)
        // cy.get('[href="/trainingsdaten/synonym/1/example/"]')
        //     .click()

        // cy.log('Line 797')
        // cy.get('tbody')
        //     .find('tr')
        //     .first()
        //     .click({force:true})

        // // cy.get('[data-cy="synonym-example-create"]')
        // //     .click()

        // cy.get('[data-cy="synonym-example-text"]')
        //     .clear()

        // cy.get('[class="v-text-field__slot"]')
        //     .contains('Text')
        //     .click({force:true})
        //     // .type(addExample+String(a))
        //     .type(addExample+String(2165))
       
        // // cy.get('[class="v-btn__conten"]')
        // //     .contains('Anlegen')
        // //     .click()

        // cy.get('[class="v-breadcrumbs__item"]')
        //     .contains(' Synonym Example ')
        //     .click()

        // cy.get('[data-cy="errorMessageTitle"]')
        //     .should('have.text', ' Das Synonym konnte nicht gespeichert werden. ')
        
        // cy.get('[class="v-icon notranslate theme--dark"]').eq(0).click({force:true})

        // // cy.get('[data-cy="abort-button"]')
        // //     .click()

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
        // cy.log('846')
        // cy.get('tbody')
        //     .find('tr')
        //     .first()
        //     .click({force:true})

        // cy.get('[data-cy="synonym-example-text"]')
        //     .clear()

        // cy.get('[class="v-text-field__slot"]')
        //     .contains('Text')
        //     .click({force:true})
        //     .type(addExample+String(l*b))

        // cy.get('[class="v-breadcrumbs__item"]')
        //     .contains(' Synonym Example ')
        //     .click()

        // // cy.get('[data-cy="successMessageTitle"]')
        // //     .should('have.text', ' Das Synonym'+' "'+addValue+String(t)+'" '+ 'wurde erfolgreich gespeichert ')

        // cy.log('Line 867')
        // cy.get('[data-cy="synonym-example-table-search"]')
        //     .click({force:true})
        //     .type(addExample+String(l*b))
    
        // cy.get('tbody').find('tr').then(function($NrRow4) {
        //         if($NrRow4.find('td:nth-child(1)').length <= 1) {
        //             cy.wrap($NrRow4.find('td:nth-child(1)'))
        //                 .should('have.text', addExample+String(l*b))
        //         }
        //     })

        // cy.get('[data-cy="synonym-example-table-search"]')
        //     .clear()

        // // 3.2 Assert in table
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

        // 4. Leave site via menu or breadcrump, data must saved

        // 4.1.1 Leave Site by breadcrump
        cy.get('[data-cy="navDrawerSynonyms"]').click()
        
        cy.wait(300)
        cy.get('tbody')
            .find('tr')
            .first()
            .click({force:true})

        cy.get('[data-cy="synonym-name"]')
            //.clear()
            //.click({force:true})
            .type('someName')

        cy.get('[data-cy="navDrawerSynonyms"]').click()

        cy.get('[data-cy="synonym-table-search"]')
            //.click()
            .type('someName')

        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(1)')
            .should('contain', 'someName')

        cy.get('[data-cy="synonym-table-search"]').clear()

        // // 4.1 Synonym Example Name
        // cy.get('[data-cy="navDrawerSynonyms"]').click()
        // cy.get('tbody')
        //     .find('tr')
        //     .first()
        //     .click({force:true})
        
        // cy.get('[href="/trainingsdaten/synonym/1/example/"]')
        //     .click()

        // cy.get('tbody')
        //     .find('tr')
        //     .first()
        //     .click({force:true})

        // cy.get('[data-cy="synonym-example-text"]')
        //     .clear()
        //     .type('addExample')
        
        // cy.get('[class="v-breadcrumbs__item"]')
        //     .contains(' Synonym Example ')
        //     .click()

        // cy.get('[data-cy="synonym-example-table-search"]')
        //     .click()
        //     .type('addExample')

        // cy.get('tbody')
        //     .find('tr')
        //     .last()
        //     .find('td:nth-child(1)')
        //     .should('have.text', 'addExample')

        // cy.get('[data-cy="synonym-example-table-search"]')
        //     .clear()

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
            //.click()
            .type('someName2')

        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(1)')
            .should('not.have.text', 'someName2')

        cy.get('[data-cy="synonym-table-search"]')
            .clear()

        // // 4.2 Synonym Example Name
        // cy.log('Line 1031')
        // cy.log('4.2 Synonym Example Name')
        // cy.get('[data-cy="navDrawerSynonyms"]').click()
        // cy.get('tbody')
        //     .find('tr')
        //     .first()
        //     .click({force:true})
        
        // cy.get('[href="/trainingsdaten/synonym/1/example/"]')
        //     .click()

        // cy.get('tbody')
        //     .find('tr')
        //     .first()
        //     .click({force:true})

        // cy.get('[data-cy="synonym-example-text"]')
        //     .clear()
        //     .type('addExample2')

        // // Leave Site by Abbrechen Button
        // cy.get('[data-cy="abort-button"]')
        //     .click()
        
        // cy.get('[data-cy="synonym-example-table-search"]')
        //     .click()
        //     .type('addExample2')               

        // cy.get('tbody')
        //     .find('tr')
        //     .last()
        //     .find('td:nth-child(1)')
        //     .should('not.have.text', 'addExample2')

        // cy.get('[data-cy="synonym-example-table-search"]')
        //     .clear()
        
        // // Back to Synonym Page
        // cy.get('[data-cy="navDrawerSynonyms"]').click()
    }
}
// Exportint class frontEnd to End2End to test
export const onSynonymBearbeiten = new synonyms_bearbeiten()