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
		if($('#textToTranslate').val() != '' && $('#languageIn').val() != '' && $('#languageOut').val() != ''){
			$(this).addClass('disabled').html('<i class="fa fa-spinner fa-spin fa-fw"></i>');
			translate({
				data: {
					text: $('#textToTranslate').val(),
					source: $('#languageIn').val(),
					target: $('#languageOut').val()
				}
			});
		}else{
			if($('#textToTranslate').val() == ''){
				toastr.error('Insira um texto por favor');
				$('#textToTranslate').focus();
			}else{
				toastr.error('Selecione os idiomas de entrada e saída por favor');
				$('select[value=""]').focus();
			}
		}
	});

	$('#identify').click(function(){
		if($('#textToIdenfity').val() != '') {
			$(this).addClass('disabled').html('<i class="fa fa-spinner fa-spin fa-fw"></i>');
			identify({
				data: { text: $('#textToIdenfity').val() }
			});
		}else{
			toastr.error('Insira um texto por favor');
			$('#textToIdenfity').focus();
		}
	});

	$('#toneAnalyzer').click(function(){
		if($('#textToTone').val() != ''){
			$(this).addClass('disabled').html('<i class="fa fa-spinner fa-spin fa-fw"></i>');
			tone({
				data: { text: $('#textToTone').val() }
			});
		}else{
			toastr.error('Insira um texto por favor');
			$('#textToTone').focus();
		}
	});

	$('#textNLU').click(function(){
		if($('#textToNLU').val() != ''){
			$(this).addClass('disabled').html('<i class="fa fa-spinner fa-spin fa-fw"></i>');
			nlu({
				data:{ text: $('#textToNLU').val() },
				url: '/api/nlu/text',
				type: 'text'
			});
		}else{
			toastr.error('Insira um texto por favor');
			$('#textToNLU').focus();
		}
	});

	$('#urlNLU').click(function(){
		if($('#urlToNLU').val() != ''){
			$(this).addClass('disabled').html('<i class="fa fa-spinner fa-spin fa-fw"></i>');
			nlu({
				data:{ url: $('#urlToNLU').val() },
				url: '/api/nlu/url',
				type: 'url'
			});
		}else{
			toastr.error('Insira uma URL por favor');
			$('#urlToNLU').focus();
		}
	});
});

function footer(){
	var year = new Date()
	year = year.getFullYear();
	$('.footer > small.cr').html('&copy; Developed with <span class="heart">&#10084;</span> by <a target="_blank" href="https://jlozovei.github.io/">&lt;j&middot;lozovei &#47;&gt;</a> '+year);
}

function validateSelect(select){
	$('select').not(select).find('option').attr('disabled', false);
	$('select').not(select).find('option[value="'+select.val()+'"]').attr('disabled', true);
}

var requestTranslate = null, requestIdentify = null, requestTone = null, requestNLU = null;

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
				$('.tone-analyzed').find('p.result').remove();
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
									emotions += '<p class="result">'+tone.tone_name+' - '+tone.score.toFixed(2)+'%</p>';
								}

								$('.tone-analyzed .emotion_tone').append(emotions);
							}

							if(toneCategory.category_id == 'language_tone'){
								for(var t = 0, tLen = toneCategory.tones.length; t < tLen; t++){
									var tone = toneCategory.tones[t];
									language += '<p class="result">'+tone.tone_name+' - '+tone.score.toFixed(2)+'%</p>';
								}

								$('.tone-analyzed .language_tone').append(language);
							}

							if(toneCategory.category_id == 'social_tone'){
								for(var t = 0, tLen = toneCategory.tones.length; t < tLen; t++){
									var tone = toneCategory.tones[t];
									social += '<p class="result">'+tone.tone_name+' - '+tone.score.toFixed(2)+'%</p>';
								}

								$('.tone-analyzed .social_tone').append(social);
							}
						}
					}

					$('.tone-analyzed').addClass('active');
					$('.modal-container .modal-fade-content.tone > pre').html(JSON.stringify(resp.document_tone));
					$('#toneAnalyzer').html('Analisar').removeClass('disabled');

					requestTone = null;
				}
			},
			error: function(){
				toastr.error('Opsss... Algo de errado aconteceu, por favor tente novamente');
				$('#toneAnalyzer').html('Analisar').removeClass('disabled');
				requestTone = null;
			}
		});

		return requestTone;
	}

	service(obj);
}

function nlu(obj){
	var service = function(obj){
		if(requestNLU != null){
			requestNLU.abort();
		}

		requestNLU = jQuery.ajax({
			type: 'POST',
			url: obj.url,
			data: JSON.stringify(obj.data),
			dataType: 'json',
			contentType: 'application/json',
			beforeSend: function(){
				$('.text-nlu-analyzed').find('p.result').remove();
				$('.tone-analyzed').find('.emotion_tone, .social_tone, .language_tone').empty();
				$('.modal-container .modal-fade-content.nlu > pre').html('');
			},
			success: function(resp){
				console.info(resp);
				var conteudoCategorias = '',
					conteudoEntidades = '',
					conteudoKeywords = '',
					conteudoMetadata = '',
					conteudoRelacoes = '',
					conteudoSentimentos = '',
					conteudoInfo = '';

				if(resp.categories && resp.categories.length > 0){
					for (var c = 0, len = resp.categories.length; c < len; c++) {
						var category = resp.categories[c],
							score = (category.score * 100).toFixed(2),
							label = category.label,
							fixLabel = '';

						label = category.label.split('/');

						for (var l = 0, labelLen = label.length; l < labelLen; l++) {
							var str = label[l];
							str = str.charAt(0).toUpperCase() + str.slice(1);
							if (labelLen - l > 1 && l > 0) {
								str += ' / ';
							}

							fixLabel += str;
						}

						conteudoCategorias += '<p class="result">' + fixLabel + ' - ' + score + '%</p>';
					}
				}else{
					conteudoCategorias += '<p class="result">Não foram encontradas categorias para essa análise</p>';
				}

				if(resp.entities && resp.entities.length > 0){
					for(var e = 0, len = resp.entities.length; e < len; e++){
						var entity = resp.entities[e],
							relevance = (entity.relevance * 100).toFixed(2);

						conteudoEntidades += '<p class="result"><span class="highlight">'+entity.text+' ('+entity.type+')</span> aparece <span class="highlight">'+entity.count+'x</span> no texto com relevância de <span class="highlight">'+relevance+'%</span></p>';
					}
				}else{
					conteudoEntidades += '<p class="result">Não foram encontradas entidades para essa análise</p>';
				}

				if(resp.keywords && resp.keywords.length > 0){
					for(var k = 0, len = resp.keywords.length; k < len; k++){
						var keyword = resp.keywords[k],
							relevance = (keyword.relevance * 100).toFixed(2);

						conteudoKeywords += '<p class="result">'+keyword.text+' - '+relevance+'%</p>';
					}
				}else{
					conteudoKeywords += '<p class="result">Não foram encontradas palavras-chave para essa análise</p>';
				}

				if(resp.relations && resp.relations.length > 0){
					for(var r = 0, len = resp.relations.length; r < len; r++){
						var relation = resp.relations[r],
							relevance = (relation.score * 100).toFixed(2);

						conteudoRelacoes += '<p class="result">Na sentença "(...) '+relation.sentence+' (...)" foi identificado uma relação do tipo <span class="highlight">'+relation.type+'</span> com relevância de <span class="highlight">'+relevance+'%</span></p>';
					}
				}else{
					conteudoRelacoes += '<p class="result">Não foram encontradas relações para essa análise</p>';
				}

				if(resp.metadata){
					if(resp.metadata.authors && resp.metadata.authors.length > 0){
						var authors = '';
						for(var a = 0, len = resp.metadata.authors.length; a < len; a++){
							var author = resp.metadata.authors[a];
							authors += author.name;
							if (len - a > 1 && a > 0) {
								authors += ',';
							}
						}

						conteudoMetadata += '<p class="result">Autores: '+authors+'</p>';
					}

					if(resp.metadata.title){
						conteudoMetadata += '<p class="result">Título do documento: '+resp.metadata.title+'</p>';
					}

					if(resp.metadata.publication_date){
						var data = jQuery.format.date(resp.metadata.publication_date, "dd/MM/yy")+', '+jQuery.format.date(resp.metadata.publication_date, "HH:mm:ss")+'h';

						conteudoMetadata += '<p class="result">Data de publicação: '+data+'</p>';
					}
				}else{
					conteudoMetadata += '<p class="result">Não foram encontradas metadata para essa análise</p>';
				}

				if(resp.sentiment){
					if(resp.sentiment.document){
						var score = (resp.sentiment.document.score * 100).toFixed(2);
						conteudoSentimentos = '<p class="result">O sentimento predominante é <span class="highlight">'+resp.sentiment.document.label+' ('+score+'%)</span></p>';
					}
				}else{
					conteudoSentimentos = '<p class="result">Não foram encontrados sentimentos para essa análise</p>';
				}

				if(resp.language){
					conteudoInfo += '<p class="result">Idioma: '+resp.language+'</p>';
				}

				if(resp.usage){
					if(resp.usage.text_characters){
						conteudoInfo += '<p class="result">Quantidade de caracteres: '+resp.usage.text_characters+'</p>';
					}

					if(resp.usage.features){
						conteudoInfo += '<p class="result">Foram analisados: '+resp.usage.features+' quesitos</p>';
					}
				}

				$('.text-nlu-analyzed .categories').append(conteudoCategorias);
				$('.text-nlu-analyzed .entities').append(conteudoEntidades);
				$('.text-nlu-analyzed .metadata').append(conteudoMetadata);
				$('.text-nlu-analyzed .keywords').append(conteudoKeywords);
				$('.text-nlu-analyzed .relations').append(conteudoRelacoes);
				$('.text-nlu-analyzed .sentiment').append(conteudoSentimentos);
				$('.text-nlu-analyzed .info').append(conteudoInfo);

				$('.modal-container .modal-fade-content.nlu > pre').html(JSON.stringify(resp));
				$('.text-nlu-analyzed').addClass('active');
				if(obj.type == 'text'){
					$('#textNLU').html('Analisar').removeClass('disabled');
				}else{
					$('#urlNLU').html('Analisar').removeClass('disabled');
				}
				requestNLU = null;
			},
			error: function(){
				toastr.error('Opsss... Algo de errado aconteceu, por favor tente novamente');
				if(obj.type == 'text'){
					$('#textNLU').html('Analisar').removeClass('disabled');
				}else{
					$('#urlNLU').html('Analisar').removeClass('disabled');
				}
				requestNLU = null;
			}
		});

		return requestNLU;
	}

	service(obj);
}