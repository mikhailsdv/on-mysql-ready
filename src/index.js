const mysql = require("mysql2")
const config = require("./config")
const onReady = require("./onReady")

let count = 1
console.log("Trying to connect...")
const attempt = async () => {
	console.log(`Сonnection attempt ${count}/${config.ATTEMPTS_COUNT}`)
	const connection = mysql.createConnection({
		host: config.HOST,
		user: config.USERNAME,
		password: config.PASSWORD,
		database: config.DATABASE,
		port: config.PORT || 3306,
	})
	connection.connect(err => {
		if (err) {
			console.log("There was an error:", err)
			console.log(`Waiting ${config.ATTEMPTS_DELAY}ms before retrying...`)
			count++
			setTimeout(attempt, config.ATTEMPTS_DELAY)
		}
		else {
			console.log("Successfully connected!")
			onReady()
		}
	})
}

attempt()