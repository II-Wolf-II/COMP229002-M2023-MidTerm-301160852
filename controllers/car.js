// create a reference to the model
let CarModel = require('../models/car');

// Gets all cars from the Database and renders the page to list them all.
module.exports.carList = async function(req, res, next) {  

    try {
        let carsList = await CarModel.find({});

        res.render('cars/list', {
            title: 'Cars List', 
            CarsList: carsList,
            userName: req.user ? req.user.username : ''
        })  
    } catch (error) {
        console.log(error);
        next(error);
    }
}


// Gets a car by id and renders the details page.
module.exports.details = async (req, res, next) => {

    try {
        let id = req.params.id;

        let carToShow = await CarModel.findById(id);

        res.render('cars/details', {
            title: 'Car Details', 
            cars: carToShow
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}

// Renders the Add form using the add_edit.ejs template
module.exports.displayAddPage = (req, res, next) => {
    
    // ADD YOUR CODE HERE 
    try{
    let newcar = CarModel()
    return res.render('cars/add_edit', {
            title:"Add New Car",
            car: newcar,
            userName: req.user ? req.user.username : ''
        });  
    } catch(error){
        console.log(error)
    }           

}

// Processes the data submitted from the Add form to create a new car
module.exports.processAddPage = (req, res, next) => {

    // ADD YOUR CODE HERE
    let newcar = new CarModel({
        _id: req.body.id, 
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        kilometers: req.body.kilometers,
        doors: req.body.doors,
        seats: req.body.seats,
        color: req.body.color,
        price: req.body.price,
    });
CarModel.create(newcar, (err, item) =>{
    if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            console.log(item);
            res.redirect('/cars/list');
        }
});
    
    

}

// Gets a car by id and renders the Edit form using the add_edit.ejs template
module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    CarModel.findById(id, (err, carToShow) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('cars/add_edit', {
                title: 'Edit Car', 
                car: carToShow
            })
        }
    });
    
    
}


// Processes the data submitted from the Edit form to update a car
module.exports.processEditPage = (req, res, next) => {
    
    // ADD YOUR CODE HERE
    let id = req.params.id;

    let updatedcar = CarModel({
        _id: id,
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        kilometers: req.body.kilometers,
        doors: req.body.doors,
        seats: req.body.seats,
        color: req.body.color,
        price: req.body.price,
    });
    CarModel.update({_id: id}, updatedcar, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {

            res.redirect('/cars/list');
        }
    });

}

// Deletes a car based on its id.
module.exports.performDelete = (req, res, next) => {
    
    // ADD YOUR CODE HERE
    let id = req.params.id;
    CarModel.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/cars/list');
        }
    });

}