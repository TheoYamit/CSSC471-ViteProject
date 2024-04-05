require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 50 * 1024 * 1024 } })
const mysql = require('mysql2');

const app = express({ limit: "50mb" });
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({extended: "true", limit: '50mb'}));
app.use(cors({
    origin: '*'
}));

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

function query(sql, params) {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
}

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const getUserQuery = `SELECT * FROM registeredusers WHERE username = ? AND password = ?`;

    const data = [username, password]

    try {
        const results = await query(getUserQuery, data);
        console.log(results)
        if (results.length > 0) {
            res.send({ status: "success", message: "You're logged in user " + username + ". Redirecting to homepage...", profile: results })
        }
        else {
            console.log("No such user/password combination. Make sure you entered it in correctly.")
            res.status(500).send({ status: "error", message: "No such user/password combination. Make sure you entered it in correctly." });
        }

    } catch (error) {
        res.status(500).send({ status: "error", message: "Error occured." });
    }
});

app.post('/register', async (req, res) => {
    const { username, password, firstName, lastName, email, address } = req.body;

    const insertUserQuery = `INSERT INTO registeredusers (Username, Password, First_name, Last_name, Email, Address) VALUES (?, ?, ?, ?, ?, ?)`

    const data = [username, password, firstName, lastName, email, address]
    console.log(data);

    try {
        await query(insertUserQuery, [username, password, firstName, lastName, email, address]);
        res.send({ status: "success", message: "User " + username + " has been successfully registered. You can now login." });
    } catch (error) {
        console.error("Error registering the user:", error);
        res.status(500).send({ status: "error", message: "Error registering user" });
    }
});

app.post('/profileinfo', async (req, res) => {
    const { Username, Password, First_name, Last_name, Email, Address } = req.body;

    const userCheckQuery = `UPDATE registeredusers SET Password = ?, First_name = ?, Last_name = ?, Email = ?, Address = ? WHERE Username = ?`
    const getUserQuery = `SELECT * FROM registeredusers WHERE username = ? AND password = ?`;

    const data = [Password, First_name, Last_name, Email, Address, Username]
    try {
        await query(userCheckQuery, data);
        const results = await query(getUserQuery, [Username, Password]);
        res.send({ status: "success", message: "User " + Username + "'s profile info updated" + " Returning to home...", profile: results });
    } catch (error) {
        console.error("Error registering the user:", error);
        res.status(500).send({ status: "error", message: "Error updating profile. if you changed email, make sure it hasn't already been signed up with." });
    }
});

app.post('/addproduct', upload.single('imageOfProduct'), async (req, res) => {
    const { productID, nameOfProduct, descOfProduct, priceOfProduct, categoryOfProduct, genderOfProduct } = req.body;
    const imageOfProduct = req.file.buffer;

    const addProductQuery = `INSERT INTO  products(ProductID, Name, Description, Price, Image, Category, Gender, isNew, isDiscounted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`

    const data = [productID, nameOfProduct, descOfProduct, priceOfProduct, imageOfProduct, categoryOfProduct, genderOfProduct, 1, 0]
    console.log(data);
    try {
        await query(addProductQuery, data);
        res.send({ status: "success", message: "Product successfully added!" })
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error", message: "Error adding product!" })
    }
});

app.post('/getproduct', async (req, res) => {
    const { productID } = req.body;
    const getProductQuery = `SELECT * FROM products WHERE ProductID = ?`;
    data = [productID];
    console.log(data);
    try {
        const results = await query(getProductQuery, data);
        console.log(results);
        if (results.length == 0) {
            throw Error;
        }
        res.send({ status: "success", message: "Obtained product info. Loading info...", product: results })
    } catch (error) {
        res.status(500).send({ status: "error", message: "Could not find Product ID!" });
    }
});

app.post('/getproductscategory', async (req, res) => {
    const { categoryOfProduct } = req.body;

    const queryForCategory = `SELECT * FROM products WHERE Category = ?`

    data = [categoryOfProduct]

    try {
        const results = await query(queryForCategory, categoryOfProduct);
        res.send({ status: "success", message: "Successfuly got products for the given category.", products: results });
    } catch (error) {
        res.status(500).send({ status: "error", message: "Error occured." });
    }

});

app.post('/editproduct', upload.single('imageOfProduct'), async (req, res) => {
    console.log(req.body)
    const { productID, nameOfProduct, descOfProduct, priceOfProduct, categoryOfProduct, genderOfProduct, isNew, isDiscounted } = req.body;
    let discountedPrice = req.body.discountedPrice;
    let imageOfProduct = req.file ? req.file.buffer : null;

    if (imageOfProduct === null) {
        const getImageQuery = `SELECT Image FROM products WHERE ProductID = ?`
        try {
            const results = await query(getImageQuery, [productID]);
            const [{ Image }] = results;
            console.log("Image data:", Image);
            imageOfProduct = Image;
        } catch (error) {
            console.log(error);
        }
    }
    console.log("imageOfProduct data: ", imageOfProduct)

    console.log("Original discountedPrice:", discountedPrice);

    if (discountedPrice === 'undefined') {
        discountedPrice = null;
    }

    console.log("Adjusted discountedPrice:", discountedPrice);

    const editProductQuery = `UPDATE products SET Name = ?, Description = ?, Price = ?, Image = ?, Category = ?, Gender = ?, isNew = ?, isDiscounted = ?, DiscountedPrice = ? WHERE ProductID = ?`

    data = [nameOfProduct, descOfProduct, priceOfProduct, imageOfProduct, categoryOfProduct, genderOfProduct, isNew, isDiscounted, discountedPrice, productID];

    try {
        await query(editProductQuery, data);
        res.send({ status: "success", message: "Product " + productID + " has been succesfully updated!" })
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error", message: "Error updating product!" })
    }


})

app.get('/getproductclothing', async (req, res) => {

    const clothingProdQuery = 'SELECT * FROM products WHERE Category = ?'
    const data = ["Clothing"];

    try {
        const results = await query(clothingProdQuery, data);
        res.send({ status: "success", message: "Products sent!", products: results });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error", message: "Error occurred" });
    }

});

app.get('/getproductshoes', async (req, res) => {

    const shoesProdQuery = 'SELECT * FROM products WHERE Category = ?'
    const data = ["Shoes"];

    try {
        const results = await query(shoesProdQuery, data);
        res.send({ status: "success", message: "Products sent!", products: results });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error", message: "Error occurred" });
    }

});

app.get('/getproductbeauty', async (req, res) => {

    const beautyProdQuery = 'SELECT * FROM products WHERE Category = ?'
    const data = ["Beauty Products"];

    try {
        const results = await query(beautyProdQuery, data);
        res.send({ status: "success", message: "Products sent!", products: results });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error", message: "Error occurred" });
    }

});

app.post('/getproductinventory', async (req, res) => {
    const { productID } = req.body
    const getInventoryQuery = `SELECT Size, Stock FROM inventory WHERE ProductID = ?`
    const getProductQuery = `SELECT * FROM products WHERE ProductID = ?`;
    data = [productID];

    try {
        const results = await query(getInventoryQuery, data);
        const results2 = await query(getProductQuery, data)
        console.log(results);
        console.log(results2);

        if (results2.length == 0) {
            throw Error;
        }
        res.send({ status: "success", message: "Obtained product info. Loading info...", products: results, productInfo: results2 })
    } catch (error) {
        res.status(500).send({ status: "error", message: "Could not find Product ID!" });
    }
});

app.post('/addinventory', async (req, res) => {
    const { productID, category, inventoryData } = req.body;

    try {
        const queryInsertInventory = `
                INSERT INTO inventory(ProductID, Category, Size, Stock) 
                VALUES (?, ?, ?, ?) 
                ON DUPLICATE KEY UPDATE Stock = VALUES(Stock)`
        inventoryData.forEach(async ({ size, quantity }) => {
            await query(queryInsertInventory, [productID, category, size, quantity]);
        });

        console.log("Successfully updated inventory for product " + productID + "!");
        res.send({ status: "success", message: "Successfully updated inventory for product " + productID + "!" })
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error", message: "Could not update inventory!" });
    }
});

app.post('/addorder', async (req, res) => {
    console.log(req.body);
    const { OrderID, CustomerID, Name, Address, Country, Postal, DateOfOrder, PaymentDetails, Status, ExpectedDays, Products} = req.body;
    
    const addOrderQuery = `INSERT INTO orders (OrderID, CustomerID, Name, Address, Country, Postal, DateOfOrder, PaymentID, Status, ExpectedDays)
                           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

    const addPaymentQuery = `INSERT INTO payment (PaymentID, CustomerID, Total, CardNumber, CardDate, SecurityCode) VALUES (?, ?, ?, ?, ?, ?)`
    const addOrderDetailQuery = `INSERT INTO order_details (OrderID, ProductID, Size, Quantity, TotalPrice) VALUES (?, ?, ?, ?, ?)`
    
    const { PaymentNum, CardNumber, CardDate, CardCVC, TotalAmount } = PaymentDetails;

    const addOrderData = [OrderID, CustomerID, Name, Address, Country, Postal, DateOfOrder, PaymentNum, Status, ExpectedDays]
    const addPaymentData = [PaymentNum, CustomerID, TotalAmount, CardNumber, CardDate, CardCVC]

    try {
        await query(addOrderQuery, addOrderData);
        await query(addPaymentQuery, addPaymentData);

        Products.forEach( async ({OrderID, ProductID, TotalPrice, Size, Quantity}) => {
            await query(addOrderDetailQuery, [OrderID, ProductID, Size, Quantity, TotalPrice]);
        });
        res.send({status: "success", message: "Successfully placed order! Order Number: " + OrderID + ", Payment Number: " + PaymentNum})
    } catch(error) {
        console.log(error);
        res.status(500).send({status: "error", message: "An error occured. "})
    }

});

app.post('/getcustomerorders', async (req, res) => {
    const { Username } = req.body;
    console.log(Username);

    const getOrdersQuery = `SELECT * FROM orders WHERE CustomerID = ?`

    data = [Username];

    try {
        const ordersOfCustomer = await query(getOrdersQuery, data);
        console.log(ordersOfCustomer);
        res.send({orders: ordersOfCustomer});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "An error occured."});
    }
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

