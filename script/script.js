var content = "";

function getKeyword(input)
{
	var result = "";

	for(i=0; i<input.length; i++)
	{
		if(input==' ')
		{
			result+="%20";
		}

		else
		{
			result+=input[i];
		}
	}

	return result;
}

function getResponse(input)
{
	var result = "";

	for(i=0; i<input.length; i++)
	{
		if(input[i] == '\n')
		{
			result+="<br />"
		}
		else
		{
			result+=input[i];
		}
	}

	return result;
}

async function SubmitVars() {

	const keyword = getKeyword(document.getElementById("user_input").value);

	const url = 'https://guruji.deta.dev/result/?user_input='+keyword
	const response = await fetch(url,{
		method:"GET",
		headers: {"Content-type": "application/json; charset=UTF-8"}
	})

	const responseText = await response.text();
	console.log(responseText); // logs 'OK'
	var index_page = document.getElementById("answer"); 
	index_page.style.backgroundColor = "white"; 
	if(JSON.stringify(responseText).indexOf('overlap') > -1){index_page.style.color = "red"};
	result = JSON.parse(responseText)
	console.log(result["data"])

	content = result["data"]

	p_res = getResponse(result["data"])

	document.getElementById("answer").style.color = "black";

	index_page.innerHTML = (p_res);

	index_page.opacity = 1;
}


async function Copy() {
	try {
	  await navigator.clipboard.writeText(content);
	  console.log(content)
	  /* Resolved - text copied to clipboard successfully */
	} catch (err) {
	  console.error('Failed to copy: ', err);
	  /* Rejected - text failed to copy to the clipboard */
	}
  }

