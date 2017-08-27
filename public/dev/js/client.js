'use strict';

$(document).ready(function(){
	setTimeout(function(){
		$('.content-tabs li:first-child').find('a').trigger('click');
	}, 100);


	$('.content-tabs li a').click(function(){
		$('.content-tabs li a').removeClass('active');
		var tab = $(this).data('tab');
		$('.tabbed-content').removeClass('active');
		$('.tabbed-content'+tab).addClass('active');
		$(this).addClass('active');
	})

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
});

var request = null;

function translate(obj){
	console.log(obj.data);

	var service = function(obj){
		if(request != null){
			request.abort();
		}

		request = jQuery.ajax({
			type: 'POST',
			url: '/api/translate',
			data: JSON.stringify(obj.data),
			dataType: 'json',
			contentType: 'application/json',
			success: function(resp){
				if(resp.translations){
					$('#textTranslated').val(resp.translations[0].translation);
					$('.text-translated').addClass('active');
				}

				$('#translate').html('Traduzir').removeClass('disabled');
				request = null;
			}
		});

		return request;
	}

	service(obj);
}