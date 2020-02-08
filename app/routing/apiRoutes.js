let friends = require("../data/friends");

function findMatch(nameScore) {
  return new Promise((resolve, reject) => {
    let perfectMatch = { score: 40 };

    friends.forEach(function(item, nameIndex) {
      let sumdScores = 0;

      item.score.forEach(function(item, index) {
        sumdScores = sumdScores + Math.abs(item - nameScore[index]);
      });

      if (perfectMatch.score > sumdScores) {
        perfectMatch.score = sumdScores;
        perfectMatch.index = nameIndex;
      }
    });

    resolve(friends[perfectMatch.index]);
  });
}

function apiRoutes(app) {
  app.get("/api/friends", function(req, res) {
    res.send(friends);
  });

  app.post("/api/friends", function(req, res) {
    findMatch(req.body.score).then(user => {
      res.json(user);

      friends.push(req.body);
    });
  });
}

module.exports = apiRoutes;
