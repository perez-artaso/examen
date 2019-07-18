<?php

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


public static function Login ($mail, $password) {
    $DBCon = DBConnection::NewDBConnection();
    $queryString = 'SELECT * FROM users WHERE mail LIKE ?';
    $query = $DBCon->SetQuery($queryString);
    $query->bindValue(1, $mail, PDO::PARAM_STR);

    $query->execute();

    $result = $query->fetchAll();

    if($result !== []) {
        if ($result[0]["password"] === $password) {
            $now = new DateTime();
            $expirationTime = new DateTime('+30 minutes');
            return JWT::encode(array(
            'id' => $result[0]['id'],
            'mail' => $result[0]["mail"],
            'iat' => $now->getTimeStamp(),
            'exp' => $expirationTime->getTimeStamp()
            ), UsersManagement::$key);
        } else return -1;
    } else return 0;
}