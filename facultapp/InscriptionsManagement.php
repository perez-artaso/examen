<?php

class InscriptionsManagement {
    public static function CreateInscription ($student, $course) {
        $DBCon = DBConnection::NewDBConnection();
        $queryString = 'INSERT INTO inscriptions (student, course) VALUES (?, ?)';
        $query = $DBCon->SetQuery($queryString);

        $query->bindValue(1, $student, PDO::PARAM_STR);
        $query->bindValue(2, $course, PDO::PARAM_STR);

        $query->execute();
    }

    public static function ReadInscriptions () {
        $DBCon = DBConnection::NewDBConnection();
        $queryString = 'SELECT * FROM inscriptions';
        $query = $DBCon->SetQuery($queryString);

        $query->execute();

        return $query->fetchAll();
    }
}