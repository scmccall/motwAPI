const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const server = require("../server")

chai.use(chaiHttp);

describe("Playbooks route", () => {
  describe("should list ALL playbooks on /playbooks GET", () => {
    it("request comes back in proper format", () => {
      chai
      .request(server)
      .get('/api/playbooks')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.a.json;
      });
    });
    it("request data is accurate", () => {
      chai
      .request(server)
      .get('/api/playbooks')
      .end((err, res) => {
        expect(res.body.count).to.equal(res.body.playbooks.length);
      });
    });
  });

  describe("should list a SINGLE playbook on /playbooks/:id");
  describe("should list a SINGLE playbook on /playbooks/:name");
});