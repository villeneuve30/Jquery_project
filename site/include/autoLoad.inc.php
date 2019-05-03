<?php /*
function __autoload($className){
	$repClasses='classes/';
	require $repClasses.$className.'.class.php';
}*/
?>
<?php
//Compatibilité PHP 7.2+
function my_autoloader($class) {
	include_once 'classes/' . $class . '.class.php';
}

spl_autoload_register('my_autoloader');
 spl_autoload_register(function ($class) {
	include_once 'classes/' . $class . '.class.php';
});
?>
