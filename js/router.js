/**
Fonction de routage de l'application
 @version  1.3 - 2016-02-17
**/

	/**
	 * Appel Simplifié POST
	 * @param wUrl  : string| Adresse de la page
	 * @param wParams: string | param�tres, variables �) envoyer au serveur
	 * @param wCallBack: function | fonction de retour
	 * @param wAsync: boolean | Mode asyncrone (true* | false )
	 */
	function ajaxPost(wUrl, wParams, wCallBack, wAsync) {

        ajaxQuery({
            method: 'post',
            url:wUrl,
            data:wParams,
            async:wAsync ,
            callBack:wCallBack
        } );
	}

	/**
	 * Requête Ajax
	 * @param params        // objet => {url|method|async|callBack|text}
	 */
	function ajaxQuery(params) {
        if(params =="undefined") params= arguments[0];

        if(!params) params = {};

       // console.log(params);

        if (params.url == undefined || !params.url) params.url = '';
		if (params.method == undefined || params.method == '' || !params.method) params.method = 'get';
		if (params.async == undefined) params.async = true;
        if (params.message == "undefined") params.message = {};

        if(!params.async) {
			console.log("******* Appel Asynchrone à privilégier.******");
			console.log(arguments.callee.caller.toString());
		}

        $.ajax({
            type: params.method,
            url: '?&x=1&' + params.url ,
            data: params.data,
            async: params.async,
            beforeSend: function(){
                startWaiting(params.text);
            },
            complete: stopWaiting,
            success: function (data) {
                if (noError(data) && params.callBack && typeof params.callBack == 'function'){
                    params.callBack(data);
                }
            },
            error: function (xhr) {
                afficherErreur(xhr.responseText);
            }
        });
	}

	/**
	 * @escription Verifie qu'il n'y ait pas d'erreur dans le retour d'une requete ajax
	 * @param strMessage
	 * @returns {Boolean}
	 * Condition indexOf('404') enlevé car cela affichait une erreur si on faisait passer un id valant 404
	 */
	function noError(strMessage) {

		if (strMessage.length == 0) return true;
		strMessage = strMessage.toLowerCase();
		if (strMessage.indexOf('zone-alerte') != -1
		) {
			afficherErreur(strMessage);
			return false;
		}
		return true;
	}

	function afficherErreur(strMessage) {
		afficherMessage(strMessage, 'alerte');
	}

	/**
	 * Affichage d'un message d'information
	 * @param strMessage
	 * @returns {*}

	 function afficherInfo(strMessage){
	return afficherInformation(strMessage);
} */
	/**
	 * Affichage d'un message d'information
	 * @param strMessage
	 */
	function afficherInformation(strMessage) {
		afficherMessage(strMessage, 'info');
        setInterval(function () {
            $('.zone-info:first').hide('slow', function () {
                $(this).remove();
            });
        }, 5000);
	}

	/**
	 * Affichage d'une boite de dialogue au format cnamts
	 * @param strMessage  : String |  Texte à afficher
	 * @param type    : String |  Type du messge (alerte | info)
	 * @returns {*|jQuery|HTMLElement}
	 */
	function afficherMessage(strMessage, type) {
        var $container = $('.zone-contextuelle');

        var $message = $('<dl class="message zone-' + type + '">' +
            '<dt class="texte">' + strMessage + '</dt>' +
            '</dl>'
        );

        $message.hide().appendTo($container).slideDown();

        //fermeture
        $(document).on('click', '.zone-alerte', function () {
            $(this).hide('slow', function () {
                $(this).remove();
            });
        });
        return $message;
	}

	/**
	 * Message d'attente
	 */
	function startWaiting(params) {

        if(params =="undefined" ) params= arguments[0];
        if(!params) params = {};

        if (params.title == undefined || !params.title) params.title = 'Traitement en cours ...';
        if (params.text == undefined || !params.text) params.text = 'Merci de bien vouloir patienter !';
        if (params.icon == undefined || !params.icon) params.icon = 'icoTempo';

		var divWait = '<div id="wait" title="'+params.title+ '">' +
			'<span class="floatLeft '+params.icon+'"></span>' +
			'<span class="floatRight">'+params.text+ '</span>' +
			'</div>';

        var $wait = $('#wait');

        if ($wait.length == 0)$(divWait).appendTo('body').popup({'modal': true});

        $($wait).fadeIn();

	}

	/**
	 * Fin de message d'attente
	 */
	function stopWaiting() {
        $('#wait').fadeOut();
	}
