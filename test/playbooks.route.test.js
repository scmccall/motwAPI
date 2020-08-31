const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const server = require("../server")

chai.use(chaiHttp);

describe("Playbooks route", () => {
  it("should list ALL playbooks on /playbooks GET", () => {
    chai
    .request(server)
    .get('/api/v1/playbooks')
    .end((err, res) => {
      // Returns in proper format
      expect(res).to.have.status(200);
      expect(res).to.be.a.json;
      expect(res.body).to.be.an('object');

      // Returns correct data structure
      expect(res.body).to.have.property("count");
      expect(res.body).to.have.property("playbooks");
      expect(res.body.count).to.equal(res.body.playbooks.length);
      res.body.playbooks.forEach(element => {
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
  describe("should list a SINGLE playbook on /playbooks/:index", () => {
    it("shared playbook data has correct data structure", () => {
      const playbooks = require("../data/playbooks-list.json").playbooks;
      playbooks.forEach(playbook => {
        chai
        .request(server)
        .get(`/api/v1/playbooks/${playbook.index}`)
        .end((err, res) => {
          // Returns successfully
          expect(res).to.have.status(200);
          expect(res).to.be.a.json;
          expect(res.body).to.be.an('object');

          // Shared properties return in correct format
          expect(res.body).to.have.property("index");
          expect(res.body.index).to.be.a("string");
          expect(res.body).to.have.property("name");
          expect(res.body.name).to.be.a("string");
          expect(res.body).to.have.property("luck_special");
          expect(res.body.luck_special).to.be.a("string");

          // Moves
          expect(res.body).to.have.property("moves");
          const moves = res.body.moves;
          expect(moves).to.be.an("object");
          expect(moves).to.have.property("required_move_slots");
          expect(moves.required_move_slots).to.be.a("number");
          expect(moves).to.have.property("required_moves");
          expect(moves.required_moves).to.be.an("array");

          moves.required_moves.forEach(move => {
            expect(move).to.be.an("object");
            expect(move).to.have.property("name");
            expect(move.name).to.be.a('string');
            expect(move).to.have.property('description');
            expect(move.description).to.be.a('string');
          });

          expect(moves).to.have.property("optional_move_slots");
          expect(moves.optional_move_slots).to.be.a('number');
          expect(moves).to.have.property("optional_moves");
          expect(moves.optional_moves).to.be.an("array");

          moves.optional_moves.forEach(move => {
            expect(move).to.be.an("object");
            expect(move).to.have.property("name");
            expect(move.name).to.be.a('string');
            expect(move).to.have.property('description');
            expect(move.description).to.be.a('string');
          });

          // Ratings
          expect(res.body).to.have.property('ratings');
          const ratings = res.body.ratings;
          expect(ratings).to.be.an('array');
          ratings.forEach(rating => {
            expect(rating).to.have.property('charm')
            expect(rating.charm).to.be.a("number");
            expect(rating).to.have.property('cool')
            expect(rating.cool).to.be.a("number");
            expect(rating).to.have.property('sharp')
            expect(rating.sharp).to.be.a("number");
            expect(rating).to.have.property('tough')
            expect(rating.tough).to.be.a("number");
            expect(rating).to.have.property('weird')
            expect(rating.weird).to.be.a("number");
          });

          expect(res.body).to.have.property("history");
          expect(res.body.history).to.be.an("array");
          res.body.history.forEach(item => {
            expect(item).to.be.a("string");
          });

          expect(res.body).to.have.property("improvements");
          expect(res.body.improvements).to.be.an("array");
          res.body.improvements.forEach(improvement => {
            expect(improvement).to.be.a("string");
          });

          expect(res.body).to.have.property("advanced_improvements");
          expect(res.body.advanced_improvements).to.be.an("array");
          res.body.advanced_improvements.forEach(advanced_improvement => {
            expect(advanced_improvement).to.be.a("string");
          });
        });
      });
    });
  });
});