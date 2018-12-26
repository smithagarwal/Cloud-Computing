// =============================================================================
/**
 * Cloud Computing Cource Exercises
 * Exercise 1
 *  2 Tasks
 *      1. Accessing VM information using unauthenticated API
 *      2. Service Level Authentication
 * Exercise 2
 *  5 Tasks
 *      1. Add an API to your application to send a message
 *      2. Build a docker image for your application
 *      3. Pushing and Pulling the image from docker hub
 *      4. Running Application inside a docker container
 *      5. Enable docker Remote API
 * Developed by 'Write Group Name'
 * Write Names of All Members
 */
// =============================================================================
/**
 * BASE SETUP
 * import the packages we need
 */
const express    = require('express');
const app        = express();
const port       = process.env.PORT || 8080; // set our port
/**
 * ROUTES FOR OUR API
 * Create our router
 */
const router = express.Router();
/**
 * Middleware to use for all requests
 */
router.use(function(req, res, next) {
    /**
     * Logs can be printed here while accessing any routes
     */
    console.log('Accessing Exercises Routes');
    next();
});
/**
 * Base route of the router : to make sure everything is working check http://localhost:8080/exercises)
 */
router.get('/', function(req, res) {
    res.json({ message: 'Welcome to Cloud Computing Exercises API!'});
});
/**
 * Exercise 1: Task 1 Route (Accessing VM information, This is also unauthenticated API)
 */
router.route('/exercise1_task1')
    .get(function(req, res)
    {
        /**
         * Hint : http://nodejs.org/api.html#_child_processes
         */
        const exec = require('child_process').exec;
        // ================================================================================================================
        /**
         * TO DO
         * 1. Get the number of current users login into virtual machine
         * 2. Get the names of those users
         * 3. Get the number of storage disks ((we are here only concerned about the disks and that too Virtual disks (vd)))
         * 4. Get size Information about the above disks (disk: size).
         * 5. save in exercise_1_Message
         */
        // =================================================================================================================
        let exercise_1_Message = {
                message: 'exercise_1',
                numberUsers: 'x',
                userNames:['x','y'],
                numStorageDisks:'xy',
                storageDisksInfo:['size1', 'size2', 'size3']
            };
        exec("who | wc -l",function (error, stdout, stderr)
        {
            var lines = stdout.toString().split('\n');
            exercise_1_Message.numberUsers=lines[0];
            exec("who | cut -d \" \" -f 1",function (error, stdout, stderr)
            {
                var lines = stdout.toString().split('\n');
                lines = lines.filter(Boolean)
                exercise_1_Message.userNames=lines;
                exec("fdisk -l | grep \"^Disk\" | grep \"vd\" | cut -f 1 -d ',' | cut -f 3- -d '/' | wc -l",function (error, stdout, stderr)
                {
                    var lines = stdout.toString().split('\n');
                    lines = lines.filter(Boolean)
                    exercise_1_Message.numStorageDisks=lines[0];
                    exec("fdisk -l | grep \"^Disk\" | grep \"vd\" | cut -f 1 -d ',' | cut -f 3- -d '/'",function (error, stdout, stderr)
                    {
                        var lines = stdout.toString().split('\n');
                        lines = lines.filter(Boolean)
                        exercise_1_Message.storageDisksInfo=lines;
                        console.log(exercise_1_Message);
                        res.json( exercise_1_Message);
                    });
                });

            });

        });
    });
/**
 * Exercise 1: Task 2 Route (Service Level Authentication)
 */
router.route('/exercise1_task2')
    .get(function(req, res)
    {
        // ================================================================================================================
        /**
         * TO DO
         * 1. Add the default authentication to username: 'CCS' and password as 'CCS_exercise1_task2'.
         * 2. On success authentication return the response with value 'Successful Authentication'.
         * 3. In case of failure return the response with value 'Unsuccessful Authentication'.
         */
            // =================================================================================================================
        let auth;
        /**
         * check whether an autorization header was send
         */
        if (req.headers.authorization)
        {
            /**
             *  only accepting basic auth, so:
             * cut the starting 'Basic ' from the header
             * decode the base64 encoded username:password
             * split the string at the colon
             * should result in an array
             */
            auth = new Buffer(req.headers.authorization.substring(6), 'base64').toString().split(':');
        }
        /**
         *  checks if:
         * auth array exists
         * first value matches the expected username
         * second value the expected password
         */
        if (!auth || auth[0] !== 'CCS' || auth[1] !== 'CCS_exercise1_task2') {
            /**
             * any of the tests failed
             * send an Basic Auth request (HTTP Code: 401 Unauthorized)
             */
            res.statusCode = 401;
            res.setHeader('WWW-Authenticate', 'Basic realm="Enter the Username and Passord:"');
            /**
             * this will displayed in the browser when authorization is cancelled
             */
            res.end('Unsuccessful Authentication');
        }
        else {
            /**
             * Processing can be continued here, user was authenticated
             */
            res.send('Successful Authentication');
        }
    });
/**
 * Exercise 2: Send a message "group 'GroupNumber' application deployed using docker"
 * Replace GroupNumber with your group number
 * This api will be called from the server
 */
router.route('/exercise2')
    .get(function(req, res)
    {
        res.send("");
    });
/**
 * REGISTER OUR ROUTES
 * our router is now pointing to /exercises
 */
app.use('/exercises', router);
/**
 * Start the server
 * our router is now pointing to /exercises
 */
app.listen(port);
console.log('Server started and listening on port ' + port);