Cypress.Commands.add("login", (email, password) => {
    cy.request({
        method: "POST",
        url: "/api/auth/login",
        failOnStatusCode: false,
        body: {
            email: email,
            password: password,
        },
    }).then((res) => {
        if (res.status === 200) {
            window.localStorage.setItem("user", JSON.stringify(res.body.user));
            window.localStorage.setItem("token", res.body.token);
            cy.wrap(res.body.user).as("user");
            cy.wrap(res.body.token).as("token");
        }
    });
});

Cypress.Commands.add("getUserProfile", (email, password) => {
    cy.request({
        method: "POST",
        url: "/api/auth/login",
        failOnStatusCode: false,
        body: {
            email: email,
            password: password,
        },
    })
        .then((res) => {
            window.localStorage.setItem("user", JSON.stringify(res.body.user));
            window.localStorage.setItem("token", res.body.token);
            cy.wrap(res.body.user).as("user");
            cy.wrap(res.body.token).as("token");
            console.log(res.body);
            cy.request({
                method: "GET",
                url: `/api/user/${res.body.user._id}`,
                headers: { Authorization: "Bearer " + res.body.token },
            });
        })
        .then((res) => {
            cy.wrap(res.body).as("userProfile");
        });
});

Cypress.Commands.add("getAllPosts", () => {
    cy.request({
        method: "GET",
        url: "/api/post/",
        failOnStatusCode: false,
    }).then((res) => {
        cy.wrap(res.body).as("listPosts");
        expect(res.status).to.eq(200);
    });
});

Cypress.Commands.add("createLike", (postId) => {
    const token = localStorage.getItem('token')
    console.log(token);
    cy.request({
        method: "POST",
        url: "/api/like",
        body:  { postId: postId} , 
        headers: { Authorization: "Bearer " + token },
    }).then((res) => {
        expect(res.status).to.eq(200);
    });
    
});

// -------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------
