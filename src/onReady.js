const fs = require("fs")
const exec = require("child_process").exec
const folder = "C:/Users/mavly/Desktop/a"

function getCommandLine() {
   switch (process.platform) { 
      case "darwin" : return "open";
      case "win32" : return "start";
      case "win64" : return "start";
      default : return "xdg-open";
   }
}

module.exports = () => {
	fs.readdir(folder, (err, files) => {
		files.forEach(fileName => {
			const path = `${folder}/${fileName}`
			console.log(`Opening ${path}`)
			const safePath = path.replace(/(\s+)/g, "\"$1\"")
			exec(`${getCommandLine()} ${safePath}`)
		})
		setTimeout(process.exit, 15000)
	})
}