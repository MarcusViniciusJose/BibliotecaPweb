<?php
include 'conexao.php';

header('Content-type: application/json');

$sql = "update Associado set nome = '" .$_POST['nome']. "', cpf = ". $_POST['cpf'].", ra= ". $_POST['ra'] ." where codAssociado= ".$_POST['codAssociado']. "";

if($conn->query($sql)===true){
    $msg = "associado atualizada com sucesso";
}else{
    $msg = "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

echo json_encode(['msg'=>$msg]);
?>