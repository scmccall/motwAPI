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
          expect(res.body.moves).to.be.an("object");
          const moves = res.body.moves;
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
          expect(res.body.ratings).to.be.an('array');
          const ratings = res.body.ratings;
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
    describe("unique playbook data has the correct data structure", () => {
      it("Chosen playbook is correct", () => {
        chai
        .request(server)
        .get(`/api/v1/playbooks/chosen`)
        .end((err, res) => {
          // Fate
          expect(res.body).to.have.property("fate");
          expect(res.body.fate).to.be.an("object");
          const fate = res.body.fate
          expect(fate).to.have.property("how_you_found_out");
          expect(fate.how_you_found_out).to.be.an("array");
          fate.how_you_found_out.forEach(option => {
            expect(option).to.be.a("string");
          });
          expect(fate).to.have.property("heroic_tag_slots");
          expect(fate.heroic_tag_slots).to.be.a("number");
          expect(fate).to.have.property("heroic_tags");
          expect(fate.heroic_tags).to.be.an("array");
          fate.heroic_tags.forEach(tag => {
            expect(tag).to.be.a("string");
          });
          expect(fate).to.have.property("doom_tag_slots");
          expect(fate.doom_tag_slots).to.be.a("number");
          expect(fate).to.have.property("doom_tags");
          expect(fate.doom_tags).to.be.an("array");
          fate.doom_tags.forEach(tag => {
            expect(tag).to.be.a("string");
          });

          //  Gear
          expect(res.body).to.have.property("gear");
          expect(res.body.gear).to.be.an("object");
          const gear = res.body.gear;
          expect(gear).to.have.property("special_weapon_form_slots");
          expect(gear.special_weapon_form_slots).to.be.a("number");
          expect(gear).to.have.property("special_weapon_forms");
          expect(gear.special_weapon_forms).to.be.an("array");
          gear.special_weapon_forms.forEach(form => {
            expect(form).to.be.an("object");
            expect(form).to.have.property("name");
            expect(form.name).to.be.a("string");
            expect(form).to.have.property("harm");
            expect(form.harm).to.be.a("number");
            expect(form).to.have.property("tags");
            expect(form.tags).to.be.an("array");
            form.tags.forEach(tag => {
              expect(tag).to.be.an('object');
              expect(tag).to.have.property("name");
              expect(tag.name).to.be.a("string");
              expect(tag).to.have.property("url");
              expect(tag.url).to.be.a('string');
              chai
              .request(server)
              .get(tag.url)
              .end((err, res) => {
                expect(res).to.have.status(200);
            });
          });
          expect(gear).to.have.property("special_weapon_business_end_slots");
          expect(gear.special_weapon_business_end_slots).to.be.a("number");
          expect(gear).to.have.property("special_weapon_business_ends");
          expect(gear.special_weapon_business_ends).to.be.an("array");
          gear.special_weapon_business_ends.forEach(end => {
            expect(end).to.be.an("object");
            expect(end).to.have.property("name");
            expect(end.name).to.be.a("string");
            expect(end).to.have.property("harm");
            expect(end.harm).to.be.a("number");
            expect(end).to.have.property("tags");
            expect(end.tags).to.be.an("array");
            end.tags.forEach(tag => {
              expect(tag).to.be.an('object');
              expect(tag).to.have.property("name");
              expect(tag.name).to.be.a("string");
              expect(tag).to.have.property("url");
              expect(tag.url).to.be.a('string');
              chai
              .request(server)
              .get(tag.url)
              .end((err, res) => {
                expect(res).to.have.status(200);
              });
            });
          expect(gear).to.have.property("special_weapon_material_slots");
          expect(gear.special_weapon_material_slots).to.be.a("number");
          expect(gear).to.have.property("special_weapon_materials");
          expect(gear.special_weapon_materials).to.be.an("array");
          gear.special_weapon_materials.forEach(material => {
            expect(material).to.be.a("string");
          });

          // Look
          expect(res.body).to.have.property("look");
          expect(res.body.look).to.be.an("object");
          const look = res.body.look;
          expect(look).to.have.property("body");
          expect(look.body).to.be.an("array");
          look.body.forEach(body => {
            expect(body).to.be.a("string");
          });
          expect(look).to.have.property("face");
          expect(look.face).to.be.an("array");
          look.face.forEach(face => {
            expect(face).to.be.a("string");
          });
          expect(look).to.have.property("clothes");
          expect(look.clothes).to.be.an("array");
          look.clothes.forEach(clothes => {
            expect(clothes).to.be.a("string");
          });
        });
      });
        });
      });
      it("Crooked playbook is correct", () => {
        chai
        .request(server)
        .get('/api/v1/playbooks/crooked')
        .end((err, res) => {
          // Background
          expect(res.body).to.have.property("background");
          expect(res.body.background).to.be.an("array");
          res.body.background.forEach(background => {
            expect(background).to.be.an("object");
            expect(background).to.have.property("name");
            expect(background.name).to.be.a("string");
            expect(background).to.have.property("description");
            expect(background.description).to.be.a("string");
          });

          // Heat
          expect(res.body).to.have.property("heat");
          expect(res.body.heat).to.be.an("array");
          res.body.heat.forEach(option => {
            expect(option).to.be.a("string");
          });

          // Underworld
          expect(res.body).to.have.property("underworld");
          expect(res.body.underworld).to.be.an("array");
          res.body.underworld.forEach(option => {
            expect(option).to.be.a("string");
          });

          // Gear
          expect(res.body).to.have.property("gear");
          expect(res.body.gear).to.be.an("object");
          const gear = res.body.gear;
          expect(gear).to.have.property("weapon_slots");
          expect(gear.weapon_slots).to.be.a("number");
          expect(gear).to.have.property("weapons");
          expect(gear.weapons).to.be.an("array");
          gear.weapons.forEach(weapon => {
            expect(weapon).to.be.an("object");
            expect(weapon).to.have.property("name");
            expect(weapon.name).to.be.a("string");
            expect(weapon).to.have.property("harm");
            expect(weapon.harm).to.be.a("number");
            expect(weapon).to.have.property("tags");
            expect(weapon.tags).to.be.an("array");
            weapon.tags.forEach(tag => {
              expect(tag).to.be.an('object');
              expect(tag).to.have.property("name");
              expect(tag.name).to.be.a("string");
              expect(tag).to.have.property("url");
              expect(tag.url).to.be.a('string');
              chai
              .request(server)
              .get(tag.url)
              .end((err, res) => {
                expect(res).to.have.status(200);
              });
            });
          });

          // Look
          expect(res.body).to.have.property("look");
          expect(res.body.look).to.be.an("object");
          const look = res.body.look;
          expect(look).to.have.property("eyes");
          expect(look.eyes).to.be.an("array");
          look.eyes.forEach(eyes => {
            expect(eyes).to.be.a("string");
          });
          expect(look).to.have.property("clothes");
          expect(look.clothes).to.be.an("array");
          look.clothes.forEach(clothes => {
            expect(clothes).to.be.a("string");
          });
        });
      });
      it("Divine playbook is correct", () => {
        chai
        .request(server)
        .get('/api/v1/playbooks/divine')
        .end((err, res) => {
          // Mission
          expect(res.body).to.have.property("mission")
          expect(res.body.mission).to.be.an("array");
          res.body.mission.forEach(option => {
            expect(option).to.be.a("string");
          });

          // Gear
          expect(res.body).to.have.property("gear");
          expect(res.body.gear).to.be.an("object");
          const gear = res.body.gear;
          expect(gear).to.have.property("divine_weapon_slots");
          expect(gear.divine_weapon_slots).to.be.a("number");
          expect(gear).to.have.property("divine_weapons");
          expect(gear.divine_weapons).to.be.an("array");
          gear.divine_weapons.forEach(weapon => {
            expect(weapon).to.be.an("object");
            expect(weapon).to.have.property("name");
            expect(weapon.name).to.be.a("string");
            expect(weapon).to.have.property("harm");
            expect(weapon.harm).to.be.a("number");
            expect(weapon).to.have.property("tags");
            expect(weapon.tags).to.be.an("array");
            weapon.tags.forEach(tag => {
              expect(tag).to.be.an('object');
              expect(tag).to.have.property("name");
              expect(tag.name).to.be.a("string");
              expect(tag).to.have.property("url");
              expect(tag.url).to.be.a('string');
              chai
              .request(server)
              .get(tag.url)
              .end((err, res) => {
                expect(res).to.have.status(200);
              });
            });
          });

          // Look
          expect(res.body).to.have.property("look");
          expect(res.body.look).to.be.an("object");
          const look = res.body.look;
          expect(look).to.have.property("body");
          expect(look.body).to.be.an("array");
          look.body.forEach(option => {
            expect(option).to.be.a("string");
          });
          expect(look).to.have.property("eyes");
          expect(look.eyes).to.be.an("array");
          look.eyes.forEach(option => {
            expect(option).to.be.a("string");
          });
          expect(look).to.have.property("clothes");
          expect(look.clothes).to.be.an("array");
          look.clothes.forEach(option => {
            expect(option).to.be.a("string");
          });
        });
      });
      it("Expert playbook is correct", () => {
        chai
        .request(server)
        .get('/api/v1/playbooks/expert')
        .end((err, res) => {
          // Haven
          expect(res.body).to.have.property("haven");
          expect(res.body.haven).to.be.an("array");
          res.body.haven.forEach(option => {
            expect(option).to.be.an("object");
            expect(option).to.have.property("name");
            expect(option.name).to.be.a("string");
            expect(option).to.have.property("description");
            expect(option.description).to.be.a("string");
          })
          

          // Gear
          expect(res.body).to.have.property("gear");
          expect(res.body.gear).to.be.an("object");
          const gear = res.body.gear;
          expect(gear).to.have.property("monster_slaying_weapon_slots");
          expect(gear.monster_slaying_weapon_slots).to.be.a("number");
          expect(gear).to.have.property("monster_slaying_weapons");
          expect(gear.monster_slaying_weapons).to.be.an("array");
          gear.monster_slaying_weapons.forEach(weapon => {
            expect(weapon).to.be.an("object");
            expect(weapon).to.have.property("name");
            expect(weapon.name).to.be.a("string");
            expect(weapon).to.have.property("harm");
            expect(weapon.harm).to.be.a("number");
            expect(weapon).to.have.property("tags");
            expect(weapon.tags).to.be.an("array");
            weapon.tags.forEach(tag => {
              expect(tag).to.be.an('object');
              expect(tag).to.have.property("name");
              expect(tag.name).to.be.a("string");
              expect(tag).to.have.property("url");
              expect(tag.url).to.be.a('string');
              chai
              .request(server)
              .get(tag.url)
              .end((err, res) => {
                expect(res).to.have.status(200);
              });
            });
          });
          

          // Look
          expect(res.body).to.have.property("look");
          expect(res.body.look).to.be.an("object");
          const look = res.body.look;
          expect(look).to.have.property("face");
          expect(look.face).to.be.an("array");
          look.face.forEach(option => {
            expect(option).to.be.a("string");
          });
          expect(look).to.have.property("clothes");
          expect(look.clothes).to.be.an("array");
          look.clothes.forEach(option => {
            expect(option).to.be.a("string");
          });
        });
      });
      it("Flake playbook is correct", () => {
        chai
        .request(server)
        .get('/api/v1/playbooks/flake')
        .end((err, res) => {
          
          // Gear
          expect(res.body).to.have.property("gear");
          expect(res.body.gear).to.be.an("object");
          const gear = res.body.gear;
          expect(gear).to.have.property("normal_weapon_slots");
          expect(gear.normal_weapon_slots).to.be.a("number");
          expect(gear).to.have.property("normal_weapons");
          expect(gear.normal_weapons).to.be.an("array");
          gear.normal_weapons.forEach(weapon => {
            expect(weapon).to.be.an("object");
            expect(weapon).to.have.property("name");
            expect(weapon.name).to.be.a("string");
            expect(weapon).to.have.property("harm");
            expect(weapon.harm).to.be.a("number");
            expect(weapon).to.have.property("tags");
            expect(weapon.tags).to.be.an("array");
            weapon.tags.forEach(tag => {
              expect(tag).to.be.an('object');
              expect(tag).to.have.property("name");
              expect(tag.name).to.be.a("string");
              expect(tag).to.have.property("url");
              expect(tag.url).to.be.a('string');
              chai
              .request(server)
              .get(tag.url)
              .end((err, res) => {
                expect(res).to.have.status(200);
              });
            });
          });

          expect(gear).to.have.property("hidden_weapon_slots");
          expect(gear.hidden_weapon_slots).to.be.a("number");
          expect(gear).to.have.property("hidden_weapons");
          expect(gear.hidden_weapons).to.be.an("array");
          gear.hidden_weapons.forEach(weapon => {
            expect(weapon).to.be.an("object");
            expect(weapon).to.have.property("name");
            expect(weapon.name).to.be.a("string");
            expect(weapon).to.have.property("harm");
            expect(weapon.harm).to.be.a("number");
            expect(weapon).to.have.property("tags");
            expect(weapon.tags).to.be.an("array");
            weapon.tags.forEach(tag => {
              expect(tag).to.be.an('object');
              expect(tag).to.have.property("name");
              expect(tag.name).to.be.a("string");
              expect(tag).to.have.property("url");
              expect(tag.url).to.be.a('string');
              chai
              .request(server)
              .get(tag.url)
              .end((err, res) => {
                expect(res).to.have.status(200);
              });
            });
          });
        });
      });
      it("Initiate playbook is correct", () => {
        chai
        .request(server)
        .get('/api/v1/playbooks/initiate')
        .end((err, res) => {
          // Gear
          expect(res.body).to.have.property("gear");
          expect(res.body.gear).to.be.an("object");
          const gear = res.body.gear;
          expect(gear).to.have.property("old_fashioned_weapon_slots");
          expect(gear.old_fashioned_weapon_slots).to.be.an("object");
          expect(gear.old_fashioned_weapon_slots).to.have.property("if_sect_has_fighting_arts_or_obsolete_gear");
          expect(gear.old_fashioned_weapon_slots.if_sect_has_fighting_arts_or_obsolete_gear).to.be.a("number");
          expect(gear.old_fashioned_weapon_slots).to.have.property("if_sect_does_not_have_fighting_arts_or_obsolete_gear");
          expect(gear.old_fashioned_weapon_slots.if_sect_does_not_have_fighting_arts_or_obsolete_gear).to.be.a("number");
          expect(gear).to.have.property("old_fashioned_weapons");
          expect(gear.old_fashioned_weapons).to.be.an("array");
          gear.old_fashioned_weapons.forEach(weapon => {
            expect(weapon).to.be.an("object");
            expect(weapon).to.have.property("name");
            expect(weapon.name).to.be.a("string");
            expect(weapon).to.have.property("harm");
            expect(weapon.harm).to.be.a("number");
            expect(weapon).to.have.property("tags");
            expect(weapon.tags).to.be.an("array");
            weapon.tags.forEach(tag => {
              expect(tag).to.be.an('object');
              expect(tag).to.have.property("name");
              expect(tag.name).to.be.a("string");
              expect(tag).to.have.property("url");
              expect(tag.url).to.be.a('string');
              chai
              .request(server)
              .get(tag.url)
              .end((err, res) => {
                expect(res).to.have.status(200);
              });
            });
          });      
          expect(gear).to.have.property("modern_weapon_slots");
          expect(gear.modern_weapon_slots).to.be.an("object");
          expect(gear.modern_weapon_slots).to.have.property("if_sect_has_modernised_or_nifty_gadgets");
          expect(gear.modern_weapon_slots.if_sect_has_modernised_or_nifty_gadgets).to.be.a("number");
          expect(gear.modern_weapon_slots).to.have.property("if_sect_does_not_have_modernised_or_nifty_gadgets");
          expect(gear.modern_weapon_slots.if_sect_does_not_have_modernised_or_nifty_gadgets).to.be.a("number");
          expect(gear).to.have.property("modern_weapons");
          expect(gear.modern_weapons).to.be.an("array");
          gear.modern_weapons.forEach(weapon => {
            expect(weapon).to.be.an("object");
            expect(weapon).to.have.property("name");
            expect(weapon.name).to.be.a("string");
            expect(weapon).to.have.property("harm");
            expect(weapon.harm).to.be.a("number");
            expect(weapon).to.have.property("tags");
            expect(weapon.tags).to.be.an("array");
            weapon.tags.forEach(tag => {
              expect(tag).to.be.an('object');
              expect(tag).to.have.property("name");
              expect(tag.name).to.be.a("string");
              expect(tag).to.have.property("url");
              expect(tag.url).to.be.a('string');
              chai
              .request(server)
              .get(tag.url)
              .end((err, res) => {
                expect(res).to.have.status(200);
              });
            });
          });
          
          // Sect
          expect(res.body).to.have.property("sect");
          expect(res.body.sect).to.be.an("object");
          const sect = res.body.sect;
          expect(sect).to.have.property("good_tradition_slots");
          expect(sect.good_tradition_slots).to.be.a("number");
          expect(sect).to.have.property("good_traditions");
          expect(sect.good_traditions).to.be.an("array");
          sect.good_traditions.forEach(tradition => {
            expect(tradition).to.be.a("string");
          });
          expect(sect).to.have.property("bad_tradition_slots");
          expect(sect.bad_tradition_slots).to.be.a("number");
          expect(sect).to.have.property("bad_traditions");
          expect(sect.bad_traditions).to.be.an("array");
          sect.bad_traditions.forEach(tradition => {
            expect(tradition).to.be.a("string");
          });

          // Look
          expect(res.body).to.have.property("look");
          expect(res.body.look).to.be.an("object");
          const look = res.body.look;
          expect(look).to.have.property("body");
          expect(look.body).to.be.an("array");
          look.body.forEach(option => {
            expect(option).to.be.a("string");
          });
          expect(look).to.have.property("clothes");
          expect(look.clothes).to.be.an("array");
          look.clothes.forEach(option => {
            expect(option).to.be.a("string");
          });
        });
      });
    });
  });
});