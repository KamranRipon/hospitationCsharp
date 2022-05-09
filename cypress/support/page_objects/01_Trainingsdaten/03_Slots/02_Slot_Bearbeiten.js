const t = Math.floor(Math.random() * 30000);
const f = Math.floor(Math.random() * 35000);
const b = Math.floor(Math.random() * 40000);
const l = Math.floor(Math.random() * 45000);
const c = Math.floor(Math.random() * 50000);
const a = Math.floor(Math.random() * 55000);
const tx = Math.floor(Math.random() * 55000);

const addValue = 'DummyValue'
const addValue_2 = 'DummyValue'
const addExample = 'testExample-1'

export class slot_bearbeiten {

    slotBearbeiten() {

        /* Slot Bearbeiten */

        // Entering to Trainingsdaten
        cy.Trainingsdaten('Trainingsdaten', '[data-cy="navDrawerSlots"]')

        cy.get('[data-cy="slot-table-search"]').type('Category')

        // Add Slot hinzufuegen for Typ: Text
        cy.get('[data-cy="slot-create"]')
            .click()

        cy.get('[data-cy="slot-name"]')
            .click()
            .type(addValue+String(tx))

        cy.get('[data-cy="slot-description"]')
            .click()
            .type(addValue)

        cy.get('[class="v-select__slot"]')
            .contains('Slot-Typ')
            .click({force:true})

        cy.get('[class="v-list-item__content"]')
            .contains('Text')
            .click()

        cy.get('[data-cy="slot-text-initialvalue"]')
            .click()
            .type('addInitialvalue')

        cy.get('[data-cy="create-button"]')
            .click()

        // remove succcess message
        cy.successRemove()

        // Enter First row of the Slot Table
        //cy.get('[class="v-icon notranslate editIcon theme--light primary--text"]')
        cy.get('tbody')
            .find('tr')
            .first()
                .click({force:true})

        // Remove Name by clicking "X"
        cy.get('[class="v-input__append-inner"]')
            .first()
            .click()

        cy.get('[data-cy="slot-name"]')
            .click({force:true})
            .get('[class="v-messages__wrapper"]')
            .should('have.text','Der Name muss gesetzt sein')

        // Click save button
        cy.get('[data-cy="save-button"]')
            .click()

        // Assert Error Message Notification
        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text',' Der Slot konnte nicht gespeichert werden. ')

        /* 1.2 name should not contain space or forward Slash (/)
        Checking for space or "/" within a Name
        */
        cy.get('[data-cy="slot-name"]')
            .click({force:true})
            .type(' ') // t for Text
            .get('[class="v-messages__wrapper"]')
            .should('have.text', 'Der Name enthält ungültige Zeichen!')
            .get('[data-cy="slot-name"]')
            .click({force:true})

        // Click save button
        cy.get('[data-cy="save-button"]')
            .click()

        // Assert Notification
        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text',' Der Slot konnte nicht gespeichert werden. ')

        // cy.get('[class="v-text-field__slot"]')
        //     .contains('Name')
        //         .click({force:true})

        // cy.get('[class="v-text-field__details"]')
        //     .contains('Der Name muss gesetzt sein')
        //     .should('be.visible')

        // /* 1.2 name should not contain space or forward Slash (/)
        // Checking for space or "/" within a Name
        // */

        // cy.get('[class="v-label v-label--active theme--light error--text"]')
        // .should('be.visible')
        //     .type(' ')

        // cy.get('[class="v-text-field__details"]')
        //     .contains('Der Name enthält ungültige Zeichen!')
        //     .should('be.visible')

        /*
        Checking for Duplicate Name: Name cannot be known in Slot
        3.1 Existing name cannot save double
        */
        cy.log('Checking for Duplicate Name')
        cy.log('Line 1276')

        cy.get('[data-cy="slot-name"]')
            .clear()

        cy.get('[data-cy="slot-name"]')
            //.contains('Name')
            .clear()
            .click({force:true})
            .type(addValue+String(tx))

        cy.get('[data-cy="slot-description"]')
            //.contains('Beschreibung')
            .click({force:true})
            .clear()
            .type(addValue)

        // Check for Slot-Type disabled or Not
        // Slot-Type Mast be disabled
        cy.log('Slot-Type Mast be disabled')

        cy.get('[class="v-label v-label--active v-label--is-disabled theme--light"]')
            .contains('Slot-Typ')
            .get('[class="v-select__selections"]')
            .find('input')
            .should('have.disabled', 'disabled')

        // cy.get('[class="v-text-field__slot"]')
        //     .contains('Initialer Wert')
        //     .click({force:true})
        //     .type('example Text')
        cy.get('[data-cy="slot-text-initialvalue"]')
            .click()
            .clear()
            .type('example Text')

        cy.get('[data-cy="save-button"]')
            .click()
            .wait(500)

        cy.get('[class="alert error white--text"]')
            .find('[data-cy="errorMessageTitle"]')
                //Der Slot konnte nicht gespeichert werden.
                .then((errorMsg) => {
                    expect(errorMsg).to.have.text(' Der Slot konnte nicht gespeichert werden. ')
                })

        cy.log('Passed 1')

        // Giving a valid Name to return to Slot
        cy.get('[class="v-input__append-inner"]')
            .first()
            .click({force:true})
            .type(addValue+String(l*t))

        // // Back to Slot-page by clicking Slot
        // cy.get('[data-cy="navDrawerSlots"]')
        //     .contains('Slots')
        //         .click({force:true})

        // Clicking save-button
        cy.get('[data-cy="save-button"]')
            .click()
            .wait(300)

        /* Slot-Typ */
        // 1. Text

        cy.log('Text')
        cy.log('Line 1372')

        // Selecting Entire Table
        cy.get('[class="v-select__slot"]')
            .click()
            .wait(500)
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
                .click()

        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(4)')
            .contains('Text')
            .click({force:true})

        // Remove Name by clicking "X"
        cy.get('[class="v-input__append-inner"]').eq(3)
            .click({force:true})

        // Back to Slot-page by clicking Slot
        cy.get('[data-cy="navDrawerSlots"]')
            .contains('Slots')
                .click()

        // Add a Slot value where Slot-Type is "Text"
        cy.get('[data-cy="slot-create"]')
            .click({force:true})

        cy.get('[data-cy="slot-name"]')
            .click({force:true})
            .type(addValue+String(t*c))
            cy.log(t*c)

        cy.get('[data-cy="slot-description"]')
            .click({force:true})
            .type(addValue+String(t))

        cy.get('[class="v-select__slot"]')
            .contains('Slot-Typ')
            .click({force:true})

        // 1. Selecting Text
        cy.get('[class="v-list-item__content"]')
            .contains('Text')
            .click({force:true})

        cy.get('[data-cy="slot-text-initialvalue"]')
            .click({force:true})
            // Typing Text
            .type('example Text'+String(t))

        // Click Anlegen
        cy.get('[class="v-btn__content"]')
            .contains('Anlegen')
            .click({force:true})
            .wait(500)

        cy.log('Line 1428')
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(4)')
            .contains('Text')
            .click({force:true})

        // Removing Slot-Typ Value by clear method
        cy.get('[data-cy="slot-text-initialvalue"]')
            .clear()
            .type('New Value'+String(t))

        // Back to Slot-page by clicking Slot
        cy.get('[data-cy="navDrawerSlots"]')
            .contains('Slots')
                .click()

        cy.url().should("eq", `${Cypress.config().baseUrl}/trainingsdaten/slot/`);

        // // Selecting Entire Table
        // cy.get('[class="v-select__slot"]')
        //     .click()
        //     .wait(500)
        // cy.get('[class="v-list-item__content"]')
        //     .contains('Alle')
        //         .click()

        cy.get('[data-cy="slot-table-search"]')
            .click()
            .type('Text')

        cy.log('Line 1453')
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(4)')
            .first()
            .should('have.text', 'initial: ' +'„New Value'+String(t)+'“')
            .wait(200)

        cy.get('[data-cy="slot-table-search"]')
            .click()
            .clear()
            .type('List')

        //2. List
        cy.log('2. List')

        // cy.get('[data-cy="slot-table-search"]')
        //     .click()
        //     type('List')

        cy.log('Line 1468')
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(3)')
            .contains('List')
            .click({force:true})

        // // // Remove Name by clicking "X"        // temporary turn off
        // cy.log('Remove Name by clicking "X"')    // take a look later

        // cy.get('[class="v-input__append-inner"]').eq(3).click()
        cy.get('[data-cy="slot-list-initialvalue"]')
            .click()
            .clear()

        // // Back to Slot-page by clicking Slot
        cy.get('[data-cy="navDrawerSlots"]')
            .contains('Slots')
                .click()

        // // Add a Slot value where Slot-Type is "List"
        cy.get('[data-cy="slot-create"]')
            .click({force:true})

        cy.get('[data-cy="slot-name"]')
            .click({force:true})
            .type(addValue+String(l*c))
            cy.log(l*c)

        cy.get('[data-cy="slot-description"]')
            .click({force:true})
            .type(addValue+String(l))

        cy.get('[class="v-select__slot"]')
            .contains('Slot-Typ')
            .click({force:true})

        // 2. Selecting List
        cy.get('[class="v-list-item__content"]')
            .contains('List')
            .click({force:true})

        cy.get('[data-cy="slot-list-initialvalue"]')
            .click({force:true})
            // Typing Value
            .type('example List'+String(l))

        // Click Anlegen
        cy.get('[class="v-btn__content"]')
            .contains('Anlegen')
            .click({force:true})
            .wait(500)

        cy.get('[data-cy="slot-table-search"]')
            .click()
            .type('List')

        // Selecting Entire Table
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
                .click()

        cy.log('Line 1524')
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(3)')
            .contains('List')
            .click({force:true})

        // Removing Slot-Typ Value by clear method
        cy.get('[data-cy="slot-list-initialvalue"]')
            .clear()
            .type('New Value'+String(l))

        // Back to Slot-page by clicking Slot
        cy.get('[data-cy="navDrawerSlots"]')
            .click()
            .wait(500)

        // Selecting Entire Table
        cy.get('[class="v-select__slot"]').click({force:true})
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
                .click({force: true})

        cy.log('l '+String(l))

        cy.log('Line 1549')
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(4)')
            .contains('New Value'+String(l))
            .should('have.text', 'initial: ' +'„New Value'+String(l)+'“')

        //3. Any

        cy.log('3. Any')

        // Selecting Entire Table
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
                .click()

    cy.log('Line 1568')
    cy.get('tbody')
        .find('tr')
        .find('td:nth-child(3)')
        .contains('Any')
        .click({force:true})

    // Remove Name by clicking "X"
    cy.get('[class="v-input__append-inner"]').eq(3)
        .click()
        .wait(500)

    // Back to Slot-page by clicking Slot
    cy.get('[data-cy="navDrawerSlots"]')
        .contains('Slots')
            .click()

    // Add a Slot value where Slot-Type is "Any"
    cy.get('[data-cy="slot-create"]')
        .click({force:true})

    cy.get('[data-cy="slot-name"]')
        .click({force:true})
        .type(addValue+String(a*c))
        cy.log(a*c)

    cy.get('[data-cy="slot-description"]')
        .click({force:true})
        .type(addValue+String(a))

    cy.get('[class="v-select__slot"]')
        .contains('Slot-Typ')
        .click({force:true})

    // 1. Selecting Slot-Typ "Any"
    cy.get('[class="v-list-item__content"]')
        .contains('Any')
        .click({force:true})

    cy.get('[data-cy="slot-any-initialvalue"]')
        .click({force:true})
        // Typing Text
        .type('example Value'+String(a))

    // Click Anlegen
    cy.get('[class="v-btn__content"]')
        .contains('Anlegen')
        .click({force:true})

    cy.wait(500)

    // Selecting Entire Table
    cy.get('[class="v-select__slot"]').click()
    cy.get('[class="v-list-item__content"]')
        .contains('Alle')
            .click()

    cy.log('Line 1623')
    cy.get('tbody')
        .find('tr')
        .find('td:nth-child(3)')
        .contains('Any')
        .click({force:true})

    // Removing Slot-Typ Value by clear method
    cy.get('[data-cy="slot-any-initialvalue"]')
        .clear()
        .type('New Value'+String(a))

    // Back to Slot-page by clicking Slot
    cy.get('[data-cy="navDrawerSlots"]')
        .contains('Slots')
            .click()

    cy.url().should("eq", `${Cypress.config().baseUrl}/trainingsdaten/slot/`);

    // Selecting Entire Table
    cy.get('[class="v-select__slot"]').click()
    cy.get('[class="v-list-item__content"]')
        .contains('Alle')
            .click()

    cy.log('Line 1648')
    cy.get('tbody')
        .find('tr')
        .find('td:nth-child(4)')
        .contains('New Value'+String(a))
        .should('have.text', 'initial: ' +'„New Value'+String(a)+'“')
        .wait(200)

        //4. Bool

        cy.log('Bool')
        cy.log('Line 1662')
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(3)')
            .contains('Bool')
            .click({force:true})

        // Remove Name by clicking "X"
        cy.get('[data-cy="slot-bool-initialvalue-remove"]')
            .click({force:true})

        // Back to Slot-page by clicking Slot
        cy.get('[data-cy="navDrawerSlots"]')
            .contains('Slots')
                .click()

        // Assert Saved value, Empty
        cy.get('[data-cy="slot-table-search"]')
            .click()
            .type('Bool')

        cy.log('Line 1683')
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(4)').eq(0)
            .should('have.text', '')

        // Add Initial Value "True"
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(3)')
            .contains('Bool')
            .click({force:true})

        cy.get('[class="v-label theme--light"]')
            .contains('Wahr')
            .click()

        cy.get('[class="v-input--selection-controls__input"]')
            .find('[value="true"]').eq(0)
            .should('be.checked')

        // Back to Slot-page by clicking Slot
        cy.get('[data-cy="navDrawerSlots"]')
            .contains('Slots')
                .click()

        // Assert Saved value, Initial:Wahr
        cy.get('[data-cy="slot-table-search"]')
            .click()
            .type('Bool')

        cy.log('Line 1714')
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(4)').eq(0)
            .should('have.text', 'initial: Wahr')

        // Add Initial Value "False"
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(3)')
            .contains('Bool')
            .click({force:true})

        cy.get('[class="v-input--selection-controls__input"]')
            .find('[value="false"]').eq(0)
            .click({force:true})

        cy.get('[class="v-input--selection-controls__input"]')
            .find('[value="false"]').eq(0)
            .should('be.checked')

        // Back to Slot-page by clicking Slot
        cy.get('[data-cy="navDrawerSlots"]')
            .contains('Slots')
                .click()

        // Assert Saved value, Initial:Wahr
        cy.get('[data-cy="slot-table-search"]')
            .click()
            .type('Bool')

        cy.log('Line 1745')
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(4)').eq(0)
            .should('have.text', 'initial: Falsch')

        // Clear Search Value
        cy.get('[data-cy="slot-table-search"]')
            .click()
            .clear()

        //4. Categorical

        cy.log('Categorical')

        cy.get('[data-cy="slot-table-search"]')
            .click()
            .clear()
            .type('Categorical')

        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(3)')
            .contains('Categorical')
            .click({force:true})

        cy.log('Slot-Type: Category Mast be disabled')

        cy.get('[class="v-label v-label--active v-label--is-disabled theme--light"]')
            .contains('Slot-Typ')
            .get('[class="v-select__selections"]')
            .find('input')
            .should('have.disabled', 'disabled')

        // Remove Name by clicking "X"
        cy.log('Not Clicking "X" if length less than 3')
        cy.log('Line 616')
        // class="v-input__icon v-input__icon--clear"
        cy.get('[class="v-input__append-outer"]').then((xRemove) => {

            if(xRemove.find('[class="v-icon notranslate v-icon--link theme--light"]').length < 3) {

                cy.log('If Statement True')

                // Back to Slot-page by clicking Slot
                cy.get('[data-cy="navDrawerSlots"]')
                .contains('Slots')
                    .click()
            }

            else {
                cy.log('If Statement False')
                cy.get('[class="v-input__icon v-input__icon--clear"]').eq(2).click()

                // Back to Slot-page by clicking Slot
                cy.get('[data-cy="navDrawerSlots"]')
                    .contains('Slots')
                    .click()
            }
        })
        cy.log('Line 1803')
        // Assert Saved value, Empty
        cy.get('[data-cy="slot-table-search"]')
            .click()
            .type('Categorical')
        cy.log('l '+String(l)+', '+'b '+String(b))

        cy.get('tbody')
            .find('tr')
            .first()
            .click()

        var inName1
        var inName2

        cy.get('[class="v-text-field__slot"]')
            .find('[data-cy="slot-categorical-name"]').eq(0)
            .invoke('val').as('name1')

        cy.get('@name1').then((name1) => {
            cy.log(name1) //prints name
            inName1 = name1
            cy.log(inName1)
        })

        cy.get('[class="v-text-field__slot"]')
            .find('[data-cy="slot-categorical-name"]').eq(1)
            .invoke('val').as('name2')

        cy.get('@name2').then((name2) => {
            cy.log(name2) //prints name
            inName2 = name2

            cy.log(inName2)
        })

        // cy.get('[data-cy="abort-button"]')
        //     .click()
        // back to slots
        cy.get('[data-cy="navDrawerSlots"]')
            .click()

        cy.log('inName1')
        cy.log(inName1)

        cy.get('[data-cy="slot-table-search"]')
            .click()
            .type('Categorical')

        cy.log('Line 1851')
        cy.get('tbody')
            .find('tr')
            .first()
            .find('td:nth-child(4)')
            .then(($categoryAssert) => {
                cy.log('inName')
                cy.log(inName2)
                expect($categoryAssert).to.contain(''+inName1+', '+inName2+' ')
                //expect($categoryAssert).to.contain.text(inName1+', '+inName2+' '+'| '+'initial: '+inName2)
            })

        // Add Initial Value "True"
        cy.log('Line 1864')
        cy.get('tbody')
            .find('tr')
            .first()
            .find('td:nth-child(3)')
            .contains('Categorical')
            .click({force:true})

        cy.get('[class="v-select__selections"]')
            //.find('[type="text"]').eq(1)
            .find('[type="text"]')
            .click({force:true})

        cy.get('[class="v-list-item v-list-item--link theme--light"]')
            .last()
            .click()

        // Back to Slot-page by clicking Slot
        cy.get('[data-cy="navDrawerSlots"]')
            .contains('Slots')
                .click()

        // Assert Saved value, Empty
        cy.get('[data-cy="slot-table-search"]')
            .click()
            .type('Categorical')

        cy.log('Line 1888')
        cy.get('tbody')
            .find('tr')
            .first()
            .find('td:nth-child(4)')
            .then(($categoryAssert2) => {

                expect($categoryAssert2).to.contain(inName1+', '+inName2+' ')
                //expect($categoryAssert2).to.contain(inName1+', '+inName2+' '+'| '+'initial: '+inName2)
            })

        cy.get('[data-cy="slot-table-search"]')
            .click()
            .clear()

        // 5. Float
        cy.log('Float')
        cy.log('Line 1903')
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(3)')
            .contains('Float')
            .click({force:true})

        cy.log('Slot-Type: Float Mast be disabled')

        cy.get('[class="v-label v-label--active v-label--is-disabled theme--light"]')
            .contains('Slot-Typ')
            .get('[class="v-select__selections"]')
            .find('input')
            .should('have.disabled', 'disabled')

        // Clear Min, Max, Initial Value
        cy.get('[placeholder="Default: 0,0"]')
            .clear()
        cy.get('[placeholder="Default: 1,0"]')
            .clear()
        cy.get('[data-cy="slot-float-initialvalue"]')
            .find('[class="v-input__slot"]')
            .clear()

        // abort-button
        cy.get('[data-cy="abort-button"]').click()

        // Back to Slot-page by clicking Slot
        cy.get('[data-cy="navDrawerSlots"]')
            .contains('Slots')
                .click()

        //add values to slot for test search field
        var floatValues = [{min: '0,0', max: '1,0'}, {min:'1,0', max: '2,0'}, {min:'1,5', max: '2,5'}, {min:'2,0', max: '3,0'}]
        cy.wrap(floatValues).each((value) => {

            // Add Only Min Value
            cy.get('tbody')
            .find('tr')
            .find('td:nth-child(3)')
            .contains('Float')
            .click({force:true})

            cy.log('Line 806')

            cy.get('[data-cy="slot-float-minvalue"]')
                .find("input")
                .clear()
                .type(value.min)

            cy.get('[data-cy="slot-float-maxvalue"]')
                .find("input")
                .clear()
                .type(value.max)

            cy.get('[data-cy="slot-float-initialvalue"]')
                .find("input")
                .clear()

            // Back to Slot-page by clicking Slot
            cy.get('[data-cy="navDrawerSlots"]')
                .contains('Slots')
                    .click()

            cy.get('[data-cy="slot-table-search"]')
                .click()
                .type('Float')

            cy.log('Line 823')

            cy.get('tbody')
            .find('tr')
            .find('td:nth-child(4)').eq(0)
            .should('have.text', 'min: '+value.min+' max: '+value.max+' ')

            cy.get('[data-cy="slot-table-search"]')
                .click()
                .clear()
        })

        // Add Only Min Value
        cy.get('tbody')
        .find('tr')
        .find('td:nth-child(3)')
        .contains('Float')
        .click({force:true})

        // Clear Min, Max, Initial Value
        cy.get('[data-cy="slot-float-minvalue"]')
            .find("input")
            .clear()
        cy.get('[data-cy="slot-float-maxvalue"]')
            .find("input")
            .clear()
        cy.get('[data-cy="slot-float-initialvalue"]')
            .find("input")
            .clear()
            .type(5)

        // Assert Error Message
        cy.get('[class="v-messages__message"]')
        //.should('have.text', 'Der initiale Wert eines Slots des Typs „Float” muss zwischen minimalem und maximalem Wert liegen')
            .should('contain', 'Die vorliegende Formatierung des initial Wertes ist nicht zulässig!')

        cy.get('[data-cy="slot-float-initialvalue"]')
            .find("input")
            .clear()
            .type("1,0")

        // Back to Slot-page by clicking Slot
        // cy.get('[data-cy="navDrawerSlots"]')
        //     .contains('Slots')
        //     .click()

        cy.get('[data-cy="abort-button"]')
            .click()

        // Assert Saved value, Empty
        cy.get('[data-cy="slot-table-search"]')
            .click()
            .type('Float')

        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(4)').eq(0)
            .should('contain', 'min: 1,0 max: 2,0  | initial: 1,0')

        // Clear Search
        cy.get('[data-cy="slot-table-search"]')
            .click()
            .clear()
    }
}
// Exportint class frontEnd to End2End to test
export const onSlotBearbeiten = new slot_bearbeiten()