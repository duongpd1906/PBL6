const existValidEmail = "hieu@gmail.com";
const exisvalidPassword = "123456";

describe("Post spec", () => {
    let userProfile;
    let listPosts;
    let token;
    before(() => {
        cy.visit("http://localhost:3000/");
        cy.getUserProfile(existValidEmail, exisvalidPassword);
        cy.getAllPosts();
        cy.get("@userProfile").then((data) => {
            userProfile = data;
        });
        cy.get("@listPosts").then((data) => {
            listPosts = data;
        });
        cy.get("@token").then((data) => {
            token = data;
        });
        cy.visit("http://localhost:3000/");
    });
    beforeEach(() => {
        window.localStorage.setItem("token", token);
    });
    it("Check post data", () => {
        listPosts.map((post, index) => {
            cy.get(".post-content")
                .eq(index)
                .find(".img-circle")
                .should("have.attr", "src")
                .should("include", post.user.avatar);

            cy.get(".post-container__bottom__comment")
                .eq(index)
                .find(".img-circle")
                .should("have.attr", "src")
                .should("include", userProfile.user.avatar);

            if (post.text) {
                cy.get(".post-content")
                    .eq(index)
                    .find(".post-text")
                    .should("have.text", post.text);
            }
        });
    });

    it("Check like state and number of like", () => {
        listPosts.map((post, index) => {
            if (post.likes.length > 0) {
                cy.get(".post-container__bottom")
                    .eq(index)
                    .find(".number-of-like");
                cy.get(".post-container__bottom")
                    .eq(index)
                    .find(".number-of-like")
                    .find("span")
                    .should("have.text", post.likes.length);
            }

            const likePostState = post.likes.find(
                (userId) => userId === userProfile.user._id
            );
            if (likePostState) {
                cy.get(".like-post-state")
                    .eq(index)
                    .should("have.class", "txt-blue");
            } else {
                cy.get(".like-post-state")
                    .eq(index)
                    .should("not.have.class", "txt-blue");
            }
        });
    });

    it("Check number of comment", () => {
        listPosts.map((post, index) => {
            if (post.comments.length > 0) {
                cy.get(".post-container__bottom")
                    .eq(index)
                    .find(".number-of-comment")
                    .find("span")
                    .should("have.text", post.comments.length + " bình luận");
            }
        });
    });

    it("Check action like post", () => {
        listPosts.map((post, index) => {
            if (post.status === "1") {
                cy.get(".post-container__bottom__action")
                    .eq(index)
                    .find("p")
                    .contains("Thích")
                    .click();
                const likePostState = post.likes.find(
                    (userId) => userId === userProfile.user._id
                );
                if (likePostState) {
                    cy.get(".like-post-state")
                        .eq(index)
                        .should("not.have.class", "txt-blue");
                    cy.get(".number-of-like")
                        .eq(index)
                        .find("span")
                        .should("have.text", --post.likes.length);
                } else {
                    cy.get(".like-post-state")
                        .eq(index)
                        .should("have.class", "txt-blue");
                    cy.get(".number-of-like")
                        .eq(index)
                        .find("span")
                        .should("have.text", ++post.likes.length);
                }
                cy.createLike(post._id);

            }
        });
    });

    it("Check show comment", () => {
        listPosts.map((post, index) => {
            if (post.status === "1") {
                cy.get(".post-container__bottom__action")
                    .eq(index)
                    .find("p")
                    .contains("Bình luận")
                    .click();
                if (post.comments.length > 0) {
                    cy.get(".comment-container").should("be.exist");
                }
            }
        });
    });

    // }
    //Check image
    //Check btn-next & btn-prev when post have one image or don't have
    //Check time
    //Check name

    // Check click button comment show comment

    // Check list comments data
    // Check number of like of comment
    // Check button like

    // Check replied comment
    // Check number of like of comment
    // Check number of like of replied comment

    // Check show replying component

    // show more comment
});
