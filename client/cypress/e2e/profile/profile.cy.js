const existValidEmail = "hieu@gmail.com";
const exisvalidPassword = "123456";

describe("Profile spec", () => {
    let userProfile;
    let listPosts;
    let user;
    let token;
    before(() => {
        cy.visit("http://localhost:3000/profile");
        cy.getUserProfile(existValidEmail, exisvalidPassword);
        cy.getAllPosts()
        cy.get("@userProfile").then((data) => {
            userProfile = data;
        });
        cy.get("@listPosts").then((data) => {
            listPosts = data.filter(post => post.user._id === userProfile.user._id);
        });
        cy.get("@user").then((data) => {
            user = data;
        });
        cy.get("@token").then((data) => {
            token = data;
        });
        cy.visit("http://localhost:3000/profile");
    });
    beforeEach(() => {
        window.localStorage.setItem("user", JSON.stringify(user));
        window.localStorage.setItem("token", token);
    });
    it("Check avatar, username, friend", () => {
        cy.get(".profile-container__top")
            .find("img")
            .should("have.attr", "src")
            .should("include", userProfile.user.avatar);
        if (userProfile.fullName !== "") {
            cy.get(".profile-container__top")
                .find("h2")
                .should("have.text", userProfile.fullName);
        } else {
            cy.get(".profile-container__top")
                .find("h2")
                .should("have.text", userProfile.user.username);
        }
        cy.get(".profile-container__top")
            .find("h6")
            .contains(userProfile.friends.length);
        cy.get(".profile-container__top")
            .find("button")
            .should("have.text", "Chỉnh sửa");
    });

    it("Check show modal edit profile", () => {
        cy.get(".profile-container__top")
            .find("button")
            .contains("Chỉnh sửa")
            .click();
        cy.get(".ant-modal-mask").should("be.exist");
        cy.get(".ant-modal-wrap").should("not.have.css", "display", "none");
        cy.get(".edit-profile__content__footer")
            .find("button")
            .contains("Thoát")
            .click();
    });

    it("Check post data in post tag", () => {
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

    it("Check like state and number of like in post tag", () => {
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

    it("Check number of comment in post tag", () => {
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

    it("Check action like post in post tag", () => {
        console.log(userProfile);
        listPosts.map((post, index) => {
            if (post.status === "1") {
                cy.get(".post-container__bottom__action")
                    .eq(index)
                    .find("p")
                    .contains("Thích")
                    .click();
                cy.createLike(post._id);

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
            }
        });
    });

    it("Check show comment in post tag", () => {
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

    it("Check show user's info", () => {
        cy.get(".profile-container__content__tab")
            .find("button")
            .eq(1)
            .should("have.text", "Thông tin")
            .click();
        cy.get(".info-container").should("be.exist");
        cy.get(".friend-card").should("be.not.exist");
        cy.get(".post-container").should("be.not.exist");
        cy.get(".info-container")
            .find("p")
            .eq(0)
            .should("have.text", userProfile.gender ? "Nam" : "Nữ");
        cy.get(".info-container")
            .find("p")
            .eq(2)
            .should(
                "have.text",
                userProfile.address ? userProfile.address : ""
            );
        cy.get(".info-container")
            .find("p")
            .eq(3)
            .should("have.text", userProfile.user.email);
        cy.get(".info-container")
            .find("p")
            .eq(4)
            .should(
                "have.text",
                userProfile.phoneNumber ? userProfile.phoneNumber : ""
            );
        cy.get(".info-container")
            .find("p")
            .eq(5)
            .should(
                "have.text",
                userProfile.hoppy ? userProfile.hoppy : ""
            );
    });

    it("Check show user's friend", () => {
        cy.get(".post-container").should("be.not.exist");
        cy.get(".profile-container__content__tab")
            .find("button")
            .eq(2)
            .should("have.text", "Bạn bè")
            .click();
        if (userProfile.friends.length > 0) {
            cy.get(".friend-card").should("be.exist");
        }
    });
});
