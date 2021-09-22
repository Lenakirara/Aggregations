// regex: https://www.mundojs.com.br/2018/06/14/como-usar-o-regex-no-javascript/
db.movies.aggregate([
  { $match: { awards: { $regex: /^won\s\d\soscar*/i } } },
  { $group: {
    _id: null,
    maior_rating: { $max: "$imdb.rating" },
    menor_rating: { $min: "$imdb.rating" },
    media_rating: { $avg: "$imdb.rating" },
    desvio_padrao: { $stdDevSamp: "$imdb.rating" },
  } },
  { $project: {
    _id: 0,
    maior_rating: 1,
    menor_rating: 1,
    media_rating: { $round: ["$media_rating", 1] },
    desvio_padrao: { $round: ["$desvio_padrao", 1] },
  } },
]);
