const express = require('express')
const cors = require('cors')
const dataService = require('./services/dataService')

// create server app using express
const server = express()

// use cors, to define sharing data with server
server.use(cors({
    origin: 'http://localhost:4200'
}))

// // to parse json data
server.use(express.json())

// // Set up port number for server application
server.listen(3000,()=>{console.log("server listening 3000 port number");})

// application specific middleware
// const appMiddleware = (req,res,next)=>{
//     console.log('inside application specific middleware');
//     next()
// }

// all-medicine Api
server.get('/all-medicines',(req,res)=>{
    dataService.allMedicines().then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

// viewMedicine api
server.get('/view-medicines/:medicineId',(req,res)=>{
    dataService.viewMedicines(req.params.medicineId).then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

// register api call
server.post('/users/register',(req,res)=>{
    console.log('inside register ');
    console.log(req.body);
    dataService.register(req.body.name,req.body.email,req.body.phone,req.body.pswd)
    .then((result)=>{
        res.status(result.statusCode).json(result)

    })
})

// login api call
server.post('/users/login',(req,res)=>{
    console.log('inside login ');
    console.log(req.body);
    dataService.login(req.body.phone,req.body.pswd)
    .then((result)=>{
        res.status(result.statusCode).json(result)

    })
})

// add_to_wishlist
server.post('/medicines/add_to_wishlist',(req,res)=>{
    console.log('inside add_to_wishlist api ');
    // console.log(req.body.medicine);
    dataService.addtoWishlist(req.body.phone,req.body.medicine)
    .then((result)=>{
        res.status(result.statusCode).json(result)

    })
})

// get-wishlist
server.get('/medicines/get_wishlist/:phone',(req,res)=>{
    dataService.getwishlist(req.params.phone).then((result)=>{
        res.status(result.statusCode).json(result)
    })
})
// remove item from wishlist
server.delete('/medicines/remove-item-wishlist/:medicineId',(req,res)=>{
    dataService.deleteItemwishlist(req.headers['phone'],req.params.medicineId).then((result)=>{
        res.status(result.statusCode).json(result)
    })
})


// ------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------

// add to cart
server.post('/medicines/add_to_cart',(req,res)=>{
    console.log('inside add to cart api');
    console.log(req.body.medicine);
    dataService.addToCart(req.body.phone,req.body.medicine)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})



// -------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------

// get Cart
server.get('/medicines/get_cart/:phone',(req,res)=>{
    dataService.getCart(req.params.phone).then((result)=>{
        console.log(result);
        res.status(result.statusCode).json(result)
    })
})

// remove from cart
server.delete('/medicines/remove_from_cart/:medicineId',(req,res)=>{
    dataService.removeFromCart(req.headers['phone'],req.params.medicineId).then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

server.delete('/medicines/empty_cart/:phone',(req,res)=>{
    dataService.emptyCart(req.params.phone).then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

// all-medicine Api
// server.get('/all-skincare',(req,res)=>{
//     dataService.allSkincare().then((result)=>{
//         res.status(result.statusCode).json(result)
//     })
// })


// viewSkinCare api
// server.get('/view-skincare/:id',(req,res)=>{
//     dataService.viewSkinCare(req.params.id).then((result)=>{
//         res.status(result.statusCode).json(result)
//     })
// })

// add_to_wishlist
// server.post('/medicines/add_Item_to_wishlist',(req,res)=>{
//     console.log('inside add_Item_to_wishlist api ');
//     // console.log(req.body.medicine);
//     dataService.addItemtoWishlist(req.body.phone,req.body.skinItem)
//     .then((result)=>{
//         res.status(result.statusCode).json(result)

//     })
// })