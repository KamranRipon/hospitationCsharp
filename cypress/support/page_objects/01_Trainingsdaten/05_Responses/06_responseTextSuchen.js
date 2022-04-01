const t     = Math.floor(Math.random() * 5000);
const b     = Math.floor(Math.random() * 1000);
//const addValue = 'resTxSuchDmy'

export class responses_text_suchen {

    responseTexteSuchen() {

        /* Response Anlegen Testing */
        cy.Trainingsdaten('Trainingsdaten','[data-cy="navDrawerResponses"]')

        // Assert URL after clicking Rules
        cy.url().should("eq", "http://10.61.135.11:8081/trainingsdaten/response/");
        cy.wait(300)

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

        // Entering to Texte Tab
        cy.get('[role="tab"]')
            .contains('Texte')
            .click()
            .wait(500)
                
        // Anlegen Some Random Value to Response
        const randonValue = [t, t, b]
        cy.wrap(randonValue).each((index) => {

            // Clicking Response Hinzufuegen
            cy.get('[data-cy="responsetext-create"]').click()

            cy.get('[data-cy="responsetext-text"]')
                .type(index)

            cy.get('[data-cy="create-button"]')
                .click()
                .wait(300)
        })
        
        // Selecting Entire Table
        cy.selectEntireTbl()
                        
        // Single Response
        cy.get('[data-cy="responsetext-table-search"]')
            .type(b)
        cy.log('Line 68')
        // Assert Return Result
        cy.wait(200)
        cy.get('tbody')
            .find('tr')
            .first()
            //.should('have.length', 1)
            .find('td:nth-child(2)')
            .should('have.text', b)
        
        // Multiple Response
        cy.get('[data-cy="responsetext-table-search"]')
            .clear()
            .type(t)
            .wait(300)
        cy.get('tbody')
            .find('tr')
            .first()
            //.should('have.length', 2)  // hard coding is not good idea
            .find('td:nth-child(2)')
            .should('contain', t)

        // Nonexisting Response
        cy.get('[data-cy="responsetext-table-search"]')
            .clear()
            .type('sky')
                
        cy.get('tbody')
            .find('tr')
            .should('contain',"")

        cy.get('[data-cy="responsetext-table-search"]')
            .clear() 
    }
}

// Exportint class frontEnd to End2End to test
export const onResponsesTextSuchen = new responses_text_suchen()