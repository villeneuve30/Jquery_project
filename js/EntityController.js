/**
 * Controleur global des entités
 * @version 1.5 - 2016-02-16
 *
 * 1.1  - 2015-09-29
 * 1.2 - 2015-11-16 : Remplacement de l'attribut entity par name
 * 1.3 - 2015-12-20 : execute
 * 1.4 - 2016-01-03 : export
 * 1.5 - 2016-02-16 : findByAsync, findAsync
 */
    /**
     * Recherche d'un objet à partir d'un attribut
     * @param name
     * @param value
     * @param callBack
     * @returns {*}
     */
    findBy: function(name, value,callBack){
        var entName = this.name ;
        var url = 'c=' +entName  + '&a=trouver';
        var params = name && value? 'where[]=' + name +'|' + value:'';
        var postFind = function(data){
            try{
                var res=  $.parseJSON(data)
            }
            catch(err){
                afficherErreur("EntityController.js >> findByAsync("+ entName +':' + name +'=' + value +")  <br/> "+data);
            }
            if(callBack &&  typeof callBack =="function" ) callBack(res);

        };

        ajaxPost(url ,params,postFind);
    }
