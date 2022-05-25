const AU = Math.floor(Math.random() * 85500);

export class action_loeschen {

    actionLoeschen() {
        /* D. Test Action Loeschen*/

        // Expand Trainingsdaten and Enter to Actin
        cy.Trainingsdaten('Trainingsdaten','[data-cy="navDrawerActions"]')

        // add actions button
        var actionbut = ["action_used1","action_used2", "action_used3"]

        cy.wrap(actionbut).each((index) => {

            cy.get('[data-cy="action-create"]').click()
            
            cy.get('[data-cy="action-name"]')
                .type(index+String(AU))

            // Click Anlegen
            cy.get('[data-cy="create-button"]').click()

            cy.successRemove()

        })

        cy.wait(1000)

        // Selecting Entire Table
        cy.selectEntireTbl()

        // calculate maxi examples or rules on an intent
        var max_val=0
        cy.get('tbody')
            .find('td:nth-child(2)')
            .then(($testFunc2) => {
                const vall2 = $testFunc2.text()
                const sp_vall2 = vall2.split(' ')
                var num2
                for (num2=0; num2 < sp_vall2.length; num2++){
                    if(Number(sp_vall2[num2]) > max_val) {
                        max_val = sp_vall2[num2]
                    }
                }
                cy.log(max_val)
            })
          
        // Enter to first row to intent table
        cy.wait(300)
        cy.get('tbody')
            .then((maxVal) => {
                cy.get('tbody')
                    .find('td:nth-child(2)')
                    .contains(max_val)
                    .click()
            })

        // Save action Name for letar Assertion
        var inExName
        cy.get('[data-cy="action-name"]')
                .invoke('val').as('name')
                    
        cy.get('@name').then((name) => {
            inExName = name
        })

        // back to Action Table
        cy.get('[data-cy="navDrawerActions"]').click()

        cy.get('[data-cy="action-table-search"]')
        .then(function($actionSearch) {
            cy.wrap($actionSearch).type(inExName)
        })

        // Action Button used in internt or stories can not be deleted, 
        // delete option must be disabled
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(4)')
        
        // assert disabled loeschen button
        cy.get('[data-cy="element-delete-button"]')
            .then(function($deleteButton) {
                expect($deleteButton).to.have.attr("aria-disabled", 'true')
            })

        // clear search field 
        cy.get('[data-cy="action-table-search"]').clear()

        //select entire Action table
        cy.selectEntireTbl()

        // delete a button
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(2)')
            .contains('0')
            .click()

        // Save intent Name for letar Assertion
        var inExName
        cy.get('[data-cy="action-name"]')
                .invoke('val').as('name')
                    
        cy.get('@name').then((name) => {
            inExName = name
        })

        // back to Action Table
        cy.get('[data-cy="navDrawerActions"]').click()

        // Selecting Entire Table
        cy.selectEntireTbl()
        
        cy.get('tbody tr').then(function($noRow) {
            const tableRow = $noRow.length
            cy.log(tableRow)

            if (tableRow <= 1 ) {
                cy.log('if Statement true')
                var actionList = ["action_used1","action_used2", "action_used3"]

                cy.wrap(actionList).each((index) => {

                cy.get('[data-cy="action-create"]').click()
                
                cy.get('[data-cy="action-name"]')
                    .type(index+String(AU))

                // Click Anlegen
                cy.get('[data-cy="create-button"]').click()

                cy.successRemove()

                })

                cy.get('[data-cy="element-delete-button"]')
                    .first()
                    .click()
                    .wait(500)

                // Confirm Delete
                cy.confirmDelete()
            }
            else {
                cy.log('if Statement false')
                cy.log('Line 140')
                cy.get('[data-cy="action-table-search"]')
                .then(function($actionSearch) {
                    cy.wrap($actionSearch).type(inExName)
                })
                cy.get('[data-cy="element-delete-button"]')
                    .first()
                    .click()
                    .wait(500)

                // Confirm Delete
                cy.confirmDelete()

                cy.wait(500)
                // assert Success Message
                cy.get('[data-cy="successMessageTitle"]')
                .then((successMsg) => {
                    expect(successMsg).to.have.text(' Die Action "'+ inExName +'" wurde erfolgreich gelöscht ')
                })
            }
            // clear search field 
            cy.get('[data-cy="action-table-search"]').clear()
        })
    }
}
// 
export const onActionLoeschen = new action_loeschen()