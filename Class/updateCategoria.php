<?php
include 'conexao.php';

header('Content-type: application/json');

$sql = "update categoria set descricao = '" .$_POST['descricao']. "', tempo = ". $_POST['tempo'].", valMulta= ". $_POST['valMulta'] ." where codCategoria= ".$_POST['codcategoria']. "";

if($conn->query($sql)===true){
    $msg = "Categoria atualizada com sucesso";
}else{
    $msg = "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

echo json_encode(['msg'=>$msg]);
?>