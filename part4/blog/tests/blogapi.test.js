const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../index.js");

//This test uses the supertest package for http testing

const api = supertest(app);
describe("This is blog tests", () => {
  test("There should be like 6 blogs", async () => {
    const response = await api.get("/api/blogs");
    console.log(response.body);
    expect(response.body.length).toBe(6);
  });
  
  test("The id property should be defined in the returned blog", async () => {
    
    const response = await api.get("/api/blogs")
    const individual = response.body[0]
    expect(individual.id).toBeDefined()
    
  })
  
  test("The amount of posts should be increased by 1", async () => {
    
    const response = await api.post("/api/blogs")
    const individual = response.body[0]
    expect(individual.id).toBeDefined()
    
  })
  
  
  
  
});

afterAll(() => {
  mongoose.connection.close();
});
