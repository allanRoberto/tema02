jQuery(document).ready(function ($) {

	$('.ginput_container_phone input[type="text"]').focusout(function(){
    	var phone, element;
    	element = $(this);
    	element.unmask();
    	phone = element.val().replace(/\D/g, '');
	    if(phone.length > 10) {
	        element.mask("(99) 99999-999?9");
	    } else {
	        element.mask("(99) 9999-9999?9");
	    }
	}).trigger('focusout');

    function limpa_formulário_cep() {
        // Limpa valores do formulário de cep.
        $("#rua").val("");
        $("#bairro").val("");
        $("#cidade").val("");
        $("#uf").val("");
        $("#ibge").val("");
    }
            
    //Quando o campo cep perde o foco.
    $('.input-cep input[type="text"]').blur(function() {
      //Nova variável "cep" somente com dígitos.
      var cep = $(this).val().replace(/\D/g, '');
      //Verifica se campo cep possui valor informado.
      if (cep != "") {
        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;
        //Valida o formato do CEP.
        if(validacep.test(cep)) {
          //Preenche os campos com "..." enquanto consulta webservice.
          $(".input-address textarea").val("Procurando endereço ...");
          //Consulta o webservice viacep.com.br/
          $.getJSON("//viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {
            if (!("erro" in dados)) {
                //Atualiza os campos com os valores da consulta.
                $(".input-address textarea").val(dados.logradouro+" - "+dados.bairro+" - "+dados.localidade+"/"+dados.uf);
            } //end if.
            else {
                //CEP pesquisado não foi encontrado.
                limpa_formulário_cep();
                alert("CEP não encontrado.");
            }
          });
        } //end if.
        else {
          //cep é inválido.
          limpa_formulário_cep();
          alert("Formato de CEP inválido.");
        }
      } //end if.
      else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
      }
    });
    

  $('.input-date input[type="text"]').mask("99/99/9999");

    $('.input-marcas input[type="text"]').autocomplete({
      source: function(request, response) {
        $.ajax({
          type: 'GET',
          url: 'http://fipeapi.appspot.com/api/1/carros/marcas.json',
          dataType: 'jsonp',
          crossDomain: true,
          beforeSend : function() {
          	$(this).addClass('loading');
          },
          success: function(data) {
            response($.ui.autocomplete.filter($.map(data, function(item) {
              return {
                label: item.fipe_name,
                id: item.id
              }
            }), request.term))
          },
        });
      },
      minLength: 0,
      //evento de quando você seleciona uma opção   
      select: function(event, ui) {
        //seto a descrição para aparecer para usuario no input text
        $('.input-marcas input[type="text"]').val(ui.item.label);
        //seto o id para ir para seu backend :D
        $("#idmarcas").val(ui.item.id);

        event.preventDefault();
      }
  	}).focus(function(){
  	   	$(this).autocomplete("search");
  	}); 

    $(".input-veiculos input[type='text']").autocomplete({
      source: function(request, response) {
        $.ajax({
          type: 'GET',
          url: 'http://fipeapi.appspot.com/api/1/carros/veiculos/' + $("#idmarcas").val() + '.json',
          dataType: 'jsonp',
          crossDomain: true,
          success: function(data) {
            response($.ui.autocomplete.filter($.map(data, function(item) {
              return {
                label: item.fipe_name,
                id: item.id
              }
            }), request.term))
          },
        });
      },
      minLength: 0,
      //evento de quando você seleciona uma opção   
      select: function(event, ui) {
        //seto a descrição para aparecer para usuario no input text
        $(".input-veiculos input[type='text']").val(ui.item.label);
        //seto o id para ir para seu backend :D
        $("#idveiculos").val(ui.item.id);

        event.preventDefault();
      }
    }).focus(function(){
  	   	$(this).autocomplete("search");
  	}); 


    $('.input-modelo input[type="text"]').autocomplete({
      source: function(request, response) {
        $.ajax({
          type: 'GET',
          url: 'http://fipeapi.appspot.com/api/1/carros/veiculo/'+$("#idmarcas").val()+'/'+$("#idveiculos").val()+'.json',
          dataType: 'jsonp',
          crossDomain: true,
          success: function(data) {
            response($.ui.autocomplete.filter($.map(data, function(item) {
              return {
                label: item.name,
                id: item.fipe_codigo
              }
            }), request.term))
          },
        });
      },
      minLength: 0,
      //evento de quando você seleciona uma opção   
      select: function(event, ui) {
        //seto a descrição para aparecer para usuario no input text
        $('.input-modelo input[type="text"]').val(ui.item.label);
        //seto o id para ir para seu backend :D
        $("#idmodelo").val(ui.item.id);

        event.preventDefault();
      }
    }).focus(function(){
  	   	$(this).autocomplete("search");
  	});
  
$('.input-modelo input[type="text"]').focusout(recuperaDadosFipe);

  function recuperaDadosFipe() {
    var idmarcas = $("#idmarcas").val();
    var idtipoveiculo = $("#tipoveiculo").val();
    var idmodelo = $("#idveiculos").val();
    var idano = $("#idmodelo").val();
    $.ajax({
      type: 'GET',
      url: 'http://fipeapi.appspot.com/api/1/' + idtipoveiculo + '/veiculo/' + idmarcas + '/' + idmodelo + '/' + idano + '.json',
      dataType: 'jsonp',
      crossDomain: true,
      success: function(data) {

        $('#vfipe').val(data.preco);
        $('#idfipe').val(data.fipe_codigo);
        $('#reffipe').val(data.referencia);
      }

    });
  };

$('#tipoveiculo').on('change', function() {
  $("#idmarcas").val('');
  $("#idveiculos").val('');
  $("#marcas").val('');
  $("#idveiculos").val('');
  $(".idmodelos").val('');
  $('#vfipe').val('');
  $('#idfipe').val('');
  $('#reffipe').val('');
});

$("#placa").mask("AAA-9999");

jQuery.ui.autocomplete.prototype._resizeMenu = function () {
  var ul = this.menu.element;
  ul.outerWidth(this.element.outerWidth());
}
});