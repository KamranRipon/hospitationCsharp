import { onRoleBasedTesting } from "../support/page_objects/04_Additional-TestCases/02_Role_base_Testing"

describe("Test Case: Role Based Testing", () => {
   
    beforeEach('visit url', () => {
        
        cy.visit('/')
        
        //cy.loginiFunction('admin', 'cciAdmin#2022+')
        cy.wait(500)
        //Cypress.Cookies.preserveOnce('session_id', 'remember_token')
    })

    it("CCI-T89: Login as Operator:in", () => {
        onRoleBasedTesting.user_operator()
        /* 
        1. Log in as Operator:in
        2. Logout and login as admin
        3. select and save role
        4. Train a Model
        */
    })

    it("CCI-T90: Login as Redakteur:in", () => {
        onRoleBasedTesting.user_redakteur()
        /* 
        1. Log in as Redakteur:in
        2. Logout and login as admin
        3. select and save role
        4. Test Intent Hinzufuegen
        */
    })

    it("CCI-T93: Login as Datenadmin:in", () => {
        onRoleBasedTesting.user_datenadmin()
        /* 
        1. Log in as Datenadmin:in
        2. Logout and login as admin
        3. select and save role
        4. Test only Import
        */
    })

    it("CCI-T92: Login as Accountmanager:in", () => {
        onRoleBasedTesting.user_accountmanager()
        /* 
        1. Log in as Redakteur:in
        2. Logout and login as admin
        3. select and save role
        */
    })
})