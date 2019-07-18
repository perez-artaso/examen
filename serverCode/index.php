<?php
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use \Firebase\JWT\JWT;

require 'vendor/autoload.php';

/* 
    public static function () {
        $DBCon = DBConnection::NewDBConnection();
        $queryString = '';
        $query = $DBCon->SetQuery($queryString);

        $query->bindValue(1, '', PDO::PARAM_STR);

        $query->execute();
    }

*/

$app = new \Slim\App(['settings' => ['displayErrorDetails' => true]]);


$app->run();

