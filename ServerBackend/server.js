require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 50 * 1024 * 1024 } })
const bodyParser = require('body-parser')
const mysql = require('mysql2');

const app = express({ limit: "1000mb" });
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(bodyParser.json());

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
    console.log("imageOfProduct data: ", imageOfProduct )

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


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

