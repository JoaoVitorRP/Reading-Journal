import dayjs from "dayjs";

const title = "Teste Cypress";
const author = "Testador";
const genre = "Teste";
const readAt = "2025-03-31";

const editedTitle = "Testes Cypress";
const editedAuthor = "Testadora";
const editedGenre = "Testes";
const editedReadAt = "2025-04-01";

describe("Funcionalidade de Ver e Editar a Lista de Livros:", () => {
  context("Como um usuário:", () => {
    context("Quando acessar a minha lista de livros:", () => {
      let bookId = 0;

      // Cria um livro para ser editado
      beforeEach(() => {
        cy.request("POST", "http://localhost:5000/books/", {
          title,
          author,
          genre,
          readAt,
        }).then((res) => {
          expect(res.status).to.eq(200);
        });

        cy.intercept("GET", "**/books/").as("getBooks");

        cy.visit("/booklist");

        cy.wait("@getBooks", { timeout: 10000 });

        // Atribui o ID do último livro para a variável "bookId"
        cy.get('div[data-cy="booklist"]')
          .children()
          .last()
          .invoke("attr", "id")
          .then((elementId) => {
            bookId = elementId;
          });
      });

      // Exclui o livro alvo dos testes (último da lista)
      afterEach(() => {
        if (!Cypress.currentTest.title.includes("@skipAfterEach")) {
          cy.request("DELETE", `http://localhost:5000/books/${bookId}`).then((res) => {
            expect(res.status).to.eq(200);
          });
        }
      });

      it("devo conseguir ver uma lista contendo as minhas leituras", () => {
        // Verifica se a lista de livros possui livros nela
        cy.get("h2").should("have.text", "Lista de Livros");

        cy.get('div[data-cy="booklist"]').children().should("have.length.gt", 0);
      });

      context("Quando clicar para editar um livro:", () => {
        // Clica para editar o último livro da lista
        beforeEach(() => {
          cy.get('div[data-cy="booklist"]')
            .children()
            .last()
            .within(() => {
              cy.get('button[data-cy="edit"]').click();
            });
        });

        const editField = (field, expectedValue, valueToEdit) => {
          cy.intercept("PUT", "**/books/").as("editBook");

          // Edita o campo desejado e clica para atualizar
          // Se "field" é igual a "all", edita todos os campos
          if (field !== "all") {
            cy.get(`input#${field}`).should("have.value", expectedValue).click().clear().type(valueToEdit);
          } else {
            cy.get(`input#title`).should("have.value", title).click().clear().type(editedTitle);
            cy.get(`input#author`).should("have.value", author).click().clear().type(editedAuthor);
            cy.get(`input#genre`).should("have.value", genre).click().clear().type(editedGenre);
            cy.get(`input#readAt`).should("have.value", readAt).click().clear().type(editedReadAt);
          }

          cy.get('button[data-cy="confirm"]').click();

          cy.wait("@editBook", { timeout: 10000 });
          cy.wait("@getBooks", { timeout: 10000 });

          // Verifica se apareceu o alerta de que o livro foi editado
          cy.get("section.Toastify div")
            .should("be.visible")
            .and(
              "contain.text",
              `O livro "${field === "title" || field === "all" ? editedTitle : title}" foi editado com sucesso!`
            );

          // Verifica se, no livro da lista, foi atualizado somente o campo desejado (ou todos, caso "field" seja igual a "all")
          cy.get('div[data-cy="booklist"]')
            .children()
            .last()
            .within(() => {
              cy.get('p[data-cy="booklist-title"] span').should(
                "have.text",
                field === "title" || field === "all" ? editedTitle : title
              );
              cy.get('p[data-cy="booklist-author"] span').should(
                "have.text",
                field === "author" || field === "all" ? editedAuthor : author
              );
              cy.get('p[data-cy="booklist-genre"] span').should(
                "have.text",
                field === "genre" || field === "all" ? editedGenre : genre
              );
              cy.get('p[data-cy="booklist-readat"] span').should(
                "have.text",
                field === "readAt" || field === "all"
                  ? dayjs(editedReadAt).format("DD/MM/YYYY")
                  : dayjs(readAt).format("DD/MM/YYYY")
              );
            });
        };

        it("devo conseguir editar o título", () => {
          editField("title", title, editedTitle);
        });

        it("devo conseguir editar o autor", () => {
          editField("author", author, editedAuthor);
        });

        it("devo conseguir editar o gênero", () => {
          editField("genre", genre, editedGenre);
        });

        it("devo conseguir editar a data", () => {
          editField("readAt", readAt, editedReadAt);
        });

        it("devo conseguir editar todos os campos", () => {
          editField("all");
        });

        it("devo conseguir cancelar a edição", () => {
          // Clica no botão de cancelar e verifica se o formulário foi fechado
          cy.get('button[data-cy="cancel"]').should("be.visible").click();

          cy.get("form").should("not.exist");
        });
      });

      context("Quando clicar para excluir um livro:", () => {
        beforeEach(() => {
          cy.get('div[data-cy="booklist"]')
            .children()
            .last()
            .within(() => {
              cy.get('button[data-cy="delete"]').click();
            });
        });

        it(
          "devo conseguir confirmar a exclusão e o livro deve ser removido da lista",
          { tags: "@skipAfterEach" },
          () => {
            cy.intercept("DELETE", "**/books/*").as("deleteBook");

            // Verifica se o modal de confirmação foi aberto e confirma a exclusão
            cy.get("div.swal2-popup.swal2-modal.swal2-icon-warning.swal2-show")
              .should("be.visible")
              .within(() => {
                cy.get("div.swal2-actions button.swal2-confirm.btn.btn-success")
                  .should("be.visible")
                  .and("have.text", "Sim, excluir!")
                  .click();
              });

            cy.wait("@deleteBook", { timeout: 10000 });
            cy.wait("@getBooks", { timeout: 10000 });

            // Verifica se apareceu o modal de confirmação de exclusão
            cy.get("div.swal2-popup.swal2-modal.swal2-icon-success.swal2-show")
              .should("be.visible")
              .within(() => {
                cy.get("h2.swal2-title").should("be.visible").and("have.text", "Apagado com sucesso!");

                cy.get("div#swal2-html-container")
                  .should("be.visible")
                  .and("have.text", `O livro "${title}" foi removido da sua lista.`);

                cy.get("div.swal2-actions button.swal2-confirm.btn.btn-success")
                  .should("be.visible")
                  .and("have.text", "OK")
                  .click();
              });

            // Verifica se o modal sumiu
            cy.get("div.div.swal2-popup.swal2-modal.swal2-icon-success.swal2-show").should("not.exist");

            // Verifica se o livro não está mais na lista
            cy.contains('div[data-cy="booklist"] p[data-cy="booklist-title"]', title).should("not.exist");
          }
        );

        it("devo conseguir fechar o modal de exclusão, sem que o livro seja removido da lista", () => {
          // Verifica se o modal de confirmação foi aberto e cancela a exclusão
          cy.get("div.swal2-popup.swal2-modal.swal2-icon-warning.swal2-show")
            .should("be.visible")
            .within(() => {
              cy.get("div.swal2-actions button.swal2-cancel.btn.btn-danger.me-3")
                .should("be.visible")
                .and("have.text", "Não, cancelar!")
                .click();
            });

          // Verifica se o modal sumiu
          cy.get("div.div.swal2-popup.swal2-modal.swal2-icon-success.swal2-show").should("not.exist");

          // Verifica se o livro ainda está na lista
          cy.get('div[data-cy="booklist"]')
            .children()
            .last()
            .within(() => {
              cy.get('p[data-cy="booklist-title"] span').should("have.text", title);
              cy.get('p[data-cy="booklist-author"] span').should("have.text", author);
              cy.get('p[data-cy="booklist-genre"] span').should("have.text", genre);
              cy.get('p[data-cy="booklist-readat"] span').should("have.text", dayjs(readAt).format("DD/MM/YYYY"));
            });
        });
      });
    });
  });
});
