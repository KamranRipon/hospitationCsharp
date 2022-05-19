import { onModel } from "../support/page_objects/04_Additional-TestCases/03_Models"

describe("Test Case: Role Based Testing", () => {
   
    beforeEach('visit url', () => {
        
        cy.visit('/')
        
        //cy.loginiFunction('admin', 'cciAdmin#2022+')
        cy.wait(500)
        //Cypress.Cookies.preserveOnce('session_id', 'remember_token')
    })

    it("CCI-T89: Login as Operator:in", () => {
        onModel.train_model()
        /* 
        1. Log in as Operator:in
        2. Logout and login as admin
        3. select and save role
        4. Train a Model
        */
    })
})