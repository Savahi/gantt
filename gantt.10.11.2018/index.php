<?php
require('auth.php');

if( isAuthRequired() ) {
	$userName = auth(false);
}
?>

<!DOCTYPE HTML>
<html>
<head>

	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

	<link href="index.css" rel="stylesheet">
	
</head>

<body>

<!-- Header -->
<div class='header'>
	<div class='menu' id='menu'>
		<div data-menuid='main' id='menuMain'>&#9870;</div>
		<!--<div data-menuid='settings' id='menuSettings'>&#9881;</div>-->
		<div data-menuid='help' id='menuHelp' style='padding-top:4px;'>&#8505;</div>
	</div>
	<div class='project-details' id='projectDetails'>
		<div class='project-name' id='projectName'>SPIDER PROJECT</div>
		<div class='project-time-and-version' id='projectTimeAndVersion'></div>
	</div>
	<div class='project-user' id='projectUser'>
	</div>
</div>

<div class='content'>
	<div data-pageid='main'>
		<div id='containerDiv' style='width:100%; margin:0; padding:0; box-sizing:border-box;'>
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
		<table cellspacing="0" cellpadding="0" class='toolbox'><tr valign="top">
			<td class='toolbox-left'>
				<div id='synchronized'></div>
				<!--
					↺ ↻ ↶ ↷ ⇆ ⇅ ⇎
				-->
				<div id='toolboxResetTableDimensions' style='margin-left:24px;' title=''>
					<button class='toolbox-btn' onclick='restoreTableColumnOrderAndWidths();'>↶</button>
				<div>					
			</td><td class='toolbox-right'>
				<div id='toolboxZoom100' title=''>
					<button class='toolbox-btn' onclick='onGanttDblClick();'>100%</button>
				<div>	
				<div id='toolboxZoomHorizontally' style='margin-right:24px;'>
					<input type='number' value='100' min='5' max='999' size=4 step=5 required id='toolboxHScale'/>&nbsp;&nbsp;<label for='toolboxHScale'>↔</label> 
				</div>
				<div id='toolboxZoomVertically'>
					<input type='number' value='100' min='5' max='999' size=4 step=5 required id='toolboxVScale'/>&nbsp;&nbsp;<label for='toolboxVScale'>↕</label> 					
				</div>			
				<div id='toolboxLinks' style='margin-right:24px;'>
					<input id='toolboxDisplayLinks' type='checkbox'>
					&nbsp;&nbsp;<label for='toolboxDisplayLinks'>⤡</label>
				</div>				
			</td>
		</tr></table>
	</div>
	<!-- ⇳ ⇿ ⇕ ➕ ➖ ▶ ◀ ▲ ▼ ◀-▶ ⟷ ↕ ↔ ⇳ ⇕ &#8661; -->
	<!--		
	<div data-pageid='settings'>
		<div id='settingsTableTitle'>
		</div>
		<div id='settingsTable'>
		</div>
	</div>
	-->
	<div data-pageid='help'>
		<h1 id='helpTitle'></h1>
		<div id='helpText' style='padding:24px 5vw 0px 10vw; text-align:left; line-height:150%; font-size:14px;'></div>
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
							<button style='width:100%;' onclick="saveUserDataFromEditBox();" class='btn ok'>Ok</button>
						</td>
						<td style='width:50%; padding:24px; text-align:left;'>
							<button style='width:100%;' onclick="hideEditBox();" class='btn cancel'>Cancel</button>
						</td>
					</tr></table>
				</td>
			</tr>
		</table>
	</div>
</div>

	<?php echo "<script>var userName = '" . $userName . "';</script>"; ?>
	
	<script type='text/javascript'>
		
		var aPages;
		var aMenuIds;
		var sMenuActiveId="";
				
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


<script type="text/javascript" src="texts.js">
</script>

<script type="text/javascript" src="utils.js">
</script>

<script type="text/javascript" src="drawtimescale.js">
</script>

<script type="text/javascript" src="messagebox.js">
</script>

<script type="text/javascript" src="index.js">
</script>

</body>

</html>
