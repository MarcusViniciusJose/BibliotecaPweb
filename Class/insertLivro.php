<?php
include 'conexao.php';

header('content-type: application/json');

$sql = "INSERT INTO livro(titulo, isbn, exemplar, assunto, edicao, ano, autor) VALUES ('".$_POST['titulo']."' ,". $_POST['isbn'].",". $_POST['exemplar']. "," .$_POST['assunto']. "," .$_POST['edicao']. "," .$_POST['ano']. "," .$_POST['autor']." )";

if($conn->query($sql) === true){
    $msg = "livro criado com sucesso!";
}else{
    $msg = "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

echo json_encode(['msg'=>$msg]);

?>