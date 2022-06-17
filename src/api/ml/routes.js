const routes = (handler, doc) => [
  {
    method: 'POST',
    path: '/bot',
    handler: handler.postPredictHandler,
    options: doc.postPredictDoc,
  },
];

module.exports = routes;
