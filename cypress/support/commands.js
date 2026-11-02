Cypress.Commands.add("login", (email, senha) => {
  cy.contains("Signup / Login").click();
  cy.get('[data-qa="login-email"]').type(email);
  cy.get('[data-qa="login-password"]').type(senha);
  cy.get('[data-qa="login-button"]').click();
});