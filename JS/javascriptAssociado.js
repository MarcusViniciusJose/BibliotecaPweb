$(document).ready(function () {
    var page = 1;
    var current_page = 1;
    var total_page = 0;
    var is_ajax_fire = 0;
    var types = new Map();
    var dataCon;
    createHeadTable();
    createForm();
    createEditForm();
    manageData();

    function manageData() {

        $.ajax({
            dataType: 'json',
            url: 'class/getAssociado.php',
            data: {page: page}
        }).done(function (data) {
            total_page = Math.ceil(data.total / 10);
            current_page = page;
            $('#pagination').twbsPagination({
                totalPages: total_page,
                visiblePages: current_page,
                onPageClick: function (event, pageL) {
                    page = pageL;
                    if (is_ajax_fire != 0) {
                        getPageData();
                    }
                }
            });

            manageRow(data.data);
            is_ajax_fire = 1;
        });
    }

    function getPageData() {
        $.ajax({
            dataType: 'json',
            url: 'class/getAssociado.php',

            data: {page: page}
        }).done(function (data) {
            manageRow(data.data);
        });
    }

    function manageRow(data) {

        dataCon = data;
        var rows = '';
        var i = 0;
        $.each(data, function (key, value) {
            rows = rows + '<tr>';
            rows = rows + '<td>' + value.codAssociado + '</td>';
            rows = rows + '<td>' + value.nome + '</td>';
            rows = rows + '<td data-id="' + i++ + '">';
            rows = rows + '<button data-toggle="modal" data-target="#edit-item" class="btn btn-primary edit-item">Editar</button> ';
            rows = rows + '<button class="btn btn-danger remove-item">Deletar</button>';
            rows = rows + '</td>';
            rows = rows + '</tr>';
        });

        $("tbody").html(rows);
    }
    function createHeadTable() {

        var rows = '<tr>';
        rows = rows + '<th> Código </th>';
        rows = rows + '<th> Nome </th>';
        rows = rows + '<th width="200px">Ação</th>'
        rows = rows + '</tr>'
        $("thead").html(rows);
    }
    function createForm() {

        var html = '';
        html = html + '<div class="form-group">';
        html = html + '<label class="control-label" for="codAssociado">Código</label>';
        html = html + '<input type="text" name="codAssociado" class="form-control" data-error="Por favor entre com o codAssociado" required />';
        html = html + '<div class="help-block with-errors"></div>';
        html = html + '</div>';
        html = html + '<div class="form-group">';
        html = html + '<label class="control-label" for="nome">Nome</label>';
        html = html + '<input type="text" name="nome" class="form-control" data-error="Por favor entre com o nome" required />';
        html = html + '<div class="help-block with-errors"></div>';
        html = html + '</div>';
        html = html + '<div class="form-group">';
        html = html + '<label class="control-label" for="cpf">cpf</label>';
        html = html + '<input type="text" name="cpf" class="form-control" data-error="Por favor entre com o cpf" required />';
        html = html + '<div class="help-block with-errors"></div>';
        html = html + '</div>';
        html = html + '<div class="form-group">';
        html = html + '<label class="control-label" for="categoria">categoria</label>';
        html = html + '<input type="text" name="categoria" class="form-control" data-error="Por favor entre com o categoria" required />';
        html = html + '<div class="help-block with-errors"></div>';
        html = html + '</div>';
        html = html + '<div class="form-group">';
        html = html + '<label class="control-label" for="endereco">Endereço</label>';
        html = html + '<input type="text" name="endereco" class="form-control" data-error="Por favor entre com o endereço" required />';
        html = html + '<div class="help-block with-errors"></div>';
        html = html + '</div>';
        html = html + '<div class="form-group">';
        html = html + '<button type="submit" class="btn crud-submit btn-success">Salvar</button>';
        html = html + '</div>';
        $("#create-item").find("form").html(html);
    }
    function createEditForm() {

        var html = '<input type="hidden" name="cod" class="edit-id">';
        html = html + '<div class="form-group">';
        html = html + '<label class="control-label" for="codAssociado">Código</label>';
        html = html + '<input type="text" name="codAssociado" class="form-control" data-error="Por favor entre com o codAssociado" required />';
        html = html + '<div class="help-block with-errors"></div>';
        html = html + '</div>';
        html = html + '<div class="form-group">';
        html = html + '<label class="control-label" for="nome">Nome</label>';
        html = html + '<input type="text" name="nome" class="form-control" data-error="Por favor entre com o nome" required />';
        html = html + '<div class="help-block with-errors"></div>';
        html = html + '</div>';
        html = html + '<div class="form-group">';
        html = html + '<label class="control-label" for="cpf">CPF</label>';
        html = html + '<input type="text" name="cpf" class="form-control" data-error="Por favor entre com o cpf" required />';
        html = html + '<div class="help-block with-errors"></div>';
        html = html + '</div>';
        html = html + '<div class="form-group">';
        html = html + '<label class="control-label" for="categoria">Categoria</label>';
        html = html + '<input type="text" name="categoria" class="form-control" data-error="Por favor entre com o categoria" required />';
        html = html + '<div class="help-block with-errors"></div>';
        html = html + '</div>';
        html = html + '<div class="form-group">';
        html = html + '<label class="control-label" for="endereco">Endereço</label>';
        html = html + '<input type="text" name="endereco" class="form-control" data-error="Por favor entre com o endereço" required />';
        html = html + '<div class="help-block with-errors"></div>';
        html = html + '</div>';
        html = html + '<div class="form-group">';
        html = html + '<button type="submit" class="btn crud-submit-edit btn-success">Salvar</button>';
        html = html + '</div>';
        $("#edit-item").find("form").html(html);

    }


    $(".crud-submit").click(function (e) {
        e.preventDefault();
        var form_action = $("#create-item").find("form").attr("action");
        var codAssociado = $("#create-item").find("input[name='codAssociado']").val();
        var nome = $("#create-item").find("input[name='nome']").val();
        var cpf = $("#create-item").find("input[name='cpf']").val();
        var ra = $("#create-item").find("input[name='ra']").val();
        var categoria = $("#create-item").find("input[name='categoria']").val();
        var endereco = $("#create-item").find("input[name='endereco']").val();

        $.ajax({
            dataType: 'json',
            type: 'POST',
            url: form_action,
            data: {codAssociado: codAssociado, nome: nome, cpf: cpf, ra: ra, categoria: categoria, endereco: endereco}
        }).done(function (data) {
            $("#create-item").find("input[name='codAssociado']").val('');
            $("#create-item").find("input[name='nome']").val('');
            $("#create-item").find("input[name='cpf']").val('');
            $("#create-item").find("input[name='ra']").val('');
            $("#create-item").find("input[name='categoria']").val('');
            $("#create-item").find("input[name='endereco']").val('');
            getPageData();
            $(".modal").modal('hide');
            toastr.success(data.msg, 'Alerta de Sucesso', {timeOut: 5000});

        });

    });
    $("body").on("click", ".edit-item", function () {
        var index = $(this).parent("td").data('id');

        var codAssociado = dataCon[index].codAssociado;
        var nome = dataCon[index].nome;
        var cpf = dataCon[index].cpf;
        var ra = dataCon[index].ra;
        var categoria = dataCon[index].categoria;
        var endereco = dataCon[index].endereco;


        $("#edit-item").find("input[name='codAssociado']").val(codAssociado);
        $("#edit-item").find("input[name='nome']").val(nome);
        $("#edit-item").find("input[name='cpf']").val(cpf);
        $("#edit-item").find("input[name='ra']").val(ra);
        $("#edit-item").find("input[name='categoria']").val(categoria);
        $("#edit-item").find("input[name='endereco']").val(endereco);
    });

    $(".crud-submit-edit").click(function (e) {

        e.preventDefault();
        var form_action = $("#edit-item").find("form").attr("action");
        var codAssociado = $("#edit-item").find("input[name='codAssociado']").val();
        var nome = $("#edit-item").find("input[name='nome']").val();
        var cpf = $("#edit-item").find("input[name='cpf']").val();
        var ra = $("#edit-item").find("input[name='ra']").val();
        var categoria = $("#edit-item").find("input[name='categoria']").val();
        var endereco = $("#edit-item").find("input[name='endereco']").val();

        $.ajax({
            dataType: 'json',
            type: 'POST',
            url: form_action,
            data: {codAssociado: codAssociado, nome: nome, cpf: cpf, ra: ra, categoria: categoria, endereco: endereco}

        }).done(function (data) {

            getPageData();
            $(".modal").modal('hide');
            toastr.success(data.msg, 'Alerta de Sucesso', {timeOut: 5000});
        });


    });

    function getDataSelect(type, select) {

        $.ajax({
            dataType: 'json', url: 'Acesso' + type,
            data: {page: page}
        }).done(function (data) {
            manageSelectOption(data.data, select, type);
        });
    }


});
