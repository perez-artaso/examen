<?php
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

require 'vendor/autoload.php';
require_once './UsersManagement.php';
require_once './CoursesManagement.php';
require_once './InscriptionsManagement.php';



$app = new \Slim\App(['settings' => ['displayErrorDetails' => true, 'determineRouteBeforeAppMiddleware' => true]]);

$app->post('/createUser', function(Request $request, Response $response) {
    $result = UsersManagement::CreateUser(
        $request->getParsedBody()['mail'],
        $request->getParsedBody()['password'],
        $request->getParsedBody()['type']
    );
    if($result !== TRUE) {
        return $response->getBody()->write(
            json_encode(
                array(
                    'statusCode' => 500,
                    'message' => $result
                )
            )
        );
    } else {
        return $response->getBody()->write(
            json_encode(
                array(
                    'statusCode' => 200,
                    'message' => $result
                )
            )
        );
    }
});

$app->options('/createUser', function(Request $request, Response $response){
    return $newResponse = $response
    ->withAddedHeader("Access-Control-Allow-Headers", "*")
    ->withAddedHeader("Access-Control-Allow-Origin", "*");
});

$app->post('/login', function (Request $request, Response $response) {
    $result = UsersManagement::Login($request->getParsedBody()['mail'], $request->getParsedBody()['password']);

    if ($result === -1) {
        return $response->getBody()->write(
            json_encode(
                array(
                    "statusCode" => 500,
                    "message" => "Contraseña Incorrecta"
                )
            )
        );
    } else if ($result === 0) {
        return $response->getBody()->write(
            json_encode(
                array(
                    "statusCode" => 404,
                    "message" => "Usuario No Registrado"
                )
            )
        );
    } else {
        return $response->getBody()->write(
            json_encode(
                array(
                    "statusCode" => 200,
                    "message" => $result
                )
            )
        );
    }

});

$app->options('/login', function(Request $request, Response $response){
    return $newResponse = $response
    ->withAddedHeader("Access-Control-Allow-Headers", "*")
    ->withAddedHeader("Access-Control-Allow-Origin", "*");
});

$app->get('/readUsers', function(Request $request, Response $response){
    return $response->getBody()->write(
        json_encode(
            array(
                "statusCode" => 200,
                "message" => UsersManagement::ReadUsers()
            )
        )
    );
});

$app->options('/readUsers', function(Request $request, Response $response){
    return $newResponse = $response
    ->withAddedHeader("Access-Control-Allow-Headers", "*")
    ->withAddedHeader("Access-Control-Allow-Origin", "*");
});

$app->post('/createCourse', function (Request $request, Response $response) {
    try {
        CoursesManagement::CreateCourse(
            $request->getParsedBody()['name'],
            $request->getParsedBody()['quarter'],
            $request->getParsedBody()['room'],
            $request->getParsedBody()['teacher']
        );

        return $response->getBody()->write(json_encode(
            array(
                "statusCode" => 200
            )
        ));
    } catch(Exception $e) {
        return $response->getBody()->write(
            json_encode(
                array(
                    "statusCode" => 500
                )
            )    
        );
    }

});

$app->options('/createCourse', function(Request $request, Response $response){
    return $newResponse = $response
    ->withAddedHeader("Access-Control-Allow-Headers", "*")
    ->withAddedHeader("Access-Control-Allow-Origin", "*");
});

$app->get('/readCourses', function (Request $request, Response $response) {
    return $response->getBody()->write(
        json_encode(
            array(
                "statusCode" => 200, 
                "message" => CoursesManagement::ReadCourses()
            )
        )
    );

});

$app->options('/readCourses', function(Request $request, Response $response){
    return $newResponse = $response
    ->withAddedHeader("Access-Control-Allow-Headers", "*")
    ->withAddedHeader("Access-Control-Allow-Origin", "*");
});

$app->post('/createInscription', function (Request $request, Response $response) {

    try {
        InscriptionsManagement::CreateInscription(
            $request->getParsedBody()['student'],
            $request->getParsedBody()['course']
        );

        return $response->getBody()->write(json_encode(
            array(
                "statusCode" => 200
            )
        ));
    } catch (Exception $e) {
        return $response->getBody()->write(
            json_encode(
                array(
                    "statusCode"=> 500,
                    "message" => $e->getMessage()
                )
            )
        );
    }

});

$app->options('/createInscription', function(Request $request, Response $response){
    return $newResponse = $response
    ->withAddedHeader("Access-Control-Allow-Headers", "*")
    ->withAddedHeader("Access-Control-Allow-Origin", "*");
});

$app->get('/readInscriptions', function (Request $request, Response $response) {
    return $response->getBody()->write(
        json_encode(
            array(
                "statusCode" => 200,
                "message" => InscriptionsManagement::ReadInscriptions()
            )
        )
    );
});

$app->options('/readInscriptions', function(Request $request, Response $response){
    return $newResponse = $response
    ->withAddedHeader("Access-Control-Allow-Headers", "*")
    ->withAddedHeader("Access-Control-Allow-Origin", "*");
});

$app->run();

