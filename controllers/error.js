exports.errrorPage = (req, res, next) => {
    res.status(404).render('404', { pageTitle: 'No products',
                                    path: ''
});
  };