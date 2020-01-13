const request = require("supertest");
const app = require("../../src/app");

test("Deve criar usuário via signup", () => {
  return request(app)
    .post("/auth/signup")
    .send({ name: "Thiago", mail: `${Date.now()}@email.com`, passwd: "123456" })
    .then(res => {
      expect(res.status).toBe(201);
      expect(res.body.name).toBe("Thiago");
      expect(res.body).not.toHaveProperty("passwd");
    });
});

test("Deve receber token ao logar", () => {
  const mail = `${Date.now()}@mail.com`;
  return app.services.user
    .save({ name: "Thiago", mail, passwd: "123456" })
    .then(() =>
      request(app)
        .post("/auth/signin")
        .send({ mail, passwd: "123456" })
    )
    .then(res => {
      expect(res.status).toBe(200);
      console.log(res.body);
      expect(res.body).toHaveProperty("token");
    });
});

test("Não deve autenticar usuário com senha errada", () => {
  const mail = `${Date.now()}@mail.com`;
  return app.services.user
    .save({ name: "Thiago", mail, passwd: "123456" })
    .then(() =>
      request(app)
        .post("/auth/signin")
        .send({ mail, passwd: "654321" })
    )
    .then(res => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Usuário ou senha inválido");
    });
});

test("Não deve autenticar usuário com senha errada", () => {
  return request(app)
    .post("/auth/signin")
    .send({ mail: "wrong", passwd: "654321" })
    .then(res => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Usuário ou senha inválido");
    });
});

test("Não deve acessar uma rota protegida sem token", () => {
  return request(app)
    .get("/v1/users")
    .then(res => {
      expect(res.status).toBe(401);
    });
});
