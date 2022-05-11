/* eslint-disable no-undef */
describe("Visting the application", () => {  
  describe("with API responding", () => {
    beforeEach(() => {
      cy.intercept("GET", "https://reqres.in/api/users", {
        fixture: "users.json",
      }).as("usersGet");
      cy.visit("/");
      cy.get("[data-cy=employee-list]").as("theList");
    });

    // ASSERT
    it("is expected to make a GET request to API", () => {
      cy.wait("@usersGet").its("request.method").should("equal", "GET");
    });

    it("is expected to render a list", () => {
      cy.get("@theList").children().should("have.length", 6);
    });

    it("is expected to display Thomas on top", () => {
      cy.get("@theList").within(() => {
        cy.get("div .header").first().should("contain", "Thomas Ochman");
      });
    });
  });

  describe("with API rendering an error", () => {
    beforeEach(() => {
      cy.intercept("GET", "https://reqres.in/api/users", { statusCode: 500 });
      cy.visit("/");
      cy.get("[data-cy=employee-list]").as("theList");

    });

    it("is expected to display an error notice", () => {
      cy.get("@theList").should("contain.text", "The server is down");
    });
  });
});
