let express = require('express')
let app = express();


var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));

app.use(function(req, res, next){
    next()
})

app.get('/api/:date?/', function(req, res){
    var dateInput = req.params.date

    var UTC;
    var unix;


    console.log("date test: ", dateInput)

    if (!dateInput){
        UTC = new Date()
        unix = UTC.getTime()
        console.log(date, unix)

    // if input is unix
    } else if (String(parseInt(dateInput)).length > 4){
        var date = new Date(Date.parse(req.params.date))
        var unixDate = new Date(parseInt(dateInput))
        //console.log("unix date: " + unixDate.getTime())
        unix = unixDate.getTime() 
        //console.log("utc date: " + unixDate.toUTCString())
        UTC = unixDate.toUTCString()
    } else {
        // get date
        var date = new Date(Date.parse(req.params.date))
        if (!isNaN(date.getTime())){
            // get unix
            var unixDate = date.getTime()
            //console.log("unix date: " + unixDate)
            unix = unixDate
            //console.log("utc date: " + date.toUTCString())
            UTC = date.toUTCString()
        } else {
            console.log({ error: "Invalid Date" })
            res.json({ error: "Invalid Date" })
            return
        }
    }

    console.log({ unix: Number(unix), utc: String(UTC) })
    res.json({ unix: Number(unix), utc: String(UTC) })
    return
})


// listening for requests
const listener = app.listen(3000, function() {
    console.log('Your app is listening on port: ', + listener.address().port)
})
