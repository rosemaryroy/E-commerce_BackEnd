const mongoose = require('mongoose')

mongoose.set('strictQuery',false);
// using mongoose define connecting string

mongoose.connect('mongodb://localhost:27017/medstore',()=>{
    console.log('mongodb connected successfully');
})

const Medicine = mongoose.model('Medicine',
    {


        commercial_name: String,
        document_id: Number,
        language_code: String,
        lastUpdate: Date,
        lastUpdated: Date,
        image: String,
        leafletTypeCode: String,
        mah: String,
        mime_type: String,
        nman_code: String,
        source: String,
        price:Number

    })
    const User = mongoose.model('User',{
        name:String,
        email:String,
        phone:Number,
        password:String,
        wishlist:[],
        cart:[]
       
    })

   

   


module.exports = {
    Medicine,
    User,
   

}