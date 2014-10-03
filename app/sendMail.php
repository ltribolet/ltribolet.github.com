<?php
/**
 * Created by PhpStorm.
 * User: Luc
 * Date: 02/10/2014
 * Time: 20:00
 */

//form data
$sName = strip_tags($_POST['input-name']);
$sEmail = strip_tags($_POST['input-email']);
$sSubject = htmlentities(strip_tags($_POST['input-subject']));
$sText = htmlentities(strip_tags($_POST['input-text']));

$aErrors = [];

if ($sName == "") {
    $aErrors['input-name'] = true;
}

if ($sEmail == "" || !filter_var($sEmail, FILTER_VALIDATE_EMAIL)) {
    $aErrors['input-email'] = true;
}

if ($sSubject == "") {
    $aErrors['input-subject'] = true;
}

if ($sText == "") {
    $aErrors['input-text'] = true;
}

if (empty($aErrors)) {
    // the email address where the script will email the form results to
    $to = "luc+perso@tribolet.fr";

    // where the email will look like it is sent from
    $from = $sEmail;

    $subject = $sSubject;

    $body = $sText . "
    ";

    $headers = "From: $from" . "
    ";
    $headers .= "Reply-To: $from" . "
    ";
    $headers .= "Return-Path: $from" . "
    ";

    // mail(to,subject,body,headers);

    $isMailed = mail($to, $subject, $body, $headers);

    if ($isMailed) {
        $aReturn = array('success' => true);
    } else {
        $aReturn = array('success' => false, 'reason' => 0);
    }

} else {
    $aReturn = array('success' => false, 'reason' => $aErrors);
}

header('Content-Type: application/json');
echo json_encode($aReturn);