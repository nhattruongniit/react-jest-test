describe("My First Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("Form Login", () => {
    cy.get("#formLogin")
      .find('input[placeholder="email"]')
      .type("truong@gmail.com")
      .should("have.value", "truong@gmail.com");
    cy.get("#formLogin")
      .submit()
      .visit("http://localhost:3000/home");
  });
});
