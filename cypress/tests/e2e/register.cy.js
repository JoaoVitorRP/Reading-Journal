const title = "Teste Cypress";
const author = "Testador";
const genre = "Teste";
const readAt = "2025-03-31";

describe("Funcionalidade de Cadastrar um Livro:", () => {
  context("Como um usuário:", () => {
    context('Quando acessar a página de "Cadastrar Livro":', () => {
      beforeEach(() => {
        cy.visit("/register");
      });

      const checkBookNotAdded = () => {
        // Verifica se o livro não foi adicionado à lista
        cy.request("GET", "http://localhost:5000/books/").then((res) => {
          const data = res.body;

          expect(data).length.to.be.greaterThan(0);

          expect(data[data.length - 1]).to.not.deep.equal({
            id: data.length,
            title,
            author,
            genre,
            readAt,
          });
        });
      };

      it("não devo conseguir cadastrar um livro novo sem preencher todo o formulário (campos obrigatórios)", () => {
        cy.get("form").should("be.visible");

        // Preenche o título e tenta adicionar o livro
        cy.get("form input#title").click().type(title);

        cy.get('button[data-cy="confirm"]').click();

        // Verifica se o livro não foi adicionado à lista
        checkBookNotAdded();

        // Preenche o autor e tenta adicionar o livro
        cy.get("form input#author").click().type(author);

        cy.get('button[data-cy="confirm"]').click();

        // Verifica se o livro não foi adicionado à lista
        checkBookNotAdded();

        // Preenche o gênero e tenta adicionar o livro
        cy.get("form input#genre").click().type(genre);

        cy.get('button[data-cy="confirm"]').click();

        // Verifica se o livro não foi adicionado à lista
        checkBookNotAdded();

        // Preenche a data de leitura e tenta adicionar o livro
        cy.get("form input#title").click().clear();

        cy.get("form input#readAt").click().type(readAt);

        cy.get('button[data-cy="confirm"]').click();

        // Verifica se o livro não foi adicionado à lista
        checkBookNotAdded();
      });

      it("devo conseguir cadastrar um livro novo ao preencher todo o formulário", () => {
        let bookId = 0;

        cy.intercept("POST", "**/books/").as("postBook");

        // Preenche o formulário de cadastro de livro e confirma
        cy.get("form")
          .should("be.visible")
          .within(() => {
            cy.get("input#title").click().type(title);
            cy.get("input#author").click().type(author);
            cy.get("input#genre").click().type(genre);
            cy.get("input#readAt").click().type(readAt);

            cy.get('button[data-cy="confirm"]').click();
          });

        cy.wait("@postBook", { timeout: 10000 });

        // Verifica se apareceu o alerta de que o livro foi cadastrado
        cy.get("section.Toastify div")
          .should("be.visible")
          .and("contain.text", `Livro "${title}" cadastrado com sucesso!`);

        // Verifica se o livro novo realmente consta na lista de livros
        cy.request("GET", "http://localhost:5000/books/").then((res) => {
          const data = res.body;

          expect(data).length.to.be.greaterThan(0);

          expect(data[data.length - 1]).to.deep.equal({
            id: data.length,
            title,
            author,
            genre,
            readAt,
          });

          bookId = data[data.length - 1].id;

          // Exclui o livro recém criado
          cy.request("DELETE", `http://localhost:5000/books/${bookId}`).then((res) => {
            expect(res.status).to.eq(200);
          });
        });
      });

      it("devo conseguir cancelar o cadastro, limpando o formulário e não adicionando nenhum livro novo à lista", () => {
        // Preenche o formulário de cadastro de livro e cancela
        cy.get("form")
          .should("be.visible")
          .within(() => {
            cy.get("input#title").click().type(title);
            cy.get("input#author").click().type(author);
            cy.get("input#genre").click().type(genre);
            cy.get("input#readAt").click().type(readAt);

            cy.get('button[data-cy="cancel"]').click();
          });

        // Verifica se o formulário foi limpo
        cy.get("form")
          .should("be.visible")
          .within(() => {
            cy.get("input#title").should("have.value", "");
            cy.get("input#author").should("have.value", "");
            cy.get("input#genre").should("have.value", "");
            cy.get("input#readAt").should("have.value", "");
          });

        // Verifica se o livro não foi adicionado à lista
        cy.request("GET", "http://localhost:5000/books/").then((res) => {
          const data = res.body;

          expect(data).length.to.be.greaterThan(0);

          expect(data[data.length - 1]).to.not.deep.equal({
            id: data.length,
            title,
            author,
            genre,
            readAt,
          });
        });
      });
    });
  });
});
