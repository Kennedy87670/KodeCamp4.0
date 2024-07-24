// const usersModel = require("../models/usersModel");
// const app = require("../bin/www.js");

// const request = require("supertest");
// const { default: mongoose } = require("mongoose");

// beforeAll(async ()=>{
//     await usersModel.deleteMany({})
// });
// afterAll(async ()=>{
//     app.close()
//     await mongoose.disconnect();
// });

// describe("This set of code is going to test register and login for both admins and users", () => {
//   test("Register a user", async () => {
//     const response = await request(app).post("/v1/auth/register").send({
//       fullName: "boys",
//       email: "boy@boy.com",
//       password: "boys"
//     });
//     expect(response.status).toBe(201);
//     expect(response.body.message).toBe("Successful");
//   });

//   test("Register an Admin", async () => {
//     const response = await request(app).post("/v1/auth/register").send({
//       fullName: "Adminboys",
//       email: "Adminboys@boy.com",
//       password: "Adminboys"
//       // "role": "admin"
//     });

//     await usersModel.findOneAndUpdate(
//       { email: "Adminboys@boy.com" },
//       {
//         role: "admin"
//       }
//     );

//     expect(response.status).toBe(201);
//     expect(response.body.message).toBe("Successful");
//   });

//   test("Login a user", async () => {
//     const response = await request(app).post("/v1/auth/login").send({
//       email: "boy@boy.com",
//       password: "boys"
//     });

//     expect(response.status).toBe(200);
//     expect(response.body.message).toBe("You have successfully logged in");
//     expect(response.body.userDetails).toBeTruthy();
//     expect(response.body.token).toBeTruthy();
//     expect(response.body.role).toBe("user");
//   });

//   test("Login an Admin", async () => {
//     const response = await request(app).post("/v1/auth/login").send({
//       email: "Adminboys@boy.com",
//       password: "Adminboys"
//     });
//     expect(response.status).toBe(200);
//     expect(response.body.message).toBe("You have successfully logged in");
//     expect(response.body.userDetails).toBeTruthy();
//     expect(response.body.token).toBeTruthy();
//     expect(response.body.role).toBe("admin");
//   });

// });
const usersModel = require("../models/usersModel");
const app = require("../bin/www.js");

const request = require("supertest");
const { default: mongoose } = require("mongoose");

beforeAll(async () => {
    await usersModel.deleteMany({});
});

afterAll(async () => {
    await mongoose.disconnect();
    app.close();
});

describe("This set of code is going to test register and login for both admins and users", () => {
    test("Register a user", async () => {
        const response = await request(app).post("/v1/auth/register").send({
            fullName: "boys",
            email: "boy@boy.com",
            password: "boys"
        });
        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Successful");
    });

    test("Register an Admin", async () => {
        const response = await request(app).post("/v1/auth/register").send({
            fullName: "Adminboys",
            email: "Adminboys@boy.com",
            password: "Adminboys"
        });

        await usersModel.findOneAndUpdate(
            { email: "Adminboys@boy.com" },
            {
                role: "admin"
            }
        );

        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Successful");
    });

    test("Login a user", async () => {
        const response = await request(app).post("/v1/auth/login").send({
            email: "boy@boy.com",
            password: "boys"
        });

        expect(response.status).toBe(200);
        expect(response.body.status).toBe("successful");
        expect(response.body.userDetails).toBeTruthy();
        expect(response.body.token).toBeTruthy();
        expect(response.body.userDetails.role).toBe("user");
    });

    test("Login an Admin", async () => {
        const response = await request(app).post("/v1/auth/login").send({
            email: "Adminboys@boy.com",
            password: "Adminboys"
        });

        expect(response.status).toBe(200);
        expect(response.body.status).toBe("successful");
        expect(response.body.userDetails).toBeTruthy();
        expect(response.body.token).toBeTruthy();
        expect(response.body.userDetails.role).toBe("admin");
    });
});
