'use strict';

$(document).ready(function(){
	footer();

	$('select').trigger('change');

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

	$('#toneAnalyzer').click(function(){
		if($('#textToTone').val() != ''){
			$(this).addClass('disabled').html('<i class="fa fa-spinner fa-spin fa-fw"></i>');
			tone({
				data: {
					text: $('#textToTone').val()
				}
			});
		}else{
			toastr.error('Insira um texto por favor');
			$('#textToTone').focus();
		}
	})
});

function footer(){
	var year = new Date()
	year = year.getFullYear();
	$('.footer > small.cr').html("&copy; Developed by <a target='_blank' href='https://jlozovei.github.io/'>&lt;j&middot;lozovei &#47;&gt;</a> "+year);
}

function validateSelect(select){
	$('select').not(select).find('option').attr('disabled', false);
	$('select').not(select).find('option[value="'+select.val()+'"]').attr('disabled', true);
}

var requestTranslate = null, requestIdentify = null, requestTone = null;

function translate(obj){
	var service = function(obj){
		if(requestTranslate != null){
			requestTranslate.abort();
		}

		requestTranslate = jQuery.ajax({
			type: 'POST',
			url: '/api/translation/translate',
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
			url: '/api/translation/identify',
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

function tone(obj){
	var service = function(obj){
		if(requestTone != null){
			requestTone.abort();
		}

		requestTone = jQuery.ajax({
			type: 'POST',
			url: '/api/tone/',
			data: JSON.stringify(obj.data),
			dataType: 'json',
			contentType: 'application/json',
			beforeSend: function(){
				$('.tone-analyzed').find('.emotion_tone, .social_tone, .language_tone').empty();
				$('.modal-container .modal-fade-content.tone > pre').html('');
			},
			success: function(resp){
				var emotions = '', language = '', social = '';
				if(resp && resp.document_tone){
					var tones = resp.document_tone,
						toneCategories = tones.tone_categories;

					if(toneCategories && toneCategories.length > 0){
						for(var i = 0, len = toneCategories.length; i < len; i++){
							var toneCategory = toneCategories[i];

							if(toneCategory.category_id == 'emotion_tone'){
								for(var t = 0, tLen = toneCategory.tones.length; t < tLen; t++){
									var tone = toneCategory.tones[t];
									emotions += '<p>'+tone.tone_name+' - '+tone.score.toFixed(2)+'%</p>';
								}

								$('.tone-analyzed .emotion_tone').append(emotions);
							}

							if(toneCategory.category_id == 'language_tone'){
								for(var t = 0, tLen = toneCategory.tones.length; t < tLen; t++){
									var tone = toneCategory.tones[t];
									language += '<p>'+tone.tone_name+' - '+tone.score.toFixed(2)+'%</p>';
								}

								$('.tone-analyzed .language_tone').append(language);
							}

							if(toneCategory.category_id == 'social_tone'){
								for(var t = 0, tLen = toneCategory.tones.length; t < tLen; t++){
									var tone = toneCategory.tones[t];
									social += '<p>'+tone.tone_name+' - '+tone.score.toFixed(2)+'%</p>';
								}

								$('.tone-analyzed .social_tone').append(social);
							}
						}
					}

					$('.tone-analyzed').addClass('active');
					$('.modal-container .modal-fade-content.tone > pre').html(JSON.stringify(resp.document_tone));
					$('#toneAnalyzer').html('Analisar').removeClass('disabled');
				}
			},
			error: function(){
				toastr.error('Opsss... Algo de errado aconteceu, por favor tente novamente');
				$('#identify').html('Identificar').removeClass('disabled');
				requestTone = null;
			}
		});

		return requestIdentify;
	}


	service(obj);
}