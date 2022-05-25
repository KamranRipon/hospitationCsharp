const x = Math.floor(Math.random() * 35000);
const b = Math.floor(Math.random() * 45000);
const addValue = 'DummyValue'
export class form_bearbeiten {

    formBearbeiten() {

        /* Forms Bearbeiten Testing */
        cy.Trainingsdaten('Trainingsdaten','[data-cy="navDrawerForms"]')

        // Assert URL after clicking Form
        cy.url().should("eq", `${Cypress.config().baseUrl}/trainingsdaten/form/`);
        //cy.url().should("eq", "http://10.61.135.11:8081/trainingsdaten/form/");
        
        // Add a Form Name
        //cy.get('[data-cy="navDrawerForms"]').click()
        cy.get('[data-cy="form-create"]').click()
        cy.get('[data-cy="form-name"]').type(addValue+String(x))
        cy.get('[data-cy="create-button"]').click()
        cy.successRemove()
        // Return to Form Table
        cy.get('[data-cy="navDrawerForms"]').click()

        // 1. Edit Name should not be empty, error message should contain "Name"

        const value1   = ['','/', addValue+String(x)]
        // Enter to first row of Form Table
        cy.wrap(value1).each((index) => {
            cy.wait(300)  // Mast have wait here
            cy.get('tbody')
                .find('tr')
                .first()
                .click({force:true})

            // clear input field
            cy.get('[data-cy="form-name"]').clear()

            if (index == '') {
                cy.log('If Statement is True')

                cy.warningNotification('[role="alert"]')

                cy.get('[data-cy="navDrawerForms"]').click()

                //1.1.2 Warning Notification
                cy.get('[data-cy="errorMessageTitle"]')
                    .should('have.text',' Die Form konnte nicht gespeichert werden. ')

                // Close error message
                cy.get('[class="v-icon notranslate theme--dark"]').eq(0)
                    .click()

                // clicking "Abbrechen" buttton. Slected Name should remain same.
                cy.get('[data-cy="abort-button"]').click()
            }
            else if (index == '/') {

                cy.get('[data-cy="form-name"]')
                    .type(index)
                cy.get('[role="alert"]').eq(0)
                    .should('have.text','Der Name enthält ungültige Zeichen!')

                cy.get('[data-cy="navDrawerForms"]').click()

                //1.1.2 Warning Notification
                cy.get('[data-cy="errorMessageTitle"]')
                    .should('have.text',' Die Form konnte nicht gespeichert werden. ')

                // after assert close warning message
                cy.get('[class="v-icon notranslate theme--dark"]').eq(0)
                    .click()

                // clicking "Abbrechen" buttton. Slected Name should remain same.
                cy.get('[data-cy="abort-button"]')
                    .click()
            }
            else {

                cy.get('[data-cy="form-name"]')
                    .type(index)

                // 3. duplicate value
                cy.get('[data-cy="navDrawerForms"]').click()

                cy.get('[data-cy="errorMessageTitle"]')
                    .should('have.text',' Die Form konnte nicht gespeichert werden. ')

                // after assert close warning message
                cy.get('[class="v-icon notranslate theme--dark"]').eq(0)
                    .click()
                
                cy.get('[data-cy="abort-button"]')
                    .click({force:true})
            }
        })

        // 2. Check for successfully saved values
        cy.wait(300)
        cy.get('tbody')
            .find('tr')
            .first()
            .click({force:true})

        // clear input field
        cy.get('[data-cy="form-name"]')
            .clear()
            .type(addValue+String(b))

        cy.get('[data-cy="save-button"]').click()
        cy.wait(500)
        cy.get('[data-cy="successMessageTitle"]')
            .should('have.text', ' Die Form'+' "'+addValue+String(b)+'" '+ 'wurde erfolgreich gespeichert ')
            cy.wait(300)
        // Closing saved Notification
        cy.successRemove()

        cy.get('[data-cy="form-table-search"]').type(addValue+String(b))
        
        // Assert value Table
        cy.wait(300)
        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(1)')
            .then(function($synName4) {

                cy.wrap($synName4).should('have.text', addValue+String(b))
            })

        // 3. Test duplicate Name
        
        cy.get('[data-cy="navDrawerForms"]').click()
        
        cy.wait(300)
        cy.get('tbody')
            .find('tr')
            .first()
            .click()

        cy.get('[data-cy="form-name"]')
            .clear()
            .type(addValue+String(x))

        cy.get('[data-cy="save-button"]').click()

        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text', ' Die Form konnte nicht gespeichert werden. ')

        // Close Error message
        cy.get('[class="v-icon notranslate theme--dark"]').eq(0)
            .click()

        // return to form table
        cy.get('[data-cy="abort-button"]').click()
        
        //Assert value Table
        cy.get('[data-cy="form-table-search"]').type(addValue+String(x))
        //Assert value Table
        cy.wait(300)
        cy.get('tbody')
            .find('tr')
            .then(function($trLength) {

                cy.log($trLength.length)
                cy.wrap($trLength).should('have.length', 1)
            })
        cy.get('[data-cy="form-table-search"]').clear()

        // 4. Leave site via menu or breadcrump, data must not be saved
        cy.log('Line 326')
        cy.get('[data-cy="navDrawerForms"]').click()
        cy.wait(300)
        cy.get('tbody')
            .find('tr')
            .first()
            .click({force:true})

        cy.get('[data-cy="form-name"]')
            .clear()
            //.click({force:true})
            .type('randomValue')

        cy.get('[data-cy="navDrawerForms"]')
            .click()

        // Select Entire Synonym Table
        cy.wait(300)
        cy.selectEntireTbl()

        cy.get('[data-cy="form-table-search"]')
            //.click()
            .type('randomValue')
            
        cy.wait(150)
        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(1)')
            .should('have.text', 'randomValue')

        cy.get('[data-cy="form-table-search"]').clear()

        // 5. Leave Site by Abbrechen Button, data must not save
        cy.get('[data-cy="navDrawerForms"]').click()
        cy.wait(200)
        cy.get('tbody')
            .find('tr')
            .first()
            .click({force:true})

        cy.get('[data-cy="form-name"]')
            .clear()
            //.click({force:true})
            .type('randomValue2')
        // Leave Site by Abbrechen Button
        cy.get('[data-cy="abort-button"]')
            .click()

        // Select Entire Synonym Example Table 
        cy.selectEntireTbl()

        cy.get('[data-cy="form-table-search"]')
            .click()
            .type('randomValue')

        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(1)')
            .should('not.have.text', 'randomValue2')
    }
}

// Exportint class frontEnd to End2End to test
export const onFormBearbeiten = new form_bearbeiten()