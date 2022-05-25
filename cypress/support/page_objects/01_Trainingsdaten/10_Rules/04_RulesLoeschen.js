const i = Math.floor(Math.random() * 5000);
const b = Math.floor(Math.random() * 1000);
const r = Math.floor(Math.random() * 1500);
const a = Math.floor(Math.random() * 2000);
const ei = Math.floor(Math.random() * 3000);
const eb = Math.floor(Math.random() * 3500);
const er = Math.floor(Math.random() * 4000);
const ea = Math.floor(Math.random() * 4500);
const x = Math.floor(Math.random() * 3500);

const addValue = 'DummyValue'
const addValue_2 = 'DummyValue'
const addExample = 'testExample'
export class rules_loeschen {

    rulesLoeschen() {

        // Enter to Intents
        cy.Trainingsdaten('Trainingsdaten','[data-cy="navDrawerIntents"]')

        // select entire table
        cy.selectEntireTbl()

        // Enter to intent table Row
        var inName
        cy.get('.v-data-table__wrapper > table:nth-child(1) > tbody:nth-child(3)')
            .find('td:nth-child(4)')
            .then(($testFunc2) => {

                const vall2 = $testFunc2.text()
                var sp_vall2 = vall2.split('')
                var max_val2 = 0
                var num2

                for (num2=0; num2 < sp_vall2.length; num2++){
                    if(sp_vall2[num2] > max_val2) {
                        max_val2 = sp_vall2[num2]
                    }
                }
                cy.get('.v-data-table__wrapper > table:nth-child(1) > tbody:nth-child(3)')
                    .find('tr')
                    .find('td:nth-child(4)')
                    .contains(max_val2)
                    .click({force:true})

                // Save Intent Name for letar Assertion
                cy.get('[class="v-text-field__slot"]')
                    .find('[data-cy="intent-name"]')
                    .invoke('val').as('name')
                
                cy.get('@name').then((name1) => {

                    cy.log(name1) //prints name
                    inName = name1
                    cy.log(inName)
                })
            })

        // Entering to rules tab
        cy.get('[class="v-slide-group__wrapper"]')
            .find('[class="v-tab"]').eq(1)
            .click()

        // Delete Row from Rules Table
        //cy.get('.v-data-table__wrapper > table:nth-child(1) > tbody:nth-child(3)')

        // select Entire Table
        cy.selectEntireTbl()
        
        cy.get('tbody')
            .find('tr')
            .then(function($rulesRowCount) {
                const countValue = $rulesRowCount.length

                cy.get('.v-data-table__wrapper > table:nth-child(1) > tbody:nth-child(3)')
                    .find('tr')
                    .last()
                    .find('td:nth-child(3)')
                    .click()
                    
                cy.get('[class="v-card v-sheet theme--light"]')
                    .find('.v-card__actions')
                    .find('button.v-btn:nth-child(3)')
                    .click()

                let newCountValue = countValue - 1

                cy.get('.v-data-table__wrapper > table:nth-child(1) > tbody:nth-child(3)')
                    .find('tr')
                    .should('have.length', newCountValue)

                cy.get('[data-cy="navDrawerIntents"]').click()

                cy.get('[data-cy="intent-table-search"]').type(inName)
                

                cy.get('.v-data-table__wrapper > table:nth-child(1) > tbody:nth-child(3)')
                    .find('tr')
                    .last()
                    .find('td:nth-child(4)')
                    .should('have.text', ' '+String(newCountValue)+' ')
            })
    }
}

// Export class
export const onRulesLoeschen = new rules_loeschen()