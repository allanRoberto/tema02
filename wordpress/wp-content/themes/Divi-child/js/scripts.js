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