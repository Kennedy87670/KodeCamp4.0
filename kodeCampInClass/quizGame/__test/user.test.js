
const usersModel = require("../models/usersModel");
const app = require("../bin/www.js");
const { default: mongoose } = require("mongoose");

const request = require("supertest");
const activeQuizModel = require("../models/activeQuizModel.js");


beforeAll(async () => {
    await activeQuizModel.deleteMany({});
});

afterAll(async () => {
    await mongoose.disconnect();
    app.close();
});


let userToken = "";
let questionOneId = ""

describe("Testing user routes", ()=>{

    test("login the user", async()=>{
        const response = await request(app).post("/v1/auth/login").send({
            email: "boy@boy.com",
            password: "boys"
        });

        userToken = response.body.userToken;

        expect(response.status).toBe(200)
    })


    test("Get  quiz number 1", async()=>{
        const response = await request(app)
        .get("/v1/users/quiz/1")
        .set("Authorization", `Bearer ${userToken}`)

        questionOneId= response.body.quiz._id
       

        expect(response.status).toBe(200);
        expect(response.body.quiz.question).toBe("A baby lion is called?")

    })


    test("Answer question 1", async () => {
        jest.setTimeout(10000);
        const response = await request(app)
            .post("/v1/users/answer-a-question")
            .send({
                quiz: questionOneId,
                optionChosen: "optionA"  
            })
            .set("Authorization", `Bearer ${userToken}`)
    
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Answer recorded");
    });
    


    test("mark a quiz", async()=>{
        jest.setTimeout(10000);
        const response = await request(app)
        .post("/v1/users/mark-quiz")
        .set("Authorization", `Bearer ${userToken}`)

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Successful");
        expect(response.body.totalMarks).toBe(10);
        expect(response.body.totalAnsweredQuestions).toBe(1);
        expect(response.body.totalCorrectQuestions).toBe(1);
        expect(response.body.totalIncorrectQuestions).toBe(0);
        

        

    })

})