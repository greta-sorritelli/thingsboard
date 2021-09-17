<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept"); 
    $folder = "upload/";
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    
    $img = explode(";base64,", $request->fileSource);
    
    $img_aux = explode("image/", $img[0]);
    
    $image_type = $img_aux[1];
    
    $img_base64 = base64_decode($img[1]);
    
    $image = $folder . uniqid() . '.png';
    
    file_put_contents($image, $img_base64);
?>