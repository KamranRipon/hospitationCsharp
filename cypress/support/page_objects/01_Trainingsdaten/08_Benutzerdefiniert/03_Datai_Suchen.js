const singleEle = Math.floor(Math.random() * 5500);
const multiEle1  = Math.floor(Math.random() * 6500);
const multiEle2  = Math.floor(Math.random() * 6500);

export class datei_suchen {

    dateiSuchen() {
        /* C. Test Action Suchen*/

        // Expand Trainingsdaten and Enter to Actin
        cy.Trainingsdaten('Trainingsdaten','[data-cy="navDrawerBenutzerdefiniert"]')
        
        // Ass Some Random Value to Actions
        const randonVal = ['datei'+String(multiEle1), 'datei'+String(multiEle2), 'weather'+String(singleEle)]
        cy.addRandValue(randonVal,'[data-cy="benutzerdefiniert-create"]','[data-cy="benutzerdefiniert-name"]', '[data-cy="create-button"]','[data-cy="navDrawerBenutzerdefiniert"]')
            
        // Selecting Entire Table
        cy.selectEntireTbl()
        cy.log('Line 19')
        //create a variable for assertion for multiple matched return
        var multiple
        cy.get('[data-cy="benutzerdefiniert-table-search"]')
                .type('datei')
        cy.wait(300)
        cy.get('tbody').find('tr')
            .then(function($tbLength) {
                multiple = $tbLength.length
                cy.log(multiple)
            })
        

        //clear action-table-search
        cy.get('[data-cy="benutzerdefiniert-table-search"]').clear()

        // Single action
        cy.get('[data-cy="benutzerdefiniert-table-search"]')
            .type(randonVal[1])
        cy.log('Line 35')
        // Assert Return Result
        cy.get('tbody')
            .find('tr')
            .should('have.length', 1)
            .find('td:nth-child(1)')
            .should('have.text', randonVal[1])
        cy.log('Line 42')
        // Multiple Action
        cy.get('[data-cy="benutzerdefiniert-table-search"]')
            .clear()
            .type('datei')
        cy.get('tbody')
            .find('tr')
            .then((multiRow) => {
                cy.log(multiRow.length)
                cy.wrap(multiRow).should('have.length', multiple)
                cy.get('tbody')
                    .find('tr')
                    .find('td:nth-child(1)')
                    .should('contain','datei')
            })
            
        // Nonexisting Action
        cy.get('[data-cy="benutzerdefiniert-table-search"]')
            .clear()
            .type('sky')
                
        cy.get('tbody')
            .find('tr')
            .should('contain',"")

        cy.get('[data-cy="benutzerdefiniert-table-search"]').clear() 
    }
}
// 
export const onDateiSuchen = new datei_suchen()