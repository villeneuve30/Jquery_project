
  //  Exemple partie html 
<div id ="monDiv">Resultat ICI</div>



    //<!-- A Adapter en fonction de vos donn�es JSON -->
    var donnesSources = [
        {id:1,libelle:'Produit1',categorie:{id:4,libelle:'divers'},prix:2.5},
        {id:2,libelle:'Produit2',categorie:{id:3,libelle:'fruit'},prix:5},
        {id:3,libelle:'Produit3',categorie:{id:2,libelle:'produit laitier'},prix:2.6},
        {id:4,libelle:'Produit4',categorie:{id:1,libelle:'legumes'},prix:2.5},
        {id:5,libelle:'Produit5',categorie:{id:4,libelle:'legumes'},prix:2.5},
        {id:5,libelle:'Produit6',categorie:{id:3,libelle:'fruit'},prix:2.5},
        {id:7,libelle:'Produit7',categorie:{id:2,libelle:'produit laitier'},prix:2.5},
        {id:8,libelle:'Produit8',categorie:{id:1,libelle:'legumes'},prix:2.5}
    ];

    //Cumul des tarifs
    var categories =[]; //Variable qui contiendra les don�es pour highcharts
    $.each(donnesSources,function(i, produit){
        //Cumul par cat�gorie
        positionCateg= categories.findIndex(function(a){return a.id==produit.categorie.id});
        if(positionCateg<0){ //Cat�gorie inexistante dans le tableau
            categories.push({id:produit.categorie.id,name:produit.categorie.libelle,y:produit.prix});
        }
        else{ //Cumul
            categories[positionCateg].y += produit.prix;
        }

    });

    //Gestion du graph
    var $container = $('#monDiv');
    var monGraphe =  new PieGraph($container);
    monGraphe.setTitle("mon joli Graphe");
    monGraphe.setSeries([{name:'Vente 2015',data:categories,}]);
    monGraphe.draw(); //Affichage



/*
	Partie pour simplifier l'appel � highcharts 
	A modifier � vos risques et perils	
*/
var PieGraph = function(container) {

    //Option par d�faut
    this.options = {
        credits: {
            enabled: false
        }, series: []
    };


    //Affichage des donn�es


    /**
     * Param�trage des options du graphe
     */
    this.setOptions = function(options){


        this.options = $.extend(this.options,{
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y:.1f}  �</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                        enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            }
        });

    };

    /**
     * Ajout d'une s�rie
     */
    this.setSeries =function(series){
        this.options.series = typeof series ==='undefined'?[]:series;
    };

    /**
     * Ajout de donn�es
     */
    this.setData = function(data,idSerie){
        idSerie = typeof idSerie ==='undefined'?0:parseInt(idSerie);
        this.options.series[idSerie].data= data;
    };

    /**
     * Affichage du graphe
     * @param title
     * @param options
     */
    this.draw = function () {
        this.container.highcharts(this.options);
    };

    /**
     * Titre
     * @param title
     */
    this.setTitle = function(title){
        this.options.title = {text:title};
    };


    /**
     * @param container
     */
    this.setContainer = function (container){
        this.container =  typeof  container ==='string'?$('#'+container):container ;
    };

    //Initialisation de l'objet
    this.setContainer(container);
    this.setOptions();


};
