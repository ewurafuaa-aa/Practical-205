const mongoose = require('mongoose')
//use mongoose for everything that interacts with the database

//schema determines each field
const productSchema = mongoose.Schema(
    {
        name: {
            //determine the data type of the field
            type: String,
            //validation message ""
            required: [true, "Please enter a product name"]
        },
        quantity: {
            type: Number,
            required: true,
            default: 0
        },
        price: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: false,
        },
    },
    //timestamp is used to created at & updated at, tracks when data is saved to the database and when data is modified
    {
        timestamps: true
    }
)

const Product = mongoose.model('Product', productSchema);

module.exports = Product;