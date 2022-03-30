const b     = Math.floor(Math.random() * 1000);
const x     = Math.floor(Math.random() * 3500);
const xle   = Math.floor(Math.random() * 5500);
const addValue = 'resBearbeitDmy'

export class datei_bearbeiten {

    dateiBearbeiten() {

        /* B. Action Bearbeiten Testing */
        cy.Trainingsdaten('[data-cy="navDrawerBenutzerdefiniert"]')

        // 1. Edit Name should not be empty, error message should contain "Name"
        // 1.1 Datei Name
        //     1.1.1 Warning message below input field
        //     1.1.2 Error message after unsuccessful saving
        
        // Entering to first of
        cy.wait(300)
        cy.get('tbody')
            .find('tr')
            .first()
            .click()

        // clear action name
        cy.get('[data-cy="benutzerdefiniert-name"]').clear()

        //Assert warning notification
        cy.warningNotification('[role="alert"]')

        // add a space or '/' to input field
        const space   = [' ', '/']
        cy.wrap(space).each((index) => {

            cy.get('[data-cy="benutzerdefiniert-name"]')
                .type(index)

            //Assert warning notification
            cy.get('[role="alert"]')
                .should('have.text','Der Name enthält ungültige Zeichen!      ')

            // Remove space or '/'
            cy.get('[data-cy="benutzerdefiniert-name"]')
                .clear()
        })

        // Click speichen
        cy.get('[data-cy="save-button"]').click()
        
        //Assert Error message, indication didn't able to save data
        cy.errorMessageTitle('[data-cy="errorMessageTitle"]', 'Die','benutzerdefinierte Datei')

        // Close Error Notification
        cy.get('[data-cy="error-remove"]').click()

        /* 3. Check for successfully saved values
        3.1 Assert Notification
        Add a aciton-title with valid name and assert notification & 
        assert also in action table */
        cy.get('[data-cy="benutzerdefiniert-name"]')
            .type(addValue+String(b))

        // Click Speichern
        cy.get('[data-cy="save-button"]').click()
        
        // Assert Successful Notification
        cy.get('[data-cy="successMessageTitle"]')
            .should('have.text', ' Die benutzerdefnierte Datei'+' "'+addValue+String(b)+'" '+ 'wurde erfolgreich gespeichert ')
        
        // Closing Successfully Saved Notification
        cy.get('[data-cy="success-remove"]').click()
        
        // return to Action
        cy.get('[data-cy="navDrawerBenutzerdefiniert"]').click()

        // 3. Check for successfully saved values
        // 3.2 Assert in table

        // Assert saved data in action table
        cy.get('[data-cy="benutzerdefiniert-table-search"]')
            .type(addValue+String(b))

        // Selecting Entire Table
        cy.selectEntireTbl()
            
        // Assert Value in Response Table
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(1)')
            .contains(addValue+String(b))
            .then(function($synName1) {
                cy.wrap($synName1).should('have.text', addValue+String(b))
            })

        // clear search field
        cy.get('[data-cy="benutzerdefiniert-table-search"]')
            .clear()

        // 2. Check for duplicate name
        // 2.1 Action Name
        // 2.1.1 Error message after unsuccessful saving
        // 2.1.2 Valaue should be double in the Action table, assert action Table

        // At first add a New value to Action Name
        cy.get('[data-cy="benutzerdefiniert-create"]')
            .click()

        cy.get('[data-cy="benutzerdefiniert-name"]')
            .type(addValue+String(x))

        cy.get('[data-cy="create-button"]').click()

        // return to Action
        cy.get('[data-cy="navDrawerBenutzerdefiniert"]').click()

        // Remove success notification
        cy.get('[data-cy="success-remove"]').click()

        // 2. Check for duplicate name
        // 2.1 Action Name
        // 2.1.1 Error message after unsuccessful saving
        
        cy.get('[data-cy="benutzerdefiniert-table-search"]')
            .type(addValue+String(b))
        
        cy.get('tbody')
            .find('tr')
            .contains(addValue+String(b))
            .click()

        cy.get('[data-cy="benutzerdefiniert-name"]')
            .clear()
            .type(addValue+String(x))

        cy.get('[data-cy="save-button"]').click()

        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text',' Die benutzerdefinierte Datei konnte nicht gespeichert werden. ')

        // Close Error Notification
        cy.get('[data-cy="error-remove"]').click()

        // 2. Check for duplicate name
        // 2.1 Action
        //     2.1.2 Valaue should be in the Action table, assert action Table

        // return to Action
        cy.get('[data-cy="abort-button"]').click()

        // action-table-search
        cy.get('[data-cy="benutzerdefiniert-table-search"]')
            .type(addValue+String(x))

        // Selecting Entire Table
        cy.selectEntireTbl()

        // Assert table length in Action Table
        cy.get('tbody')
            .find('tr')
            .contains(addValue+String(x))
            .then(function($synName3) {
                const resTbLen3 = $synName3.length
                cy.log(resTbLen3)
                cy.wrap($synName3).should('have.length', resTbLen3)
            })
        
        // Clear action-table-search
        cy.get('[data-cy="benutzerdefiniert-table-search"]').clear()

        // 4. Leave site via menu or breadcrump, data must be saved
        cy.get('tbody')
            .find('tr')
            .first()
            .click()

        // clear response-name
        cy.get('[data-cy="benutzerdefiniert-name"]')
            .clear()
            .type(addValue+String(xle))
        cy.log('Line 179')
        cy.get('[class="v-breadcrumbs__item"]')
            .contains(' Benutzerdefiniert ')
            .click()

        // Assert Successful Notification
        cy.get('[data-cy="successMessageTitle"]')
            .should('have.text', ' Die benutzerdefnierte Datei'+' "'+addValue+String(xle)+'" '+ 'wurde erfolgreich gespeichert ')

        // Assert saved data in action table
        cy.get('[data-cy="benutzerdefiniert-table-search"]')
            .type(addValue+String(xle))

        // Selecting Entire Table
        cy.selectEntireTbl()
            
        // Assert Value in Action Table
        cy.get('tbody')
            .find('tr')
            //.last()
            .find('td:nth-child(1)')
            //.contains(addValue+String(xle))
            .then(function($synName1) {
                cy.wrap($synName1).should('have.text', addValue+String(xle))
            })

        // Clear action-table-search
        cy.get('[data-cy="benutzerdefiniert-table-search"]').clear()

        // 5. leave site via button "Abbrechen" navigates to table of synonyms and 
        //    does not save edited data
        
        // entering to first row of action table
        cy.get('tbody')
            .find('tr')
            .first()
            .click()

        // Clear action-name
        cy.get('[data-cy="benutzerdefiniert-name"]')
            .clear()
            .type('randomActionName')

        cy.get('[data-cy="abort-button"]').click()

        // Assert Action Table
        cy.get('[data-cy="benutzerdefiniert-table-search"]')
            .type('randomActionName')
        
        cy.get('tbody')
            .find('tr')
            .should('not.have.text', 'randomActionName')

        // clear action-table-search
        cy.get('[data-cy="benutzerdefiniert-table-search"]').clear()
    }
}
// Exportint class frontEnd to End2End to test
export const onDataiBearbeiten = new datei_bearbeiten()