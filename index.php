<?php
require('auth.php');

if( isAuthRequired() ) {
	auth(false);
}
?>

<!DOCTYPE HTML>
<html>
<head>

	<meta http-equiv="Content-Type" content="text/html; charset=windows-1251">

	<link href="index.css" rel="stylesheet">
	
	<script type='text/javascript'>
		
		var aPages;
		var aMenuIds;
		var sMenuActiveId="";
				
		window.onload = function() {
			aPages = document.querySelectorAll('[data-pageid]');
			for( var i = 0 ; i < aPages.length ; i++ ) {
				aPages[i].className='page';
			}
			
			aMenuIds = document.querySelectorAll('[data-menuid]');
			for( var i = 0 ; i < aMenuIds.length ; i++ ) {
				aMenuIds[i].style.cursor = 'pointer';
				aMenuIds[i].className = 'normal';
				aMenuIds[i].onclick = function() {
					menuGoTo( this.getAttribute("data-menuid") );
				}
			}

			menuGoTo( "main" );
		}	
		
		function menuGoTo( sId ) {		
			
			for( var i = 0 ; i < aPages.length ; i++ ) {
				sPageId = aPages[i].getAttribute("data-pageid");
				if( sPageId == sId ) {
					aPages[i].style.display = 'block';
				} else {
					aPages[i].style.display = 'none';
				}
			}
			menuHighlight( sId );			
		}
		
		function menuHighlight( sId ) {
			for( var i = 0 ; i < aMenuIds.length ; i++ ) {
				if( sId == aMenuIds[i].getAttribute( "data-menuid") ) {
					aMenuIds[i].className='active';
				} else {
					aMenuIds[i].className='normal';
				}
			}
			sMenuActiveId = sId;
		}
	</script>
	
</head>

<body>

<!-- Header -->
<div class='header'>
	<div class='menu' id='menu'>
		<div id='menuProjectInfo'>
			<div class='project-details' id='menuProjectDetails'></div>
			<div class='project-name' id='menuProjectName'>SPIDER PROJECT</div>
		</div>
		<div data-menuid='main' id='menuMain'>&nbsp;GANTT&nbsp;</div>
		<div data-menuid='help' id='menuHelp'>&nbsp;HELP&nbsp;</div>
	</div>
</div>

<div class='content'>
	<div data-pageid='main'>
		<div id='containerDiv' style='width:100%; font-family:Courier New, Courier, monospace; box-sizing:border-box;'>
			<svg id='containerSVG' style='width:100%; margin:0; padding:0;'>
				<svg id='timeSVG' preserveAspectRatio='none' style='margin:0; padding:0;'></svg>
				<svg id='ganttSVG' preserveAspectRatio='none' style='margin:0; padding:0;'></svg>
				<svg id='tableContentSVG' preserveAspectRatio='none' style='margin:0; padding:0;'></svg>
				<svg id='tableHeaderSVG' preserveAspectRatio='none' style='margin:0; padding:0;'></svg>
				<svg id='verticalSplitterSVG' preserveAspectRatio='none' style='margin:0; padding:0;'></svg>
				<svg id='tableScrollSVG' preserveAspectRatio='none' style='margin:0; padding:0;'></svg>
				<svg id='ganttScrollSVG' preserveAspectRatio='none' style='margin:0; padding:0;'></svg>
				<svg id='verticalScrollSVG' preserveAspectRatio='none' style='margin:0; padding:0;'></svg>
			</svg>
		</div>
	</div>
	<div data-pageid='help'>
		<div id='helpText'>
		</div>
	</div>
</div>

<div id='blackOutBox' style='position:absolute; display:none; left:0; top:0; min-width:100%; min-height:100%; background-color:#4f4f4f; opacity:0.75;'></div>

<div id='messageBox' style='position:absolute; display:none; left:30%; top:30%; width:40%; height:40%;'>
	<div id='messageBoxText' style='position:relative; display:table-cell; min-width:100%; min-height:100%; background-color:#ffffff; text-align:center; vertical-align:middle;'>
	</div>
</div>

<div id='editBox' style='position:absolute; display:none; left:20%; top:20%; width:60%; height:40%;'>
	<div id='editBoxContent' style='position:relative; display:table-cell; min-width:100%; min-height:100%; background-color:#ffffff; text-align:center; vertical-align:middle;'>
		<table style='width:100%' cellspacing=0 cellpadding=0>
			<tr style='vertical-align:top;'>
				<td style='width:40%; padding:12px;'>
					<div id='editBoxDetails' style='padding:4px; text-align:left; overflow:auto; font-size:12px;'></div>
				</td>
				<td style='width:60%; padding:12px;'>
					<div id='editBoxInputs' style='overflow:auto; text-align:left;'>
					</div>
					<div id='editBoxMessage' style='font-size:12px; font-style:italic; color:#4f4f4f;'></div>
					<input id='editBoxOperationCode' type='hidden' value=''>
					<input id='editBoxOperationIndex' type='hidden' value=''>
					<table style='width:100%;' cellspacing=0 cellpadding=0><tr>
						<td style='width:50%; padding:24px; text-align:right;'>
							<button style='width:100%;' onclick="saveUserDataFromEditBox();">Ok</button>
						</td>
						<td style='width:50%; padding:24px; text-align:left;'>
							<button style='width:100%;' onclick="hideEditBox();">Cancel</button>
						</td>
					</tr></table>
				</td>
			</tr>
		</table>
	</div>
</div>

<script type="text/javascript" src="index.js">
</script>

</body>

</html>