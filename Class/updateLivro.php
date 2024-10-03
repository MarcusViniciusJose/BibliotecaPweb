<?php
include 'conexao.php';

header('Content-type: application/json');

$sql = "update livro set nome = '" .$_POST['nome']. "', cpf = ". $_POST['cpf'].", ra= ". $_POST['ra'] ." where codlivro= ".$_POST['codlivro']. "";

if($conn->query($sql)===true){
    $msg = "livro atualizada com sucesso";
}else{
    $msg = "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

echo json_encode(['msg'=>$msg]);
?>