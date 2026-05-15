const express = require("express");
const router = express.Router();

const connection = require("../config/db");

router.post("/login", (req, res) => {

    const { username, password } = req.body;

    const sql =
        "SELECT * FROM users WHERE username=? AND password=?";

    connection.query(
        sql,
        [username, password],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Database Error"
                });
            }

            if (result.length > 0) {
                res.json({
                    success: true,
                    message: "Login Successful"
                });
            } else {
                res.json({
                    success: false,
                    message: "Invalid Credentials"
                });
            }
        }
    );
});

module.exports = router;