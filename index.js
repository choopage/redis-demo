const redis = require("redis");

const client = redis.createClient ({
    port : 12000,
    host : "localhost",
    db: 0
});

client.set("mykey", "Hello from node-redis!");
client.get("mykey", function(err, result){
    if (err) { throw err; }

    console.log(result);
});

const vehiclesData = ["vehicles", 4, "car", 2, "bike", 10, "cara"];
client.zadd(vehiclesData, function(addError, addResponse) {
    if (addError) { throw addError; }

    console.log("added " + addResponse + " items.");

    const query = ["vehicles", 0, -1];
    client.zrange(query, function(rangeError, rangeResponse) {
        if (rangeError) {throw rangeError;}
        console.log("vehicles", rangeResponse);
    });
});
