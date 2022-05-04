export class button_loeschen {
    
    buttonLoeschen() {
        /* H. Response Button Suchen Testing */
        cy.Trainingsdaten('Trainingsdaten','[data-cy="navDrawerResponses"]')

        //Enter to a row of Response Table which contain highest no. of text
        var max_val2 = 0
        // Enter to Response table Row
        cy.log('Line 35')
        cy.get('.v-data-table__wrapper > table:nth-child(1) > tbody:nth-child(3)')
            .find('td:nth-child(2)')
            .then(($testFunc2) => {
                const vall2 = $testFunc2.text()
                const sp_vall2 = vall2.split(' ')                                                
                var num2
                for (num2=0; num2 < sp_vall2.length; num2++){                                                                           
                    if(Number(sp_vall2[num2]) > max_val2) {
                        max_val2 = sp_vall2[num2]
                        cy.log(max_val2)
                    }
                }
                cy.get('.v-data-table__wrapper > table:nth-child(1) > tbody:nth-child(3)')
                    .find('tr')
                    .find('td:nth-child(2)')
                    .contains(max_val2)
                    .click({force:true})
            })
        // Locate Button Tab and enter to it
        cy.get('[class="v-slide-group__wrapper"]')
            .contains('Buttons')
            .click()
            .wait(300)  

        // Anlegen Some Random response-button-title
        const randonVal = ['DeleteTest', 'DeleteWeather']
        cy.wrap(randonVal).each((index) => {

            // Clicking Response Hinzufuegen
            cy.get('[data-cy="responsebutton-create"]')
                .click()

            cy.get('[data-cy="responsebutton-title"]')
                .click({force:true})
                .type(index)

            // Add an Intent 
            cy.get('[class="v-select__slot"]')
                .contains('Intent')
                .click({force:true})
                .get('[class="v-list v-select-list v-sheet theme--light theme--light"]')
                .find('[role="option"]')
                .last()
                .click()

            cy.get('[data-cy="create-button"]').eq(0)
                .click()
            cy.get('[role="tab"]')
                .contains('Buttons')
                .click()
        })
        cy.wait(500)
                
        const randonValue = ['DeleteTest', 'DeleteWeather']

        cy.wrap(randonValue).each((index) => {
            // delete button
            cy.get('[data-cy="responsebutton-table-search"]')
            .clear()
            .type(index)

            cy.get('[data-cy="element-delete-button"')
                .click()

            cy.get('[data-cy="dialog-accept"]').click()

            // clear response-table-search
            cy.get('[data-cy="responsebutton-table-search"]')
                .clear()
        })

        // assert value in the table
        const randonValue2 = ['DeleteTest', 'DeleteWeather']
        
        cy.wrap(randonValue2).each((index) => {
            // delete button
            cy.get('[data-cy="responsebutton-table-search"]')
            .clear()
            .type(index)
                
        cy.get('tbody')
            .find('tr')
            .should('contain',"")

            // clear response-table-search
            cy.get('[data-cy="responsebutton-table-search"]')
                .clear()
        })
    }
}

// Exportint class frontEnd to End2End to test
export const onResponsesButtonLoeschen = new button_loeschen()