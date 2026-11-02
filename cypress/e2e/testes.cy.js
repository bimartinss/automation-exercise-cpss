describe("Automation Exercise", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("TC01 - Register User", () => {
    const email = `teste${Date.now()}@email.com`;

    cy.contains("Signup / Login").click();
    cy.get('[data-qa="signup-name"]').type("Teste Cypress");
    cy.get('[data-qa="signup-email"]').type(email);
    cy.get('[data-qa="signup-button"]').click();

    cy.contains("Enter Account Information").should("be.visible");
    cy.get("#id_gender1").check({ force: true });
    cy.get('[data-qa="password"]').type("Teste123");
    cy.get('[data-qa="days"]').select("10");
    cy.get('[data-qa="months"]').select("May");
    cy.get('[data-qa="years"]').select("1995");
    cy.get('[data-qa="first_name"]').type("Teste");
    cy.get('[data-qa="last_name"]').type("Cypress");
    cy.get('[data-qa="address"]').type("Rua Teste, 123");
    cy.get('[data-qa="country"]').select("United States");
    cy.get('[data-qa="state"]').type("Virginia");
    cy.get('[data-qa="city"]').type("Manassas");
    cy.get('[data-qa="zipcode"]').type("20110");
    cy.get('[data-qa="mobile_number"]').type("2025550123");
    cy.get('[data-qa="create-account"]').click();
    cy.contains("Account Created!").should("be.visible");
    cy.get('[data-qa="continue-button"]').click();
    cy.contains("Logged in as").should("be.visible");
  });

  it("TC02 - Login User with correct email and password", () => {
    cy.contains("Signup / Login").click();
    cy.get('[data-qa="login-email"]').type("email.teste@email.com");
    cy.get('[data-qa="login-password"]').type("Teste123");
    cy.get('[data-qa="login-button"]').click();
    cy.contains("Logged in as").should("be.visible");
  });

  it("TC03 - Login User with incorrect email and password", () => {
    cy.contains("Signup / Login").click();
    cy.get('[data-qa="login-email"]').type("email.invalido@email.com");
    cy.get('[data-qa="login-password"]').type("senhaerrada");
    cy.get('[data-qa="login-button"]').click();
    cy.contains("Your email or password is incorrect!").should("be.visible");
  });

  it("TC04 - Logout User", () => {
    cy.contains("Signup / Login").click();
    cy.get('[data-qa="login-email"]').type("email.teste@email.com");
    cy.get('[data-qa="login-password"]').type("Teste123");
    cy.get('[data-qa="login-button"]').click();
    cy.contains("Logged in as").should("be.visible");
    cy.contains("Logout").click();
    cy.contains("Login to your account").should("be.visible");
  });

  it("TC05 - Register User with existing email", () => {
    cy.contains("Signup / Login").click();
    cy.get('[data-qa="signup-name"]').type("Teste Cypress");
    cy.get('[data-qa="signup-email"]').type("email.teste@email.com");
    cy.get('[data-qa="signup-button"]').click();
    cy.contains("Email Address already exist!").should("be.visible");
  });

  it("TC08 - Verify All Products and product detail page", () => {
    cy.contains("Products").click();
    cy.url().should("include", "/products");
    cy.get(".features_items .product-image-wrapper").should("have.length.greaterThan", 0);
    cy.get(".features_items a[href^='/product_details/']").first().click();
    cy.get(".product-information").should("be.visible");
  });

  it("TC09 - Search Product", () => {
    cy.contains("Products").click();
    cy.get("#search_product").type("Blue Top");
    cy.get("#submit_search").click();
    cy.contains("Searched Products").should("be.visible");
    cy.get(".features_items .product-image-wrapper").should("have.length.greaterThan", 0);
  });

  it("TC10 - Verify Subscription in home page", () => {
    cy.get("#footer").scrollIntoView();
    cy.get("#susbscribe_email").type(`teste${Date.now()}@email.com`);
    cy.get("#subscribe").click();
    cy.contains("You have been successfully subscribed!").should("be.visible");
  });

  it("TC15 - Place Order: Register before Checkout", () => {
    const email = `pedido${Date.now()}@email.com`;
    cy.contains("Signup / Login").click();
    cy.get('[data-qa="signup-name"]').type("Teste Pedido");
    cy.get('[data-qa="signup-email"]').type(email);
    cy.get('[data-qa="signup-button"]').click();
    cy.get("#id_gender1").check({ force: true });
    cy.get('[data-qa="password"]').type("Teste123");
    cy.get('[data-qa="days"]').select("10");
    cy.get('[data-qa="months"]').select("May");
    cy.get('[data-qa="years"]').select("1995");
    cy.get('[data-qa="first_name"]').type("Teste");
    cy.get('[data-qa="last_name"]').type("Pedido");
    cy.get('[data-qa="address"]').type("Rua Teste, 123");
    cy.get('[data-qa="country"]').select("United States");
    cy.get('[data-qa="state"]').type("Virginia");
    cy.get('[data-qa="city"]').type("Manassas");
    cy.get('[data-qa="zipcode"]').type("20110");
    cy.get('[data-qa="mobile_number"]').type("2025550123");
    cy.get('[data-qa="create-account"]').click();
    cy.get('[data-qa="continue-button"]').click();
    cy.contains("Add to cart").first().click();
    cy.contains("View Cart").click();
    cy.contains("Proceed To Checkout").click();
    cy.contains("Address Details").should("be.visible");
  });

  it("TC16 - Place Order: Login before Checkout", () => {
    cy.contains("Signup / Login").click();
    cy.get('[data-qa="login-email"]').type("email.teste@email.com");
    cy.get('[data-qa="login-password"]').type("Teste123");
    cy.get('[data-qa="login-button"]').click();
    cy.contains("Logged in as").should("be.visible");
    cy.contains("Add to cart").first().click();
    cy.contains("View Cart").click();
    cy.contains("Proceed To Checkout").click();
    cy.contains("Address Details").should("be.visible");
  });
});
