const otherController = {
    main: (req, res) => {
        res.render('main');
    },
    contact: (req, res) => {
        res.render('contact');
    }
}

module.exports = otherController;