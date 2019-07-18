<?php
use \Firebase\JWT\JWT;
include_once('./DBConnection.php');

class UsersManagement {

    private static $key = '123456';

    public static function CreateUser($mail, $password, $type) {
        try {
            $DBCon = DBConnection::NewDBConnection();
            $queryString = 'INSERT INTO users (mail, password, type) VALUES (?, ?, ?)';
            $query = $DBCon->SetQuery($queryString);
            $query->bindValue(1, $mail, PDO::PARAM_STR);
            $query->bindValue(2, $password, PDO::PARAM_STR);
            $query->bindValue(3, (int) $type, PDO::PARAM_INT);
    
            $query->execute();

            return true;
        } catch (Exception $e) {
            return $e->getMessage();
        }        
    }

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
                'type' => $result[0]["type"],
                'iat' => $now->getTimeStamp(),
                'exp' => $expirationTime->getTimeStamp()
                ), UsersManagement::$key);
            } else return -1;
        } else return 0;
    }

    public static function ReadUsers() {
        $DBCon = DBConnection::NewDBConnection();
        $queryString = 'SELECT id, mail, type FROM users';
        $query = $DBCon->SetQuery($queryString);
        
        $query->execute();

        return $query->fetchAll();
    }

}