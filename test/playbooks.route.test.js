const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const server = require("../server")

chai.use(chaiHttp);

describe("Playbooks route", () => {
  it("should list ALL playbooks on /playbooks GET", () => {
    chai
      .request(server)
      .get('/playbooks')
      .end((err, res) => {
        expect(res).to.have.status(200)
        done();
      })
  });
  it("should list a SINGLE playbook on /playbooks/:id")
  it("should list a SINGLE playbook on /playbooks/:name");
});