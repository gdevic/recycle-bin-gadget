var gadgetWidth;
var gadgetHeight;
var isEmpty = (System.Shell.RecycleBin.fileCount + System.Shell.RecycleBin.folderCount == 0);

window.onload = init;

function updateGadget()
{
	isEmpty = (System.Shell.RecycleBin.fileCount + System.Shell.RecycleBin.folderCount == 0);
	checkPosition();
}

function dropItem()
{
	var item;
	var index = 0;
	do
	{ 
		item = System.Shell.itemFromFileDrop(event.dataTransfer, index);
		if (item)
		{
			System.Shell.RecycleBin.deleteItem(item.path);
		}
		index++;
	} while (item != null);
}

function cancelEvent()
{
	event.returnValue = false;
}

function toggleFlyout()
{
	hitbox.blur();
	System.Gadget.Flyout.show = !System.Gadget.Flyout.show;
}

function applyUndockedStyles()
{
	gadgetWidth = "128px";
	gadgetHeight = "128px";

	background.removeObjects();
	var imgBin = isEmpty ? "images/Emptybig.png" : "images/Fullbig.png";
	background.addImageObject(imgBin, 0, 0);
	hitbox.style.width = gadgetWidth;
}

function applyDockedStyles()
{
	gadgetWidth = "130px";
	gadgetHeight = "64px";

	background.removeObjects();
	var imgBin = isEmpty ? "images/Emptysmall.png" : "images/Fullsmall.png";
	background.addImageObject(imgBin, 60, 0);
	hitbox.style.width = gadgetWidth;
}

function init()
{
	hitbox.focus();
	if (arguments.callee.done) return;
	arguments.callee.done = true;

	System.Gadget.onUndock = checkPosition;
	System.Gadget.onDock = checkPosition;
	System.Gadget.Sidebar.onDockSideChanged = checkPosition;
	System.Shell.RecycleBin.onRecycleBinChanged = updateGadget;
	document.body.ondrop = dropItem;
	hitbox.ondragenter = cancelEvent;
	hitbox.ondragover = cancelEvent;
	hitbox.onmouseup = toggleFlyout;
	
	System.Gadget.Flyout.file = "flyout.html";

	updateGadget();
}

function checkPosition()
{
	if (System.Gadget.docked)
	{
		applyDockedStyles();
	}
	else
	{
		applyUndockedStyles();
	}

	with (document.body.style)
	{
		width = gadgetWidth,
		height = gadgetHeight;
	}
	
	background.style.width = gadgetWidth;
	background.style.height = gadgetHeight;
	//hitbox.style.width = this.size.height;
	//hitbox.style.height = this.size.width;
}