const txa   = Math.floor(Math.random() * 4800);
const addValue = 'ResButDmyVal'

export class button_anlegen {

    buttonAnlegen() {

        /* Enter to Trainingsdaten */
        cy.Trainingsdaten('[data-cy="navDrawerResponses"]')

        // Assert URL after clicking Rules
        cy.url().should("eq", "http://10.61.135.11:8081/trainingsdaten/response/");
        cy.wait(500)      

        // 1. Text Name should not be empty, error message should contain "Texte"; /Currently Bug/
        // 1.1 Response Teste Name
        //     1.1.1 Warning message below input field
        //     1.1.2 Error message after unsuccessful saving  /Currently Bug/

        // Selecting Entire Table
        cy.selectEntireTbl()

        //Enter to a row of Response Table which contain height text
        var max_val2 = 0
        // Enter to Response table Row
        cy.get('tbody')
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

                cy.get('tbody')
                    .find('tr')
                    .find('td:nth-child(2)')
                    .contains(max_val2)
                    .click({force:true})
            })
        var resbutName
        // Save Response Name for letar Assertion
        cy.get('[data-cy="response-name"]')
            .invoke('val')
            .as('name')
                    
        cy.get('@name').then((name) => {
            cy.log(name) //prints name
            resbutName = name
            cy.log(resbutName)
        })

        // Locate Button Tab and enter to it
        cy.get('[role="tab"]')
            .contains('Buttons')
            .click()     

        // Clicking responsebutton-create
        cy.get('[data-cy="responsebutton-create"]').click()
        
        //1. Assert warning notification Title        
        cy.get('[role="alert"]').eq(0)
            .should('have.text','Der Titel muss gesetzt sein')

        //2. Assert warning notification Intent
        cy.get('[role="alert"]').eq(1)
            .should('have.text','Ein Intent muss ausgewählt sein')

        // Clicking Anlegen Button while Text field is empty
        cy.get('[data-cy="create-button"]').eq(0)
            .click()
        
        // Assert Nicht Möglich, /Currently Known as But/
        cy.errorMessageTitle('[data-cy="errorMessageTitle"]', 'Der', 'Response Button')
        
        // Close Error Notification
        cy.get('[data-cy="error-remove"]').click()
        
        // Add a valid Button Title
        cy.get('[data-cy="responsebutton-title"]')
            .type(addValue+String(txa))
            
        // Add an Intent 
        cy.get('[role="combobox"]')
            .contains('Intent')
            .click({force:true})
            .get('[role="option"]')
            .last()
            .click()

        // Click Anlegen
        cy.get('[data-cy="create-button"]').eq(0)
            .click()

        // Assert Nicht Möglich, /Currently Known as But/
        // cy.get('[data-cy="errorMessageTitle"]')
        //     .should('have.text',' Der Response Button konnte nicht gespeichert werden. ')

        // Close Error Notification
        // cy.get('[data-cy="error-remove"]')
        //     .click()

        // 2. Check for successfully saved values
        // 2.1 Assert successfully saved Notification

        // Assert Successfully Saved Notification
        cy.get('[data-cy="successMessageTitle"]')
            .should('have.text',' Der Response Button "'+addValue+String(txa)+'"  wurde erfolgreich gespeichert ')

        cy.get('[data-cy="success-remove"]')
            .click()
            .wait(500)
        
        // Selecting Entire Table
        cy.selectEntireTbl()
        
        // 2. Check for successfully saved values
        // 2.2 Assert in the Texte table

        // use search field to find the button name in buttont table
        cy.get('[data-cy="responsebutton-table-search"]')
            .type(addValue+String(txa))
     
        // Assert in Response Texte Table
        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(2)').then(function($text) {
                const text = $text.text()
                cy.wrap($text).should('have.text', addValue+String(txa))
            })
        
        // Clear search field
        cy.get('[data-cy="responsebutton-table-search"]')
            .clear()
                    
        // 3. Leave site via menu or breadcrump does not save value
        cy.get('tbody')
            .find('tr')
            .first()
            .click()
        
        // Entering to Texte Tab
        cy.get('[role="tab"]')
            .contains('Button')
            .click()

        // Clicking responsebutton-create
        cy.get('[data-cy="responsebutton-create"]').click()

        cy.get('[data-cy="responsebutton-title"]')
            .type('leaveWithBreadCrumb')
            
        
        // Leave Site via Bread Crumb
        cy.get('[role="tab"]')
            .contains('Buttons')
            .click()
            .wait(200)

        // Selecting Entire Table
        cy.selectEntireTbl()
        
        cy.log('Line 225')
        cy.get('tbody')
            .find('tr')
            .first()
            .find('td:nth-child(2)')
            .should('not.have.text','leaveWithBreadCrumb')  
    }
}

// Exportint class frontEnd to End2End to test
export const onResponsesButtonAnlegen = new button_anlegen()