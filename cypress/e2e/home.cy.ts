describe("Home Page", () => {
  beforeEach(() => {
    cy.login("test@test.com", "test12345")
  });

  it("displays all navigation cards", () => {
    // Check main section
    cy.get("h1").should("contain", "The Ultimate Yearbook Experience");

    cy.get('a[href*="/event"]').should("be.visible");
    cy.get('a[href*="/manage"]').should("be.visible");
  });

  it("navigates to correct routes when clicking cards", () => {

    cy.get('a[href="/class/1"]').click({multiple: true});
    cy.url().should("include", "/class/1");
    cy.go("back");

    cy.get('a[href="/event/create"]').click({multiple: true});
    cy.url().should("include", "/event/create");
    cy.go("back");

    cy.get('a[href="/event"]').click({multiple: true});
    cy.url().should("include", "/event");
    cy.go("back");

    cy.get('a[href*="/manage"]').click({multiple: true});
    cy.url().should("include", "/manage");
  });

  it("is responsive", () => {
    // Mobile view
    cy.viewport("iphone-6");
    cy.get(".grid").should("be.visible");

    // Tablet view
    cy.viewport("ipad-2");
    cy.get(".grid").should("be.visible");

    // Desktop view
    cy.viewport(1920, 1080);
    cy.get(".grid").should("be.visible");
  });

});
