var isEmpty = (System.Shell.RecycleBin.fileCount + System.Shell.RecycleBin.folderCount == 0);

window.onload = function()
{
	binEmptyLink.onmouseup = emptyRecycleBin;
	binOpenLink.onmouseup = openRecycleBin;
	binPropertiesLink.onmouseup = showRecycleSettings;

	binContents.innerText = System.Shell.RecycleBin.fileCount + " פאיכמג, ";
	binSize.innerText = convertBytes(System.Shell.RecycleBin.sizeUsed);
	binEmpty.style.display = isEmpty ? "none" : "block";
}

function emptyRecycleBin()
{
	binEmptyLink.blur();
	isEmpty = (System.Shell.RecycleBin.fileCount + System.Shell.RecycleBin.folderCount == 0);
	if (!isEmpty)
	{
		System.Shell.RecycleBin.emptyAll();
	}
}

function openRecycleBin()
{
	binOpenLink.blur();
	System.Shell.execute("Explorer", "/N,::{645FF040-5081-101B-9F08-00AA002F954E}");
}

function showRecycleSettings()
{
	binPropertiesLink.blur();
	System.Shell.RecycleBin.showRecycleSettings();
}

function convertBytes(bytes)
{
	if (bytes >= 1073741824)
	{
		return Math.floor(bytes / 1024 / 1024 / 1024) + " Ãב";
	}
	else if (bytes >= 1048576)
	{
		return Math.floor(bytes / 1024 / 1024) + " Ìב";
	}
	else if (bytes >= 1024)
	{
		return Math.floor(bytes / 1024) + " Êב";
	}
	else if (bytes > 0 & bytes < 1024)
	{
		return Math.floor(bytes) + " באיע";
	}
	else
	{
		return "גסו קטסעמ";
	}
}