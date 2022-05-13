const ac     = Math.floor(Math.random() * 65000);
const bd     = Math.floor(Math.random() * 75000);
const addValue = 'BenutzerAnDummy'
export class datai_anlegen {
    dataiAnlegen() {
        
        // Open Trainingsdate Tab and enter to Benutzerdefiniert
        cy.Trainingsdaten('Trainingsdaten','[data-cy="navDrawerBenutzerdefiniert"]');
        
        // Assert URL after clicking Benutzerdefiniert
        cy.url().should("eq", `${Cypress.config().baseUrl}/trainingsdaten/benutzerdefiniert/`);

        // Clicking Benutzerdefiniert Hinzufuegen
        cy.createButton('[data-cy="benutzerdefiniert-create"]')

        // checking url after clicking Datai Hinzufuegen
        cy.url().should("eq", `${Cypress.config().baseUrl}/trainingsdaten/benutzerdefiniert/neu/`);
        
        // 1. Name should not be empty, error message should contain "Name"
        // 1.1 Warning message below input field
        // 1.2 Error message after unsuccessful saving 
        
        //Assert warning notification
        cy.warningNotification('[role="alert"]')

        cy.log('Line 25')
        // add a space or '/' to input field
        const space   = [' ', '/']
        cy.wrap(space).each((index) => {
            cy.get('[data-cy="benutzerdefiniert-name"]')
                .type(index)

            //Assert warning notification
            cy.get('[role="alert"]').eq(0)
                .should('have.text','Der Name enthält ungültige Zeichen!')

            // Click Anlegen
            cy.get('[data-cy="create-button"]').click()
        
            //Assert Error message, indication didn't able to save data
            cy.errorMessageTitle('[data-cy="errorMessageTitle"]', 'Die','benutzerdefinierte Datei')
            // Close Error Notification
            cy.get('[data-cy="error-remove"]').click()
                
            // Remove space or '/'
            cy.get('[data-cy="benutzerdefiniert-name"]').clear()
        })

        cy.log('Line 47')
    
        // Click Anlegen
        cy.get('[data-cy="create-button"]').click()
        
        //Assert Error message, indication didn't able to save data
        cy.errorMessageTitle('[data-cy="errorMessageTitle"]', 'Die','benutzerdefinierte Datei')
        
        // Close Error Notification
        cy.get('[data-cy="error-remove"]').click()
        
        // 5. Check for successfully saved values
        // 5.1 Assert Notification
        // Add a response name with and assert notification & Assert in action table
        cy.get('[data-cy="benutzerdefiniert-name"]')
            .type(addValue+String(ac))

        // Click Anlegen
        cy.get('[data-cy="create-button"]').click()

        // 7. Click on "Anlegen" navigates to table of actions
        cy.url().should("eq", `${Cypress.config().baseUrl}/trainingsdaten/benutzerdefiniert/`);
        
        // Assert Successful Notification
        cy.get('[data-cy="successMessageTitle"]')
            .should('have.text', ' Die benutzerdefnierte Datei'+' "'+addValue+String(ac)+'" '+ 'wurde erfolgreich gespeichert ')
        
        // Closing Successfully Saved Notification
        cy.successRemove()
        
        // 3. Check for successfully saved values
        // 3.2 Assert in table
        cy.get('[data-cy="benutzerdefiniert-table-search"]')
            .type(addValue+String(ac))

        // Selecting Entire Table
        cy.selectEntireTbl()
            
        // Assert Value in Response Table
        cy.get('tbody').find('tr')
            .find('td:nth-child(1)')
            .then(function($synName1) {
                //cy.wrap($synName1).should('have.text', addValue+String(ac))
                cy.wrap($synName1).should('contain', addValue+String(ac))
            })

        // clear search field
        cy.get('[data-cy="benutzerdefiniert-table-search"]').clear()
        
        // 3. Check for duplicate name
        // 3.1 Datai
        //     2.1.1 Error message after unsuccessful saving 
        cy.get('[data-cy="benutzerdefiniert-create"]').click()

        cy.get('[data-cy="benutzerdefiniert-name"]')
            .type(addValue+String(ac))

        // Click Anlegen
        cy.get('[data-cy="create-button"]').click()

        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text',' Die benutzerdefinierte Datei konnte nicht gespeichert werden. ')

        // Close Error Notification
        cy.get('[data-cy="error-remove"]').click()

        cy.get('[data-cy="navDrawerBenutzerdefiniert"]').click()

        // action-table-search
        cy.get('[data-cy="benutzerdefiniert-table-search"]')
            .type(addValue+String(ac))

        // Selecting Entire Table
        cy.selectEntireTbl()

        // Assert table length in Action Table
        cy.get('tbody')
            .find('tr')
            .then(function($synName2) {
                const resTbLen = $synName2.length
                cy.log(resTbLen)
                cy.wrap($synName2).should('have.length', resTbLen)
            })

        // 4. Leave site via menu or breadcrump, data must not be saved
        cy.get('[data-cy="navDrawerBenutzerdefiniert"]').click()

        cy.get('[data-cy="benutzerdefiniert-create"]')
            .click({force:true})

        cy.get('[data-cy="benutzerdefiniert-name"]')
            .type('someName')

        cy.get('[data-cy="navDrawerBenutzerdefiniert"]').click()

        cy.get('[data-cy="benutzerdefiniert-table-search"]')
            .type('someName')

        // Select Entire Synonym Table
        cy.selectEntireTbl()

        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(1)')
            .should('not.have.text', 'someName')

        cy.get('[data-cy="benutzerdefiniert-table-search"]').clear()
    }
}
// Exportint class frontEnd to End2End to test
export const onDataiAnlegen = new datai_anlegen()