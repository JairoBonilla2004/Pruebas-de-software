// test/user.test.js

const request = require("supertest");
const app = require("../src/app.js");

describe("User API", () => {
  // PRUEBA PARA QUE GET DEVUELVA UNA LISTA VACIA
  test("GET /users should return an empty list initially", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  // PRUEBA PARA CREAR UN NUEVO USUARIO
  test("POST /users should create a new user and return the user object with an ID", async () => {
    let newUser = { name: "Jairo Bonilla", email: "jsbonilla2@espe.edu.ec" };
    const response = await request(app).post("/users").send(newUser);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe(newUser.name);
    expect(response.body.email).toBe(newUser.email);
  });

  // PRUEBA DE ERROR CUANDO DATOS INCOMPLETOS
  test("POST /users should fail if data is incomplete", async () => {
    let newUser = { name: "Jairo" };
    const response = await request(app).post("/users").send(newUser);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "Nombre y correo electrónico son obligatorios."
    );
  });

  //-- Pruebas adicionales --

  // Verifica que el usuario creado está en la lista
  test("GET /users should return a list with users after creation", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty("name");
    expect(response.body[0]).toHaveProperty("email");
  });

  // Prueba cuando falta el campo 'name'
  test("POST /users should fail if name is missing", async () => {
    const newUser = { email: "sinNombre@example.com" };
    const response = await request(app).post("/users").send(newUser);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "Nombre y correo electrónico son obligatorios."
    );
  });

  // Prueba cuando se accede a una ruta inexistente
  test("GET /noexiste should return 404", async () => {
    const response = await request(app).get("/noexiste");
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error", "Ruta no encontrada");
  });
});
