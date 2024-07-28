
const usersModel = require("../models/usersModel");
const app = require("../bin/www.js");

const request = require("supertest");
const { default: mongoose } = require("mongoose");
const quizModel = require("../models/quizModel.js");


let adminToken = ""
let quizId = ""

beforeAll(async () => {
    await quizModel.deleteMany({});

 
});

afterAll(async () => {
    await mongoose.disconnect();
    app.close();
});


describe("Testing admin routes", ()=>{

    test("login the admin", async()=>{
        const response = await request(app).post("/v1/auth/login").send({
            email: "Adminboys@boy.com",
            password: "Adminboys"
        });

        adminToken = response.body.userToken;

        expect(response.status).toBe(200)
    })


    test("Add a quiz", async()=>{
        const response = await request(app)
        .post("/v1/admin/quiz")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
            "questionNumber": "1",
            "question": "A baby lion is called?",
            "optionA": "Cob",
            "optionB": "Baby lion",
            "optionC": "Lioness",
            "optionD": "Lion baby",
            "correctOption": "optionA"
        })

        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Quiz created")

    })


    test("Get a list of quiz", async()=>{
        const response = await request(app)
        .get("/v1/admin/quiz/1/10")
        .set("Authorization", `Bearer ${adminToken}`)

        quizId = response.body.quizList.docs[0]._id

        expect(response.status).toBe(201);
        expect(typeof response.body.quizList).toBe("object");
        expect(typeof response.body.quizList.docs[0].questionNumber).toBe("number");
 
    })


    test("Get a quiz by id", async()=>{
        const response = await request(app)
        .get("/v1/admin/quiz-by-id/" + quizId)
        .set("Authorization", `Bearer ${adminToken}`)

        expect(response.status).toBe(201);
        expect(response.body.quiz.question).toBe("A baby lion is called?")
    })

})