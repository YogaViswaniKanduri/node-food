var Food = require('./models/food');

function getFoods(res) {
    Food.find(function (err, foods) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(foods); // return all food items in JSON format
    });
}
;

function getTotalPrice(res) {
    Food.find(function (err, foods) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
        //console.log(foods);
        var tot=0;
        for(i=0;i<foods.length;i++){
            tot=tot+foods[i].price;
        }
        tot=tot+(0.075*tot);
        //console.log('total:'+tot);
        res.json(parseFloat(tot.toFixed(2)));// return total of all food items in JSON format
    });
}
;

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all foods
    app.get('/api/food', function (req, res) {
        // use mongoose to get all foods in the database
        getFoods(res);

    });

    app.get('/api/total', function (req, res){
        getTotalPrice(res);
    });

    // create food item and send back all foods after creation
    app.post('/api/food', function (req, res) {

        // create a food, information comes from AJAX request from Angular
        Food.create({
            foodname: req.body.foodname,
            price: req.body.price,
            done: false
        }, function (err, food) {
            if (err)
                res.send(err);

            // get and return all the foods after you create another
            getFoods(res);

        });

    });

    // delete a food item
    app.delete('/api/food/:food_id', function (req, res) {
        Food.remove({
            _id: req.params.food_id
        }, function (err, food) {
            if (err)
                res.send(err);

            getFoods(res);

        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};