'use strict';

$(document).ready(function(){
	setTimeout(function(){
		$('.content-tabs li:first-child').find('a').trigger('click');
	}, 100);

	$('.content-tabs li a').click(function(){
		$('.content-tabs li a').removeClass('active');
		var tab = $(this).data('tab');
		$('.tabbed-content').removeClass('active').removeClass('display');
		$('.tabbed-content'+tab).addClass('display');
		setTimeout(function(){
			$('.tabbed-content'+tab).addClass('active');
		}, 90);
		$(this).addClass('active');
	});

	$('.view-json').click(function(){
		$('.modal-overlay .modal-fade-content').hide();
		$('.modal-overlay .modal-fade-content.'+$(this).data('target')).show();
		$('.modal-overlay').addClass('visible');
	});

	$('.modal-overlay').click(function(){
		$(this).removeClass('visible');
		setTimeout(function(){
			$('.modal-overlay .modal-fade-content').hide();
		}, 400);
	});

	$('#languageIn, #languageOut').change(function(){
		validateSelect($(this));
	});

	$('#translate').click(function(){
		$(this).addClass('disabled').html('<i class="fa fa-spinner fa-spin fa-fw"></i>');
		translate({
			data: {
				text: $('#textToTranslate').val(),
				source: $('#languageIn').val(),
				target: $('#languageOut').val()
			}
		});
	});

	$('#identify').click(function(){
		$(this).addClass('disabled').html('<i class="fa fa-spinner fa-spin fa-fw"></i>');
		identify({
			data: {
				text: $('#textToIdenfity').val()
			}
		});
	});
});

function validateSelect(select){
	$('select').not(select).find('option').attr('disabled', false);
	$('select').not(select).find('option[value="'+select.val()+'"]').attr('disabled', true);
}

var requestTranslate = null, requestIdentify = null;

function translate(obj){
	var service = function(obj){
		if(requestTranslate != null){
			requestTranslate.abort();
		}

		requestTranslate = jQuery.ajax({
			type: 'POST',
			url: '/api/translate',
			data: JSON.stringify(obj.data),
			dataType: 'json',
			contentType: 'application/json',
			beforeSend: function(){
				$('.modal-container .modal-fade-content.translate > pre').html('');
			},
			success: function(resp){
				if(resp.translations){
					$('#textTranslated').val(resp.translations[0].translation);
					$('.text-translated').addClass('active');

					$('.modal-container .modal-fade-content.translate > pre').html(JSON.stringify(resp.translations));
				}

				$('#translate').html('Traduzir').removeClass('disabled');
				requestTranslate = null;
			},
			error: function(){
				toastr.error('Opsss... Algo de errado aconteceu, por favor tente novamente');
				$('#translate').html('Traduzir').removeClass('disabled');
				requestTranslate = null;
			}
		});

		return requestTranslate;
	}

	service(obj);
}

function identify(obj){
	var service = function(obj){
		if(requestIdentify != null){
			requestIdentify.abort();
		}

		requestIdentify = jQuery.ajax({
			type: 'POST',
			url: '/api/identify',
			data: JSON.stringify(obj.data),
			dataType: 'json',
			contentType: 'application/json',
			beforeSend: function(){
				$('.modal-container .modal-fade-content.identify > pre').html('');
			},
			success: function(resp){
				if(resp.languages){
					var assert = (resp.languages[0].confidence*100).toFixed(2);
					$('.text-identified .identify-result').html('O Watson identificou o idioma como <b>'+resp.languages[0].language+'</b> com uma certeza de <em>'+assert+'</em>%');
					$('.text-identified').addClass('active');

					$('.modal-container .modal-fade-content.identify > pre').html(JSON.stringify(resp.languages));
				}

				$('#identify').html('Identificar').removeClass('disabled');
				requestIdentify = null;
			},
			error: function(){
				toastr.error('Opsss... Algo de errado aconteceu, por favor tente novamente');
				$('#identify').html('Identificar').removeClass('disabled');
				requestIdentify = null;
			}
		});

		return requestIdentify;
	}


	service(obj);
}