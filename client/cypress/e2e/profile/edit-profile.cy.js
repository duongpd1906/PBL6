const existValidEmail = "hieu@gmail.com";
const exisvalidPassword = "123456";

const newUserProfile = {
    fullName: Math.random().toString(36).slice(2, 7),
    address: Math.random().toString(36).slice(2, 7),
    phoneNumber: Math.random().toString(36).slice(2, 7),
    hoppy: Math.random().toString(36).slice(2, 7),
    gender: true,
};
let user;
let token;
describe("Edit-Profile spec", () => {
    let userProfile;
    let listPosts;

    before(() => {
        cy.visit("http://localhost:3000/profile");
        cy.getUserProfile(existValidEmail, exisvalidPassword);
        cy.getAllPosts();
        cy.get("@userProfile").then((data) => {
            userProfile = data;
        });
        cy.get("@listPosts").then((data) => {
            listPosts = data;
        });
        cy.get("@user").then((data) => {
            user = data;
        });
        cy.get("@token").then((data) => {
            token = data;
        });
        cy.visit("http://localhost:3000/profile");
        cy.get(".profile-container__top")
            .find("button")
            .contains("Chỉnh sửa")
            .click();
    });
    beforeEach(() => {
        window.localStorage.setItem("user", JSON.stringify(user));
        window.localStorage.setItem("token", token);
    });

    it("Check show modal edit profile", () => {
        cy.get(".ant-modal-mask").should("be.exist");
        cy.get(".ant-modal-wrap").should("not.have.css", "display", "none");
    });

    it("Check User profile", () => {
        cy.get("#user-avatar")
            .should("have.attr", "src")
            .should("include", userProfile.user.avatar);

        cy.get("#fullName").should("have.value", userProfile.fullName);

        if (userProfile.gender) {
            cy.get(".ant-radio-wrapper-checked").find("span").contains("Nam");
        } else {
            cy.get(".ant-radio-wrapper-checked").find("span").contains("Nữ");
        }

        cy.get("#address").should("have.value", userProfile.address);

        cy.get("#phoneNumber").should("have.value", userProfile.phoneNumber);

        cy.get("#hoppy").should("have.value", userProfile.hoppy);
    });
    it("Check datatime picker box", () => {
        cy.get("#dayOfBirth").click();
        cy.get(".ant-picker-dropdown-hidden").should("be.not.exist");
        cy.get(".edit-profile__content").click();
    });

    it("Check exit Edit-Profile modal", () => {
        cy.get(".edit-profile__content__footer")
            .find("button")
            .contains("Thoát")
            .click();
        cy.get(".ant-modal-mask").should("be.not.exist");
        cy.get(".ant-modal-wrap").should("have.css", "display", "none");
    });

    it("Check action edit-profile successfully", () => {
        cy.get(".profile-container__top")
            .find("button")
            .contains("Chỉnh sửa")
            .click();
        cy.get("#fullName").clear().type(newUserProfile.fullName);
        if (newUserProfile.gender) {
            cy.get('[type="radio"]').check("true");
        } else {
            cy.get('[type="radio"]').check("false");
        }
        cy.get("#address").clear().type(newUserProfile.address);
        cy.get("#phoneNumber").clear().type(newUserProfile.phoneNumber);
        cy.get("#hoppy").clear().type(newUserProfile.hoppy);
        cy.get(".edit-profile__content")
            .find("button")
            .contains("Lưu")
            .click()
            .then(() => {
                cy.get(".ant-modal-mask").should("be.not.exist");
                cy.get(".profile-container__top")
                    .find("h2")
                    .should("have.text", newUserProfile.fullName);
                    cy.get(".profile-container__content__tab")
                    .find("button")
                    .eq(1)
                    .should("have.text", "Thông tin")
                    .click();
                cy.get(".info-container")
                    .find("p")
                    .eq(0)
                    .should("have.text", newUserProfile.gender ? "Nam" : "Nữ");
                cy.get(".info-container")
                    .find("p")
                    .eq(2)
                    .should(
                        "have.text",
                        newUserProfile.address ? newUserProfile.address : ""
                    );
                cy.get(".info-container")
                    .find("p")
                    .eq(4)
                    .should(
                        "have.text",
                        newUserProfile.phoneNumber ? newUserProfile.phoneNumber : ""
                    );
                cy.get(".info-container")
                    .find("p")
                    .eq(5)
                    .should(
                        "have.text",
                        newUserProfile.hoppy ? newUserProfile.hoppy : ""
                    );
            });
    });
});

Cypress.Commands.add("updateUserProfile", (userProfile) => {
    cy.request({
        method: "PUT",
        url: "/api/user",
        body: { userProfile },
        headers: { Authorization: "Bearer " + token },
        timeout: 500,
    }).then(({ status }) => {
        expect(status).to.eq(200);
    });
});
