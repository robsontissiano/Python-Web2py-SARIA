
$(function () {
	// chat
	$("#chat_form").submit(function () {

		var escape, escapeHTML;

		escape = document.createElement('textarea');

		escapeHTML = function(string) {
			escape.innerHTML = string;
			return escape.innerHTML;
		}

		var chat_text = escapeHTML($("#chat_input").val());

		var chat_post = "<div class='row msg_container base_receive'><div class='col-md-2 col-xs-2 avatar'>"
		+"<img src='"+avatar_image+"' class='img-responsive'> </div><div class='col-md-10 col-xs-10'>"
		+"<div class='messages msg_receive'><p>"+chat_text+"</p>"
		+"<time datetime='"+just_now+"'>"+just_now+"</time></div></div></div>";

		$(".panel-body").prepend(chat_post);
		$("#chat_input").val("");
		$("#chat_input").focus();

		var request = $.ajax({
			type: "POST",
			url: url_bot_talk,
			data: {"chat_text":chat_text}
		});

		request.done(function (response) {
			setTimeout(
			  function() {
			    saria_reply = "<div class='row msg_container base_sent'>"
			    +"<div class='col-md-10 col-xs-10'>"
			    +"<div class='messages msg_sent'>"
			    +"<p>"+response+"</p>"
			    +"<time datetime='"+just_now+"'>"+just_now+"</time>"
			    +"</div>"
			    +"</div>"
			    +"<div class='col-md-2 col-xs-2 avatar'>"
			    +"<img src='"+avatar_saria+"' class='img-responsive'>"
			    +"</div>"
			    +"</div>"
			    $(".panel-body").prepend(saria_reply);
	            meSpeak.speak(response, {
	              amplitude: '100',
	              wordgap: '0',
	              pitch: '65',
	              speed: '165',
	              variant: 'f2'
	            });

			  }, 100);
		});

		request.fail(function (jqXHR, textStatus) {
			$(".panel-body").prepend($(jqXHR.responseText).text());
		});

		return false;
		
	});
})