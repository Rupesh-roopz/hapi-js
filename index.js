'use strict';

const Hapi = require('@hapi/hapi');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    //normal route
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Hello World!';
        }
    });

    //hapi can have ability to use multiple routes
    server.route({
        method: ['POST', 'PUT'],
        path: '/home',
        handler: (requst, h) => {
            return 'Hello sir';
        }
    })

    //path params
    server.route({
        method: 'GET',
        // path: '/home/{user?}',  //optional params
        path: '/home/{user}',
        handler: (request, h) => {
            const name = request.params.user;
            return 'Hello ' + name
        }
    })

    //returning json data
    //hapi has the functionality to respond with JSON data by default. 
    //The only thing you have to do is just return a valid JavaScript object 
    //and hapi will take care of the rest for you.
    server.route({
        method: 'GET',
        path: '/user',
        handler: (request, h) => {
            const user = {
                firstName: 'John',
                lastName: 'Doe',
                userName: 'JohnDoe',
                id: 123
            }
    
            return user;
        }
    })


    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();