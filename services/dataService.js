// // import db.js
const db = require('./db')
// import jsonwebtoken
const jwt = require('jsonwebtoken')

// all-medicines
const allMedicines = () => {
    return db.Medicine.find().then((result) => {
        if (result) {
            return {
                statusCode: 200,
                Medicines: result
            }
        }
        else {
            return {
                statusCode: 404,
                message: "No data is present"
            }
        }
    })
}

// view medicines
const viewMedicines = (document_id) => {
    return db.Medicine.findOne({
        document_id
    }).then((result) => {
        console.log(result);
        if (result) {
            return {
                statusCode: 200,
                Medicines: result
            }
        }
        else {
            return {
                statusCode: 404,
                message: "Not found"
            }
        }
    })
}

// register
const register = (name, email, phone, pswd) => {
    // check phone is in mongodb - db.users.findOne()
    return db.User.findOne({
        phone
    }).then((result) => {
        console.log(result);
        if (result) {
            // if acno exists
            return {
                statusCode: 403,
                message: 'Account already exist'
            }
        }
        else {
            // to add new user
            const newUser = new db.User({
                name: name,
                email: email,
                phone: phone,
                password: pswd
            })
            newUser.save()
            return {
                statusCode: 200,
                message: 'Registration successful'
            }
        }
    })
}

// login

const login = (phone, pswd) => {
    console.log('inside login function body');
    // check phone,pswd in mongodb
    return db.User.findOne({
        phone,
        password: pswd
    }).then((result) => {
        if (result) {
            // generate token
            const token = jwt.sign({
                phone: phone
            }, 'privatekey123')

            return {
                statusCode: 200,
                message: "login successfull",
                name: result.name,
                phone: result.phone,
                token
            }
        }
        else {
            return {
                statusCode: 404,
                message: "invalid account or password"
            }
        }
    })
}

// store medicine in wishlist
const addtoWishlist = (phone, medicine) => {
    // console.log(medicine);
    return db.User.findOne({ phone }).then((result) => {
        if (result) {
            // console.log(result);
            // console.log("inside", result.wishlist);
            if (result.wishlist.find(item => item.document_id == medicine.document_id)) {
                return {

                    statusCode: 401,
                    message: 'item already exist'
                }
            }
            else {
                result.wishlist.push({
                    document_id: medicine.document_id,
                    commercial_name: medicine.commercial_name,
                    price: medicine.price,
                    image: medicine.image,
                    mah: medicine.mah

                })
                result.save()
                return {
                    statusCode: 200,
                    message: "item added to wishlist"
                }
            }
        }
        else {
            return {
                statusCode: 404,
                message: "Not a user"
            }
        }
    })
}

// getwishlist
const getwishlist = (phone) => {
    return db.User.findOne({ phone }).then((result) => {
        if (result) {
            if (result.wishlist.length != 0) {
                return {
                    statusCode: 200,
                    wishlist: result.wishlist
                }
            }
            else {
                return {
                    statusCode: 404,
                    message: "wishlist is empty"
                }
            }

        }
        else {
            return {
                statusCode: 404,
                message: "Not a user"
            }
        }

    })
}


// deleteItemwishlist

const deleteItemwishlist = (phone, medicineId) => {
    return db.User.findOne({ phone }).then((result) => {
        if (result) {
            let index = result.wishlist.findIndex(item => item.document_id == medicineId.document_id)
            let val = result.wishlist.splice(index,1)
            result.save()
            if (val) {
                if (result.wishlist.length == 0) {
                    return {
                        statusCode: 401,
                        message: 'wishlist empty'
                    }
                }
                else {
                    return {
                        statusCode: 200,
                        wishlist: result.wishlist
                    }
                }
            }
            else {
                return {
                    statusCode: 404,
                    message: 'item not found'
                }
            }
        }
    })
}




// ----------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------

// add to cart

const addToCart = (phone, medicine) => {

    return db.User.findOne({ phone }).then((result) => {
        if (result) {
            // console.log(result, "dataservice");
            if (result.cart.find(item => item.document_id == medicine.document_id)) {
                console.log(result);
                return {

                    statusCode: 401,
                    message: 'item already exist'
                }


            }
            else {
                result.cart.push({
                    document_id: medicine.document_id,
                    commercial_name: medicine.commercial_name,
                    price: medicine.price,
                    image: medicine.image,
                    mah: medicine.mah,
                    quantity: 1,
                    totalCost: medicine.price

                })
                

                result.save()

                return {
                    statusCode: 200,
                    message: 'item added to cart'
                }
            }
        }
        else {
            return {
                statusCode: 404,
                message: "Not a user"
            }
        }
    })
}


// ------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------

// getCart
const getCart = (phone) => {

    return db.User.findOne({ phone }).then((result) => {
        if (result) {
            console.log(result);
            if (result.cart.length != 0) {

                totalPrice=0
                result.cart.map(med =>{totalPrice += med.quantity*med.totalCost})
                console.log(totalPrice);
                let GST = (5 / 100) * totalPrice
                let grantTotal = GST + totalPrice

                return {
                    statusCode: 200,
                    cart: result.cart,
                    totalPrice: totalPrice,
                    GST: GST,
                    grantTotal: grantTotal,
                }

            }
            else {
                return {
                    statusCode: 404,
                    message: "Cart is empty"
                }
            }

        }
        else {
            return {
                statusCode: 404,
                message: "Not a user"
            }
        }

    })
}


// remove Item from cart
const removeFromCart = (phoneNum, medicineId) => {
    return db.User.findOne({ phone: phoneNum }).then((result) => {
        if (result) {
            let index = result.cart.find(item => item.document_id == medicineId.id)
            let num = result.cart.splice(index, 1)
            result.save()

            if (num) {
                if (result.cart.length == 0) {
                    return {
                        statusCode: 200,
                        message: "Cart is empty"
                    }
                }
                else {
                    return {
                        statusCode: 200,
                        cart: result.cart
                    }
                }
            }
            else {
                return {
                    statusCode: 404,
                    message: 'item not found'
                }
            }
        }
    })
}

// empty cart
const emptyCart =(phone)=>{
    return db.User.findOne({phone}).then((result)=>{
        console.log(result);
        let len = result.cart.length
        console.log(len);
        result.save()
        if(result){
            result.cart.splice(0,len)
            console.log(result);

            return{
                result:result.cart,
                statusCode:200
            }
        }
        else{
            return{
                statusCode:404,
                message:"cart empty"
            }
        }
    })
}

// all skin care



// view Skin Care


// store medicine in wishlist





module.exports = {
    allMedicines,
    viewMedicines,
    register,
    login,
    addtoWishlist,
    getwishlist,
    deleteItemwishlist,
    addToCart,
    getCart,
    removeFromCart,
    emptyCart,
   
}