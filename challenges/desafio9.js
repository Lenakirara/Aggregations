db.trips.aggregate([
  { $match: { birthYear: { $ne: "", $exists: 1 } } },
  { $addFields: { birthYear: { $toInt: "$birthYear" } } },
  { $group: {
    _id: null,
    maiorAnoNascimento: { $max: "$birthYear" },
    menorAnoNascimento: { $min: "$birthYear" },
  } },
  { $project: {
    _id: 0,
    maiorAnoNascimento: 1,
    menorAnoNascimento: 1,
  } },
]);
