describe("Petstore_user", () => {
  const userName = "Natalia Kobeleva";
  it("Create user", () => {
    cy.createUser(userName);
  });

  it.only("Update user", () => {
    cy.createUser(userName);
    cy.request("GET", `/user/${userName}`).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.eql({
        id: 100,
        userStatus: 2,
        username: userName,
      });

      const newUserName = "Dmitrii Ivanov";
      cy.request({
        method: "PUT",
        url: `/user/${userName}`,
        body: {
          id: 100,
          userStatus: 2,
          username: newUserName,
        },
      }).then((response) => {
        expect(response.status).to.equal(200);

        cy.request("GET", `/user/${newUserName}`).then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.eql({
            id: 100,
            userStatus: 2,
            username: newUserName,
          });
        });
      });
    });
  });

  it("Delete user", () => {
    cy.createUser(userName);
    cy.request("GET", `/user/${userName}`).then((response) => {
      expect(response.status).to.equal(200);

      cy.request("DELETE", `/user/${userName}`).then((response) => {
        expect(response.status).to.equal(200);
      });
    });
  });
});
