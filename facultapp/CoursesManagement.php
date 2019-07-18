<?php

require_once('./DBConnection.php');

class CoursesManagement {
    public static function CreateCourse($_name, $_quarter, $_room, $_teacher) {
        $DBCon = DBConnection::NewDBConnection();
        $queryString = 'INSERT INTO courses (name, quarter, room, teacher) VALUES (?, ?, ?, ?)';
        $query = $DBCon->SetQuery($queryString);

        $query->bindValue(1, $_name, PDO::PARAM_STR);
        $query->bindValue(2, (int) $_quarter, PDO::PARAM_INT);
        $query->bindValue(3, (int) $_room, PDO::PARAM_INT);
        $query->bindValue(4, $_teacher, PDO::PARAM_STR);

        $query->execute();
    }

    public static function ReadCourses() {
        $DBCon = DBConnection::NewDBConnection();
        $queryString = 'SELECT * FROM courses';
        $query = $DBCon->SetQuery($queryString);

        $query->execute();

        return $query->fetchAll();
    }
}