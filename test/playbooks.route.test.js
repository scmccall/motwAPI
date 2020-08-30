const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const server = require("../server")

chai.use(chaiHttp);

describe("Playbooks route", () => {
  it("should list ALL playbooks on /playbooks GET", () => {
    chai
    .request(server)
    .get('/api/playbooks')
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res).to.be.a.json;
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property("count");
      expect(res.body).to.have.property("playbooks");
      expect(res.body.count).to.equal(res.body.playbooks.length);
      res.body.playbooks.forEach(element => {
        expect(element).to.have.property("identifier");
        expect(element.identifier).to.be.a("string");
        expect(element).to.have.property("name");
        expect(element.name).to.be.a('string');
        expect(element).to.have.property("url");
        expect(element.url).to.be.a('string');
      });
    });
  });
  describe.skip("should list a SINGLE playbook on /playbooks/:name", () => {
    it("request comes back in correct format", () => {

    });
    it("request data is accurate", () => {

    });
  });
});