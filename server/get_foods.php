<?php
    header('Content-Type: application/json');
    require_once("inc/generate_response.php");
    function is_weekend($time) {
        return (date('N', ($time)) >= 6);
    }
    if(empty($_GET["timestamp"]) || strlen($_GET["timestamp"])<10){
        $timestamp = time();
    }else{
        $timestamp = $_GET["timestamp"];
        if(strlen($timestamp) == 13)
            $timestamp /= 1000;
    }

    if(is_weekend($timestamp)){
        $resp = array(
            "menu" => array()
        );
        echo generate_response(404,$resp);
        exit();
    }

    require_once("inc/db.php");
    $date = date('dmy', $timestamp);
    $query = $db->prepare("SELECT foods FROM foodlist WHERE date = ?");
    $query->execute(array(
        $date
    ));
    $menu = $query->fetch(PDO::FETCH_ASSOC);
    $resp = array(
        "menu" => json_decode($menu["foods"])
    );
    echo generate_response(200,$resp);

?>