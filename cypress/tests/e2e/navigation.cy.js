describe("Funcionalidade de Navegar Entre as Páginas:", () => {
  context("Como um usuário:", () => {
    context("Quando clicar nos botões de navegação do menu superior:", () => {
      it("devo conseguir navegar entre as páginas, com feedback nos botões de qual página estou", () => {
        cy.visit("/");

        // Verifica se estamos na URL "/" e se o botão de home está ativo
        cy.url().should("eq", "http://localhost:3000/");

        cy.get('button[data-cy="home-button"]').should("have.class", "btn-active");

        cy.get("h1").should("have.text", "Reading Journal");

        // Navega para a página de "Sobre" e faz as verificações
        cy.get('button[data-cy="about-button"]').click().should("have.class", "btn-active");

        cy.url().should("include", "/about");

        cy.get("h2").should("have.text", "Sobre");

        // Navega para a página de "Cadastrar Livro" e faz as verificações
        cy.get('button[data-cy="register-button"]').click().should("have.class", "btn-active");

        cy.url().should("include", "/register");

        cy.get("h2").should("have.text", "Formulário de Cadastro:");

        // Navega para a página de "Ver Leituras" e faz as verificações
        cy.get('button[data-cy="booklist-button"]').click().should("have.class", "btn-active");

        cy.url().should("include", "/booklist");

        cy.get("h2").should("have.text", "Lista de Livros");
      });
    });
  });
});
