export class response_text_loeschen {

    responseTexteLoeschen() {

        /* Enter to Trainingsdaten */
        cy.Trainingsdaten('[data-cy="navDrawerResponses"]')

        // Assert URL after clicking Rules
        cy.url().should("eq", "http://10.61.135.11:8081/trainingsdaten/response/");
        cy.wait(500)

        // Selecting Entire Table
        cy.selectEntireTbl()
        
        var max_val2 = 0
        // Enter to Response table Row
        cy.get('.v-data-table__wrapper > table:nth-child(1) > tbody:nth-child(3)')
            .find('td:nth-child(2)')
            .then(($testFunc2) => {
                const vall2 = $testFunc2.text()
                var sp_vall2 = vall2.split(" ")
                var num2
                for (num2=0; num2 < sp_vall2.length; num2++){
                    
                    if(sp_vall2[num2] > max_val2) {
                        max_val2 = sp_vall2[num2]
                        cy.log(max_val2)
                    }
                }

                cy.get('tbody')
                    .find('tr')
                    .find('td:nth-child(2)')
                    .contains(max_val2)
                    .click({force:true})
            })

        // Save Response Name for letar Assertion
        var resName3
        cy.get('[class="v-text-field__slot"]')
            .find('[data-cy="response-name"]')
                .invoke('val')
                    .as('name3')
                    
        cy.get('@name3').then((name3) => {
          cy.log(name3) //prints name
          resName3 = name3
          cy.log(resName3)
        })

        // Entering to Texte Tab
        cy.get('[role="tab"]')
            .contains('Texte')
            .click()
            .wait(300)

        // Selecting Entire Table
        cy.selectEntireTbl()

        // Get the size of Texte Table ( Nr. of Row)
        // Save Intent Name for letar Assertion
        var nrRow, newNrRow                
        cy.get('tbody')
            .find('tr')
            .then(function($tRowLength) {
                nrRow = $tRowLength.length
                cy.log(nrRow)
            })
        // delete a row 
        cy.get('tbody')
            .find('tr')
            .last()
            .find('[data-cy="element-delete-button"]')
            .click({force:true})
        
        // Confirm delete
        cy.get('[type="button"]')
            .contains('Löschen')
            .click()
        
        // Assert Table length
        cy.get('tbody')
            .find('tr')
            .then(function($NewtRowLength) {
                cy.log(nrRow)
                newNrRow = nrRow -1 
                cy.wrap($NewtRowLength).should('have.length', newNrRow)
            })

        // back to Response 
        cy.get('[data-cy="navDrawerResponses"]').click()

        //select row from response table with content max text number
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(2)')
            .then(function($texteNumber) {                
                const textValue = $texteNumber.text()
                cy.log(textValue)
                cy.log(newNrRow)

                const newMaxValue = max_val2 - 1

                cy.wrap($texteNumber).should('contain', newMaxValue)
            })
    }
}
// Exportint class frontEnd to End2End to test
export const onResponsesTextLoeschen = new response_text_loeschen()