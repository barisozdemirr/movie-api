const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../../app");

chai.use(chaiHttp);

    let token, movie_id;

    describe("/api/movies tests",() => {
        before((done) => {
-           chai.request(server)
            .post("/authenticate")
            .send({ username : "barisozdemir", password : "12345" })
            .end((err, res) => {
                token = res.body.token;
                done();    
            });
        });
    
    describe("/GET/:movie_id", () => {
        it("It should GET all the movies.", (done) =>{
            chai.request(server)
            .get("/api/movies")
            .set("x-access-token", token)
            .end((err ,res) => {
                res.should.have.status(200);
                res.body.should.be.a("array");
                done();
            });
        });
    });

    describe("/POST/:movie_id", () => {
        it("It should POST a movie.", (done) => {

            const movie = {
                director_id : "5e90531d7a0cac1d005a0a60",
                title : "Test Movie",
                category : "Test Category",
                country : "Test Country",
                year : 2020,
                imdb_score : 7
            };

            chai.request(server)
            .post("/api/movies")
            .send(movie)
            .set("x-access-token", token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("director_id");
                res.body.should.have.property("title");
                res.body.should.have.property("category");
                res.body.should.have.property("year");
                res.body.should.have.property("country");
                res.body.should.have.property("imdb_score");
                movie_id = res.body._id;
                done();
            });
        });
    });

    describe("/GET/:movie_id ", () => {
        it("it should GET a movie by the given id", (done) => {
            chai.request(server)
            .get("/api/movies/" + movie_id)
            .set("x-access-token", token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("director_id");
                res.body.should.have.property("title");
                res.body.should.have.property("category");
                res.body.should.have.property("year");
                res.body.should.have.property("country");
                res.body.should.have.property("imdb_score");
                res.body.should.have.property("_id").eql(movie_id);
                done();
            });
        });
    });

    describe("/PUT/:movie_id", () => {
        it("It should UPDATE a movie given by id.", (done) => {

            const movie = {
                director_id : "5e90531d7a0cac1d005a0a60",
                title : "Test Movie",
                category : "Test Category",
                country : "Test Country",
                year : 2020,
                imdb_score : 7
            };

            chai.request(server)
            .put("/api/movies/"+ movie_id)
            .send(movie)
            .set("x-access-token", token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("director_id").eql(movie.director_id);
                res.body.should.have.property("title").eql(movie.title);
                res.body.should.have.property("category").eql(movie.category);
                res.body.should.have.property("year").eql(movie.year);
                res.body.should.have.property("country").eql(movie.country);
                res.body.should.have.property("imdb_score").eql(movie.imdb_score);

                done();
            });
        });
    });

    describe("/DELETE Movie", () => {
        it("It should DELETE a movie given by id.", (done) => {
            chai.request(server)
            .delete("/api/movies/"+ movie_id)
            .set("x-access-token", token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("process").eql(1);
                done();
            });
        });
    });

});   
