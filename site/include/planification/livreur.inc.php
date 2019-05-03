<?php $db = new Mypdo();
$livreurManager = new LivreurManager($db);
$livreurs = $livreurManager->getAllLivreurs();

?>

<div class="cont">
	<div class='external-events external-events2'>
		<p id="espLiv">
			<strong>Livreurs</strong>
		</p>
		<select id="livreurChoisi" class="" name="" onchange="change(<?php echo sizeof($livreurs)?>)">
			<?php if(!$livreurs){ ?>
				<option value="">Aucun livreur</option>
			<?php			} else {
				foreach ($livreurs as $key => $value) { ?>
					<option value="<?php echo $value->idlivreur ?>"><?php echo $value->nom ?></option>
				<?php		}
			} ?>

		</select>
	</div>
</div>

<?php  if(!$livreurs){ ?>
	<h2> Aucun Livreur enregistré ! </h2>
<?php } else {
	foreach ($livreurs as $key => $value) { ?>
		<div class="calParLiv" id=<?php echo "calParLiv".$value->idlivreur ?> >
			<h2 id="nomLivreur">ID : <?php echo $value->idlivreur; echo " - ".$value->nom ?></h2>
			<div class='calendar' name='<?php echo "calendrier".$value->idlivreur ?>' id='<?php echo "calendrier".$value->idlivreur ?>' >
			</div>
		</div>
	<?php }
} ?>

<script>

function download(content, fileName, contentType) {
	var a = document.createElement("a");
	var file = new Blob([content], {type: contentType});
	a.href = URL.createObjectURL(file);
	a.download = fileName;
	a.click();
}


$(function() { // document ready
	change(<?php echo sizeOf($livreurs)?>);

	$.ajax({
		url:'../fichiers d_échange/commandes.json',
		datatype : 'json',
		async:false,
		success : function(data){
			$.each(data, function(i,object) {
				$('#commande').append('<div class="fc-event">'+ object.id +'</div>')
			});
		}
	})
	/* initialize the external events
	-----------------------------------------------------------------*/

	$('#commande .fc-event').each(function() {

		// store data so the calendar knows to render an event upon drop
		$(this).data('event', {
			title: $.trim($(this).text()), // use the element's text as the event title
			stick: true // maintain when user navigates (see docs on the renderEvent method)
		});

		// make the event draggable using jQuery UI
		$(this).draggable({
			zIndex: 999,
			revert: true,      // will cause the event to go back to its
			revertDuration: 0  //  original position after the drag
		});

	});


	/* initialize the calendar
	-----------------------------------------------------------------*/

	$('.calendar').fullCalendar({
		now: moment().add(1,'day'),
		editable: true, // enable draggable events
		droppable: true, // this allows things to be dropped onto the calendar
		aspectRatio: 1.8,
		eventOverlap : false,
		scrollTime: '00:00', // undo default 6am scrollTime
		defaultView: 'agendaDay',
		views: {
			timelineThreeDays: {
				type: 'timeline',
				duration: { days: 3 }
			}
		},
		resourceLabelText: 'Rooms',
		drop: function(date, jsEvent, ui, resourceId) {

			// if so, remove the element from the "Draggable Events" list
			$(this).remove();
			var events = $('#calendrier1').fullCalendar('clientEvents');
			exporterEvents(events);
		},
		eventReceive: function(event) { // called when a proper external event is dropped

		},
		eventDrop: function(event) { // called when an event (already on the calendar) is moved

		}
	});

});

function exporterEvents(events){

	myObj = {title: events[events.length-1].title, date: events[events.length-1].start._d, idlivreur :document.getElementById("livreurChoisi").value}
	myJSON = JSON.stringify(myObj);
	var jsonData = myJSON;

	download(jsonData, 'json.txt', 'text/plain');

}

function change(taille){
	for (var i = 1; i <= taille; i++) {
		document.getElementById("calParLiv"+i).style.display = "none";
	}
	document.getElementById("calParLiv"+document.getElementById("livreurChoisi").value).style.display = "block";
}

</script>
