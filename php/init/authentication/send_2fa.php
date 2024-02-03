<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../vendor/phpmailer/phpmailer/src/Exception.php';
require '../vendor/phpmailer/phpmailer/src/PHPMailer.php';
require '../vendor/phpmailer/phpmailer/src/SMTP.php';

function generate2FACode() {
    return rand(100000, 999999);
}

$mail = new PHPMailer(true);
$email = 'ajd27@njit.edu';
try {
    // SMTP configuration
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'foodlovers.teamchampa@gmail.com';
    $mail->Password   = 'yyeu ctqr ymeq nkwy';
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;

    // Recipients
    $mail->setFrom('foodlovers.teamchampa@gmail.com', 'Mailer');
    $mail->addAddress($email, 'Email Name'); // Replace with user's email

    // Content
    $code = generate2FACode();
    $mail->isHTML(true);
    $mail->Subject = 'FoodLovers - Your 2FA Code';
    $mail->Body    = 'Your 2FA code is: ' . $code;

    $mail->send();

    $data = array(
        'isEmailSent' => true,
        'message' => '2FA code sent successfully',
        'email' => $email,
        'code' => $code
    );
    // Set the Content-Type header to application/json
    header('Content-Type: application/json');
    
    // Encode the data as JSON and output it
    echo json_encode($data);
} catch (Exception $e) {
    $data = array(
        'isEmailSent' => false,
        'message' => '2FA code not sent successfully',
        'error' => $e->getMessage()
    );
    // Set the Content-Type header to application/json
    header('Content-Type: application/json');
    
    // Encode the data as JSON and output it
    echo json_encode($data);
}
?>

