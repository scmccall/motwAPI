const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const server = require("../server")

chai.use(chaiHttp);

describe("Weapon tags route", () => {
  it("should list ALL weapon tags on /weapon-tags GET", () => {
    chai
    .request(server)
    .get('/api/v1/weapon-tags')
    .end((err, res) => {
      // Returns successfully
      expect(res).to.have.status(200);
      expect(res).to.be.a.json;
      expect(res.body).to.be.an('object');

      // Returns correct data structure
      expect(res.body).to.have.property("count");
      expect(res.body).to.have.property("tags");
      expect(res.body.count).to.equal(res.body.tags.length);
      res.body.tags.forEach(element => {
        expect(element).to.have.property("index");
        expect(element.index).to.be.a("string");
        expect(element).to.have.property("name");
        expect(element.name).to.be.a('string');
        expect(element).to.have.property("url");
        expect(element.url).to.be.a('string');
        expect(element.url).to.equal(`/${element.index}`);
      });
    });
  });
  describe("should list a SINGLE weapon tag on /weapon-tags/:index", () => {
    it("request comes back in correct format", () => {
      const tags = require("../data/weapon-tags/tags.json")
      tags.forEach(tag => {
        chai
        .request(server)
        .get(`/api/v1/weapon-tags/${tag.index}`)
        .end((err, res) => {
          // Returns successfully
          expect(res).to.have.status(200);
          expect(res).to.be.a.json;
          expect(res.body).to.be.an('object');

          // Returns in correct format
          expect(res.body).to.have.property("index");
          expect(res.body.index).to.be.a("string");
          expect(res.body).to.have.property('name');
          expect(res.body.name).to.be.a('string');
          expect(res.body).to.have.property("description");
          expect(res.body.description).to.be.a('string');
        });
      });
    });
  });
});