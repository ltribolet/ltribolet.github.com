<?php

$callbackMessage = '';

if((isset($_POST['nameField'])) && (isset($_POST['mailField'])) && (isset($_POST['textField']))) {

	$name = trim($_POST['nameField']);
	$mail = trim($_POST['mailField']);
	$message = trim($_POST['textField']);

	$To = 'luc.tribolet@gmail.com'; 
	$Subject = 'Contact form CV - '.$name; 
	$Message = $message; 
	$Headers = "From: ".$mail." rn" . 
	"Reply-To: ".$mail." rn" . 
	"Content-type: text/html; charset=UTF-8 rn"; 
	
	$isSend = mail($To, $Subject, $Message, $Headers);

	if($isSend)
		$callbackMessage = "Your message has been send. Thank you.<br>I'll respond you as soon as possible.";
	else
		$callbackMessage = 'There was an issue during send the mail.';
}
else {
	$callbackMessage = 'An error occured: there was a missing field. Please retry.';
}

echo $callbackMessage;

?>