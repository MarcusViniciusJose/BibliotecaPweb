<?php
include 'conexao.php';

header('content-type: application/json');

$sql = "INSERT INTO associado(descricao, tempo, valMulta) VALUES ('".$_POST['descricao']."' ,'". $_POST['tempo']."','". $_POST['valMulta']."')";

if($conn->query($sql) === true){
    $msg = "Associado criada com sucesso!";
}else{
    $msg = "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

echo json_encode(['msg'=>$msg]);

?>