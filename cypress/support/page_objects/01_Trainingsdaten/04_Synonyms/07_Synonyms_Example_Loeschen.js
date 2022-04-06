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

export class synonyms_loeschen {

    synonymLoeschen() {

        /* Synonyms Loeschen Testing */

        cy.Trainingsdaten('Trainingsdaten', '[data-cy="navDrawerSynonyms"]')

        // Assert URL after clicking Synonym
        cy.url().should("eq", `${Cypress.config().baseUrl}/trainingsdaten/synonym/`);

        //C. Synonym Loeschen
        // 4.1. Synonym Table
        cy.log('Line 26')
        var noRow
        // Selecting Entire Table
        cy.selectEntireTbl()

        //cy.get('.v-data-table__wrapper > table:nth-child(1) > tbody:nth-child(3)')
        cy.get('tbody')
            .find('tr')
            .then(function($tbLength) {
                noRow = $tbLength.length
            }) 
                
        //cy.get('.v-data-table__wrapper > table:nth-child(1) > tbody:nth-child(3)')
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
        
        // 4.2. Synonym Example Name
        // Save number of row
        cy.log('Line 83')

        // Selecting Entire Table
        // cy.get('[class="v-select__slot"]')
        //     .click()
        //     .get('[class="v-list-item__content"]')
        //     .contains('Alle')
        //     .click({force:true})

        //cy.get('.v-data-table__wrapper > table:nth-child(1) > tbody:nth-child(3)')
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(2)')
            .then(($testFunc) => {

                const vall = $testFunc.text()
                var sp_vall = vall.split(" ")
                var max_val = 0
                var num

                for (num=0; num < sp_vall.length; num++){
                    if(sp_vall[num] > max_val) {
                        max_val = sp_vall[num]
                    }
                }

                // Enter To a Synonym Row which contain more than one Example
                //cy.get('.v-data-table__wrapper > table:nth-child(1) > tbody:nth-child(3)')
                cy.get('tbody')
                    .find('tr')
                    .find('td:nth-child(2)')
                    .contains(max_val)
                    .click()
            })
                
        // cy.get('[href="/trainingsdaten/synonym/1/example/"]')
        //     .click()
        // Clicking Example Tab
        cy.get('.v-slide-group__wrapper')
            .contains('Examples')
            .click()

        // Select Entire Table
        cy.selectEntireTbl()
            
        //cy.get('.v-data-table__wrapper > table:nth-child(1) > tbody:nth-child(3)')
        cy.get('tbody')
            .find('tr')
            .then(function($tableLength) {
                noRow = $tableLength.length
                cy.log(noRow)
            })
        
        // delete an item from table
        cy.log('Line 133')
        cy.wait(300)
        cy.get('tbody')
            .find('tr')
            .first()
            .find('td:nth-child(1)')
            .then(function($synExmName2) {
                cy.log($synExmName2.text())

                const tdExValue = $synExmName2.text()

                cy.get('[data-cy="element-delete-button"]')
                    .last()
                    .click()

                // Confirm Delete message
                cy.get('[class="v-card v-sheet theme--light"]')
                    .find('.v-card__actions')
                    .find('button.v-btn:nth-child(3)')
                    .click()
                    .wait(500)

                // updated table lenght
                noRow = noRow - 1 

                cy.get('[data-cy="synonym-example-table-search"]')
                    .click()
                    .type(tdExValue)

                cy.get('tbody')
                    .find('tr')
                    .should('not.have.text', tdExValue)

                cy.get('[data-cy="synonym-example-table-search"]')
                    .clear()
                
                // select entire table
                //cy.selectEntireTbl()

                // cy.get('tbody')
                //     .find('tr')
                //     .should('have.length', noRow)
                    // .then(function($exmTabLen) {
                    //     cy.log($exmTabLen.length)
                    // })
            })

            cy.wait(300)
                cy.get('tbody').find('tr').then(function($intentExCount2) {
                    if($intentExCount2.find('td:nth-child(1)').length > 1) {
                        cy.wrap($intentExCount2.find('td:nth-child(1)'))
                            .should('have.length', noRow)
                    }
                })
    }
}

// Exportint class frontEnd to End2End to test
export const onSynonymLoeschen = new synonyms_loeschen()