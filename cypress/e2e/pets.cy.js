describe("Petstore", () => {
  it("create pet", () => {
    const pet_id = 33;
    const pet_name = "Dog";

    cy.request("POST", "/pet", {
      id: pet_id,
      name: pet_name,
    }).then((response) => {
      expect(response.status).be.eql(200);
      expect(response.body).be.eqls({
        id: pet_id,
        name: pet_name,
        photoUrls: [],
        tags: [],
      });

      var petId = response.body.id;
      cy.request(`/pet/${petId}`).then((response) => {
        expect(response.status).be.eql(200);
        expect(response.body).be.eqls({
          id: pet_id,
          name: pet_name,
          photoUrls: [],
          tags: [],
        });

        cy.request("DELETE", `/pet/${petId}`).then((response) => {
          expect(response.status).be.eql(200);

          cy.request({
            method: "GET",
            url: `/pet/${petId}`,
            failOnStatusCode: false,
          }).then((response) => {
            expect(response.status).be.eql(404);
          });
        });
      });
    });
  });
});
